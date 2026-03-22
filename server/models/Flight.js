const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema(
  {
    airline: { type: String, required: true, trim: true },
    flightNumber: { type: String, required: true, unique: true, trim: true },
    source: { type: String, required: true, trim: true },
    destination: { type: String, required: true, trim: true },
    departureTime: { type: String, required: true },
    arrivalTime: { type: String, required: true },
    duration: { type: String, required: true },
    price: { type: Number, required: true },
    cabinClass: {
      type: String,
      enum: ['Economy', 'Premium Economy', 'Business', 'First Class'],
      default: 'Economy',
    },
    availableSeats: { type: Number, required: true },
    totalSeats: { type: Number, default: 180 },
    baggage: { type: String, default: '15 KG' },
    amenities: [{ type: String }],
    rating: { type: Number, default: 4.2 },
    date: { type: String, required: true },
    bookedSeats: [{ type: Number }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Flight', flightSchema);
