const express = require('express');
const bcrypt = require('bcrypt');
const QRCode = require('qrcode');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const { sendVerificationCode, sendStudentIdEmail } = require('../utils/emailUtils');

require('../models/StudentDetails');
const User = mongoose.model('Students');

require('../models/ParentDetails');
const Parent = mongoose.model('Parents');

const router = express.Router();

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
      const oldUser = await User.findOne({ emailAddress , isVerified: true });
      const nUser = await User.findOne({ emailAddress , isVerified: false});
      if (oldUser) {
        return res.status(400).send({ data: "User already registered!" });
      }
      if (nUser) {
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        sendVerificationCode(emailAddress, verificationCode);
        return res.status(200).send({ status: "Verification code sent to your email." });
  
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const studentId = `eg21${(await User.countDocuments() + 1).toString().padStart(4, '0')}`;
      const phone = '123-456-789';
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      const qrCode = await QRCode.toDataURL(studentId);
  
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
      sendVerificationCode(emailAddress, verificationCode);
  
      res.status(201).send({ status: "User created successfully. Please check your email for the verification code." });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).send({ status: "error", data: error.message });
    }
  });
  router.post('/verify-email', async (req, res) => {
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
    
        sendVerificationCode(email, newVerificationCode);
    
        res.status(200).send({ status: 'success', data: 'Verification code resent successfully.' });
      } catch (error) {
        console.error('Error during resending verification code:', error);
        res.status(500).send({ status: 'error', data: error.message });
      }
    });
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
    router.post('/firstname', async (req, res) => {
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
    router.post('/lastname', async (req, res) => {
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
            lastName: user.lastName
          }
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: error.message });
      }
    });

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
    

    module.exports = router;
  