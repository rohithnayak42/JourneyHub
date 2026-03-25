import React from 'react';
import Navbar from '../components/Navbar';
import BusFilter from '../components/bus/BusFilter';
import BusCard from '../components/bus/BusCard';
import { Bus } from 'lucide-react';

const BusResults = () => {
  const dummyBuses = [
     { id: 1, name: "IntrCity SmartBus", type: "A/C Sleeper (2+1)", departure: "21:30", arrival: "06:45", from: "Delhi", to: "Manali", duration: "9h 15m", price: 1250, seatsLeft: 14, rating: "4.8" },
     { id: 2, name: "Zingbus Premium", type: "Volvo A/C Semi Sleeper", departure: "23:00", arrival: "08:00", from: "Delhi", to: "Manali", duration: "9h 00m", price: 1099, seatsLeft: 22, rating: "4.5" },
     { id: 3, name: "Himalayan Volvos", type: "BharatBenz A/C Sleeper", departure: "19:45", arrival: "05:30", from: "Delhi", to: "Manali", duration: "9h 45m", price: 1450, seatsLeft: 6, rating: "4.9" },
     { id: 4, name: "Northern Travels", type: "Non-A/C Sleeper (2+1)", departure: "20:30", arrival: "07:15", from: "Delhi", to: "Manali", duration: "10h 45m", price: 850, seatsLeft: 18, rating: "4.1" },
  ];

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
                  <span>Showing {dummyBuses.length} Buses</span> <span className="w-1 h-1 bg-gray-300 rounded-full"></span> <span>01 Apr 2026</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
               <button className="flex-1 md:flex-initial bg-gray-50 hover:bg-gray-100 border border-gray-200 px-5 py-2.5 rounded-xl font-black uppercase tracking-widest text-[9px] text-gray-500 transition-all">
                  Modify Search
               </button>
               <div className="h-8 w-[px] bg-gray-100 hidden md:block"></div>
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
               <BusFilter />
            </div>
         </div>
         
         {/* Bus Listings List */}
         <div className="lg:w-3/4 flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center bg-white p-4 rounded-[1.5rem] shadow-sm border border-gray-100 gap-4 mb-2">
               <h2 className="text-xl font-black text-gray-800 tracking-tight ml-2">Available Buses</h2>
               <select className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs font-black uppercase tracking-widest text-gray-600 outline-none hover:border-red-400 cursor-pointer shadow-sm transition-colors focus:ring-2 focus:ring-red-100">
                  <option>Sort by: Popularity</option>
                  <option>Price: Low to High</option>
                  <option>Departure: Earliest</option>
                  <option>Ratings: Highest</option>
               </select>
            </div>
            
            <div className="flex flex-col gap-8">
               {dummyBuses.map((bus) => (
                  <BusCard key={bus.id} bus={bus} />
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default BusResults;
