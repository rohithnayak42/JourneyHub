import React from 'react';
import { motion } from 'framer-motion';
import { 
  Bus, 
  Train, 
  Plane, 
  Hotel as HotelIcon, 
  Star, 
  Clock, 
  MapPin, 
  ArrowRight 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BookingCard = ({ item, type }) => {
  const navigate = useNavigate();

  const handleBook = () => {
    navigate(`/booking/${type}/${item._id}`);
  };

  const Icon = type === 'bus' ? Bus : type === 'train' ? Train : type === 'flight' ? Plane : HotelIcon;

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden mb-4 group"
    >
      <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        {/* Left: Info */}
        <div className="flex items-center gap-4 flex-1">
          <div className="bg-primary/10 p-4 rounded-2xl text-primary group-hover:scale-110 transition-transform">
            <Icon size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">{item.busName || item.trainName || item.airline || item.name}</h3>
            <p className="text-sm text-gray-500 font-medium">{item.busNumber || item.trainNumber || item.flightNumber || item.address}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="flex items-center gap-1 bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded">
                <Star size={12} fill="currentColor" /> {item.rating}
              </span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-500 uppercase font-bold">{item.busType || item.cabinClass || item.roomType || 'Standard'}</span>
            </div>
          </div>
        </div>

        {/* Middle: Timing */}
        <div className="flex-1 flex items-center justify-around border-x border-gray-50 px-4">
          <div className="text-center">
            <p className="text-lg font-black text-gray-800">{item.departureTime || 'N/A'}</p>
            <p className="text-xs text-gray-400 font-bold uppercase">{item.source || item.city}</p>
          </div>
          <div className="flex flex-col items-center gap-1 opacity-40">
            <span className="text-[10px] font-bold text-gray-500">{item.duration}</span>
            <div className="w-16 h-px bg-gray-300 relative">
               <div className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-gray-300"></div>
            </div>
          </div>
          <div className="text-center">
            <p className="text-lg font-black text-gray-800">{item.arrivalTime || 'N/A'}</p>
            <p className="text-xs text-gray-400 font-bold uppercase">{item.destination || item.city}</p>
          </div>
        </div>

        {/* Right: Price & CTA */}
        <div className="flex items-center md:flex-col justify-between md:justify-center md:items-end gap-2 md:w-40">
          <div className="text-right">
            <p className="text-xs text-gray-400 font-bold uppercase">Price starts at</p>
            <p className="text-2xl font-black text-secondary">₹{item.price || item.pricePerNight || (item.classes && item.classes[0].price)}</p>
          </div>
          <button 
            onClick={handleBook}
            className="bg-secondary hover:bg-primary text-white font-bold py-2.5 px-6 rounded-full flex items-center gap-2 transition-all shadow-lg shadow-secondary/20 group-hover:px-8"
          >
            <span>Book Now</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
      
      {/* Footer: Amenities */}
      {item.amenities && item.amenities.length > 0 && (
        <div className="px-6 py-3 bg-gray-50/50 border-t border-gray-50 flex gap-4 overflow-x-auto scrollbar-hide">
          {item.amenities.slice(0, 4).map((amenity, idx) => (
            <span key={idx} className="text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-white border border-gray-100 px-2 py-1 rounded">
              {amenity}
            </span>
          ))}
          {item.amenities.length > 4 && <span className="text-[10px] font-bold text-gray-400">+{item.amenities.length - 4} more</span>}
        </div>
      )}
    </motion.div>
  );
};

export default BookingCard;
