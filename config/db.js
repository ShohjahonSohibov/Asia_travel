require('dotenv').config();
const mongoose = require('mongoose');
console.log("HERE:", process.env.MONGO_URI)
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('mongodb connection success!');
  } catch (err) {
    console.log('mongodb connection failed!', err.message);
  }
};

module.exports = connectDB;
