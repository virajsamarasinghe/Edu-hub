const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  emailAddress: { type: String, unique: true },
  password: String,
  studentId: String,
  phone: String,
  profilePhoto: String,
  verificationCode: String,
  qrCode: String,
  isVerified: { type: Boolean, default: false },
//   resetToken: String,
//   resetTokenExpiry: Date,
});

module.exports = mongoose.model('Students', userSchema);