import React from 'react';
import Navbar from '../components/Navbar';
import FlightFilter from '../components/flight/FlightFilter';
import FareCalendar from '../components/flight/FareCalendar';
import FlightCard from '../components/flight/FlightCard';

const FlightResults = () => {
  const dummyFlights = [
     { id: 1, airline: "IndiGo", flightNo: "6E-2054", departure: "06:00", arrival: "08:15", origin: "DEL", dest: "BOM", duration: "2h 15m", stops: "Non Stop", price: "3,450", baggage: "15 Kg", refundable: "Partially Refundable" },
     { id: 2, airline: "Vistara", flightNo: "UK-993", departure: "10:00", arrival: "12:15", origin: "DEL", dest: "BOM", duration: "2h 15m", stops: "Non Stop", price: "4,200", baggage: "15 Kg", refundable: "Partially Refundable" },
     { id: 3, airline: "Air India", flightNo: "AI-315", departure: "14:30", arrival: "18:45", origin: "DEL", dest: "BOM", duration: "4h 15m", stops: "1 Stop (AMD)", price: "3,900", baggage: "25 Kg", refundable: "Partially Refundable" },
     { id: 4, airline: "Akasa Air", flightNo: "QP-1372", departure: "19:00", arrival: "21:10", origin: "DEL", dest: "BOM", duration: "2h 10m", stops: "Non Stop", price: "4,500", baggage: "15 Kg", refundable: "Partially Refundable" },
     { id: 5, airline: "SpiceJet", flightNo: "SG-8709", departure: "22:15", arrival: "00:30", origin: "DEL", dest: "BOM", duration: "2h 15m", stops: "Non Stop", price: "3,850", baggage: "15 Kg", refundable: "Non-Refundable" },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
      <Navbar />
      
      {/* Search Header Banner */}
      <div className="bg-blue-600 pt-24 pb-16 px-4 shadow-[0_10px_30px_rgba(37,99,235,0.2)] sticky top-0 z-40 relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-white relative z-10">
            <div>
               <h1 className="text-3xl md:text-5xl font-black drop-shadow-md tracking-tight">New Delhi → Mumbai</h1>
               <p className="text-[11px] font-black text-blue-100 mt-2 uppercase tracking-[0.3em] drop-shadow-sm flex items-center flex-wrap gap-2">
                 <span>Showing {dummyFlights.length} Flights</span> <span className="w-1 h-1 bg-blue-200 rounded-full hidden md:block"></span> <span>01 Apr 2026</span> <span className="w-1 h-1 bg-blue-200 rounded-full hidden md:block"></span> <span>1 Adult, Economy</span>
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
               <FlightFilter />
            </div>
         </div>
         
         {/* Flight Listings */}
         <div className="lg:w-3/4 flex flex-col">
            <FareCalendar />

            <div className="flex flex-col md:flex-row md:justify-between md:items-center bg-white p-4 rounded-[1.5rem] shadow-sm border border-gray-100 gap-4 mb-6">
               <h2 className="text-xl font-black text-gray-800 tracking-tight ml-2">Available Flights</h2>
               <div className="flex items-center gap-3">
                 <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Sort By</span>
                 <select className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs font-black uppercase tracking-widest text-gray-600 outline-none hover:border-blue-400 cursor-pointer shadow-sm transition-colors focus:ring-2 focus:ring-blue-100">
                    <option>Cheapest First</option>
                    <option>Fastest First</option>
                    <option>Departure: Earliest</option>
                    <option>Arrival: Earliest</option>
                 </select>
               </div>
            </div>
            
            <div className="flex flex-col gap-6">
               {dummyFlights.map((flight) => (
                  <FlightCard key={flight.id} flight={flight} />
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default FlightResults;
