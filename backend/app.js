require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator');

app.use(express.json());
app.use(cors());

const mongoUrl = process.env.MONGO_URL;

mongoose
  .connect(mongoUrl)
  .then(() => console.log('MongoDB Connected...'))
  .catch((e) => console.error('Connection error', e));

require('./StudentDetails');
const User = mongoose.model('Students');

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
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    const newUser = new User({
      firstName,
      lastName,
      emailAddress,
      password: hashedPassword,
      studentId,
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

    res.status(200).send({ status: 'success', data: 'Email verified successfully.' });
  } catch (error) {
    console.error('Error during email verification:', error);
    res.status(500).send({ status: 'error', data: error.message });
  }
});

app.listen(3001, () => {
  console.log('Node.js server started on port 3001');
});
