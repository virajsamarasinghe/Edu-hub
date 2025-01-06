const express = require('express');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const Tutor = require('../models/TutorDetails');

const predefinedTutors = require('../config/predefinedTutors.json');

const router = express.Router();

// Rate limiter to prevent brute-force attacks
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 login attempts per windowMs
  message: 'Too many login attempts from this IP, please try again after 15 minutes',
});

// POST /loginT - Tutor Login
router.post(
  '/loginT',
  loginLimiter,
  [
    body('emailAddress2')
      .isEmail()
      .withMessage('Valid Email Address is required')
      .normalizeEmail(),
    body('password2').notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { emailAddress2, password2 } = req.body;

    try {
      // Check if the user exists in the database
      let tutor = await Tutor.findOne({ emailAddress2 });
      if (tutor) {
        // Validate password
        const isMatch = tutor.isPredefined
          ? await bcrypt.compare(password2, tutor.password) // Compare raw password with hashed password for predefined users
          : await tutor.comparePassword(password2); // Regular user password check
        
        if (!isMatch) {
          return res.status(400).json({ status: 'error', data: 'Invalid email or password' });
        }

       

        return res.status(200).send({ status: "success", data: "Login successful" });
      }

      // Check predefined credentials if the user is not found
      const predefinedTutor = predefinedTutors.find((u) => u.emailAddress === emailAddress2);
      if (!predefinedTutor || !(await bcrypt.compare(password2, predefinedTutor.passwordHash))) {
        return res.status(400).json({ status: 'error', data: 'Invalid email or password' });
      }

      // Save predefined tutor to the database
      const newTutor = new Tutor({
        username: predefinedTutor.username,
        emailAddress: predefinedTutor.emailAddress,
        password: predefinedTutor.passwordHash, // Already hashed
        phone: predefinedTutor.phone,
        profilePhoto: predefinedTutor.profilePhoto,
        isVerified: true, // Predefined tutors are verified by default
        isPredefined: true, // Mark as predefined
      });

      await newTutor.save();

      return res.status(200).json({ status: 'success', data: 'Predefined tutor login successful and saved to database' });
    } catch (error) {
      console.error('Error during tutor login:', error);
      return res.status(500).json({ status: 'error', data: 'Server error' });
    }
  }
);






module.exports = router;
