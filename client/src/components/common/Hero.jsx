import React from 'react';
import { motion } from 'framer-motion';
import SearchBar from '../search/SearchBar';

const heros = {
  bus: {
    bg: "/src/assets/bus-hero-hd.jpg",
    heading: "India's No.1 Online Bus Ticket Booking",
    subtext: "Safe, reliable, and comfortable journeys across 10,000+ routes."
  },
  train: {
    bg: "/src/assets/train-hero-hd.png",
    heading: "Seamless Train Ticket Reservations",
    subtext: "Experience the magic of rail travel with hassle-free booking."
  },
  flight: {
    bg: "/src/assets/flight-hero-hd.png",
    heading: "Fly Higher with Exclusive Flight Deals",
    subtext: "Explore the world with unbeatable prices and premium comfort."
  },
  hotel: {
    bg: "/src/assets/hotel-hero-hd.png",
    heading: "Find Your Perfect Stay Anywhere",
    subtext: "Luxury hotels, cozy homestays, and affordable rooms worldwide."
  }
};

const Hero = ({ type }) => {
  const config = heros[type] || heros.bus;

  return (
    <div className="relative h-[95vh] w-full flex items-center justify-center overflow-hidden bg-slate-900">
      
      {/* 🏙️ Ken Burns HD Background Layer */}
      <motion.div
        key={type}
        className="absolute inset-0 z-0"
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 1 
        }}
        transition={{
          opacity: { duration: 1.5 },
          scale: { duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }
        }}
        style={{
          backgroundImage: `url(${config.bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      />

      {/* 🌙 Production-Grade Triple Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/80 via-black/40 to-black/80 pointer-events-none" />

      {/* 🎨 Centered Premium Content (z-20) */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-6 flex flex-col items-center justify-center text-center">
        
        {/* Typography */}
        <motion.div
          key={`text-${type}`}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-[1.1]">
            {config.heading.split(' ').slice(0, -2).join(' ')} <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text">
              {config.heading.split(' ').slice(-2).join(' ')}
            </span>
          </h1>
          <p className="mt-8 text-lg md:text-2xl text-slate-200 font-medium max-w-3xl mx-auto leading-relaxed opacity-90">
            {config.subtext}
          </p>
        </motion.div>

        {/* 🚀 Glassmorphism Smart Search Bar Container */}
        <motion.div
          key={`search-${type}`}
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="w-full relative z-30"
        >
          <div className="w-full bg-white/5 backdrop-blur-3xl rounded-[3.5rem] p-2 border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.6)] group hover:border-white/20 transition-all duration-500">
            <SearchBar type={type} />
          </div>
        </motion.div>

      </div>

      {/* Modern Wave-Fade Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-slate-900 to-transparent z-10" />
    </div>
  );
};

export default Hero;
