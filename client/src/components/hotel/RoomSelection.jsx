import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Users } from 'lucide-react';

const RoomSelection = ({ hotel, onClose }) => {
  const navigate = useNavigate();

  const handleBookRoom = (room) => {
    const bookingData = {
      hotelName: hotel.name,
      hotelLocation: hotel.location,
      hotelImage: hotel.image,
      hotelRating: hotel.rating,
      hotelReviews: hotel.reviews,
      hotelStars: hotel.stars,
      roomName: room.name,
      roomPrice: room.price,
      roomOriginalPrice: room.originalPrice,
      roomAmenities: room.amenities,
      roomInclusions: room.inclusions,
      checkIn: "01 Apr 2026",
      checkOut: "03 Apr 2026",
      guests: room.guests,
      rooms: 1
    };
    
    localStorage.setItem('selectedHotelBooking', JSON.stringify(bookingData));
    navigate('/hotel/booking');
  };
  const rooms = [
    { name: "Deluxe King Room", guests: 2, space: "320 sq.ft", bed: "1 King Bed", price: hotel.basePrice || hotel.price, originalPrice: (hotel.basePrice || hotel.price) + 1200, left: 3,
      amenities: ["Free WiFi", "City View", "Air Conditioning"],
      inclusions: ["Room Only", "Non-Refundable"]
    },
    { name: "Premium Suite with Breakfast", guests: 3, space: "450 sq.ft", bed: "1 Extra-Large Double Bed", price: (hotel.basePrice || hotel.price) + 2500, originalPrice: (hotel.basePrice || hotel.price) + 4500, left: 1,
      amenities: ["Free WiFi", "Ocean View", "Mini Bar", "Bathtub"],
      inclusions: ["Free Breakfast", "Free Cancellation till 24hrs"]
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gray-50 border-t border-gray-200 p-6 md:p-8 flex flex-col gap-6 shadow-inner relative"
    >
       <div className="flex justify-between items-center mb-2">
          <h4 className="font-black text-xl text-gray-800 tracking-tight">Select a Room</h4>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {rooms.map((room, idx) => (
             <div key={idx} className="bg-white rounded-[2rem] border border-gray-200 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(79,70,229,0.1)] hover:border-indigo-200 transition-all flex flex-col overflow-hidden">
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-5 text-white">
                   <h5 className="font-black text-lg">{room.name}</h5>
                   <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mt-1.5 flex items-center gap-2">
                      <span className="flex items-center gap-1"><Users size={12}/> Max {room.guests} Guests</span> • <span>{room.space}</span> • <span>{room.bed}</span>
                   </p>
                </div>
                
                <div className="flex flex-col md:flex-row flex-1 p-6 gap-6">
                   <div className="flex-1 flex flex-col">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 border-b border-gray-100 pb-2">Amenities</p>
                      <div className="flex flex-wrap gap-2 mb-6">
                         {room.amenities.map((a, i) => (
                            <span key={i} className="text-[10px] font-bold text-gray-600 bg-gray-100 border border-gray-200 px-2 py-1 rounded-md">{a}</span>
                         ))}
                      </div>
                      
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 border-b border-gray-100 pb-2">Inclusions</p>
                      <ul className="flex flex-col gap-2">
                         {room.inclusions.map((inc, i) => (
                            <li key={i} className="text-[11px] font-bold text-emerald-600 flex items-center gap-2">
                               <Check size={14} className="text-emerald-500" /> {inc}
                            </li>
                         ))}
                      </ul>
                   </div>
                   
                   <div className="md:w-48 flex flex-col justify-end border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 text-right">
                      {room.left <= 3 && <span className="text-[9px] font-black text-red-500 mb-3 uppercase tracking-widest bg-red-50 py-1.5 px-2 rounded-md w-fit self-end shadow-sm">Only {room.left} left!</span>}
                      <span className="text-[10px] font-bold text-gray-400 line-through">₹{room.originalPrice}</span>
                      <span className="text-3xl font-black text-gray-800 tracking-tight">₹{room.price}</span>
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-4 mt-1">+ ₹{Math.round(room.price * 0.18)} Taxes & Fees</span>
                      <button 
                          onClick={() => handleBookRoom(room)}
                          className="bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-indigo-500/30 text-white font-black py-3.5 px-4 rounded-xl transition-all w-full uppercase tracking-widest text-[10px]"
                       >
                          Select Room
                       </button>
                   </div>
                </div>
             </div>
          ))}
       </div>
    </motion.div>
  );
};
export default RoomSelection;
