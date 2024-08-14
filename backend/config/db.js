const mongoose = require('mongoose');

const connectDB = async () => {
const mongoUrl = process.env.MONGO_URL;

mongoose
  .connect(mongoUrl)
  .then(() => console.log('MongoDB Connected...'))
  .catch((e) => console.error('Connection error', e));
};

module.exports = connectDB;
