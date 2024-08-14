const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema({
  studentId: String,
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

module.exports = mongoose.model('Parents', parentSchema);