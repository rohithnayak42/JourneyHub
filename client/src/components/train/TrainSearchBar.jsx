import React, { useState, useRef, useEffect } from 'react';
import { MapPin, ArrowRightLeft, Search, Calendar } from 'lucide-react';
import LocationDropdown from '../search/LocationDropdown';
import { motion } from 'framer-motion';

const TrainSearchBar = () => {
  const [from, setFrom] = useState('New Delhi');
  const [to, setTo] = useState('Mumbai Central');
  const [date, setDate] = useState('2026-04-01');
  const [freeCancellation, setFreeCancellation] = useState(false);

  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const fromRef = useRef(null);
  const toRef = useRef(null);

  const locations = ["New Delhi", "Mumbai Central", "Howrah", "Chennai Central", "Bangalore City", "Pune Jn", "Ahmedabad", "Lucknow"];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (fromRef.current && !fromRef.current.contains(event.target)) setShowFromDropdown(false);
      if (toRef.current && !toRef.current.contains(event.target)) setShowToDropdown(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const swapLocations = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-full max-w-6xl mx-auto px-4 relative z-40"
    >
      <div className="backdrop-blur-xl bg-white/20 rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.3)] border border-white/40 flex flex-col md:flex-row items-stretch group overflow-visible">
        
        {/* Location Group */}
        <div className="flex flex-col md:flex-row items-center gap-4 flex-[2] border-b md:border-b-0 md:border-r border-white/20 p-2 md:p-0">
          
          {/* From Section */}
          <div ref={fromRef} className="flex-1 w-full relative p-4 md:p-5 group cursor-pointer hover:bg-white/10 transition-colors rounded-[1rem] md:rounded-none md:rounded-l-[2rem]">
            <p className="text-[10px] font-black text-white/80 uppercase tracking-[0.2em] mb-1 px-3">From Station</p>
            <div className="flex items-center gap-3 px-3" onClick={() => setShowFromDropdown(true)}>
               <MapPin size={22} className="text-white group-hover:scale-110 transition-transform" />
               <input type="text" value={from} readOnly className="bg-transparent border-none outline-none text-xl md:text-2xl font-black text-white w-full placeholder:text-white/50 cursor-pointer drop-shadow-md" />
            </div>
            <LocationDropdown isOpen={showFromDropdown} locations={locations} onSelect={(loc) => { setFrom(loc); setShowFromDropdown(false); }} anchorRef={fromRef} title="Popular Stations" />
          </div>

          {/* Swap Button */}
          <div className="flex items-center justify-center z-50">
             <button onClick={swapLocations} className="bg-white/30 backdrop-blur-md border border-white/40 p-3 rounded-full shadow-xl hover:bg-white/50 hover:rotate-180 transition-all duration-300 text-white">
                <ArrowRightLeft size={16} className="rotate-90 md:rotate-0" />
             </button>
          </div>

          {/* To Section */}
          <div ref={toRef} className="flex-1 w-full relative p-4 md:p-5 group cursor-pointer hover:bg-white/10 transition-colors rounded-[1rem] md:rounded-none">
            <p className="text-[10px] font-black text-white/80 uppercase tracking-[0.2em] mb-1 px-3">To Station</p>
            <div className="flex items-center gap-3 px-3" onClick={() => setShowToDropdown(true)}>
               <MapPin size={22} className="text-red-400 group-hover:scale-110 transition-transform" />
               <input type="text" value={to} readOnly className="bg-transparent border-none outline-none text-xl md:text-2xl font-black text-white w-full placeholder:text-white/50 cursor-pointer drop-shadow-md" />
            </div>
            <LocationDropdown isOpen={showToDropdown} locations={locations} onSelect={(loc) => { setTo(loc); setShowToDropdown(false); }} anchorRef={toRef} title="Popular Stations" />
          </div>

        </div>

        {/* Date Section */}
        <div className="flex-[0.8] relative p-4 md:p-5 group cursor-pointer border-b md:border-b-0 md:border-r border-white/20 hover:bg-white/10 transition-colors">
          <p className="text-[10px] font-black text-white/80 uppercase tracking-[0.2em] mb-1 px-3">Travel Date</p>
          <div className="flex items-center gap-3 px-3">
             <Calendar size={22} className="text-white group-hover:scale-110 transition-transform" />
             <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="bg-transparent border-none outline-none text-lg md:text-xl font-bold text-white w-full cursor-pointer drop-shadow-md focus:ring-0 dark-calendar" />
          </div>
        </div>

        {/* Options Section */}
        <div className="hidden lg:flex flex-[0.8] items-center gap-4 px-6 border-white/20 hover:bg-white/5 transition-colors">
           <div className="flex flex-col mr-2">
              <span className="text-xs font-black text-white drop-shadow-md">Free Cancellation</span>
              <span className="text-[10px] font-bold text-white/80 drop-shadow-sm">Zero charges</span>
           </div>
           <button onClick={() => setFreeCancellation(!freeCancellation)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none shadow-inner border border-white/30 ${freeCancellation ? 'bg-green-500' : 'bg-white/20'}`}>
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${freeCancellation ? 'translate-x-6' : 'translate-x-1'}`} />
           </button>
        </div>

        {/* Search Button */}
        <div className="p-4 flex items-center justify-center">
           <button className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-black h-full px-8 py-5 md:py-0 rounded-xl md:rounded-[1.5rem] shadow-[0_10px_30px_rgba(220,38,38,0.4)] hover:shadow-[0_10px_40px_rgba(220,38,38,0.6)] hover:-translate-y-1 transition-all flex items-center gap-2 group/btn border border-red-400/50">
              <span className="uppercase tracking-widest text-sm drop-shadow-md">Search Trains</span>
              <Search size={20} className="group-hover/btn:translate-x-1 transition-transform drop-shadow-md" />
           </button>
        </div>
      </div>
    </motion.div>
  );
};
export default TrainSearchBar;
