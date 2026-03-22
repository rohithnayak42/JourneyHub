import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlaneTakeoff, PlaneLanding, Info, BaggageClaim } from 'lucide-react';

const FlightDetails = ({ flight }) => {
  const [activeTab, setActiveTab] = useState('itinerary');

  return (
    <motion.div 
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white border-t border-gray-200 flex flex-col md:flex-row overflow-hidden relative shadow-inner"
    >
      {/* Sidebar Tabs */}
      <div className="w-full md:w-48 bg-gray-50 flex flex-row md:flex-col border-b md:border-b-0 md:border-r border-gray-200">
         <button 
           onClick={() => setActiveTab('itinerary')}
           className={`p-5 text-[10px] font-black uppercase tracking-[0.2em] text-left border-b-2 md:border-b-0 md:border-l-4 transition-colors flex-1 md:flex-none ${activeTab === 'itinerary' ? 'border-blue-500 text-blue-600 bg-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]' : 'border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-800'}`}
         >
            Itinerary
         </button>
         <button 
           onClick={() => setActiveTab('baggage')}
           className={`p-5 text-[10px] font-black uppercase tracking-[0.2em] text-left border-b-2 md:border-b-0 md:border-l-4 transition-colors flex-1 md:flex-none ${activeTab === 'baggage' ? 'border-blue-500 text-blue-600 bg-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]' : 'border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-800'}`}
         >
            Fare & Baggage
         </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 md:p-10">
         {activeTab === 'itinerary' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col relative z-0">
               {/* Origin */}
               <div className="flex gap-6 relative">
                  <div className="flex flex-col items-end w-16 pt-1">
                     <span className="font-black text-gray-800 text-xl">{flight.departure}</span>
                     <span className="text-[10px] font-bold text-gray-400 mt-1 uppercase">01 Apr</span>
                  </div>
                  <div className="relative flex flex-col items-center">
                     <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center z-10 border-2 border-blue-100 shadow-sm">
                        <PlaneTakeoff size={18} className="text-blue-500" />
                     </div>
                     <div className="w-[3px] h-full bg-gray-100 absolute top-5 bottom-0 -z-0"></div>
                  </div>
                  <div className="flex flex-col pb-10">
                     <h5 className="font-black text-gray-800 text-lg">New Delhi (DEL)</h5>
                     <p className="text-xs font-bold text-gray-500 mt-1">Indira Gandhi International Airport, Terminal 3</p>
                  </div>
               </div>

               {/* Transit Details */}
               <div className="flex gap-6 relative">
                  <div className="w-16"></div>
                  <div className="relative flex flex-col items-center">
                     <div className="w-[3px] h-full bg-gray-100 absolute top-0 bottom-0 -z-0"></div>
                  </div>
                  <div className="flex flex-col pb-10">
                     <div className="bg-white border rounded-[1.5rem] p-4 md:p-5 flex items-center gap-5 w-full md:w-[400px] shadow-[0_10px_30px_rgba(0,0,0,0.03)] border-gray-100 relative group overflow-hidden">
                         <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
                        <img src={`https://ui-avatars.com/api/?name=${flight.airline}&background=random&color=fff&rounded=true&bold=true&size=40`} alt={flight.airline} className="w-10 h-10 shadow-sm" />
                        <div className="flex flex-col">
                           <p className="text-sm font-black text-gray-800">{flight.airline} | {flight.flightNo}</p>
                           <p className="text-[10px] font-black text-gray-400 mt-1.5 uppercase tracking-widest flex items-center divide-x-2 divide-gray-200">
                             <span className="pr-2">Economy</span>
                             <span className="px-2">Airbus A320</span>
                             <span className="pl-2">{flight.duration}</span>
                           </p>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Destination */}
               <div className="flex gap-6 relative">
                  <div className="flex flex-col items-end w-16 pt-1">
                     <span className="font-black text-gray-800 text-xl">{flight.arrival}</span>
                     <span className="text-[10px] font-bold text-gray-400 mt-1 uppercase">01 Apr</span>
                  </div>
                  <div className="relative flex flex-col items-center">
                     <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center z-10 border-2 border-red-100 shadow-sm">
                        <PlaneLanding size={18} className="text-red-500" />
                     </div>
                  </div>
                  <div className="flex flex-col">
                     <h5 className="font-black text-gray-800 text-lg">Mumbai (BOM)</h5>
                     <p className="text-xs font-bold text-gray-500 mt-1">Chhatrapati Shivaji Int'l, Terminal 2</p>
                  </div>
               </div>
            </motion.div>
         )}

         {activeTab === 'baggage' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-8">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl relative overflow-hidden">
                     <BaggageClaim size={80} className="absolute -bottom-4 -right-4 text-emerald-100 opacity-50 pointer-events-none" />
                     <div className="flex items-center gap-2 mb-3 text-emerald-600 relative z-10">
                        <h4 className="font-black text-sm uppercase tracking-widest">Cabin Baggage</h4>
                     </div>
                     <p className="text-3xl font-black text-emerald-900 tracking-tight relative z-10">7 Kg</p>
                     <p className="text-[10px] font-black text-emerald-600/70 uppercase tracking-widest mt-2 relative z-10 px-2 py-1 bg-emerald-200/40 rounded-md w-fit">1 piece only</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl relative overflow-hidden">
                     <BaggageClaim size={80} className="absolute -bottom-4 -right-4 text-blue-100 opacity-50 pointer-events-none" />
                     <div className="flex items-center gap-2 mb-3 text-blue-600 relative z-10">
                        <h4 className="font-black text-sm uppercase tracking-widest">Check-in Baggage</h4>
                     </div>
                     <p className="text-3xl font-black text-blue-900 tracking-tight relative z-10">{flight.baggage.split(' ')[0]}</p>
                     <p className="text-[10px] font-black text-blue-600/70 uppercase tracking-widest mt-2 relative z-10 px-2 py-1 bg-blue-200/40 rounded-md w-fit">1 piece (Max L+W+H 158cm)</p>
                  </div>
               </div>
               
               <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
                  <div className="flex items-center gap-3 mb-6 text-gray-800">
                     <div className="bg-orange-100 p-2 rounded-full text-orange-500">
                        <Info size={18} />
                     </div>
                     <h4 className="font-black text-lg">Cancellation Rules</h4>
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold text-gray-600 py-4 border-b border-dashed border-gray-200">
                     <span className="uppercase tracking-widest text-[10px] font-black w-24">0 - 2 hours</span>
                     <span className="text-red-500 font-black bg-red-50 px-3 py-1 rounded-md">Non-Refundable</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold text-gray-600 py-4 border-b border-dashed border-gray-200">
                     <span className="uppercase tracking-widest text-[10px] font-black w-24">2 - 72 hours</span>
                     <span>₹3,500 + Airline Fee</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold text-gray-600 py-4">
                     <span className="uppercase tracking-widest text-[10px] font-black w-24">&gt; 72 hours</span>
                     <span>₹3,000 + Airline Fee</span>
                  </div>
               </div>
            </motion.div>
         )}
      </div>
    </motion.div>
  );
};
export default FlightDetails;
