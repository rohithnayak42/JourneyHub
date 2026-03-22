import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

const TrainHero = () => {
  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 text-center mt-6 mb-12 z-10 flex flex-col items-center justify-center min-h-[220px]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center justify-center gap-4"
      >
        <h1 className="text-4xl md:text-6xl font-black text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)] tracking-tight">
          Train Ticket Booking
        </h1>
        <p className="text-lg md:text-xl text-gray-100 font-medium max-w-2xl drop-shadow-md">
          Seamless booking experience with real-time updates
        </p>
        <div className="mt-4 flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 shadow-xl">
          <ShieldCheck size={18} className="text-emerald-400 drop-shadow-md" />
          <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white">IRCTC Authorised Partner</span>
        </div>
      </motion.div>
    </div>
  );
};
export default TrainHero;
