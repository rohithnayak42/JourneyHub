const Booking = require('../models/Booking');
const Bus = require('../models/Bus');
const Train = require('../models/Train');
const Flight = require('../models/Flight');
const Hotel = require('../models/Hotel');
const { getIsConnected } = require('../config/db');

// Helper to get model based on type
const getModel = (type) => {
  const models = { bus: Bus, train: Train, flight: Flight, hotel: Hotel };
  return models[type];
};

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
  try {
    if (!getIsConnected()) {
      return res.status(201).json({
        success: true,
        message: 'Mock booking confirmed!',
        data: { _id: 'mock_b_1', pnr: 'PNR' + Math.floor(Math.random()*1000000) }
      });
    }
    const {
      bookingType,
      referenceId,
      passengers,
      selectedSeats,
      totalAmount,
      travelDate,
      checkIn,
      checkOut,
      rooms,
      refName,
      refSource,
      refDestination,
      razorpayOrderId,
      paymentId,
    } = req.body;

    // Get reference model and check availability
    const Model = getModel(bookingType);
    if (!Model) return res.status(400).json({ success: false, message: 'Invalid booking type' });

    const ref = await Model.findById(referenceId);
    if (!ref) return res.status(404).json({ success: false, message: 'Resource not found' });

    // For hotel: check/decrement rooms; for others: check/decrement seats
    if (bookingType === 'hotel') {
      if (ref.availableRooms < (rooms || 1)) {
        return res.status(400).json({ success: false, message: 'Not enough rooms available' });
      }
      ref.availableRooms -= rooms || 1;
    } else {
      if (ref.availableSeats < selectedSeats.length) {
        return res.status(400).json({ success: false, message: 'Not enough seats available' });
      }
      ref.availableSeats -= selectedSeats.length;
      ref.bookedSeats = [...(ref.bookedSeats || []), ...selectedSeats];
    }
    await ref.save();

    // Create booking
    const booking = await Booking.create({
      user: req.user.id,
      bookingType,
      referenceId,
      passengers,
      selectedSeats,
      totalAmount,
      status: 'confirmed',
      paymentId,
      razorpayOrderId,
      travelDate,
      checkIn,
      checkOut,
      rooms,
      refName,
      refSource,
      refDestination,
    });

    res.status(201).json({ success: true, message: 'Booking confirmed!', data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all bookings for logged-in user
// @route   GET /api/bookings/my
// @access  Private
const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single booking by ID
// @route   GET /api/bookings/:id
// @access  Private
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, user: req.user.id });
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Cancel a booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, user: req.user.id });
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    if (booking.status === 'cancelled') {
      return res.status(400).json({ success: false, message: 'Booking already cancelled' });
    }

    // Restore availability
    const Model = getModel(booking.bookingType);
    const ref = await Model.findById(booking.referenceId);
    if (ref) {
      if (booking.bookingType === 'hotel') {
        ref.availableRooms += booking.rooms || 1;
      } else {
        ref.availableSeats += booking.selectedSeats.length;
        ref.bookedSeats = ref.bookedSeats.filter(
          (s) => !booking.selectedSeats.includes(s)
        );
      }
      await ref.save();
    }

    booking.status = 'cancelled';
    await booking.save();

    res.status(200).json({ success: true, message: 'Booking cancelled successfully', data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createBooking, getUserBookings, getBookingById, cancelBooking };
