const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  studentId: {
    type: String, // Corrected type to String
    ref: 'Student',
    required: true
  },
  attendanceStatus: { // Ensure this matches the API request field
    type: Boolean,
    required: true
  }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;