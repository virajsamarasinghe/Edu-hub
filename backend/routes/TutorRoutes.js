const express = require('express');
const bcrypt = require('bcrypt');

const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');

require('../models/TutorDetails');
const Tutor = mongoose.model('Tutors');

const router = express.Router();


router.post("/loginT", [
  body('emailAddress2').notEmpty().withMessage('Email Address is required'),
  body('password2').notEmpty().withMessage('Password is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { emailAddress2, password2 } = req.body;

  try {
    // Find the tutor by email
    const tutor = await Tutor.findOne({ emailAddress2 });
    if (!tutor) {
      return res.status(400).send({ status: 'error', data: 'Invalid email or password' });
    }

    // Compare the plain text password
    if (tutor.password !== password2) {
      return res.status(400).send({ status: 'error', data: 'Invalid password' });
    }

    res.status(200).send({ status: 'success', data: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send({ status: 'error', data: error.message });
  }
});



  module.exports = router;