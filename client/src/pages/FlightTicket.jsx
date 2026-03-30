import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, Download, Plane, QrCode, Share2, 
  MapPin, Clock, Calendar, User, Armchair, ChevronRight
} from 'lucide-react';

const FlightTicket = () => {
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('finalFlightBooking');
    if (data) {
      setBooking(JSON.parse(data));
      // Optional: Clear selection after reading to prevent exact duplicate repeats if designed like that.
      // localStorage.removeItem('selectedFlight');
    } else {
      navigate('/flights');
    }
  }, [navigate]);

  if (!booking) return null;

  const { flight, passengers, seats, pnr, bookingId, totalPaid, date } = booking;

  return (
    <div className="min-h-screen bg-[#f5f7fb] font-sans text-gray-800 pb-20">
      <Navbar />

      {/* Success Banner */}
      <div className="bg-emerald-600 top-0 pt-32 pb-24 px-4 relative overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500 via-emerald-600 to-emerald-800 opacity-90"></div>
         {/* Subtle plane silhouettes in background */}
         <div className="absolute inset-0 overflow-hidden pointer-events-none mix-blend-overlay opacity-20">
           <Plane size={800} strokeWidth={0.5} className="absolute -top-40 -left-40 text-emerald-900 rotate-45 transform" />
           <Plane size={400} strokeWidth={0.5} className="absolute top-20 -right-20 text-emerald-900 -rotate-12 transform" />
         </div>

         <div className="max-w-3xl mx-auto relative z-10 flex flex-col items-center text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl mb-6">
              <CheckCircle2 size={40} className="text-emerald-500" strokeWidth={3} />
            </motion.div>
            <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4 drop-shadow-md">
              Booking Confirmed!
            </motion.h1>
            <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="text-emerald-100 font-bold uppercase tracking-widest text-xs md:text-sm drop-shadow-sm max-w-xl">
              Your flight to {flight.dest} is confirmed. A copy of this E-Ticket has been sent to {booking.contact.email}.
            </motion.p>
         </div>
      </div>

      {/* E-Ticket Display */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
         <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="bg-white rounded-[2rem] shadow-2xl shadow-gray-300/50 overflow-hidden border border-gray-100 flex flex-col relative">
            
            {/* Top Boarding Pass Header */}
            <div className="bg-blue-600 p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center relative overflow-hidden">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
               <div className="relative z-10 w-full flex flex-col gap-4">
                  <div className="flex justify-between items-start w-full">
                     <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center p-1 border border-blue-500">
                           <img src={`https://ui-avatars.com/api/?name=${flight.airline}&background=random&color=fff&rounded=true&bold=true`} alt={flight.airline} className="w-full h-full rounded-lg" />
                        </div>
                        <div>
                           <h2 className="text-white font-black text-2xl tracking-tight">{flight.airline}</h2>
                           <p className="text-blue-200 text-[10px] font-black uppercase tracking-widest">Flight {flight.flightNo}</p>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="text-blue-200 text-[10px] font-black uppercase tracking-widest mb-1">PNR NO</p>
                        <h3 className="text-white font-black text-2xl tracking-widest">{pnr}</h3>
                     </div>
                  </div>
               </div>
               
               {/* Left/Right Cutouts for Ticket style */}
               <div className="w-6 h-6 bg-[#f5f7fb] rounded-full absolute -left-3 -bottom-3"></div>
               <div className="w-6 h-6 bg-[#f5f7fb] rounded-full absolute -right-3 -bottom-3"></div>
            </div>

            {/* Dotted separator line */}
            <div className="w-full h-0 border-b-2 border-dashed border-gray-200 relative">
               <div className="w-6 h-6 bg-[#f5f7fb] rounded-full absolute -left-3 -top-3 shadow-inner"></div>
               <div className="w-6 h-6 bg-[#f5f7fb] rounded-full absolute -right-3 -top-3 shadow-inner"></div>
            </div>

            {/* Journey Details */}
            <div className="p-6 md:p-10 bg-white relative">
               <div className="flex items-center justify-between mb-10 w-full text-center">
                  <div className="flex-1">
                     <p className="text-4xl md:text-5xl font-black text-gray-800 tracking-tighter">{flight.origin}</p>
                     <p className="text-[10px] md:text-xs font-black text-gray-400 mt-2 uppercase tracking-widest">{flight.departure}</p>
                     <p className="text-[10px] font-bold text-gray-400 mt-0.5 uppercase tracking-widest">{date}</p>
                  </div>
                  
                  <div className="flex-1 px-4 md:px-8 flex flex-col items-center">
                     <Plane size={32} className="text-blue-500 drop-shadow-sm mb-2" />
                     <div className="w-full h-[2px] bg-blue-100 rounded-full relative flex justify-between items-center px-1">
                        <div className="w-2 h-2 rounded-full border border-blue-300 bg-white shadow-sm"></div>
                        <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest bg-white px-2 absolute left-1/2 -translate-x-1/2 -top-2">{flight.duration}</span>
                        <div className="w-2 h-2 rounded-full border border-blue-300 bg-white shadow-sm"></div>
                     </div>
                     <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-2 block">{flight.stops}</span>
                  </div>

                  <div className="flex-1">
                     <p className="text-4xl md:text-5xl font-black text-gray-800 tracking-tighter">{flight.dest}</p>
                     <p className="text-[10px] md:text-xs font-black text-gray-400 mt-2 uppercase tracking-widest">{flight.arrival}</p>
                     <p className="text-[10px] font-bold text-gray-400 mt-0.5 uppercase tracking-widest">{date}</p>
                  </div>
               </div>

               {/* Passenger Grid */}
               <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 mb-8 shadow-inner shadow-gray-200/50">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-200 pb-2">Passenger Information ({passengers.length})</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full gap-y-6">
                     {passengers.map((p, index) => (
                        <div key={p.id} className="flex justify-between items-center w-full">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shadow-sm">
                                 <User size={14} />
                              </div>
                              <div>
                                 <p className="text-sm font-black text-gray-800 uppercase tracking-tight">{p.name}</p>
                                 <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">{p.age} YRS, {p.gender}</p>
                              </div>
                           </div>
                           <div className="text-right">
                              <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-0.5">Seat</p>
                              <p className="text-lg font-black text-gray-800 leading-none">{seats[index]}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Bottom Footer Details */}
               <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-6">
                  <div className="flex items-center gap-2">
                     <QrCode size={80} className="text-gray-800 border p-2 rounded-xl shadow-sm" strokeWidth={1} />
                     <div className="ml-2">
                        <p className="text-xs font-black text-gray-800">{bookingId}</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Total Paid: ₹{totalPaid.toLocaleString('en-IN')}</p>
                     </div>
                  </div>
                  
                  <div className="flex gap-3 w-full md:w-auto">
                     <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 hover:border-blue-200 text-gray-700 font-black text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl shadow-sm transition-all focus:ring-4 focus:ring-gray-100">
                        <Share2 size={16} /> Share
                     </button>
                     <button onClick={() => window.print()} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl shadow-lg shadow-blue-500/30 transition-all focus:ring-4 focus:ring-blue-100 group">
                        <Download size={16} className="group-hover:translate-y-0.5 transition-transform" /> Save PDF
                     </button>
                  </div>
               </div>
            </div>
         </motion.div>
         
         <div className="mt-8 text-center flex justify-center">
            <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 font-black text-gray-600 text-xs uppercase tracking-widest px-8 py-4 rounded-xl shadow-sm transition-all shadow-gray-200/50 hover:shadow-gray-300">
               Go to Dashboard <ChevronRight size={16} />
            </button>
         </div>
      </div>
    </div>
  );
};

export default FlightTicket;
