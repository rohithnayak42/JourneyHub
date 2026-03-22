require('dotenv').config({ path: '.env' });
const mongoose = require('mongoose');
const Bus = require('../models/Bus');
const Train = require('../models/Train');
const Flight = require('../models/Flight');
const Hotel = require('../models/Hotel');

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ MongoDB connected for seeding');
};

const buses = [
  { busName: 'IndraBus Express', busNumber: 'IB-001', source: 'Delhi', destination: 'Mumbai', departureTime: '08:00 AM', arrivalTime: '10:00 PM', duration: '14h 00m', price: 899, totalSeats: 40, availableSeats: 35, busType: 'Volvo AC', amenities: ['WiFi', 'USB Charging', 'AC', 'Blanket'], rating: 4.5, date: '2026-04-01', bookedSeats: [1, 5, 12] },
  { busName: 'Royal Travels', busNumber: 'RT-002', source: 'Delhi', destination: 'Mumbai', departureTime: '10:30 AM', arrivalTime: '11:30 PM', duration: '13h 00m', price: 1099, totalSeats: 40, availableSeats: 25, busType: 'Sleeper', amenities: ['AC', 'Charging Point', 'Blanket', 'Water Bottle'], rating: 4.2, date: '2026-04-01', bookedSeats: [3, 7, 15, 20, 25] },
  { busName: 'Orange Tours', busNumber: 'OT-003', source: 'Mumbai', destination: 'Pune', departureTime: '06:00 AM', arrivalTime: '09:30 AM', duration: '3h 30m', price: 350, totalSeats: 40, availableSeats: 30, busType: 'AC Seater', amenities: ['AC', 'WiFi'], rating: 4.0, date: '2026-04-01', bookedSeats: [2, 8] },
  { busName: 'Patel Travels', busNumber: 'PT-004', source: 'Bangalore', destination: 'Chennai', departureTime: '09:00 PM', arrivalTime: '05:00 AM', duration: '8h 00m', price: 750, totalSeats: 40, availableSeats: 28, busType: 'Semi-Sleeper', amenities: ['AC', 'Charging Point'], rating: 3.9, date: '2026-04-01', bookedSeats: [5, 10] },
  { busName: 'KPN Travels', busNumber: 'KPN-005', source: 'Chennai', destination: 'Hyderabad', departureTime: '07:00 PM', arrivalTime: '03:00 AM', duration: '8h 00m', price: 820, totalSeats: 40, availableSeats: 32, busType: 'Volvo AC', amenities: ['WiFi', 'AC', 'USB Charging', 'Snacks'], rating: 4.4, date: '2026-04-01', bookedSeats: [1, 3] },
  { busName: 'SRS Travels', busNumber: 'SRS-006', source: 'Hyderabad', destination: 'Bangalore', departureTime: '11:00 PM', arrivalTime: '06:00 AM', duration: '7h 00m', price: 680, totalSeats: 40, availableSeats: 22, busType: 'Sleeper', amenities: ['AC', 'Blanket', 'Pillow'], rating: 4.1, date: '2026-04-01', bookedSeats: [4, 9, 14, 19] },
  { busName: 'Delhi Express', busNumber: 'DE-007', source: 'Delhi', destination: 'Jaipur', departureTime: '06:00 AM', arrivalTime: '11:00 AM', duration: '5h 00m', price: 450, totalSeats: 40, availableSeats: 38, busType: 'AC Seater', amenities: ['AC', 'WiFi'], rating: 4.3, date: '2026-04-01', bookedSeats: [2] },
  { busName: 'Volvo Star', busNumber: 'VS-008', source: 'Jaipur', destination: 'Delhi', departureTime: '02:00 PM', arrivalTime: '07:30 PM', duration: '5h 30m', price: 499, totalSeats: 40, availableSeats: 36, busType: 'Volvo AC', amenities: ['WiFi', 'AC', 'USB Charging'], rating: 4.6, date: '2026-04-01', bookedSeats: [6, 11] },
  { busName: 'BlueLine Bus', busNumber: 'BL-009', source: 'Delhi', destination: 'Mumbai', departureTime: '05:00 PM', arrivalTime: '07:00 AM', duration: '14h 00m', price: 1200, totalSeats: 40, availableSeats: 20, busType: 'Sleeper', amenities: ['AC', 'Blanket', 'Snacks', 'Charging Point'], rating: 4.7, date: '2026-04-01', bookedSeats: [1, 2, 3, 8, 14, 19, 24] },
  { busName: 'Highway King', busNumber: 'HK-010', source: 'Mumbai', destination: 'Goa', departureTime: '09:00 PM', arrivalTime: '07:00 AM', duration: '10h 00m', price: 950, totalSeats: 40, availableSeats: 18, busType: 'Volvo AC', amenities: ['WiFi', 'AC', 'USB Charging', 'Water Bottle'], rating: 4.3, date: '2026-04-01', bookedSeats: [5, 10, 15, 20, 25, 30] },
];

