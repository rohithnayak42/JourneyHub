import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ArrowRightLeft, Search } from 'lucide-react';
import LocationDropdown from './LocationDropdown';
import DatePicker from './DatePicker';

const SearchBar = ({ type = 'bus' }) => {
  const navigate = useNavigate();
  const [from, setFrom] = useState('Delhi');
  const [to, setTo] = useState('Mumbai');
  const [date, setDate] = useState('2026-04-01');
  const [isWomenOnly, setIsWomenOnly] = useState(false);
  
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  
  const fromRef = useRef(null);
  const toRef = useRef(null);
  
  const locations = ["Hyderabad", "Bangalore", "Chennai", "Mumbai", "Delhi", "Kolkata", "Pune", "Ahmedabad"];

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (fromRef.current && !fromRef.current.contains(event.target)) setShowFromDropdown(false);
      if (toRef.current && !toRef.current.contains(event.target)) setShowToDropdown(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    console.log("Search Initialized:", { from, to, date, isWomenOnly });
    const query = `?source=${from}&destination=${to}&date=${date}&ladies=${isWomenOnly}`;
    
    if (type === 'bus') navigate(`/buses${query}`);
    else if (type === 'train') navigate(`/trains${query}`);
    else if (type === 'flight') navigate(`/flights${query}`);
    else if (type === 'hotel') navigate(`/hotels?city=${to}`);
  };

  const swapLocations = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-50 flex flex-col md:flex-row items-stretch overflow-visible group">
        
        {/* From Section */}
        <div ref={fromRef} className="flex-1 relative p-4 group cursor-pointer border-r border-gray-100 hover:bg-gray-50 transition-colors rounded-l-[2rem]">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1 px-3">
            {type === 'hotel' ? 'Location' : 'From'}
          </p>
          <div className="flex items-center gap-3 px-3" onClick={() => setShowFromDropdown(true)}>
             <MapPin size={22} className="text-primary group-hover:scale-110 transition-transform" />
             <input 
              type="text" 
              placeholder={type === 'hotel' ? "City or Hotel Name" : "Source City"}
              value={from}
              readOnly
              className="bg-transparent border-none outline-none text-xl font-black text-gray-800 w-full placeholder:text-gray-300 cursor-pointer"
             />
          </div>
          <LocationDropdown 
            isOpen={showFromDropdown} 
            locations={locations} 
            onSelect={(loc) => { setFrom(loc); setShowFromDropdown(false); }} 
            anchorRef={fromRef}
          />
        </div>

        {/* Swap Button */}
        {type !== 'hotel' && (
          <div className="absolute left-[calc(50%-180px)] top-1/2 -translate-y-1/2 z-30 hidden lg:block">
             <button 
              onClick={swapLocations}
              className="bg-white border border-gray-100 p-2.5 rounded-full shadow-lg hover:shadow-primary/20 hover:border-primary transition-all text-primary"
             >
                <ArrowRightLeft size={16} />
             </button>
          </div>
        )}

        {/* To Section */}
        {type !== 'hotel' && (
          <div ref={toRef} className="flex-1 relative p-4 group cursor-pointer border-r border-gray-100 hover:bg-gray-50 transition-colors">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1 px-3">To</p>
            <div className="flex items-center gap-3 px-3" onClick={() => setShowToDropdown(true)}>
               <MapPin size={22} className="text-secondary group-hover:scale-110 transition-transform" />
               <input 
                type="text" 
                placeholder="Destination City" 
                value={to}
                readOnly
                className="bg-transparent border-none outline-none text-xl font-black text-gray-800 w-full placeholder:text-gray-300 cursor-pointer"
               />
            </div>
            <LocationDropdown 
              isOpen={showToDropdown} 
              locations={locations} 
              onSelect={(loc) => { setTo(loc); setShowToDropdown(false); }} 
              anchorRef={toRef}
            />
          </div>
        )}

        {/* Date Section */}
        <DatePicker value={date} onChange={setDate} />

        {/* Options Section */}
        {type === 'bus' && (
          <div className="hidden lg:flex items-center gap-3 pl-6 pr-4 border-l border-gray-50">
            <img src="https://cdn-icons-png.flaticon.com/512/2922/2922561.png" className="w-8 h-8 rounded-full shadow-sm" alt="Women avatar"/>
            <div className="flex flex-col mr-2">
              <span className="text-xs font-black text-gray-800">Booking for women</span>
              <span className="text-[10px] font-bold text-gray-400">Exclusive features</span>
            </div>
            <button
              onClick={() => setIsWomenOnly(!isWomenOnly)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${isWomenOnly ? 'bg-pink-500' : 'bg-gray-200'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isWomenOnly ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
        )}
        
        {type === 'train' && (
          <div className="hidden lg:flex items-center gap-3 pl-6 pr-4 border-l border-gray-50">
             <div className="flex flex-col mr-2">
                <span className="text-xs font-black text-gray-800">Free Cancellation</span>
                <span className="text-[10px] font-bold text-gray-400">Zero charges</span>
             </div>
             <button
              onClick={() => setIsWomenOnly(!isWomenOnly)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${isWomenOnly ? 'bg-green-500' : 'bg-gray-200'}`}
             >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isWomenOnly ? 'translate-x-6' : 'translate-x-1'}`} />
             </button>
          </div>
        )}

        {type === 'flight' && (
          <div className="hidden lg:flex items-center gap-3 pl-6 pr-4 border-l border-gray-50 cursor-pointer hover:bg-gray-50 px-4 transition-colors">
             <div className="flex flex-col">
                <span className="text-xs font-black text-gray-800">Travellers & Class</span>
                <span className="text-[10px] font-bold text-gray-400">1 Adult, Economy</span>
             </div>
          </div>
        )}

        {type === 'hotel' && (
          <div className="hidden lg:flex items-center gap-3 pl-6 pr-4 border-l border-gray-50 cursor-pointer hover:bg-gray-50 px-4 transition-colors">
             <div className="flex flex-col">
                <span className="text-xs font-black text-gray-800">Rooms & Guests</span>
                <span className="text-[10px] font-bold text-gray-400">1 Room, 2 Adults</span>
             </div>
          </div>
        )}

        {/* Search Button Container */}
        <div className="p-4 flex items-center justify-center">
           <button 
            onClick={handleSearch}
            className={`${type === 'bus' || type === 'train' ? 'bg-red-600 hover:bg-red-700 shadow-red-500/20 hover:shadow-red-500/40' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20 hover:shadow-blue-500/40'} text-white font-black h-full px-8 rounded-2xl md:rounded-[1.5rem] shadow-xl transition-all flex items-center gap-2 group/btn`}
           >
              <span className="uppercase tracking-widest text-sm">SEARCH {type}S</span>
              <Search size={20} className="group-hover/btn:translate-x-1 transition-transform" />
           </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
