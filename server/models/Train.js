const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema(
  {
    trainName: { type: String, required: true, trim: true },
    trainNumber: { type: String, required: true, unique: true, trim: true },
    source: { type: String, required: true, trim: true },
    destination: { type: String, required: true, trim: true },
    departureTime: { type: String, required: true },
    arrivalTime: { type: String, required: true },
    duration: { type: String, required: true },
    classes: [
      {
        className: { type: String }, // SL, 3A, 2A, 1A
        price: { type: Number },
        availableSeats: { type: Number },
      },
    ],
    rating: { type: Number, default: 4.0 },
    date: { type: String, required: true },
    bookedSeats: [{ type: Number }],
    amenities: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Train', trainSchema);