const trains = [
  { trainName: 'Rajdhani Express', trainNumber: '12951', source: 'Delhi', destination: 'Mumbai', departureTime: '04:55 PM', arrivalTime: '08:35 AM', duration: '15h 40m', classes: [{ className: 'SL', price: 620, availableSeats: 200 }, { className: '3A', price: 1640, availableSeats: 100 }, { className: '2A', price: 2360, availableSeats: 50 }, { className: '1A', price: 3965, availableSeats: 20 }], rating: 4.7, date: '2026-04-01', amenities: ['Pantry Car', 'Bedding', 'AC'] },
  { trainName: 'Shatabdi Express', trainNumber: '12001', source: 'Delhi', destination: 'Bhopal', departureTime: '06:15 AM', arrivalTime: '02:30 PM', duration: '8h 15m', classes: [{ className: '2A', price: 1780, availableSeats: 80 }, { className: '1A', price: 3250, availableSeats: 30 }], rating: 4.5, date: '2026-04-01', amenities: ['WiFi', 'Meals Included', 'AC'] },
  { trainName: 'Duronto Express', trainNumber: '12213', source: 'Mumbai', destination: 'Kolkata', departureTime: '11:05 PM', arrivalTime: '09:25 PM', duration: '22h 20m', classes: [{ className: 'SL', price: 780, availableSeats: 300 }, { className: '3A', price: 1980, availableSeats: 120 }, { className: '2A', price: 2850, availableSeats: 60 }], rating: 4.3, date: '2026-04-01', amenities: ['Pantry Car', 'Bedding'] },
  { trainName: 'Chennai Express', trainNumber: '12163', source: 'Mumbai', destination: 'Chennai', departureTime: '02:10 PM', arrivalTime: '05:25 AM', duration: '15h 15m', classes: [{ className: 'SL', price: 540, availableSeats: 250 }, { className: '3A', price: 1420, availableSeats: 100 }, { className: '2A', price: 2080, availableSeats: 60 }], rating: 4.4, date: '2026-04-01', amenities: ['Pantry Car', 'AC'] },
  { trainName: 'Garib Rath', trainNumber: '12909', source: 'Delhi', destination: 'Bangalore', departureTime: '09:30 PM', arrivalTime: '05:00 AM', duration: '31h 30m', classes: [{ className: '3A', price: 920, availableSeats: 180 }], rating: 4.0, date: '2026-04-01', amenities: ['AC', 'Bedding'] },
];

const flights = [
  { airline: 'IndiGo', flightNumber: '6E-201', source: 'Delhi', destination: 'Mumbai', departureTime: '06:00 AM', arrivalTime: '08:10 AM', duration: '2h 10m', price: 3499, cabinClass: 'Economy', availableSeats: 120, totalSeats: 180, baggage: '15 KG', amenities: ['Snacks Available'], rating: 4.2, date: '2026-04-01' },
  { airline: 'Air India', flightNumber: 'AI-101', source: 'Delhi', destination: 'Mumbai', departureTime: '09:30 AM', arrivalTime: '11:45 AM', duration: '2h 15m', price: 4899, cabinClass: 'Economy', availableSeats: 85, totalSeats: 180, baggage: '25 KG', amenities: ['Meals Included', 'Entertainment'], rating: 4.5, date: '2026-04-01' },
  { airline: 'SpiceJet', flightNumber: 'SG-101', source: 'Mumbai', destination: 'Bangalore', departureTime: '07:15 AM', arrivalTime: '09:00 AM', duration: '1h 45m', price: 2899, cabinClass: 'Economy', availableSeats: 140, totalSeats: 180, baggage: '15 KG', amenities: ['Snacks Available'], rating: 3.9, date: '2026-04-01' },
  { airline: 'Vistara', flightNumber: 'UK-801', source: 'Delhi', destination: 'Goa', departureTime: '11:00 AM', arrivalTime: '01:30 PM', duration: '2h 30m', price: 5499, cabinClass: 'Business', availableSeats: 30, totalSeats: 180, baggage: '30 KG', amenities: ['Meals Included', 'Extra Legroom', 'Priority Boarding'], rating: 4.8, date: '2026-04-01' },
  { airline: 'GoAir', flightNumber: 'G8-201', source: 'Bangalore', destination: 'Hyderabad', departureTime: '03:00 PM', arrivalTime: '04:15 PM', duration: '1h 15m', price: 2199, cabinClass: 'Economy', availableSeats: 160, totalSeats: 180, baggage: '15 KG', amenities: [], rating: 3.8, date: '2026-04-01' },
  { airline: 'IndiGo', flightNumber: '6E-503', source: 'Chennai', destination: 'Delhi', departureTime: '08:00 AM', arrivalTime: '11:00 AM', duration: '3h 00m', price: 4199, cabinClass: 'Economy', availableSeats: 100, totalSeats: 180, baggage: '15 KG', amenities: ['Snacks Available'], rating: 4.1, date: '2026-04-01' },
];

