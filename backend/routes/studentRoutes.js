require('dotenv').config();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const express = require('express');
const bcrypt = require('bcrypt');
const QRCode = require('qrcode');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose'); 
const { sendVerificationCode, sendStudentIdEmail } = require('../utils/emailUtils');
const jwt = require('jsonwebtoken');

require('../models/StudentDetails');
const User = mongoose.model('Students');

require('../models/ParentDetails');
const Parent = mongoose.model('Parents');
const Token = require('../models/Token');
const router = express.Router();
// Log the JWT_SECRET to ensure it is loaded correctly
console.log('JWT_SECRET:', process.env.JWT_SECRET);

// Generate a JWT token for email verification
function generateVerificationToken(userId) {
  const payload = { id: userId };
  const secret = process.env.JWT_SECRET;
  const options = { expiresIn: '1h' }; // Token expires in 1 hour
  return jwt.sign(payload, secret, options);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      const uploadDir = 'uploads/profiles';
      if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, 'profile-' + req.body.studentId + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
  } else {
      cb(new Error('Invalid file type. Only JPEG, PNG and JPG are allowed.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
      fileSize: 5 * 1024 * 1024 // 5MB max file size
  }
});



// Register a new user
router.post("/register", [
  body('emailAddress').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, lastName, emailAddress, password } = req.body;

  try {
    const existingUser = await User.findOne({ emailAddress });
    if (existingUser) {
      if (existingUser.isVerified) {
        return res.status(400).send({ data: "User already registered!" });
      } else {
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const token = generateVerificationToken(existingUser._id);
        

        // Send both code and link
        const newToken = new Token({ userId: existingUser._id, token });
        await newToken.save();
        console.log('tokrn:', token)

        sendVerificationCode(emailAddress, verificationCode, token);
        return res.status(200).send({ status: "Verification code and link sent to your email." });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const studentId = `eg21${(await User.countDocuments() + 1).toString().padStart(4, '0')}`;
    const phone = '123-456-789';
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const qrCode = await QRCode.toDataURL(studentId);
    const token = generateVerificationToken(studentId);
    

    const newUser = new User({
      firstName,
      lastName,
      emailAddress,
      password: hashedPassword,
      studentId,
      phone,
      verificationCode,
      qrCode,
      isVerified: false,
      verificationCodeExpiry: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
    });

    await newUser.save();

    // Save token in the database
    const newToken = new Token({ userId: newUser._id, token });
    await newToken.save();

    sendVerificationCode(emailAddress, verificationCode, token);

    res.status(201).send({ status: "User created successfully. Please check your email for the verification code." });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).send({ status: "error", data: error.message });
  }
});

//Verify email with code or token
router.post('/verify-email', async (req, res) => {
  const { code, token } = req.body;

  if (code) {
    try {
      const user = await User.findOne({ verificationCode: code, isVerified: false });
      if (!user || user.verificationCodeExpiry < Date.now()) {
        return res.status(400).send({ status: 'error', data: 'Invalid or expired verification code.' });
      }

      user.isVerified = true;
      user.verificationCode = undefined;
      user.verificationCodeExpiry = undefined;
      await user.save();

      sendStudentIdEmail(user.emailAddress, user.studentId);

      res.status(200).send({ status: 'success', data: 'Email verified successfully.' });
    } catch (error) {
      console.error('Error during email verification:', error);
      res.status(500).send({ status: 'error', data: error.message });
    }
  } else if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;

      const user = await User.findOne({ studentId: userId, isVerified: false });
      if (!user) {
        return res.status(400).send({ status: 'error', data: 'Invalid or expired token' });
      }

      user.isVerified = true;
      user.verificationCode = undefined;
      user.verificationCodeExpiry = undefined;
      await user.save();

      sendStudentIdEmail(user.emailAddress, user.studentId);

      res.status(200).send({ status: 'success', data: 'Email verified successfully by link.' });
    } catch (error) {
      console.error('Error during token verification:', error);
      res.status(500).send({ status: 'error', data: 'Failed to verify email' });
    }
  } else {
    res.status(400).send({ status: 'error', data: 'Invalid request' });
  }
});

// router.post('/verify-email', async (req, res) => {
//   const { token } = req.body;

//   // Check if the token is provided in the request body
//   if (!token) {
//     return res.status(400).send({ status: 'error', data: 'Token is required' });
//   }

//   try {
//     // Verify the token using the secret key
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const userId = decoded.id;

//     // Find the user in the database with the decoded userId and isVerified set to false
//     const user = await User.findOne({studentId: userId, isVerified: false });
//     if (!user) {
//       return res.status(400).send({ status: 'error', data: 'Invalid or expired token' });
//     }

