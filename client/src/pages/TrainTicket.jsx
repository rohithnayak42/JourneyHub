import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Download, CheckCircle, MapPin, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const TrainTicket = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingState = location.state;

  useEffect(() => {
    if (!bookingState) {
      navigate('/trains');
    }
  }, [bookingState, navigate]);

  if (!bookingState) return null;

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] font-sans selection:bg-indigo-500/20 pb-20 print:bg-white print:pb-0">
      <div className="print:hidden"><Navbar /></div>
      
      {/* Top Banner */}
      <div className="bg-emerald-600 pt-10 pb-24 px-4 text-center print:hidden">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
          <CheckCircle size={32} className="text-emerald-500" />
        </motion.div>
        <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">Booking Confirmed!</h1>
        <p className="text-emerald-100 text-sm font-bold mt-2">Your E-Ticket has been successfully generated.</p>
      </div>

      <div className="max-w-3xl mx-auto px-4 w-full relative z-20 -mt-16 print:mt-10">
        
        {/* Ticket Container */}
        <div id="ticket-container" className="bg-white rounded-none border-[1px] border-dashed border-gray-400 p-6 md:p-10 shadow-2xl shadow-gray-200 print:shadow-none print:border-none relative">
          
          {/* Header */}
          <div className="flex justify-between items-start border-b-2 border-dashed border-gray-200 pb-6 mb-6">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">PNR No.</p>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">{bookingState.pnr}</h2>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Transaction ID</p>
              <p className="text-sm font-black text-gray-700">{bookingState.bookingId}</p>
            </div>
          </div>

          {/* Route details */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex-1">
              <p className="text-2xl font-black text-gray-900">{bookingState.train.departureTime}</p>
              <p className="text-sm font-bold text-gray-500">{bookingState.train.source}</p>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">{bookingState.bookingDate}</p>
            </div>
            
            <div className="flex flex-col items-center justify-center flex-[2] px-4">
              <p className="text-xs font-black text-indigo-600 tracking-tight">{bookingState.train.trainName} ({bookingState.train.trainNumber})</p>
              <div className="flex items-center w-full my-2">
                <div className="w-2 h-2 rounded-full border-2 border-indigo-300"></div>
                <div className="flex-1 border-b-2 border-dashed border-indigo-200 relative">
                    <MapPin size={12} className="absolute left-1/2 -top-2.5 -translate-x-1/2 text-indigo-400 bg-white" />
                </div>
                <div className="w-2 h-2 rounded-full border-2 border-indigo-300"></div>
              </div>
              <p className="text-[10px] font-bold text-gray-400 tracking-widest">{bookingState.train.duration}</p>
            </div>

            <div className="flex-1 text-right">
              <p className="text-2xl font-black text-gray-900">{bookingState.train.arrivalTime}</p>
              <p className="text-sm font-bold text-gray-500">{bookingState.train.destination}</p>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">{bookingState.bookingDate}</p>
            </div>
          </div>

          {/* Passenger Details */}
          <div className="bg-gray-50 rounded-xl border border-gray-100 p-4 mb-6">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 border-b border-gray-200 pb-2">Passenger Information</h3>
            <div className="flex flex-col gap-3">
              {bookingState.passengers.map((p, i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <span className="font-black text-gray-900">{p.name} <span className="font-bold text-gray-500 ml-1">({p.age} Yrs, {p.gender})</span></span>
                  <span className="font-black text-emerald-600 hidden sm:block">CNF / {bookingState.selectedClass.type} / Coach S1-{20 + i}</span>
                  <span className="font-black text-emerald-600 sm:hidden">CNF</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer details */}
          <div className="flex justify-between items-end pt-4">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Fare</p>
              <p className="text-lg font-black text-gray-900">₹{bookingState.total.toFixed(2)}</p>
            </div>
            <div className="bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-md">
              Payment Confirmed
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 h-4 flex translate-y-1/2 overflow-hidden print:hidden">
            {[...Array(30)].map((_, i) => (
              <div key={i} className="w-4 h-4 bg-[#f5f7fb] rounded-full mx-0.5 mt-2"></div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-10 flex gap-4 print:hidden flex-col sm:flex-row">
          <button 
            onClick={handleDownload} 
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-xl uppercase tracking-widest text-xs flex justify-center items-center gap-2 transition-all shadow-md"
          >
            <Download size={16} /> Download PDF Ticket
          </button>
          <button 
            onClick={() => navigate('/trains')} 
            className="flex-1 bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 font-black py-4 rounded-xl uppercase tracking-widest text-xs flex justify-center items-center gap-2 transition-all shadow-sm"
          >
            <Search size={16} /> Book Another Train
          </button>
        </div>

      </div>
    </div>
  );
};

export default TrainTicket;
