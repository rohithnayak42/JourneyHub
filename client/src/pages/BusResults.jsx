import React from 'react';
import Navbar from '../components/Navbar';
import BusFilter from '../components/bus/BusFilter';
import BusCard from '../components/bus/BusCard';

const BusResults = () => {
  const dummyBuses = [
     { id: 1, name: "IntrCity SmartBus", type: "A/C Sleeper (2+1)", departure: "21:30", arrival: "06:45", from: "Delhi", to: "Manali", duration: "9h 15m", price: 1250, seatsLeft: 14, rating: "4.8" },
     { id: 2, name: "Zingbus Premium", type: "Volvo A/C Semi Sleeper", departure: "23:00", arrival: "08:00", from: "Delhi", to: "Manali", duration: "9h 00m", price: 1099, seatsLeft: 22, rating: "4.5" },
     { id: 3, name: "Himalayan Volvos", type: "BharatBenz A/C Sleeper", departure: "19:45", arrival: "05:30", from: "Delhi", to: "Manali", duration: "9h 45m", price: 1450, seatsLeft: 6, rating: "4.9" },
     { id: 4, name: "Northern Travels", type: "Non-A/C Sleeper (2+1)", departure: "20:30", arrival: "07:15", from: "Delhi", to: "Manali", duration: "10h 45m", price: 850, seatsLeft: 18, rating: "4.1" },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
      <Navbar />
      
      {/* Search Header Banner */}
      <div className="bg-red-600 pt-24 pb-16 px-4 shadow-[0_10px_30px_rgba(220,38,38,0.2)] sticky top-0 z-40 relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-10"></div>
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-white relative z-10">
            <div>
               <h1 className="text-3xl md:text-5xl font-black drop-shadow-md tracking-tight">Delhi → Manali</h1>
               <p className="text-[11px] font-black text-red-100 mt-2 uppercase tracking-[0.3em] drop-shadow-sm flex items-center gap-2">
                 <span>Showing {dummyBuses.length} Buses</span> <span className="w-1 h-1 bg-red-200 rounded-full"></span> <span>01 Apr 2026</span>
               </p>
            </div>
            <button className="mt-6 md:mt-0 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all shadow-md hover:shadow-xl hover:-translate-y-1">
               Modify Search
            </button>
         </div>
      </div>

      {/* Main Content Dashboard */}
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8 w-full relative z-10 -mt-10">
         {/* Left Sidebar Filters */}
         <div className="lg:w-1/4 hidden lg:block">
            <div className="sticky top-32">
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
