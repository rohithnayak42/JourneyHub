import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Check, ChevronRight, CreditCard, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BookingPage = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Form State
  const [guest, setGuest] = useState({ name: '', email: '', phone: '' });

  // Simulate a booking flow delay
  const handlePayment = (e) => {
     e.preventDefault();
     setIsProcessing(true);
     setTimeout(() => {
        setIsProcessing(false);
        setStep(4); // Success State
     }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans flex flex-col">
      <Navbar />
      
      {/* Header */}
      <div className="bg-gray-900 pt-10 pb-20 px-4 relative">
         <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">Complete your Booking</h1>
            
            {/* Stepper */}
            {step < 4 && (
               <div className="flex items-center gap-2 mt-6 relative z-10 w-full overflow-hidden">
                  <div className={`flex items-center gap-2 ${step >= 1 ? 'text-white' : 'text-gray-500'}`}>
                     <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${step >= 1 ? 'bg-blue-600' : 'bg-gray-700'}`}>1</span>
                     <span className="text-xs font-bold uppercase tracking-widest hidden md:block">Review</span>
                  </div>
                  <div className={`flex-1 h-[2px] ${step >= 2 ? 'bg-blue-600' : 'bg-gray-700'}`}></div>
                  <div className={`flex items-center gap-2 ${step >= 2 ? 'text-white' : 'text-gray-500'}`}>
                     <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${step >= 2 ? 'bg-blue-600' : 'bg-gray-700'}`}>2</span>
                     <span className="text-xs font-bold uppercase tracking-widest hidden md:block">Guest Details</span>
                  </div>
                  <div className={`flex-1 h-[2px] ${step >= 3 ? 'bg-blue-600' : 'bg-gray-700'}`}></div>
                  <div className={`flex items-center gap-2 ${step >= 3 ? 'text-white' : 'text-gray-500'}`}>
                     <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${step >= 3 ? 'bg-blue-600' : 'bg-gray-700'}`}>3</span>
                     <span className="text-xs font-bold uppercase tracking-widest hidden md:block">Payment</span>
                  </div>
               </div>
            )}
         </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 w-full flex flex-col md:flex-row gap-8 relative z-20 -mt-10 mb-16">
         
         <div className="flex-1 bg-white rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-gray-100 p-6 md:p-10 relative overflow-hidden">
            <AnimatePresence mode="wait">
               {step === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                     <h2 className="text-xl font-black text-gray-800 mb-6 border-b border-gray-100 pb-4">Review Selection</h2>
                     <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 mb-6">
                        <div className="flex justify-between items-start">
                           <div>
                              <h3 className="font-black text-lg text-gray-800 tracking-tight">New Delhi to Mumbai {type === 'flight' ? 'Flight' : (type || 'Booking')}</h3>
                              <p className="text-[10px] font-bold text-gray-500 mt-1 uppercase tracking-widest">01 Apr 2026 • 1 Adult</p>
                           </div>
                           <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest shadow-sm">Premium</span>
                        </div>
                     </div>
                     <button onClick={() => setStep(2)} className="w-full bg-gray-900 hover:bg-black text-white font-black py-4 rounded-xl uppercase tracking-widest text-[11px] flex justify-center items-center gap-2 transition-all shadow-md group">
                        Continue to Guest Details <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                     </button>
                  </motion.div>
               )}

               {step === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                     <h2 className="text-xl font-black text-gray-800 mb-6 border-b border-gray-100 pb-4">Guest Details</h2>
                     <form className="flex flex-col gap-5" onSubmit={(e) => { e.preventDefault(); setStep(3); }}>
                        <div>
                           <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Full Name</label>
                           <input required type="text" value={guest.name} onChange={e=>setGuest({...guest, name: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-bold text-gray-800 outline-none focus:border-blue-500 transition-colors shadow-inner" placeholder="As per govt ID" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                           <div>
                              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Email Address</label>
                              <input required type="email" value={guest.email} onChange={e=>setGuest({...guest, email: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-bold text-gray-800 outline-none focus:border-blue-500 transition-colors shadow-inner" placeholder="For tickes" />
                           </div>
                           <div>
                              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Phone Number</label>
                              <input required type="tel" value={guest.phone} onChange={e=>setGuest({...guest, phone: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-bold text-gray-800 outline-none focus:border-blue-500 transition-colors shadow-inner" placeholder="+91" />
                           </div>
                        </div>
                        <div className="flex gap-4 mt-4">
                           <button type="button" onClick={() => setStep(1)} className="flex-1 bg-white border border-gray-200 text-gray-600 font-black py-4 rounded-xl uppercase tracking-widest text-[11px] hover:bg-gray-50 hover:text-gray-900 transition-colors">
                              Back
                           </button>
                           <button type="submit" className="flex-[2] bg-gray-900 hover:bg-black text-white font-black py-4 rounded-xl uppercase tracking-widest text-[11px] flex justify-center items-center gap-2 transition-all shadow-md group">
                              Proceed to Payment <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                           </button>
                        </div>
                     </form>
                  </motion.div>
               )}

               {step === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                     <h2 className="text-xl font-black text-gray-800 mb-6 border-b border-gray-100 pb-4">Secure Payment</h2>
                     <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-5 mb-6 flex items-center gap-4">
                        <ShieldCheck size={28} className="text-emerald-500" />
                        <div>
                           <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">100% Secure Transaction</p>
                           <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest mt-0.5">256-bit encryption protected process</p>
                        </div>
                     </div>
                     <form className="flex flex-col gap-5" onSubmit={handlePayment}>
                        <div>
                           <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Card Number</label>
                           <div className="relative">
                              <input required type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3 font-black text-gray-800 outline-none focus:border-blue-500 transition-colors tracking-[0.2em] shadow-inner" placeholder="0000 0000 0000 0000" maxLength="19" />
                              <CreditCard size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                           </div>
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                           <div>
                              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Expiry Date</label>
                              <input required type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-black text-gray-800 outline-none focus:border-blue-500 transition-colors tracking-[0.2em] shadow-inner" placeholder="MM/YY" maxLength="5" />
                           </div>
                           <div>
                              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">CVV</label>
                              <input required type="password" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-black text-gray-800 outline-none focus:border-blue-500 transition-colors tracking-[0.2em] shadow-inner" placeholder="***" maxLength="3" />
                           </div>
                        </div>
                        <div className="flex gap-4 mt-6">
                           <button type="button" disabled={isProcessing} onClick={() => setStep(2)} className="flex-1 bg-white border border-gray-200 text-gray-600 font-black py-4 rounded-xl uppercase tracking-widest text-[11px] hover:bg-gray-50 hover:text-gray-900 transition-colors disabled:opacity-50">
                              Back
                           </button>
                           <button type="submit" disabled={isProcessing} className="flex-[2] bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl uppercase tracking-widest text-[11px] flex justify-center items-center gap-2 transition-all shadow-[0_10px_20px_rgba(37,99,235,0.3)] disabled:opacity-70 relative overflow-hidden group btn-shine">
                              {isProcessing ? 'Processing...' : 'Pay ₹4,200'}
                              {!isProcessing && <span className="absolute inset-0 w-full h-full -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-[shine_1.5s_ease-in-out_infinite]"></span>}
                           </button>
                        </div>
                     </form>
                  </motion.div>
               )}

               {step === 4 && (
                  <motion.div key="step4" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center text-center py-10">
                     <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6 shadow-inner border border-emerald-100">
                        <Check size={32} className="text-emerald-500" strokeWidth={3} />
                     </div>
                     <h2 className="text-3xl font-black text-gray-800 tracking-tight mb-2">Booking Confirmed!</h2>
                     <p className="text-xs font-bold text-gray-500 mb-8 max-w-sm">Your booking has been successfully processed. The e-ticket has been sent to your email.</p>
                     
                     <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 w-full max-w-sm flex justify-between items-center mb-8 shadow-sm">
                        <div className="text-left">
                           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Booking ID</p>
                           <p className="text-lg font-black text-gray-800 mt-0.5">TXN-{Math.floor(Math.random() * 900000) + 100000}</p>
                        </div>
                        <div className="text-right">
                           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Amount Paid</p>
                           <p className="text-lg font-black text-emerald-600 mt-0.5">₹4,200</p>
                        </div>
                     </div>

                     <button onClick={() => navigate('/dashboard')} className="bg-gray-900 hover:bg-black text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all shadow-md group">
                        Go to Dashboard <ChevronRight size={14} className="inline ml-1 group-hover:translate-x-1 transition-transform" />
                     </button>
                  </motion.div>
               )}
            </AnimatePresence>
         </div>
      </div>
    </div>
  );
};
export default BookingPage;
