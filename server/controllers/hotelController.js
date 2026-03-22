const Hotel = require('../models/Hotel');
const { getIsConnected } = require('../config/db');

// @desc    Search hotels
// @route   GET /api/hotels?city=&checkIn=&checkOut=
// @access  Public
const searchHotels = async (req, res) => {
  try {
    const { city } = req.query;

    if (!getIsConnected()) {
      const mockHotels = [
        {
          _id: 'mock_hotel_1',
          name: 'The Taj Mahal Palace',
          city: city || 'Mumbai',
          address: 'Apollo Bunder, Colaba, Mumbai',
          pricePerNight: 25000,
          rating: 4.9,
          amenities: ['Spa', 'Pool', 'Fine Dining', 'Gym'],
          images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945'],
          classes: [
            { className: 'Deluxe Room', price: 25000, availableSeats: 5 },
            { className: 'Luxury Suite', price: 55000, availableSeats: 2 }
          ]
        },
        {
          _id: 'mock_hotel_2',
          name: 'JW Marriott Sahar',
          city: city || 'Mumbai',
          address: 'IA Project Road, Sahar, Mumbai',
          pricePerNight: 12000,
          rating: 4.7,
          amenities: ['Airport Shuttle', 'Pool', 'Bar', 'Gym'],
          images: ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb'],
          classes: [
            { className: 'Superior Room', price: 12000, availableSeats: 10 },
            { className: 'Executive Suite', price: 22000, availableSeats: 4 }
          ]
        }
      ];
      return res.status(200).json({ success: true, count: mockHotels.length, data: mockHotels });
    }

    const query = {};
    if (city) query.city = { $regex: new RegExp(city, 'i') };

    const hotels = await Hotel.find(query).sort({ pricePerNight: 1 });
    res.status(200).json({ success: true, count: hotels.length, data: hotels });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get hotel by ID
// @route   GET /api/hotels/:id
// @access  Public
const getHotelById = async (req, res) => {
  try {
    if (!getIsConnected()) {
      return res.status(200).json({
        success: true,
        data: {
          _id: req.params.id,
          name: 'The Taj Mahal Palace',
          city: 'Mumbai',
          address: 'Apollo Bunder, Colaba, Mumbai',
          pricePerNight: 25000,
          rating: 4.9,
          amenities: ['Spa', 'Pool', 'Fine Dining', 'Gym'],
          classes: [
            { className: 'Deluxe Room', price: 25000, availableSeats: 5 },
            { className: 'Luxury Suite', price: 55000, availableSeats: 2 }
          ]
        }
      });
    }
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ success: false, message: 'Hotel not found' });
    res.status(200).json({ success: true, data: hotel });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { searchHotels, getHotelById };
