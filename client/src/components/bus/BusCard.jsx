import React from 'react';
import { motion } from 'framer-motion';
import { Star, BusFront, LocateFixed, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BusCard = ({ bus }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:border-red-200 transition-all overflow-hidden flex flex-col group mb-6 relative">
      <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 md:items-center relative z-10 bg-white">
         
         {/* Bus Info */}
         <div className="flex-[1.5] flex flex-col">
            <div className="flex items-start gap-4 mb-3">
               <div className="bg-red-50 p-3 rounded-2xl text-red-500 shadow-inner group-hover:bg-red-500 group-hover:text-white transition-colors duration-500 hidden md:block">
                  <BusFront size={24} />
               </div>
               <div>
                 <h3 className="font-black text-2xl text-gray-800 tracking-tight">{bus.name}</h3>
                 <p className="text-[11px] font-black uppercase tracking-widest text-gray-400 mt-1">{bus.type}</p>
               </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 mt-4">
               <div className="flex items-center gap-1.5 bg-green-500 text-white text-[10px] font-black px-2.5 py-1 rounded-lg shadow-sm">
                  <Star size={12} fill="currentColor" /> {bus.rating}
               </div>
               <span className="bg-blue-50 text-blue-600 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg flex items-center gap-1 border border-blue-100"><LocateFixed size={12} /> Live Tracking</span>
            </div>
         </div>

         {/* Timing */}
         <div className="flex-1 flex items-center justify-between md:justify-center gap-4 border-y border-dashed md:border-y-0 md:border-x border-gray-200 py-6 md:py-0 md:px-8">
            <div className="text-center">
               <span className="text-3xl font-black text-gray-800 tracking-tight">{bus.departure}</span>
               <p className="text-[11px] font-bold text-gray-400 mt-1 uppercase tracking-widest truncate max-w-[80px]">{bus.from}</p>
            </div>
            
            <div className="flex flex-col items-center">
               <span className="text-[10px] font-black text-gray-400 mb-2 uppercase tracking-widest">{bus.duration}</span>
               <div className="w-16 md:w-24 h-[2px] bg-gray-200 relative rounded-full">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400 bg-white px-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping"></div>
                  </div>
               </div>
            </div>

            <div className="text-center">
               <span className="text-3xl font-black text-gray-800 tracking-tight">{bus.arrival}</span>
               <p className="text-[11px] font-bold text-gray-400 mt-1 uppercase tracking-widest truncate max-w-[80px]">{bus.to}</p>
            </div>
         </div>

         {/* Pricing & Action */}
         <div className="flex-[0.8] flex flex-col md:items-end justify-center pt-2 md:pt-0 pl-0 md:pl-6">
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Starting from</span>
            <span className="text-3xl md:text-4xl font-black text-red-600 tracking-tight mb-4">₹{bus.price}</span>
            <button 
               onClick={() => navigate(`/bus/seat-page?bus=${encodeURIComponent(bus.name)}&time=${encodeURIComponent(bus.departure)}&price=${bus.price}&from=${encodeURIComponent(bus.from)}&to=${encodeURIComponent(bus.to)}&type=${encodeURIComponent(bus.type)}`)}
               className={`shadow-[0_5px_15px_rgba(239,68,68,0.2)] hover:shadow-[0_10px_25px_rgba(239,68,68,0.4)] font-black py-3.5 px-6 rounded-xl transition-all w-full flex items-center justify-center gap-2 group/btn uppercase tracking-widest text-xs border bg-red-500 hover:bg-red-600 text-white border-red-500`}
            >
               View Seats <Eye size={16} className="transition-transform duration-500" />
            </button>
            <span className="text-[10px] font-black text-emerald-500 mt-3 text-center md:text-right w-full bg-emerald-50 py-1 rounded-md">{bus.seatsLeft} Seats Left</span>
         </div>
      </div>

    </div>
  );
};
export default BusCard;
