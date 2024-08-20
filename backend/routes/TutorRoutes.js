const express = require('express');
const bcrypt = require('bcrypt');

const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');

require('../models/TutorDetails');
const Tutor = mongoose.model('Tutors');

const router = express.Router();


router.post("/loginT", [
    body('emailAddress').notEmpty().withMessage('emailAddress is required'),
    body('password').notEmpty().withMessage('Password is required')
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { emailAddress, password } = req.body;
  
    try {
      const user = await Tutor.findOne({ emailAddress });
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

  module.exports = router;