const hotels = [
  { name: 'The Taj Mahal Hotel', city: 'Mumbai', address: 'Apollo Bunder, Colaba, Mumbai', rating: 5, pricePerNight: 18000, roomType: 'Suite', amenities: ['Pool', 'Spa', 'WiFi', 'Gym', 'Restaurant', 'Bar', 'Concierge'], availableRooms: 20, totalRooms: 150, description: 'Iconic luxury hotel overlooking the Gateway of India', checkInTime: '2:00 PM', checkOutTime: '12:00 PM' },
  { name: 'ITC Maurya', city: 'Delhi', address: 'Sardar Patel Marg, Diplomatic Enclave, Delhi', rating: 5, pricePerNight: 15000, roomType: 'Presidential', amenities: ['Pool', 'Spa', 'WiFi', 'Gym', 'Restaurant', 'Business Center'], availableRooms: 15, totalRooms: 120, description: 'Award-winning luxury hotel in the heart of New Delhi' },
  { name: 'Lemon Tree Premier', city: 'Bangalore', address: 'Bellary Road, Hebbal, Bangalore', rating: 4, pricePerNight: 5500, roomType: 'Deluxe', amenities: ['Pool', 'WiFi', 'Gym', 'Restaurant'], availableRooms: 40, totalRooms: 100, description: 'Contemporary comfort in the Silicon Valley of India' },
  { name: 'Novotel Chennai', city: 'Chennai', address: 'GST Road, Guindy, Chennai', rating: 4, pricePerNight: 6800, roomType: 'Deluxe', amenities: ['Pool', 'WiFi', 'Restaurant', 'Bar', 'Gym'], availableRooms: 35, totalRooms: 80, description: 'Modern hotel near Chennai International Airport' },
  { name: 'Radisson Blu', city: 'Hyderabad', address: 'Banjara Hills, Road No. 1, Hyderabad', rating: 4, pricePerNight: 7200, roomType: 'Suite', amenities: ['Pool', 'Spa', 'WiFi', 'Gym', 'Restaurant'], availableRooms: 25, totalRooms: 90, description: 'Luxury stay in the City of Pearls' },
  { name: 'Goa Marriott Resort & Spa', city: 'Goa', address: 'Miramar Beach, Panaji, Goa', rating: 5, pricePerNight: 12000, roomType: 'Suite', amenities: ['Beachfront', 'Pool', 'Spa', 'WiFi', 'Restaurant', 'Bar', 'Water Sports'], availableRooms: 30, totalRooms: 200, description: 'Stunning beachfront resort in paradise' },
  { name: 'Hotel Clarks Amer', city: 'Jaipur', address: 'Jawaharlal Nehru Road, Jaipur', rating: 4, pricePerNight: 4500, roomType: 'Standard', amenities: ['Pool', 'WiFi', 'Restaurant', 'Bar'], availableRooms: 50, totalRooms: 110, description: 'Heritage hospitality in the Pink City' },
  { name: 'OYO Townhouse', city: 'Pune', address: 'Koregaon Park, Pune', rating: 3, pricePerNight: 1800, roomType: 'Standard', amenities: ['WiFi', 'AC', 'TV'], availableRooms: 60, totalRooms: 70, description: 'Smart budget stay in Pune' },
  { name: 'Vivanta Kolkata', city: 'Kolkata', address: 'EM Bypass, Kolkata', rating: 4, pricePerNight: 8500, roomType: 'Deluxe', amenities: ['Pool', 'Spa', 'WiFi', 'Gym', 'Restaurant', 'Bar'], availableRooms: 20, totalRooms: 95, description: 'Contemporary luxury in the City of Joy' },
  { name: 'Le Meridien Delhi', city: 'Delhi', address: 'Windsor Place, Connaught Place, Delhi', rating: 5, pricePerNight: 13500, roomType: 'Suite', amenities: ['Pool', 'Spa', 'WiFi', 'Gym', 'Restaurant', 'Business Center', 'Concierge'], availableRooms: 18, totalRooms: 130, description: 'Cosmopolitan luxury at the capital\'s heart' },
];

const seedDB = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Bus.deleteMany({});
    await Train.deleteMany({});
    await Flight.deleteMany({});
    await Hotel.deleteMany({});

    // Insert seed data
    await Bus.insertMany(buses);
    await Train.insertMany(trains);
    await Flight.insertMany(flights);
    await Hotel.insertMany(hotels);

    console.log('✅ Seed data inserted successfully!');
    console.log(`   🚌 ${buses.length} buses`);
    console.log(`   🚂 ${trains.length} trains`);
    console.log(`   ✈️  ${flights.length} flights`);
    console.log(`   🏨 ${hotels.length} hotels`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error.message);
    process.exit(1);
  }
};

seedDB();
