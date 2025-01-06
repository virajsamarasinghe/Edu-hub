const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  lesson: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true }
});

module.exports = mongoose.model('Schedules', scheduleSchema);
