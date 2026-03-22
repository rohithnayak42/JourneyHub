const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  seatNumber: { type: Number },
});

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    bookingType: {
      type: String,
      enum: ['bus', 'train', 'flight', 'hotel'],
      required: true,
    },
    referenceId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'bookingType',
    },
    passengers: [passengerSchema],
    selectedSeats: [{ type: Number }],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
    paymentId: { type: String },
    razorpayOrderId: { type: String },
    travelDate: { type: String, required: true },
    // Hotel specific
    checkIn: { type: String },
    checkOut: { type: String },
    rooms: { type: Number, default: 1 },
    // Reference name for display
    refName: { type: String },
    refSource: { type: String },
    refDestination: { type: String },
    pnr: { type: String, unique: true },
  },
  { timestamps: true }
);

// Generate PNR automatically
bookingSchema.pre('save', function (next) {
  if (!this.pnr) {
    this.pnr =
      this.bookingType.toUpperCase().slice(0, 2) +
      Date.now().toString(36).toUpperCase() +
      Math.random().toString(36).toUpperCase().slice(2, 6);
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);
