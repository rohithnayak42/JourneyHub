const Train = require('../models/Train');
const { getIsConnected } = require('../config/db');

// @desc    Search trains
// @route   GET /api/trains?source=&destination=&date=
// @access  Public
const searchTrains = async (req, res) => {
  try {
    const { source, destination, date } = req.query;

    if (!getIsConnected()) {
      const mockTrains = [
        {
          _id: 'mock_train_1',
          trainName: 'Rajdhani Express',
          trainNumber: '12301',
          source: source || 'Delhi',
          destination: destination || 'Mumbai',
          departureTime: '16:55',
          arrivalTime: '08:15',
          duration: '15h 20m',
          classes: [
            { className: '1A', price: 4500, availableSeats: 12 },
            { className: '2A', price: 2800, availableSeats: 24 },
            { className: '3A', price: 1900, availableSeats: 48 }
          ],
          rating: 4.8,
          amenities: ['Catering', 'Bedding', 'Mobile Charging'],
          date: date || '2026-04-01'
        },
        {
          _id: 'mock_train_2',
          trainName: 'Shatabdi Express',
          trainNumber: '12002',
          source: source || 'Delhi',
          destination: destination || 'Bhopal',
          departureTime: '06:00',
          arrivalTime: '14:00',
          duration: '08h 00m',
          classes: [
            { className: 'EC', price: 2100, availableSeats: 5 },
            { className: 'CC', price: 1200, availableSeats: 30 }
          ],
          rating: 4.6,
          amenities: ['Catering', 'Newspapers'],
          date: date || '2026-04-01'
        }
      ];
      return res.status(200).json({ success: true, count: mockTrains.length, data: mockTrains });
    }

    const query = {};
    if (source) query.source = { $regex: new RegExp(source, 'i') };
    if (destination) query.destination = { $regex: new RegExp(destination, 'i') };
    if (date) query.date = date;

    const trains = await Train.find(query).sort({ 'classes.0.price': 1 });
    res.status(200).json({ success: true, count: trains.length, data: trains });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get train by ID
// @route   GET /api/trains/:id
// @access  Public
const getTrainById = async (req, res) => {
  try {
    if (!getIsConnected()) {
      return res.status(200).json({
        success: true,
        data: {
          _id: req.params.id,
          trainName: 'Rajdhani Express',
          trainNumber: '12301',
          source: 'Delhi',
          destination: 'Mumbai',
          departureTime: '16:55',
          arrivalTime: '08:15',
          duration: '15h 20m',
          classes: [
            { className: '1A', price: 4500, availableSeats: 12 },
            { className: '2A', price: 2800, availableSeats: 24 },
            { className: '3A', price: 1900, availableSeats: 48 }
          ],
          rating: 4.8,
          amenities: ['Catering', 'Bedding', 'Mobile Charging'],
          date: '2026-04-01'
        }
      });
    }
    const train = await Train.findById(req.params.id);
    if (!train) return res.status(404).json({ success: false, message: 'Train not found' });
    res.status(200).json({ success: true, data: train });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { searchTrains, getTrainById };
