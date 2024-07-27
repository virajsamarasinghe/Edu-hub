const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  emailAddress: { type: String, unique: true },
  password: String,
  studentId: String,
  verificationCode: String,
  isVerified: { type: Boolean, default: false }
});

module.exports = mongoose.model('Students', userSchema);
