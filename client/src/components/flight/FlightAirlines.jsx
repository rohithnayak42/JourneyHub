import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const airlines = [
  { name: "IndiGo", code: "6E", rating: 4.3, color: "bg-indigo-600", text: "text-white" },
  { name: "Air India", code: "AI", rating: 4.1, color: "bg-red-600", text: "text-white" },
  { name: "Vistara", code: "UK", rating: 4.6, color: "bg-violet-600", text: "text-white" },
  { name: "SpiceJet", code: "SG", rating: 3.9, color: "bg-orange-500", text: "text-white" },
  { name: "Akasa Air", code: "QP", rating: 4.4, color: "bg-amber-400", text: "text-slate-900" },
  { name: "AirAsia", code: "I5", rating: 4.0, color: "bg-rose-500", text: "text-white" },
  { name: "Go First", code: "G8", rating: 3.8, color: "bg-teal-500", text: "text-white" },
  { name: "StarAir", code: "S5", rating: 4.2, color: "bg-sky-600", text: "text-white" },
];

const FlightAirlines = () => {
  return (
    <div className="w-full py-20">
      <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
        <div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter"
          >
            Elite Airline <br />
            <span className="text-blue-600">Partners</span>
          </motion.h2>
          <p className="text-slate-500 mt-6 text-xl font-medium max-w-2xl leading-relaxed">
            We've partnered with the world's leading carriers to bring you a seamless and premium sky-high experience.
          </p>
        </div>
      </div>

      <div className="flex gap-8 overflow-x-auto pb-12 scrollbar-hide px-4 -mx-4">
        {airlines.map((airline, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            viewport={{ once: true }}
            whileHover={{ y: -12, scale: 1.05 }}
            className="flex-shrink-0 bg-white border border-slate-100 rounded-[2.5rem] p-8 flex flex-col items-center gap-6 w-48 cursor-pointer shadow-premium hover:shadow-[0_30px_60px_rgba(0,0,0,0.1)] transition-all duration-500 group relative overflow-hidden"
          >
            {/* Subtle glow on hover */}
            <div className={`absolute top-0 right-0 w-24 h-24 ${airline.color} blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-1000`} />
            
            {/* Airline logo circle */}
            <div className={`${airline.color} ${airline.text} w-20 h-20 rounded-[1.5rem] flex items-center justify-center text-3xl font-black shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 relative overflow-hidden ring-4 ring-slate-50`}>
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-white/20 blur-md translate-y-6" />
              <span className="relative z-10">{airline.code}</span>
            </div>

            <div className="text-center">
              <p className="text-sm font-black text-slate-900 mb-2 uppercase tracking-widest">{airline.name}</p>
              <div className="inline-flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-xl">
                <Star size={14} fill="#f59e0b" color="#f59e0b" />
                <span className="text-xs font-black text-amber-600">{airline.rating}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default FlightAirlines;
