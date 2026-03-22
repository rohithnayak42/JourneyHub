require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');

// Route imports
const authRoutes = require('./routes/authRoutes');
const busRoutes = require('./routes/busRoutes');
const trainRoutes = require('./routes/trainRoutes');
const flightRoutes = require('./routes/flightRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({ origin: [/http:\/\/127\.0\.0\.1:\d+/, /http:\/\/localhost:\d+/], credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/buses', busRoutes);
app.use('/api/trains', trainRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payment', paymentRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ success: true, message: 'JourneyHub Travel Booking API is running 🚀' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

// Export the Express API for Serverless Architecture (Like Vercel)
module.exports = app;

// Only spin up the rigid port listener when running locally
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}
