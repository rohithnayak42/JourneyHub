const Bus = require('../models/Bus');
const { getIsConnected } = require('../config/db');

// @desc    Search buses
// @route   GET /api/buses?source=&destination=&date=
// @access  Public
const searchBuses = async (req, res) => {
  try {
    const { source, destination, date } = req.query;

    if (!getIsConnected()) {
      const mockBuses = [
        {
          _id: 'mock_bus_1',
          busName: 'Zingbus - Premium AC',
          busNumber: 'DL 01 AB 1234',
          busType: 'AC Sleeper',
          source: source || 'Delhi',
          destination: destination || 'Mumbai',
          departureTime: '21:00',
          arrivalTime: '09:00',
          duration: '12h 00m',
          price: 1250,
          rating: 4.5,
          amenities: ['CCTV', 'Charging Point', 'Blankets', 'Water Bottle'],
          seats: { total: 40, booked: [1, 5, 12] },
          date: date || '2026-04-01'
        },
        {
          _id: 'mock_bus_2',
          busName: 'IntrCity SmartBus',
          busNumber: 'MH 02 XY 5678',
          busType: 'AC Seater',
          source: source || 'Delhi',
          destination: destination || 'Mumbai',
          departureTime: '10:00',
          arrivalTime: '22:00',
          duration: '12h 00m',
          price: 850,
          rating: 4.2,
          amenities: ['WiFi', 'Charging Point', 'GPS'],
          seats: { total: 40, booked: [2, 3, 10, 20, 21] },
          date: date || '2026-04-01'
        }
      ];
      return res.status(200).json({ success: true, count: mockBuses.length, data: mockBuses });
    }

    const query = {};
    if (source) query.source = { $regex: new RegExp(source, 'i') };
    if (destination) query.destination = { $regex: new RegExp(destination, 'i') };
    if (date) query.date = date;

    const buses = await Bus.find(query).sort({ price: 1 });
    res.status(200).json({ success: true, count: buses.length, data: buses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get bus by ID
// @route   GET /api/buses/:id
// @access  Public
const getBusById = async (req, res) => {
  try {
    if (!getIsConnected()) {
      return res.status(200).json({
        success: true,
        data: {
          _id: req.params.id,
          busName: 'Zingbus - Premium AC',
          busNumber: 'DL 01 AB 1234',
          busType: 'AC Sleeper',
          source: 'Delhi',
          destination: 'Mumbai',
          departureTime: '21:00',
          arrivalTime: '09:00',
          duration: '12h 00m',
          price: 1250,
          rating: 4.5,
          amenities: ['CCTV', 'Charging Point', 'Blankets', 'Water Bottle'],
          seats: { total: 40, booked: [1, 5, 12] },
          date: '2026-04-01'
        }
      });
    }
    const bus = await Bus.findById(req.params.id);
    if (!bus) return res.status(404).json({ success: false, message: 'Bus not found' });
    res.status(200).json({ success: true, data: bus });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { searchBuses, getBusById };
