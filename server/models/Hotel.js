const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    address: { type: String, required: true },
    rating: { type: Number, default: 4.0, min: 1, max: 5 },
    pricePerNight: { type: Number, required: true },
    roomType: {
      type: String,
      enum: ['Standard', 'Deluxe', 'Suite', 'Presidential'],
      default: 'Standard',
    },
    amenities: [{ type: String }],
    images: [{ type: String }],
    availableRooms: { type: Number, required: true },
    totalRooms: { type: Number, default: 50 },
    description: { type: String, trim: true },
    checkInTime: { type: String, default: '12:00 PM' },
    checkOutTime: { type: String, default: '11:00 AM' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Hotel', hotelSchema);
