const Flight = require('../models/Flight');
const { getIsConnected } = require('../config/db');

// @desc    Search flights
// @route   GET /api/flights?source=&destination=&date=
// @access  Public
const searchFlights = async (req, res) => {
  try {
    const { source, destination, date } = req.query;

    if (!getIsConnected()) {
      const mockFlights = [
        {
          _id: 'mock_flight_1',
          airline: 'IndiGo',
          flightNumber: '6E-2012',
          source: source || 'Delhi',
          destination: destination || 'Mumbai',
          departureTime: '06:00',
          arrivalTime: '08:10',
          duration: '2h 10m',
          classes: [
            { className: 'Economy', price: 5200, availableSeats: 50 },
            { className: 'Business', price: 15500, availableSeats: 12 }
          ],
          price: 5200,
          rating: 4.5,
          amenities: ['In-flight Meal', 'Extra Legroom', 'WiFi'],
          date: date || '2026-04-01'
        },
        {
          _id: 'mock_flight_2',
          airline: 'Air India',
          flightNumber: 'AI-805',
          source: source || 'Delhi',
          destination: destination || 'Mumbai',
          departureTime: '10:00',
          arrivalTime: '12:15',
          duration: '2h 15m',
          classes: [
            { className: 'Economy', price: 6500, availableSeats: 40 },
            { className: 'Business', price: 18000, availableSeats: 8 }
          ],
          price: 6500,
          rating: 4.7,
          amenities: ['Free Meal', 'Beverages', 'Entertainment'],
          date: date || '2026-04-01'
        }
      ];
      return res.status(200).json({ success: true, count: mockFlights.length, data: mockFlights });
    }

    const query = {};
    if (source) query.source = { $regex: new RegExp(source, 'i') };
    if (destination) query.destination = { $regex: new RegExp(destination, 'i') };
    if (date) query.date = date;

    const flights = await Flight.find(query).sort({ price: 1 });
    res.status(200).json({ success: true, count: flights.length, data: flights });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get flight by ID
// @route   GET /api/flights/:id
// @access  Public
const getFlightById = async (req, res) => {
  try {
    if (!getIsConnected()) {
      return res.status(200).json({
        success: true,
        data: {
          _id: req.params.id,
          airline: 'IndiGo',
          flightNumber: '6E-2012',
          source: 'Delhi',
          destination: 'Mumbai',
          departureTime: '06:00',
          arrivalTime: '08:10',
          duration: '2h 10m',
          price: 5200,
          rating: 4.5,
          amenities: ['In-flight Meal', 'Extra Legroom', 'WiFi'],
          date: '2026-04-01'
        }
      });
    }
    const flight = await Flight.findById(req.params.id);
    if (!flight) return res.status(404).json({ success: false, message: 'Flight not found' });
    res.status(200).json({ success: true, data: flight });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { searchFlights, getFlightById };
