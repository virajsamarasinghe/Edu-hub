require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator');
const crypto = require('crypto');

app.use(express.json());
app.use(cors());

const mongoUrl = process.env.MONGO_URL;

mongoose
  .connect(mongoUrl)
  .then(() => console.log('MongoDB Connected...'))
  .catch((e) => console.error('Connection error', e));

require('./models/StudentDetails');
const User = mongoose.model('Students');

require('./models/ParentDetails');
const Parent = mongoose.model('Parents');



const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
const sendVerificationCode = (email, code) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Email Verification Code',
    text: `Your verification code is: ${code}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};
const sendStudentIdEmail = (email, studentId) => {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Student ID',
      text: `Your student ID is: ${studentId}`
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  };
app.post("/register", [
  body('emailAddress').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, lastName, emailAddress, password } = req.body;

  try {
    const oldUser = await User.findOne({ emailAddress });
    if (oldUser) {
      return res.status(400).send({ data: "User already registered!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const studentId = `eg21${(await User.countDocuments() + 1).toString().padStart(4, '0')}`;
    const phone = '123-456-789';
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    const newUser = new User({
      firstName,
      lastName,
      emailAddress,
      password: hashedPassword,
      studentId,
      phone,
      verificationCode,
      isVerified: false,
      verificationCodeExpiry: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
    });

    await newUser.save();
    sendVerificationCode(emailAddress, verificationCode);

    res.status(201).send({ status: "User created successfully. Please check your email for the verification code." });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).send({ status: "error", data: error.message });
  }
});
app.post('/verify-email', async (req, res) => {
  const { code } = req.body;

  try {
    const user = await User.findOne({  verificationCode: code, isVerified: false });
    if (!user || user.verificationCodeExpiry < Date.now()) {
      return res.status(400).send({ status: 'error', data: 'Invalid or expired verification code.' });
    }

    user.isVerified = true;
    user.verificationCode = undefined;
    user.verificationCodeExpiry = undefined;
    await user.save();

    // Send student ID via email
    sendStudentIdEmail(user.emailAddress, user.studentId);

    res.status(200).send({ status: 'success', data: 'Email verified successfully.' });
  } catch (error) {
    console.error('Error during email verification:', error);
    res.status(500).send({ status: 'error', data: error.message });
  }
});
app.post('/resend-verification-code', async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ emailAddress: email });
      if (!user) {
        return res.status(404).send({ status: 'error', data: 'User not found' });
      }
  
      const newVerificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      user.verificationCode = newVerificationCode;
      user.verificationCodeExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
      await user.save();
  
      sendVerificationCode(email, newVerificationCode);
  
      res.status(200).send({ status: 'success', data: 'Verification code resent successfully.' });
    } catch (error) {
      console.error('Error during resending verification code:', error);
      res.status(500).send({ status: 'error', data: error.message });
    }
  });
app.post("/login", [
    body('studentId').notEmpty().withMessage('Student ID is required'),
    body('password').notEmpty().withMessage('Password is required')
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { studentId, password } = req.body;
  
    try {
      const user = await User.findOne({ studentId, isVerified: true });
      if (!user) {
        return res.status(400).send({ status: "error", data: "Invalid student ID or password" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send({ status: "error", data: "Invalid student ID or password" });
      }
  
      res.status(200).send({ status: "success", data: "Login successful" });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).send({ status: "error", data: error.message });
    }
  });
  app.get('/test/parent/:id', async (req, res) => {
    try {
      const parent = await Parent.findById(req.params.id).select('-password');
      if (!parent) {
        return res.status(404).json({ message: 'Parent not found' });
      }
      res.json(parent);
    } catch (error) {
      console.error('Error fetching parent profile:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  app.post('/reset-password', async (req, res) => {
    const { emailAddress, oldPassword, newPassword, confirmPassword } = req.body;
  
    if (newPassword !== confirmPassword) {
      return res.status(400).send({ message: 'New password and confirm password do not match' });
    }
  
    try {
      const user = await User.findOne({ emailAddress });
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
  
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).send({ message: 'Old password is incorrect' });
      }
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
  
      res.send({ message: 'Password has been updated successfully' });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });
   app.post('/phone', async (req, res) => {
    const { studentId, phone } = req.body;
  
    try {
      const user = await User.findOne({ studentId });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.phone = phone;
      await user.save();
      res.json({ message: 'Phone number updated successfully', user });
    } catch (error) {
      console.error('Error updating phone number:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  app.post('/firstname', async (req, res) => {
    const { studentId, firstName } = req.body;
  
    try {
      const user = await User.findOne({ studentId });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.firstName = firstName;
      await user.save();
      res.json({ message: 'firstname updated successfully', user });
    } catch (error) {
      console.error('Error updating firstname:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  app.post('/lastname', async (req, res) => {
    const { studentId, lastName } = req.body;
  
    try {
      const user = await User.findOne({ studentId });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.lastName = lastName;
      await user.save();
      res.json({ message: 'lastname updated successfully', user });
    } catch (error) {
      console.error('Error updating lastname:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  app.get('/get-user-data', async (req, res) => {
    const { studentId } = req.query;
  
    try {
      const user = await User.findOne({ studentId });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({
        status: 'ok',
        data: {
          phone: user.phone,
          emailAddress: user.emailAddress,
          firstName: user.firstName,
          lastName: user.lastName
        }
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ error: error.message });
    }
  });

  
  
  
  
  
  




  //--------Parent----------------//

  app.post("/registerP", [
    body('emailAddress').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { studentId, username, emailAddress, password } = req.body;
  
    try {
      const user = await User.findOne({ studentId, isVerified: true });
      if (!user) {
        return res.status(400).send({ status: "error", data: "Invalid student ID or password" });
      }
      
      const oldUser = await Parent.findOne({ emailAddress });
      if (oldUser) {
        return res.status(400).send({ data: "User already registered!" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const phone = '123-456-789';
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
  
      const newUser = new Parent({
        studentId,
        username,
        emailAddress,
        phone,
        password: hashedPassword,
        verificationCode,
        isVerified: false,
        verificationCodeExpiry: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
      });
  
      await newUser.save();
      sendVerificationCode(emailAddress, verificationCode);
  
      res.status(201).send({ status: "User created successfully. Please check your email for the verification code." });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).send({ status: "error", data: error.message });
    }
  });

  app.post('/verify-emailP', async (req, res) => {
    const { code } = req.body;
  
    try {
      const user = await Parent.findOne({  verificationCode: code, isVerified: false });
      if (!user || user.verificationCodeExpiry < Date.now()) {
        return res.status(400).send({ status: 'error', data: 'Invalid or expired verification code.' });
      }
  
      user.isVerified = true;
      user.verificationCode = undefined;
      user.verificationCodeExpiry = undefined;
      await user.save();
  
  
      res.status(200).send({ status: 'success', data: 'Email verified successfully.' });
    } catch (error) {
      console.error('Error during email verification:', error);
      res.status(500).send({ status: 'error', data: error.message });
    }
  });
  
  app.post('/resend-verification-codeP', async (req, res) => {
      const { email } = req.body;
    
      try {
        const user = await Parent.findOne({ emailAddress: email });
        if (!user) {
          return res.status(404).send({ status: 'error', data: 'User not found' });
        }
    
        const newVerificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        user.verificationCode = newVerificationCode;
        user.verificationCodeExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
        await user.save();
    
        sendVerificationCode(email, newVerificationCode);
    
        res.status(200).send({ status: 'success', data: 'Verification code resent successfully.' });
      } catch (error) {
        console.error('Error during resending verification code:', error);
        res.status(500).send({ status: 'error', data: error.message });
      }
    });

    app.post("/loginP", [
      body('emailAddress').notEmpty().withMessage('emailAddress is required'),
      body('password').notEmpty().withMessage('Password is required')
    ], async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
    
      const { emailAddress, password } = req.body;
    
      try {
        const user = await Parent.findOne({ emailAddress, isVerified: true });
        if (!user) {
          return res.status(400).send({ status: "error", data: "Invalid emailAddress or password" });
        }
    
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).send({ status: "error", data: "Invalid emailAddress or password" });
        }
    
        res.status(200).send({ status: "success", data: "Login successful" });
      } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send({ status: "error", data: error.message });
      }
    });


    app.post('/reset-passwordP', async (req, res) => {
      const { emailAddress, oldPassword, newPassword, confirmPassword } = req.body;
    
      if (newPassword !== confirmPassword) {
        return res.status(400).send({ message: 'New password and confirm password do not match' });
      }
    
      try {
        const user = await Parent.findOne({ emailAddress });
        if (!user) {
          return res.status(404).send({ message: 'User not found' });
        }
    
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
          return res.status(400).send({ message: 'Old password is incorrect' });
        }
    
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
    
        res.send({ message: 'Password has been updated successfully' });
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });

    app.post('/phoneP', async (req, res) => {
      const { emailAddress, phone } = req.body;
    
      try {
        const user = await Parent.findOne({ emailAddress});
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        user.phone = phone;
        await user.save();
        res.json({ message: 'Phone number updated successfully', user });
      } catch (error) {
        console.error('Error updating phone number:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    });

    app.post('/username', async (req, res) => {
      const { emailAddress, username } = req.body;
    
      try {
        const user = await Parent.findOne({ emailAddress });
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        user.username = username;
        await user.save();
        res.json({ message: 'username updated successfully', user });
      } catch (error) {
        console.error('Error updating username:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    });

    app.get('/get-user-dataP', async (req, res) => {
      const { emailAddress} = req.query;
    
      try {
        const user = await Parent.findOne({ emailAddress});
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        res.json({
          status: 'ok',
          data: {
            username: user.username,
            verificationCode: user.verificationCode,
            phone: user.phone,
            emailAddress: user.emailAddress,
           
          }
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: error.message });
      }
    });

app.listen(5001, () => {
  console.log('Node.js server started on port 5001');
});