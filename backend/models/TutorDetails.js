const mongoose = require('mongoose');

const tutorSchema = new mongoose.Schema({
  
  username: String,
  emailAddress: { type: String, unique: true },
  password: String,
  phone: String,
  profilePhoto: String,
  verificationCode: String,
  isVerified: { type: Boolean, default: false },
//   resetToken: String,
//   resetTokenExpiry: Date,
});

module.exports = mongoose.model('Tutors', tutorSchema);