const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    isConnected = true;
  } catch (error) {
    console.error(`⚠️ MongoDB Connection Error: ${error.message}`);
    console.warn('⚡ Running in Mock/Offline mode for now. Database operations will fail or use in-memory state.');
    isConnected = false;
  }
};

const getIsConnected = () => isConnected;

module.exports = { connectDB, getIsConnected };
