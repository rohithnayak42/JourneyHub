import React from 'react';
import Navbar from '../components/Navbar';
import FlightFilter from '../components/flight/FlightFilter';
import FareCalendar from '../components/flight/FareCalendar';
import FlightCard from '../components/flight/FlightCard';
import ModifySearchButton from '../components/common/ModifySearchButton';
import { Plane } from 'lucide-react';

const FlightResults = () => {
  const dummyFlights = [
     { id: 1, airline: "IndiGo", flightNo: "6E-2054", departure: "06:00", arrival: "08:15", origin: "DEL", dest: "BOM", duration: "2h 15m", stops: "Non Stop", price: "3,450", baggage: "15 Kg", refundable: "Partially Refundable" },
     { id: 2, airline: "Vistara", flightNo: "UK-993", departure: "10:00", arrival: "12:15", origin: "DEL", dest: "BOM", duration: "2h 15m", stops: "Non Stop", price: "4,200", baggage: "15 Kg", refundable: "Partially Refundable" },
     { id: 3, airline: "Air India", flightNo: "AI-315", departure: "14:30", arrival: "18:45", origin: "DEL", dest: "BOM", duration: "4h 15m", stops: "1 Stop (AMD)", price: "3,900", baggage: "25 Kg", refundable: "Partially Refundable" },
     { id: 4, airline: "Akasa Air", flightNo: "QP-1372", departure: "19:00", arrival: "21:10", origin: "DEL", dest: "BOM", duration: "2h 10m", stops: "Non Stop", price: "4,500", baggage: "15 Kg", refundable: "Partially Refundable" },
     { id: 5, airline: "SpiceJet", flightNo: "SG-8709", departure: "22:15", arrival: "00:30", origin: "DEL", dest: "BOM", duration: "2h 15m", stops: "Non Stop", price: "3,850", baggage: "15 Kg", refundable: "Non-Refundable" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />
      
      {/* Search Header Banner (Compact Redesign) */}
      <div className="bg-white border-b border-gray-100 py-4 sticky top-20 z-40 shadow-sm transition-all">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <div className="bg-blue-50 p-2.5 rounded-xl border border-blue-100">
                <Plane className="text-blue-600" size={20} />
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg md:text-xl font-black text-gray-800 tracking-tight flex items-center gap-2">
                   New Delhi <span className="text-gray-300 font-medium">→</span> Mumbai
                </h1>
                <p className="text-[10px] font-black text-gray-400 mt-0.5 uppercase tracking-[0.2em] flex items-center gap-2">
                  <span>{dummyFlights.length} Flights</span> <span className="w-1 h-1 bg-gray-300 rounded-full"></span> <span>01 Apr 2026</span> <span className="w-1 h-1 bg-gray-300 rounded-full"></span> <span>1 Adult, Economy</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
               <ModifySearchButton />
               <div className="h-8 w-[1px] bg-gray-100 hidden md:block"></div>
               <button className="flex-1 md:flex-initial bg-white border border-gray-200 px-5 py-2.5 rounded-xl font-black uppercase tracking-widest text-[9px] text-gray-500 shadow-sm transition-all hover:border-blue-200">
                  Sort: Cheapest
               </button>
            </div>
         </div>
      </div>

      {/* Main Content Dashboard */}
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8 w-full relative z-10">
         {/* Left Sidebar Filters */}
         <div className="lg:w-1/4 hidden lg:block">
            <div className="sticky top-44">
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
