import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { User, CreditCard, Heart, Settings, Briefcase, MapPin, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('bookings');

  // Dummy bookings
  const upcomingBookings = [
    { type: 'Flight', title: 'Delhi to Mumbai', date: '01 Apr 2026', id: 'PNR: F8X9M2', status: 'Confirmed', icon: '✈️', color: 'blue' },
    { type: 'Hotel', title: 'Taj Mahal Palace', date: '01 - 03 Apr 2026', id: 'Booking: HM-2983', status: 'Confirmed', icon: '🏨', color: 'indigo' },
  ];

  const pastBookings = [
    { type: 'Bus', title: 'Delhi to Jaipur', date: '15 Jan 2026', id: 'Ticket: B-490', status: 'Completed', icon: '🚌', color: 'red' }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans flex flex-col">
      <Navbar />
      
      {/* Header Banner */}
      <div className="bg-gray-900 pt-20 pb-24 px-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)] sticky top-0 z-10 relative overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-purple-900/50 mix-blend-overlay"></div>
         <div className="max-w-6xl mx-auto flex items-center gap-6 text-white relative z-10">
            <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-3xl font-black shadow-lg shadow-blue-500/20">
               {user?.name?.charAt(0) || 'U'}
            </div>
            <div>
               <h1 className="text-3xl md:text-5xl font-black tracking-tight drop-shadow-md">Hi, {user?.name || 'User'}!</h1>
               <p className="text-sm font-bold text-gray-300 mt-2 flex items-center gap-2 tracking-widest uppercase text-[10px]">
                 <MapPin size={14} className="text-gray-400" /> Member since 2025
               </p>
            </div>
         </div>
      </div>

      {/* Main Dashboard Layout */}
      <div className="max-w-6xl mx-auto px-4 w-full flex flex-col md:flex-row gap-8 relative z-20 -mt-10 mb-16">
         {/* Sidebar Navigation */}
         <div className="w-full md:w-64 bg-white rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-gray-100 p-4 h-fit sticky top-24">
            <nav className="flex flex-col gap-2">
               <button onClick={() => setActiveTab('bookings')} className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-black transition-all ${activeTab === 'bookings' ? 'bg-gray-900 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'}`}>
                  <Briefcase size={18} /> My Bookings
               </button>
               <button onClick={() => setActiveTab('profile')} className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-black transition-all ${activeTab === 'profile' ? 'bg-gray-900 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'}`}>
                  <User size={18} /> Profile Details
               </button>
               <button onClick={() => setActiveTab('cards')} className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-black transition-all ${activeTab === 'cards' ? 'bg-gray-900 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'}`}>
                  <CreditCard size={18} /> Saved Cards
               </button>
               <button onClick={() => setActiveTab('wishlist')} className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-black transition-all ${activeTab === 'wishlist' ? 'bg-gray-900 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'}`}>
                  <Heart size={18} /> Wishlist
               </button>
               <button onClick={() => setActiveTab('settings')} className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-black transition-all ${activeTab === 'settings' ? 'bg-gray-900 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'}`}>
                  <Settings size={18} /> Settings
               </button>
            </nav>
         </div>

         {/* Content Area */}
         <div className="flex-1 bg-white rounded-[2.5rem] shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-gray-100 p-6 md:p-10">
            <AnimatePresence mode="wait">
               {activeTab === 'bookings' && (
                  <motion.div key="bookings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                     <h2 className="text-2xl md:text-3xl font-black text-gray-800 tracking-tight mb-8">My Bookings</h2>
                     
                     <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-100 pb-3">Upcoming Trips</h3>
                     <div className="flex flex-col gap-4 mb-10">
                        {upcomingBookings.map((bk, i) => (
                           <div key={i} className="flex flex-col xl:flex-row xl:items-center justify-between p-5 md:p-6 rounded-[2rem] border border-gray-100 bg-gray-50/50 hover:border-blue-200 hover:shadow-lg hover:-translate-y-1 transition-all group">
                              <div className="flex items-center gap-5 mb-4 xl:mb-0">
                                 <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-2xl shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">{bk.icon}</div>
                                 <div>
                                    <h4 className="font-black text-xl text-gray-800 tracking-tight">{bk.title}</h4>
                                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-1 bg-white px-2 py-1 rounded-md border border-gray-100 w-fit">{bk.type} • {bk.date}</p>
                                 </div>
                              </div>
                              <div className="flex items-center justify-between xl:justify-end gap-6 bg-white p-3 md:p-4 rounded-[1.5rem] border border-gray-100 shadow-sm">
                                 <div className="text-left xl:text-right">
                                    <p className="text-xs font-black text-gray-800">{bk.id}</p>
                                    <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mt-1 bg-emerald-50 px-2 py-1 rounded-md inline-block">{bk.status}</p>
                                 </div>
                                 <button className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-900 hover:text-white hover:border-gray-900 shadow-sm transition-all text-xs font-black uppercase tracking-widest flex items-center gap-2">
                                    <Download size={14} /> <span className="hidden md:inline">Ticket</span>
                                 </button>
                              </div>
                           </div>
                        ))}
                     </div>

                     <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-100 pb-3">Past Trips</h3>
                     <div className="flex flex-col gap-4">
                        {pastBookings.map((bk, i) => (
                           <div key={i} className="flex flex-col xl:flex-row xl:items-center justify-between p-5 md:p-6 rounded-[2rem] border border-gray-100 bg-gray-50 opacity-60 hover:opacity-100 transition-opacity">
                              <div className="flex items-center gap-5 mb-4 xl:mb-0">
                                 <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-2xl shadow-sm border border-gray-100">{bk.icon}</div>
                                 <div>
                                    <h4 className="font-black text-xl text-gray-800 tracking-tight">{bk.title}</h4>
                                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-1 bg-white px-2 py-1 rounded-md border border-gray-100 w-fit">{bk.type} • {bk.date}</p>
                                 </div>
                              </div>
                              <div className="flex items-center justify-between xl:justify-end gap-6 bg-white p-3 md:p-4 rounded-[1.5rem] border border-gray-100 shadow-sm">
                                 <div className="text-left xl:text-right">
                                    <p className="text-xs font-black text-gray-800">{bk.id}</p>
                                    <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mt-1 bg-gray-200 px-2 py-1 rounded-md inline-block">{bk.status}</p>
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </motion.div>
               )}
               {activeTab !== 'bookings' && (
                 <motion.div key="other" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-64 flex flex-col items-center justify-center text-gray-400">
                    <Settings size={48} className="mb-4 opacity-50" />
                    <h3 className="font-black text-xl tracking-tight">Coming Soon</h3>
                    <p className="text-xs font-bold uppercase tracking-widest mt-2">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Dashboard settings</p>
                 </motion.div>
               )}
            </AnimatePresence>
         </div>
      </div>
    </div>
  );
};
export default Dashboard;
