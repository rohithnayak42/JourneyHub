import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MapPin, Coffee, Wifi, ChevronDown, CheckCircle2 } from 'lucide-react';
import RoomSelection from './RoomSelection';

const HotelCard = ({ hotel }) => {
  const [showRooms, setShowRooms] = useState(false);

  return (
    <div 
      className="bg-white rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] hover:border-indigo-200 transition-all overflow-hidden flex flex-col group mb-8 relative"
      data-price={hotel.price}
      data-rating={hotel.rating}
      data-stars={hotel.stars}
      data-amenities={hotel.amenities?.join(',')}
      data-location={hotel.location}
    >
      <div className="flex flex-col xl:flex-row relative z-10 bg-white p-2">
         
         {/* Hotel Image Gallery */}
         <div className="w-full xl:w-[380px] h-64 xl:h-auto relative overflow-hidden rounded-[1.5rem]">
            <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow-lg flex flex-col items-center">
               <span className="text-lg font-black text-indigo-600 leading-none">{hotel.rating}</span>
               <span className="text-[9px] font-black uppercase tracking-widest text-gray-500 mt-0.5">{hotel.reviews} Revs</span>
            </div>
            <div className="absolute bottom-4 left-4 flex gap-1">
               {Array.from({ length: hotel.stars }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" className="text-amber-400 drop-shadow-md" />
               ))}
            </div>
         </div>

         {/* Hotel Info */}
         <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
            <div>
               <div className="flex justify-between items-start mb-2">
                  <h3 className="font-black text-2xl md:text-3xl text-gray-800 tracking-tight">{hotel.name}</h3>
                  <div className="bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-indigo-100 shadow-sm hidden md:block">
                     Premium Selection
                  </div>
               </div>
               
               <p className="text-xs font-bold text-gray-500 flex items-center gap-1.5 mb-6 hover:text-indigo-600 transition-colors w-fit cursor-pointer">
                  <MapPin size={14} className="text-gray-400" /> {hotel.location} <span className="text-[10px] text-indigo-500 uppercase tracking-widest ml-1 bg-indigo-50 px-2 py-1 rounded-md">Show on Map</span>
               </p>

               <div className="flex flex-wrap gap-2 mb-4">
                  {hotel.amenities?.map((amenity, idx) => (
                     <span key={idx} className="text-[10px] font-black uppercase tracking-widest text-gray-500 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                        {amenity === 'Free WiFi' && <Wifi size={12} className="text-indigo-500"/>}
                        {amenity === 'Free Breakfast' && <Coffee size={12} className="text-indigo-500"/>}
                        {amenity === 'Swimming Pool' && <span className="text-indigo-500 text-xs">🏊‍♂️</span>}
                        {amenity === 'Gym' && <span className="text-indigo-500 text-xs">🏋️‍♂️</span>}
                        {amenity === 'Spa & Wellness' && <span className="text-indigo-500 text-xs">💆‍♀️</span>}
                        {amenity === 'Pet Friendly' && <span className="text-indigo-500 text-xs">🐾</span>}
                        {amenity}
                     </span>
                  ))}
               </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between border-t border-gray-100 pt-8 mt-5 gap-6 md:gap-0">
               <div className="flex flex-col gap-2">
                  <span className="flex items-center gap-1.5 text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 border border-emerald-100 w-fit px-2.5 py-1.5 rounded-md shadow-sm"><CheckCircle2 size={12}/> Free Cancellation</span>
                  <span className="flex items-center gap-1.5 text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 border border-blue-100 w-fit px-2.5 py-1.5 rounded-md shadow-sm"><CheckCircle2 size={12}/> Pay at Hotel</span>
               </div>
               
               <div className="flex flex-col md:items-end text-left md:text-right">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 pl-1 md:pl-0">Per Night / 2 Adults</span>
                  <div className="flex items-end gap-2 mb-2">
                     <span className="text-sm font-bold text-gray-400 line-through mb-1.5">₹{Math.round(hotel.price * 1.4)}</span>
                     <span className="text-4xl md:text-5xl font-black text-gray-800 tracking-tight leading-none text-red-600">₹{hotel.price}</span>
                  </div>
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-5 ml-1 md:ml-0">+ ₹{Math.round(hotel.price * 0.18)} Taxes & Fees</span>
                  <button 
                     onClick={() => setShowRooms(!showRooms)}
                     className={`shadow-md font-black py-4 px-8 rounded-xl transition-all w-full md:w-auto uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 relative overflow-hidden group ${showRooms ? 'bg-white text-indigo-600 border border-indigo-200 hover:bg-gray-50' : 'bg-indigo-600 hover:bg-indigo-700 text-white border border-indigo-600 hover:shadow-indigo-500/30 btn-shine'}`}
                  >
                     {showRooms ? 'Hide Rooms' : 'Choose Room'} <ChevronDown size={16} className={`transition-transform duration-500 ${showRooms && 'rotate-180 opacity-50'}`} />
                     {!showRooms && <span className="absolute inset-0 w-full h-full -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-[shine_1.5s_ease-in-out_infinite]"></span>}
                  </button>
               </div>
            </div>
         </div>
      </div>
      
      <AnimatePresence>
         {showRooms && (
            <RoomSelection hotel={hotel} onClose={() => setShowRooms(false)} />
         )}
      </AnimatePresence>
    </div>
  );
};
export default HotelCard;
