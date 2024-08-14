const express = require('express');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const { sendVerificationCode } = require('../utils/emailUtils');

require('../models/ParentDetails');
const Parent = mongoose.model('Parents');

require('../models/StudentDetails');
const User = mongoose.model('Students');

const router = express.Router();


router.post("/registerP", [
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

  router.post('/verify-emailP', async (req, res) => {
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
  
  router.post('/resend-verification-codeP', async (req, res) => {
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

    router.post("/loginP", [
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


    router.post('/reset-passwordP', async (req, res) => {
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

    router.post('/phoneP', async (req, res) => {
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

    router.post('/username', async (req, res) => {
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

    router.get('/get-user-dataP', async (req, res) => {
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

    module.exports = router;