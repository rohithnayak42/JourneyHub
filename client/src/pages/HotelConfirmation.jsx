import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { 
  CheckCircle2, Download, Printer, Share2, 
  MapPin, Calendar, Users, Hotel, ArrowRight,
  TrendingUp, Star, Phone, Mail
} from 'lucide-react';
import { motion } from 'framer-motion';

const HotelConfirmation = () => {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState(null);
  const [bookingId, setBookingId] = useState('');

  useEffect(() => {
    const data = localStorage.getItem('finalHotelBooking');
    if (!data) {
      navigate('/hotels');
      return;
    }
    setBookingData(JSON.parse(data));
    setBookingId('JH' + Math.random().toString(36).substr(2, 9).toUpperCase());
  }, [navigate]);

  if (!bookingData) return <div className="h-screen flex items-center justify-center font-black text-indigo-600 uppercase tracking-widest">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      <Navbar />

      {/* Hero Success Section */}
      <div className="bg-indigo-600 py-16 text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
         <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 12, stiffness: 100 }}
              className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-emerald-500/40 border-8 border-white/20"
            >
               <CheckCircle2 size={48} className="text-white" />
            </motion.div>
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-black tracking-tight mb-4"
            >
               Booking Confirmed!
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg font-bold text-indigo-100 max-w-2xl mx-auto mb-10"
            >
               Your reservation at {bookingData.hotelName} is successful. Detailed confirmation has been sent to your email.
            </motion.p>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
               <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 flex flex-col items-start min-w-[180px]">
                  <span className="text-[10px] font-black text-indigo-200 uppercase tracking-widest mb-1">Booking ID</span>
                  <span className="text-lg font-black tracking-widest">{bookingId}</span>
               </div>
               <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 flex flex-col items-start min-w-[180px]">
                  <span className="text-[10px] font-black text-indigo-200 uppercase tracking-widest mb-1">Status</span>
                  <span className="text-lg font-black flex items-center gap-2"><CheckCircle2 size={18} className="text-emerald-400"/> Confirmed</span>
               </div>
            </motion.div>
         </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-12 relative z-20">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left: Detailed Receipt Card */}
            <div className="lg:col-span-2 space-y-6">
               <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
                  <div className="p-10 border-b border-gray-50">
                     <div className="flex flex-col md:flex-row justify-between gap-8 mb-10">
                        <div className="flex-1">
                           <h3 className="text-2xl font-black text-gray-800 tracking-tight mb-2 uppercase tracking-widest">{bookingData.hotelName}</h3>
                           <p className="text-sm font-bold text-gray-400 flex items-center gap-2"><MapPin size={16} className="text-indigo-500" /> {bookingData.hotelLocation}</p>
                           <div className="flex items-center gap-1 mt-3">
                              {Array.from({ length: bookingData.hotelStars }).map((_, i) => (
                                 <Star key={i} size={14} fill="currentColor" className="text-amber-400" />
                              ))}
                           </div>
                        </div>
                        <div className="w-full md:w-48 h-32 rounded-3xl overflow-hidden shadow-inner flex-shrink-0">
                           <img src={bookingData.hotelImage} className="w-full h-full object-cover" alt="Hotel" />
                        </div>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-t border-b border-gray-50 bg-gray-50/30 -mx-10 px-10">
                        <div className="flex items-center gap-4">
                           <div className="p-3 bg-white rounded-2xl shadow-sm text-indigo-600"><Calendar size={20} /></div>
                           <div className="flex flex-col">
                              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Duration</span>
                              <span className="text-base font-black text-gray-800">{bookingData.checkIn} - {bookingData.checkOut}</span>
                           </div>
                        </div>
                        <div className="flex items-center gap-4">
                           <div className="p-3 bg-white rounded-2xl shadow-sm text-indigo-600"><Users size={20} /></div>
                           <div className="flex flex-col">
                              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Guests & Rooms</span>
                              <span className="text-base font-black text-gray-800">{bookingData.guests.length} Guests, {bookingData.rooms} Room ({bookingData.roomName})</span>
                           </div>
                        </div>
                     </div>

                     <div className="mt-10">
                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-100 pb-2">Registered Guests</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           {bookingData.guests.map((guest, i) => (
                              <div key={i} className="flex items-center gap-3 p-4 bg-gray-50/50 rounded-2xl border border-gray-100">
                                 <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-black">{i+1}</div>
                                 <span className="text-sm font-black text-gray-700">{guest.title}. {guest.firstName} {guest.lastName}</span>
                              </div>
                           ))}
                        </div>
                     </div>

                     <div className="mt-10 flex flex-col md:flex-row gap-6 p-6 bg-emerald-50 rounded-3xl border border-emerald-100">
                        <div className="flex-1">
                           <h4 className="text-xs font-black text-emerald-700 uppercase tracking-widest mb-2">Total Paid</h4>
                           <span className="text-4xl font-black text-emerald-800 tracking-tight">₹{bookingData.priceSummary.total}</span>
                           <p className="text-[10px] font-bold text-emerald-600 mt-2 flex items-center gap-1.5"><CheckCircle2 size={12}/> Inclusive of all taxes and service fees</p>
                        </div>
                        <div className="flex items-center gap-4 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-emerald-200 md:pl-8">
                           <button className="p-4 bg-white text-emerald-600 rounded-2xl hover:bg-emerald-100 transition-colors shadow-sm"><Printer size={20}/></button>
                           <button className="p-4 bg-white text-emerald-600 rounded-2xl hover:bg-emerald-100 transition-colors shadow-sm"><Download size={20}/></button>
                        </div>
                     </div>
                  </div>
                  
                  <div className="px-10 py-6 bg-gray-800 text-indigo-300 flex flex-wrap gap-6 justify-between items-center">
                     <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2"><Lock size={12}/> Secured Transaction</span>
                     <div className="flex gap-4">
                        <Share2 size={16} className="cursor-pointer hover:text-white transition-colors" />
                        <span className="text-[10px] font-black uppercase tracking-widest cursor-pointer hover:text-white transition-colors">Customer Support 24/7</span>
                     </div>
                  </div>
               </div>

               {/* Quick Info & Help */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center gap-4 shadow-sm">
                     <div className="p-3 bg-red-50 text-red-500 rounded-2xl"><TrendingUp size={20} /></div>
                     <div className="flex flex-col">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Cancellation Policy</span>
                        <span className="text-xs font-black text-gray-700">100% Refundable till 24hrs</span>
                     </div>
                  </div>
                  <div className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center gap-4 shadow-sm">
                     <div className="p-3 bg-blue-50 text-blue-500 rounded-2xl"><Hotel size={20} /></div>
                     <div className="flex flex-col">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Self Check-in</span>
                        <span className="text-xs font-black text-gray-700">Available at Reception</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* Right: Next Steps and Support Info */}
            <div className="space-y-6">
               <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 ml-1">Need help with this booking?</h4>
                  <div className="space-y-4">
                     <a href="#" className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-white transition-all group">
                        <div className="p-2 bg-indigo-600 text-white rounded-lg group-hover:scale-110 transition-transform"><Phone size={14} /></div>
                        <div className="flex flex-col">
                           <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Call Support</span>
                           <span className="text-sm font-bold text-gray-700">+91 1800 234 5678</span>
                        </div>
                     </a>
                     <a href="#" className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-white transition-all group">
                        <div className="p-2 bg-indigo-600 text-white rounded-lg group-hover:scale-110 transition-transform"><Mail size={14} /></div>
                        <div className="flex flex-col">
                           <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Us</span>
                           <span className="text-sm font-bold text-gray-700">support@journeyhub.com</span>
                        </div>
                     </a>
                  </div>
               </div>

               <div className="bg-indigo-600 rounded-3xl p-8 shadow-xl text-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl translate-x-8 -translate-y-8"></div>
                  <h4 className="text-lg font-black tracking-tight mb-4 flex items-center gap-2 relative z-10"><TrendingUp size={20}/> Earn points</h4>
                  <p className="text-xs font-bold text-indigo-100 mb-8 relative z-10 leading-relaxed">You've earned 450 Reward Points on this booking. Use them for your next trip!</p>
                  <button className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-indigo-900/40 relative z-10 hover:bg-indigo-50 transition-colors">View My Points</button>
               </div>

               <button 
                  onClick={() => navigate('/')}
                  className="w-full py-5 bg-white border border-gray-200 text-gray-800 font-black text-[10px] uppercase tracking-widest rounded-3xl shadow-sm hover:border-indigo-400 hover:text-indigo-600 transition-all flex items-center justify-center gap-3"
               >
                  Go back to Home <ArrowRight size={16} />
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default HotelConfirmation;
