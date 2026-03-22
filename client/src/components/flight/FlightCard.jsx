import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, ChevronDown, CheckCircle2, BaggageClaim, Utensils } from 'lucide-react';
import FlightDetails from './FlightDetails';

const FlightCard = ({ flight }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:border-blue-200 transition-all overflow-hidden flex flex-col group mb-6 relative">
      <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 md:items-center relative z-10 bg-white">
         
         {/* Airline Info */}
         <div className="flex-[1.2] flex flex-col">
            <div className="flex items-center gap-4 mb-3">
               <img src={`https://ui-avatars.com/api/?name=${flight.airline}&background=random&color=fff&rounded=true&bold=true&size=40`} alt={flight.airline} className="w-10 h-10 shadow-sm" />
               <div>
                 <h3 className="font-black text-xl text-gray-800 tracking-tight">{flight.airline}</h3>
                 <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1">{flight.flightNo}</p>
               </div>
            </div>
            
            <div className="flex items-center gap-2 mt-4">
               <span className="bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded-md border border-emerald-100 shadow-sm">Free Cancellation</span>
            </div>
         </div>

         {/* Timing & Timeline */}
         <div className="flex-[2] flex items-center justify-between md:justify-center gap-2 md:gap-6 border-y border-dashed md:border-y-0 md:border-x border-gray-200 py-6 md:py-0 md:px-6">
            <div className="text-center">
               <span className="text-3xl font-black text-gray-800 tracking-tight">{flight.departure}</span>
               <p className="text-[11px] font-bold text-gray-400 mt-1 uppercase tracking-widest">{flight.origin}</p>
            </div>
            
            <div className="flex flex-col items-center flex-1 px-4 md:px-0">
               <span className="text-[10px] font-black text-gray-400 mb-2 uppercase tracking-widest">{flight.duration}</span>
               <div className="w-full h-[2px] bg-gray-200 relative rounded-full flex items-center justify-between px-1">
                  <div className="w-2 h-2 rounded-full border-2 border-gray-300 bg-white"></div>
                  
                  {/* Plane Icon Animation */}
                  <motion.div 
                     className="absolute top-1/2 -translate-y-1/2 text-blue-500 drop-shadow-sm z-10"
                     initial={{ left: "10%" }}
                     whileInView={{ left: "85%" }}
                     transition={{ duration: 2, ease: "easeInOut", delay: 0.2 }}
                     viewport={{ once: true }}
                     style={{ x: "-50%" }}
                  >
                     <Plane size={18} fill="currentColor" />
                  </motion.div>
                  
                  <div className="w-2 h-2 rounded-full border-2 border-gray-300 bg-white"></div>
               </div>
               <span className="text-[9px] font-bold text-gray-400 mt-2 uppercase tracking-widest">{flight.stops}</span>
            </div>

            <div className="text-center">
               <span className="text-3xl font-black text-gray-800 tracking-tight">{flight.arrival}</span>
               <p className="text-[11px] font-bold text-gray-400 mt-1 uppercase tracking-widest">{flight.dest}</p>
            </div>
         </div>

         {/* Pricing & Action */}
         <div className="flex-[1] flex flex-col md:items-end justify-center pt-2 md:pt-0 pl-0 md:pl-6 text-center md:text-right">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 flex items-center justify-center md:justify-end gap-1 w-full"><Utensils size={10}/> Meal Included</span>
            <span className="text-3xl md:text-4xl font-black text-gray-800 tracking-tight mb-4 flex w-full justify-center md:justify-end">₹{flight.price}</span>
            <button className="bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-xl hover:shadow-blue-500/30 text-white font-black py-3.5 px-8 rounded-xl transition-all w-full uppercase tracking-widest text-xs overflow-hidden relative group btn-shine">
               Book Now <span className="absolute inset-0 w-full h-full -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-[shine_1.5s_ease-in-out_infinite]"></span>
            </button>
         </div>
      </div>
      
      {/* Expand Details Trigger */}
      <div 
         className="bg-gray-50 py-4 px-6 md:px-8 border-t border-gray-100 flex justify-between items-center cursor-pointer hover:bg-blue-50/50 transition-colors"
         onClick={() => setShowDetails(!showDetails)}
      >
         <div className="flex items-center gap-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest flex-wrap">
            <span className="flex items-center gap-1.5"><BaggageClaim size={14} /> {flight.baggage}</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full hidden md:block"></span>
            <span className="flex items-center gap-1.5 text-emerald-500"><CheckCircle2 size={14} /> Partially Refundable</span>
         </div>
         <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-blue-600 shrink-0">
            {showDetails ? 'Hide Details' : 'Flight Details'} <ChevronDown size={14} className={`transition-transform ${showDetails ? 'rotate-180' : ''}`} />
         </div>
      </div>

      <AnimatePresence>
         {showDetails && (
            <FlightDetails flight={flight} onClose={() => setShowDetails(false)} />
         )}
      </AnimatePresence>
    </div>
  );
};
export default FlightCard;
