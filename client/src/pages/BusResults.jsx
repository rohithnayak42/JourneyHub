import React, { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import BusFilter from '../components/bus/BusFilter';
import BusCard from '../components/bus/BusCard';
import ModifySearchButton from '../components/common/ModifySearchButton';
import { Bus } from 'lucide-react';

const DUMMY_BUSES = [
   { id: 1, name: "IntrCity SmartBus", type: "A/C Sleeper", layout: "2+1", departure: "21:30", arrival: "06:45", from: "Delhi", to: "Manali", duration: "9h 15m", price: 1250, seatsLeft: 14, rating: "4.8", boardingPoint: 'Kashmere Gate' },
   { id: 2, name: "Zingbus Premium", type: "Non-A/C Sleeper", layout: "2+1", departure: "23:00", arrival: "08:00", from: "Delhi", to: "Manali", duration: "9h 00m", price: 1099, seatsLeft: 22, rating: "4.5", boardingPoint: 'Anand Vihar' },
   { id: 3, name: "Himalayan Volvos", type: "A/C Sleeper", layout: "2+1", departure: "19:45", arrival: "05:30", from: "Delhi", to: "Manali", duration: "9h 45m", price: 1450, seatsLeft: 6, rating: "4.9", boardingPoint: 'Majnu Ka Tila' },
   { id: 4, name: "Northern Travels", type: "Non-A/C Sleeper", layout: "2+2", departure: "11:30", arrival: "22:15", from: "Delhi", to: "Manali", duration: "10h 45m", price: 850, seatsLeft: 18, rating: "4.1", boardingPoint: 'Kashmere Gate' },
   { id: 5, name: "Mountain Xpress", type: "A/C Seater", layout: "2+2", departure: "05:30", arrival: "16:00", from: "Delhi", to: "Manali", duration: "10h 30m", price: 750, seatsLeft: 30, rating: "4.3", boardingPoint: 'Dhaula Kuan' },
];

const BusResults = () => {
  // Filters State
  const [filters, setFilters] = useState({
    acSleeper: true,
    nonAcSleeper: true,
    acSeater: true,
    timeBefore6AM: false,
    time6AMto12PM: false,
    time12PMto6PM: false,
    timeAfter6PM: false,
    boardingPoints: [],
  });

  // Sort State
  const [sortBy, setSortBy] = useState('popularity'); // popularity, priceLowToHigh, departureEarliest, ratingHighest

  // Handlers
  const handleFilterChange = (filterName, value) => {
     setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const handleBoardingPointToggle = (point) => {
     setFilters(prev => {
        const points = prev.boardingPoints.includes(point)
          ? prev.boardingPoints.filter(p => p !== point)
          : [...prev.boardingPoints, point];
        return { ...prev, boardingPoints: points };
     });
  };

  // Filter and Sort Logic
  const filteredBuses = useMemo(() => {
     let result = DUMMY_BUSES.filter(bus => {
        // 1. Bus Type Filter
        if (!filters.acSleeper && bus.type === "A/C Sleeper") return false;
        if (!filters.nonAcSleeper && bus.type === "Non-A/C Sleeper") return false;
        if (!filters.acSeater && bus.type === "A/C Seater") return false;

        // 2. Departure Time Filter
        // Parse "HH:MM" to hours
        const depHour = parseInt(bus.departure.split(":")[0], 10);
        let timeMatch = false;
        
        // If no time filters are selected, don't filter by time
        const noTimeSelected = !filters.timeBefore6AM && !filters.time6AMto12PM && !filters.time12PMto6PM && !filters.timeAfter6PM;
        
        if (noTimeSelected) {
           timeMatch = true;
        } else {
           if (filters.timeBefore6AM && depHour < 6) timeMatch = true;
           if (filters.time6AMto12PM && depHour >= 6 && depHour < 12) timeMatch = true;
           if (filters.time12PMto6PM && depHour >= 12 && depHour < 18) timeMatch = true;
           if (filters.timeAfter6PM && depHour >= 18) timeMatch = true;
        }

        if (!timeMatch) return false;

        // 3. Boarding Points Filter
        if (filters.boardingPoints.length > 0) {
           if (!filters.boardingPoints.includes(bus.boardingPoint)) return false;
        }

        return true;
     });

     // Sorting
     if (sortBy === 'priceLowToHigh') {
        result.sort((a, b) => a.price - b.price);
     } else if (sortBy === 'departureEarliest') {
        result.sort((a, b) => {
           const timeA = a.departure.replace(':', '');
           const timeB = b.departure.replace(':', '');
           return timeA.localeCompare(timeB);
        });
     } else if (sortBy === 'ratingHighest') {
        result.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
     } else {
        // 'popularity' - using id or rating as proxy
        result.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
     }

     return result;
  }, [filters, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />
      
      {/* Search Header Banner (Compact Redesign) */}
      <div className="bg-white border-b border-gray-100 py-4 sticky top-20 z-40 shadow-sm transition-all">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <div className="bg-red-50 p-2.5 rounded-xl border border-red-100">
                <Bus className="text-red-600" size={20} />
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg md:text-xl font-black text-gray-800 tracking-tight flex items-center gap-2">
                   Delhi <span className="text-gray-300 font-medium">→</span> Manali
                </h1>
                <p className="text-[10px] font-black text-gray-400 mt-0.5 uppercase tracking-[0.2em] flex items-center gap-2">
                  <span>Showing {filteredBuses.length} Buses</span> <span className="w-1 h-1 bg-gray-300 rounded-full"></span> <span>01 Apr 2026</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
               <ModifySearchButton />
               <div className="h-8 w-[1px] bg-gray-100 hidden md:block"></div>
               <button className="flex-1 md:flex-initial bg-white border border-gray-200 px-5 py-2.5 rounded-xl font-black uppercase tracking-widest text-[9px] text-gray-500 shadow-sm transition-all hover:border-red-200">
                  Sort: Recommended
               </button>
            </div>
         </div>
      </div>

      {/* Main Content Dashboard */}
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8 w-full relative z-10">
         {/* Left Sidebar Filters */}
         <div className="lg:w-1/4 hidden lg:block">
            <div className="sticky top-44">
               <BusFilter filters={filters} onFilterChange={handleFilterChange} onBoardingToggle={handleBoardingPointToggle} />
            </div>
         </div>
         
         <div className="lg:w-3/4 flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center bg-white p-4 rounded-[1.5rem] shadow-sm border border-gray-100 gap-4 mb-2">
               <h2 className="text-xl font-black text-gray-800 tracking-tight ml-2">Available Buses</h2>
               <select 
                 value={sortBy}
                 onChange={(e) => setSortBy(e.target.value)}
                 className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs font-black uppercase tracking-widest text-gray-600 outline-none hover:border-red-400 cursor-pointer shadow-sm transition-colors focus:ring-2 focus:ring-red-100"
               >
                  <option value="popularity">Sort by: Popularity</option>
                  <option value="priceLowToHigh">Price: Low to High</option>
                  <option value="departureEarliest">Departure: Earliest</option>
                  <option value="ratingHighest">Ratings: Highest</option>
               </select>
            </div>
            
            <div className="flex flex-col gap-8">
               {filteredBuses.length > 0 ? (
                 filteredBuses.map((bus) => (
                    <BusCard key={bus.id} bus={bus} />
                 ))
               ) : (
                 <div className="text-center py-20">
                   <p className="text-gray-500 font-bold mb-2">No buses match your filters.</p>
                   <button 
                     onClick={() => {
                        setFilters({
                          acSleeper: true, nonAcSleeper: true, acSeater: true,
                          timeBefore6AM: false, time6AMto12PM: false, time12PMto6PM: false, timeAfter6PM: false,
                          boardingPoints: []
                        });
                     }}
                     className="text-red-500 hover:text-red-600 text-sm font-bold underline"
                   >
                     Reset Filters
                   </button>
                 </div>
               )}
            </div>
         </div>
      </div>
    </div>
  );
};

export default BusResults;
