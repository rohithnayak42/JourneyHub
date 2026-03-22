const mongoose = require('mongoose');

const busSchema = new mongoose.Schema(
  {
    busName: { type: String, required: true, trim: true },
    busNumber: { type: String, required: true, unique: true, trim: true },
    source: { type: String, required: true, trim: true },
    destination: { type: String, required: true, trim: true },
    departureTime: { type: String, required: true },
    arrivalTime: { type: String, required: true },
    duration: { type: String, required: true },
    price: { type: Number, required: true },
    totalSeats: { type: Number, default: 40 },
    availableSeats: { type: Number, required: true },
    busType: {
      type: String,
      enum: ['Sleeper', 'Semi-Sleeper', 'AC Seater', 'Non-AC Seater', 'Volvo AC'],
      default: 'AC Seater',
    },
    amenities: [{ type: String }],
    rating: { type: Number, default: 4.0, min: 1, max: 5 },
    date: { type: String, required: true },
    bookedSeats: [{ type: Number }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Bus', busSchema);
