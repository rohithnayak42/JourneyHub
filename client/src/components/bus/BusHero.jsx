import React from 'react';
import { motion } from 'framer-motion';
import SearchBar from '../search/SearchBar';

const BusHero = () => {
  const busBg = "/src/assets/bus-hero-final.png";

  return (
    <div className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden bg-slate-900">
      
      {/* 🏙️ Real HD Background Layer */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 1 
        }}
        transition={{
          opacity: { duration: 1.5 },
          scale: { duration: 10, repeat: Infinity, repeatType: "reverse", ease: "linear" }
        }}
        style={{
          backgroundImage: `url(${busBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      />

      {/* 🌙 Strong Gradient Overlay for readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/50 to-black/70 pointer-events-none" />

      {/* 🎨 Centered Content Layout (z-20) */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
        
        {/* Typography Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-10"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight">
            India’s No.1 online <br />
            bus ticket booking site
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-300 font-medium max-w-2xl mx-auto opacity-90">
            Find the best deals on luxury buses and comfortable journeys across the country.
          </p>
        </motion.div>

        {/* 🚀 Premium Floating Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="w-full"
        >
          <div className="bg-white rounded-full shadow-[0_20px_60px_rgba(0,0,0,0.3)] p-2 md:p-3 transition-transform hover:scale-[1.01]">
            <SearchBar type="bus" />
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default BusHero;
