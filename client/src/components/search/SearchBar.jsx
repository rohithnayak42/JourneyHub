import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ArrowRightLeft, Search, Calendar, Users, Briefcase, ChevronRight, Info } from 'lucide-react';
import LocationDropdown from './LocationDropdown';
import DatePicker from './DatePicker';

const SearchBar = ({ type = 'bus' }) => {
  const navigate = useNavigate();
  
  // State Management
  const [from, setFrom] = useState(type === 'hotel' ? 'Goa' : 'Delhi');
  const [to, setTo] = useState('Mumbai');
  const [date, setDate] = useState('2026-04-01');
  const [checkOutDate, setCheckOutDate] = useState('2026-04-05');
  const [extraValue, setExtraValue] = useState(
    type === 'train' ? 'Sleeper' : 
    type === 'flight' ? '1 Traveler' : 
    type === 'hotel' ? '2 Guests' : 
    'Any Seat'
  );
  const [isWomenOnly, setIsWomenOnly] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);
  const [rotation, setRotation] = useState(0);
  
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  
  const fromRef = useRef(null);
  const toRef = useRef(null);
  
  const locations = ["Hyderabad", "Bangalore", "Chennai", "Mumbai", "Delhi", "Kolkata", "Pune", "Ahmedabad"];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (fromRef.current && !fromRef.current.contains(event.target)) setShowFromDropdown(false);
      if (toRef.current && !toRef.current.contains(event.target)) setShowToDropdown(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    const query = type === 'hotel' 
      ? `?city=${from}&checkin=${date}&checkout=${checkOutDate}&guests=${extraValue}`
      : `?source=${from}&destination=${to}&date=${date}&gender_preference=${isWomenOnly ? 'female' : 'any'}&extra=${extraValue}`;
    
    navigate(`/${type === 'bus' ? 'buses' : type === 'train' ? 'trains' : type === 'flight' ? 'flights' : 'hotels'}${query}`);
  };

  const swapLocations = () => {
    setIsSwapping(true);
    setRotation(prev => prev + 180);
    setFrom(to);
    setTo(from);
    setTimeout(() => setIsSwapping(false), 500);
  };

  const config = {
    train: { color: 'bg-green-600', hover: 'hover:bg-green-700', label4: 'CLASS', icon4: <Briefcase size={22} className="text-gray-400 group-hover:text-green-600" />, btnText: 'SEARCH' },
    flight: { color: 'bg-blue-600', hover: 'hover:bg-blue-700', label4: 'PASSENGERS', icon4: <Users size={22} className="text-gray-400 group-hover:text-blue-600" />, btnText: 'SEARCH' },
    hotel: { color: 'bg-purple-600', hover: 'hover:bg-purple-700', label4: 'ROOMS & GUESTS', icon4: <Users size={22} className="text-gray-400 group-hover:text-purple-600" />, btnText: 'SEARCH' },
    bus: { color: 'bg-red-600', hover: 'hover:bg-red-700', label4: 'SEAT TYPE', icon4: <Briefcase size={22} className="text-gray-400 group-hover:text-red-600" />, btnText: 'SEARCH BUSS' }
  }[type];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 relative">
      
      {/* 🔹 MAIN: Single-Line Search Bar */}
      <div className="bg-white rounded-[2rem] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col md:flex-row items-center overflow-visible">
        
        {/* 🔄 Group 1: From + Swap + To (for perfect centering) */}
        <div className="flex-[2] w-full flex flex-col md:flex-row items-center relative group/group1">
           {/* Section 1: From/Location */}
           <div ref={fromRef} onClick={() => setShowFromDropdown(true)} className="flex-1 w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-all cursor-pointer rounded-l-[1.8rem] group/from relative">
              <MapPin size={24} className="text-gray-400 group-hover/from:text-red-500 transition-colors" />
              <div className="flex flex-col flex-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">{type === 'hotel' ? 'LOCATION' : 'FROM'}</span>
                <input type="text" value={from} readOnly className="bg-transparent border-none outline-none text-lg font-black text-gray-800 w-full cursor-pointer" />
              </div>
              <LocationDropdown isOpen={showFromDropdown} locations={locations} anchorRef={fromRef} onSelect={(loc) => {setFrom(loc); setShowFromDropdown(false);}} />
              <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-10 w-[1px] bg-gray-100" />
           </div>

           {/* ⇄ Swap Button (Hidden for Hotel) - Perfectly Centered in parent flex div */}
           {type !== 'hotel' && (
           <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center">
              <button 
                onClick={(e) => {e.stopPropagation(); swapLocations();}}
                style={{ transform: `rotate(${rotation}deg)` }}
                className="bg-white border border-gray-100 w-9 h-9 rounded-full shadow-md flex items-center justify-center text-blue-500 hover:text-blue-600 hover:shadow-xl hover:scale-110 transition-all duration-500 active:scale-95 z-30"
              >
                 <ArrowRightLeft size={18} />
              </button>
           </div>
           )}

           {/* Section 2: To */}
           {type !== 'hotel' && (
           <div ref={toRef} onClick={() => setShowToDropdown(true)} className="flex-1 w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-all cursor-pointer group/to relative">
              <MapPin size={24} className="text-gray-400 group-hover/to:text-red-500 transition-colors" />
              <div className="flex flex-col flex-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">TO</span>
                <input type="text" value={to} readOnly className="bg-transparent border-none outline-none text-lg font-black text-gray-800 w-full cursor-pointer" />
              </div>
              <LocationDropdown isOpen={showToDropdown} locations={locations} anchorRef={toRef} onSelect={(loc) => {setTo(loc); setShowToDropdown(false);}} />
              <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-10 w-[1px] bg-gray-100" />
           </div>
           )}
        </div>

        {/* Section 2 (Hotel Special): Check-in */}
        {type === 'hotel' && (
           <div className="flex-1 w-full relative group h-full flex items-center">
              <DatePicker value={date} onChange={setDate} label="CHECK-IN" />
              <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-10 w-[1px] bg-gray-100" />
           </div>
        )}

        {/* Section 3: Date / Check-out */}
        <div className="flex-1 w-full group relative h-full flex items-center">
           <DatePicker 
             value={type === 'hotel' ? checkOutDate : date} 
             onChange={type === 'hotel' ? setCheckOutDate : setDate} 
             label={type === 'hotel' ? "CHECK-OUT" : "DATE OF JOURNEY"} 
           />
           <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-10 w-[1px] bg-gray-100" />
        </div>

        {/* Section 4: Extra Field OR Women Toggle for Bus */}
        {type === 'bus' ? (
          <div className="flex-1 w-full flex items-center justify-between px-6 py-4 bg-transparent group relative">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100 shadow-sm">
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/2922/2922561.png" 
                  className="w-full h-full object-cover" 
                  alt="Women Only"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-gray-800 leading-tight">Booking for women</span>
                <span className="text-[10px] text-gray-400 font-medium">Exclusive features</span>
              </div>
            </div>
            <button
              onClick={() => setIsWomenOnly(!isWomenOnly)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 focus:outline-none ${isWomenOnly ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.3)]' : 'bg-gray-200'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${isWomenOnly ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
            <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-10 w-[1px] bg-gray-100" />
          </div>
        ) : (
          <div className="flex-1 w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-all cursor-pointer group relative">
             {config.icon4}
             <div className="flex flex-col flex-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">{config.label4}</span>
                <input 
                  type="text" 
                  value={extraValue} 
                  onChange={(e) => setExtraValue(e.target.value)} 
                  className="bg-transparent border-none outline-none text-lg font-black text-gray-800 w-full cursor-pointer focus:ring-0 p-0" 
                />
             </div>
             <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-10 w-[1px] bg-gray-100" />
          </div>
        )}

        {/* 🔹 SEARCH BUTTON */}
        <div className="p-2 w-full md:w-auto">
           <button 
             onClick={handleSearch}
             className={`${config.color} ${config.hover} text-white font-black py-4 px-10 rounded-[1.5rem] shadow-lg transition-all duration-300 flex items-center justify-center gap-3 active:scale-95 group/btn w-full md:min-w-[180px]`}
           >
              <span className="uppercase tracking-tight text-lg">{config.btnText}</span>
              <Search size={22} className="group-hover/btn:scale-110 transition-transform" />
           </button>
        </div>

      </div>
    </div>
  );
};

export default SearchBar;