//     // Update the user's verification status and clear the verification code and expiry
//     user.isVerified = true;
//     user.verificationCode = undefined;
//     user.verificationCodeExpiry = undefined;
//     await user.save();

//     // Send a success response
//     res.status(200).send({ status: 'success', data: 'Email verified successfully.' });
//   } catch (error) {
//     // Log the error and send an error response if token verification fails
//     console.error('Error during token verification:', error);
//     res.status(400).send({ status: 'error', data: 'Invalid token' });
//   }
// });

  

// Resend verification code
router.post('/resend-verification-code', async (req, res) => {
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

      const token = generateVerificationToken(user._id);
      const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

      sendVerificationCode(email, newVerificationCode, verificationLink);
  
      res.status(200).send({ status: 'success', data: 'Verification code and link resent successfully.' });
    } catch (error) {
      console.error('Error during resending verification code:', error);
      res.status(500).send({ status: 'error', data: error.message });
    }
  });

// Login route
router.post("/login", [
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

// Fetch parent profile by ID
router.get('/test/parent/:id', async (req, res) => {
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

// Reset password
router.post('/reset-password', async (req, res) => {
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

// Update phone number
router.post('/phone', async (req, res) => {
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

// Update first name
router.post('/firstname', async (req, res) => {
  const { studentId, firstName } = req.body;

  try {
    const user = await User.findOne({ studentId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.firstName = firstName;
    await user.save();
    res.json({ message: 'First name updated successfully', user });
  } catch (error) {
    console.error('Error updating first name:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update last name
router.post('/lastname', async (req, res) => {
  const { studentId, lastName } = req.body;

  try {
    const user = await User.findOne({ studentId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.lastName = lastName;
    await user.save();
    res.json({ message: 'Last name updated successfully', user });
  } catch (error) {
    console.error('Error updating last name:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get user data
router.get('/get-user-data', async (req, res) => {
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
        lastName: user.lastName,
        profilePhoto: user.profilePhoto,
      }
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get QR code
router.get('/get-qr-code', async (req, res) => {
  const { studentId } = req.query;

  try {
    const user = await User.findOne({ studentId });
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    res.status(200).send({ qrCode: user.qrCode });
  } catch (error) {
    console.error('Error fetching QR code:', error);
    res.status(500).send({ error: error.message });
  }
});

router.post('/upload-profile-image', upload.single('profileImage'), async (req, res) => {
  try {
      if (!req.file) {
          return res.status(400).json({
              success: false,
              message: 'No file uploaded'
          });
      }

      const { studentId } = req.body;
      if (!studentId) {
          // Delete uploaded file if studentId not provided
          fs.unlinkSync(req.file.path);
          return res.status(400).json({
              success: false,
              message: 'Student ID is required'
          });
      }

      // Find the student
      const student = await User.findOne({ studentId: studentId });
      if (!student) {
          fs.unlinkSync(req.file.path);
          return res.status(404).json({
              success: false,
              message: 'Student not found'
          });
      }

      // Delete old profile photo if it exists
      if (student.profilePhoto) {
          const oldImagePath = path.join(__dirname, student.profilePhoto);
          if (fs.existsSync(oldImagePath)) {
              fs.unlinkSync(oldImagePath);
          }
      }

      // Update student's profile photo path in database
      const imageUrl = req.file.path.replace(/\\/g, '/'); // Convert Windows path to URL format
      student.profilePhoto = imageUrl;
      await student.save();

      res.json({
          success: true,
          message: 'Profile photo uploaded successfully',
          data: {
              imageUrl: imageUrl
          }
      });

  } catch (error) {
      // Clean up uploaded file if there's an error
      if (req.file) {
          fs.unlinkSync(req.file.path);
      }
      console.error('Error uploading profile photo:', error);
      res.status(500).json({
          success: false,
          message: 'Error uploading profile photo',
          error: error.message
      });
  }
});

// Endpoint to serve profile images
router.get('/profile-image/:studentId', async (req, res) => {
  try {
      const student = await User.findOne({ studentId: req.params.studentId });
      if (!student || !student.profilePhoto) {
          return res.status(404).json({
              success: false,
              message: 'Profile image not found'
          });
      }

      const imagePath = path.join(__dirname, student.profilePhoto);
      if (fs.existsSync(imagePath)) {
          res.sendFile(imagePath);
      } else {
          res.status(404).json({
              success: false,
              message: 'Image file not found'
          });
      }
  } catch (error) {
      console.error('Error serving profile image:', error);
      res.status(500).json({
          success: false,
          message: 'Error serving profile image'
      });
  }
});

module.exports = router;
