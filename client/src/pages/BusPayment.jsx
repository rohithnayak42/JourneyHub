import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ArrowLeft, Check, CreditCard, ShieldCheck, Smartphone, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BusPayment = () => {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('busBookingData');
    if (data) {
      setBookingData(JSON.parse(data));
    } else {
      navigate('/buses');
    }
  }, [navigate]);

  if (!bookingData) return null;

  const handlePayment = (e) => {
    e.preventDefault();
    if (!paymentMethod) return;
    
    const confirmPay = window.confirm(`Proceed to pay ₹${bookingData.totalAmount}?`);
    if (!confirmPay) return;

    setIsProcessing(true);
    setTimeout(() => {
       setIsProcessing(false);
       
       // Generate Booking ID and store ticket data
       const bookingID = "JH" + Math.floor(Math.random() * 1000000);
       const finalTicketData = {
          ...bookingData,
          paymentMethod,
          bookingID,
          bookingDate: new Date().toLocaleString()
       };
       localStorage.setItem('ticketData', JSON.stringify(finalTicketData));
       
       setIsSuccess(true);
       localStorage.removeItem('busBookingData'); // Clean up partial flow
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />

      {!isSuccess && (
         <div className="bg-gray-900 pt-8 pb-16 px-4 relative">
            <div className="max-w-7xl mx-auto flex items-center gap-6">
               <button 
                  onClick={() => navigate(-1)} 
                  className="p-2 hover:bg-gray-800 rounded-full transition-colors text-gray-400 hover:text-white"
               >
                  <ArrowLeft size={24} />
               </button>
               <div className="flex flex-col flex-1">
                  <h1 className="text-2xl font-black text-white tracking-tight">Complete Payment</h1>
               </div>
            </div>
            
            {/* Stepper */}
            <div className="max-w-3xl mx-auto mt-8 relative z-10 w-full overflow-hidden">
               <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 text-white">
                     <span className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-black bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]">✓</span>
                     <span className="text-sm font-bold uppercase tracking-widest hidden md:block">Seats & Passengers</span>
                  </div>
                  <div className="flex-1 h-[2px] bg-emerald-500 mx-4"></div>
                  <div className="flex items-center gap-2 text-white">
                     <span className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-black bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]">✓</span>
                     <span className="text-sm font-bold uppercase tracking-widest hidden md:block">Boarding</span>
                  </div>
                  <div className="flex-1 h-[2px] bg-emerald-500 mx-4"></div>
                  <div className="flex items-center gap-2 text-white">
                     <span className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-black bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]">3</span>
                     <span className="text-sm font-bold uppercase tracking-widest hidden md:block">Payment</span>
                  </div>
               </div>
            </div>
         </div>
      )}

      <div className="max-w-7xl mx-auto px-4 w-full flex flex-col lg:flex-row gap-8 relative z-20 -mt-10 mb-16 flex-1">
        
        <AnimatePresence mode="wait">
        {isSuccess ? (
           <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 max-w-4xl mx-auto w-full mt-6">
              <div className="text-center mb-8">
                 <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner border border-emerald-100">
                    <Check size={40} className="text-emerald-500" strokeWidth={3} />
                 </div>
                 <h2 className="text-3xl font-black text-gray-800 tracking-tight">Payment Successful!</h2>
                 <p className="text-sm font-bold text-gray-500 mt-2">Your confirmed e-ticket is generated below.</p>
              </div>

              {/* Professional Ticket UI */}
              <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden relative">
                 {/* Decorative edges */}
                 <div className="absolute top-1/2 -left-4 w-8 h-8 bg-gray-50 rounded-full border border-gray-100 -translate-y-1/2"></div>
                 <div className="absolute top-1/2 -right-4 w-8 h-8 bg-gray-50 rounded-full border border-gray-100 -translate-y-1/2"></div>
                 <div className="absolute top-1/2 left-4 right-4 border-t-2 border-dashed border-gray-200"></div>

                 {/* Top section */}
                 <div className="bg-gradient-to-r from-red-600 to-red-500 p-8 text-white">
                    <div className="flex justify-between items-start mb-6">
                       <div>
                          <span className="bg-white/20 px-3 py-1 rounded border border-white/20 text-xs font-black uppercase tracking-widest backdrop-blur-sm">Confirmed Ticket</span>
                          <h3 className="text-2xl font-black mt-3 tracking-wide">{bookingData.busName}</h3>
                          <p className="text-red-100 font-medium text-sm mt-1">{bookingData.busType}</p>
                       </div>
                       <div className="text-right">
                          <p className="text-red-200 text-xs font-black uppercase tracking-widest mb-1">Booking ID</p>
                          <p className="text-xl font-black bg-white text-red-600 px-3 border-2 border-dashed border-red-300 py-1 inline-block">JH{Math.floor(Math.random() * 900000) + 100000}</p>
                       </div>
                    </div>
                    
                    <div className="flex justify-between items-center bg-white/10 rounded-2xl p-5 border border-white/10 backdrop-blur-sm">
                       <div className="w-1/3">
                          <p className="text-red-200 text-[10px] font-black uppercase tracking-widest mb-1">Boarding</p>
                          <p className="font-bold text-lg leading-tight">{bookingData.from}</p>
                          <p className="text-sm font-medium text-red-100 mt-1 lines-clamp-1">{bookingData.boardingPoint}</p>
                          <p className="text-xs font-black bg-black/20 text-white w-max px-2 py-0.5 rounded mt-2">{bookingData.time}</p>
                       </div>
                       
                       <div className="flex-1 flex flex-col items-center justify-center px-4">
                          <span className="text-red-200 text-xs mb-2">●───────●</span>
                          <span className="text-[10px] bg-red-700/50 border border-red-400/30 px-3 py-0.5 rounded-full uppercase font-black tracking-widest">Journey</span>
                       </div>

                       <div className="w-1/3 text-right">
                          <p className="text-red-200 text-[10px] font-black uppercase tracking-widest mb-1">Dropping</p>
                          <p className="font-bold text-lg leading-tight">{bookingData.to}</p>
                          <p className="text-sm font-medium text-red-100 mt-1 lines-clamp-1">{bookingData.droppingPoint}</p>
                       </div>
                    </div>
                 </div>

                 {/* Bottom section */}
                 <div className="p-8 pb-10 flex flex-col md:flex-row gap-8 pt-12">
                    <div className="flex-1">
                       <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Passenger Details</h4>
                       <div className="flex flex-col gap-3">
                          {bookingData.passengers.map((p, index) => (
                             <div key={index} className="flex justify-between items-center border-b border-gray-100 pb-3 last:border-0">
                                <div>
                                   <p className="font-bold text-gray-800 text-sm">{p.name}</p>
                                   <p className="text-xs text-gray-500 font-medium">{p.age} yrs • {p.gender}</p>
                                </div>
                                <span className="font-black text-xs text-red-500 uppercase bg-red-50 border border-red-100 px-3 py-1.5 rounded-lg shadow-[inset_0_2px_4px_rgba(255,255,255,0.7)]">Seat {p.seat}</span>
                             </div>
                          ))}
                       </div>
                    </div>

                    <div className="md:w-64 bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col justify-center h-max">
                       <div className="mb-4 text-center">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Amount</p>
                          <p className="text-3xl font-black text-gray-800 mt-1">₹{bookingData.totalAmount}</p>
                          <p className="text-[10px] font-bold text-green-600 mt-1 uppercase tracking-widest">Paid via {paymentMethod || 'UPI'}</p>
                       </div>
                       
                       <button onClick={() => window.print()} className="w-full bg-gray-900 hover:bg-black py-3 rounded-xl text-white text-xs font-black uppercase tracking-widest shadow-md transition-all">
                          Download PDF
                       </button>
                    </div>
                 </div>
              </div>

              <div className="text-center mt-8">
                 <button onClick={() => navigate('/dashboard')} className="text-sm font-bold text-gray-500 hover:text-gray-800 underline underline-offset-4 transition-colors">
                    Return to Dashboard
                 </button>
              </div>
           </motion.div>
        ) : (
           <>
              {/* Left Side: Payment Options */}
              <div className="flex-[1.5] bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 relative overflow-hidden flex flex-col">
                  <div className="flex items-center gap-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl p-5 mb-8">
                     <ShieldCheck size={32} className="text-emerald-500" />
                     <div>
                        <p className="text-xs font-black text-emerald-700 uppercase tracking-widest">100% Secure Payment</p>
                        <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mt-1">Fast, safe & authenticated checkouts</p>
                     </div>
                  </div>
                  
                  <h2 className="text-xl font-black text-gray-800 mb-6 drop-shadow-sm border-b border-gray-100 pb-4">Select Payment Method</h2>
                  
                  <form onSubmit={handlePayment} className="flex flex-col flex-1 gap-6 text-sm font-bold text-gray-700">
                     <label className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === 'upi' ? 'border-red-500 bg-red-50/30' : 'border-gray-100 hover:border-red-200'}`}>
                        <input type="radio" name="payment" value="upi" className="hidden" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} />
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'upi' ? 'border-red-500' : 'border-gray-300'}`}>
                           {paymentMethod === 'upi' && <div className="w-3 h-3 rounded-full bg-red-500"></div>}
                        </div>
                        <div className="flex items-center gap-3">
                           <div className="p-3 bg-gray-50 rounded-xl text-indigo-500"><Smartphone size={24} /></div>
                           <span className="text-base font-black">UPI (Google Pay, PhonePe, Paytm)</span>
                        </div>
                     </label>

                     <label className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-red-500 bg-red-50/30' : 'border-gray-100 hover:border-red-200'}`}>
                        <input type="radio" name="payment" value="card" className="hidden" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'card' ? 'border-red-500' : 'border-gray-300'}`}>
                           {paymentMethod === 'card' && <div className="w-3 h-3 rounded-full bg-red-500"></div>}
                        </div>
                        <div className="flex items-center gap-3">
                           <div className="p-3 bg-gray-50 rounded-xl text-blue-500"><CreditCard size={24} /></div>
                           <span className="text-base font-black">Credit / Debit Card</span>
                        </div>
                     </label>

                     <label className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === 'netbanking' ? 'border-red-500 bg-red-50/30' : 'border-gray-100 hover:border-red-200'}`}>
                        <input type="radio" name="payment" value="netbanking" className="hidden" checked={paymentMethod === 'netbanking'} onChange={() => setPaymentMethod('netbanking')} />
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'netbanking' ? 'border-red-500' : 'border-gray-300'}`}>
                           {paymentMethod === 'netbanking' && <div className="w-3 h-3 rounded-full bg-red-500"></div>}
                        </div>
                        <div className="flex items-center gap-3">
                           <div className="p-3 bg-gray-50 rounded-xl text-purple-500"><Building2 size={24} /></div>
                           <span className="text-base font-black">Net Banking</span>
                        </div>
                     </label>
                     
                     <div className="mt-8 border-t border-gray-100 pt-8">
                        {/* Only render inputs if a card is selected to show realism */}
                        {paymentMethod === 'card' && (
                           <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="flex flex-col gap-5 mb-8">
                              <div>
                                 <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Card Number</label>
                                 <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 font-black text-gray-800 outline-none hover:border-gray-300 focus:border-red-500 transition-colors tracking-[0.2em]" maxLength="19" required />
                              </div>
                              <div className="grid grid-cols-2 gap-5">
                                 <div>
                                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Expiry</label>
                                    <input type="text" placeholder="MM/YY" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 font-black text-gray-800 outline-none hover:border-gray-300 focus:border-red-500 transition-colors tracking-[0.2em]" maxLength="5" required />
                                 </div>
                                 <div>
                                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">CVV</label>
                                    <input type="password" placeholder="***" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 font-black text-gray-800 outline-none hover:border-gray-300 focus:border-red-500 transition-colors tracking-[0.2em]" maxLength="3" required />
                                 </div>
                              </div>
                           </motion.div>
                        )}
                        <button 
                           type="submit"
                           disabled={!paymentMethod || isProcessing}
                           className={`w-full py-5 rounded-xl font-black text-white uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-2 relative overflow-hidden group btn-shine ${paymentMethod && !isProcessing ? 'bg-red-500 hover:bg-red-600 hover:-translate-y-1 hover:shadow-red-500/30' : 'bg-gray-300 cursor-not-allowed opacity-70 border-none shadow-none'}`}
                        >
                           {isProcessing ? 'Processing Payment...' : `Pay ₹${bookingData.totalAmount}`}
                           {paymentMethod && !isProcessing && <span className="absolute inset-0 w-full h-full -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-[shine_1.5s_ease-in-out_infinite]"></span>}
                        </button>
                     </div>
                  </form>
              </div>

              {/* Right Side: Detailed SummaryComponent */}
              <div className="flex-[1] xl:max-w-[450px] flex flex-col gap-6">
                 <div className="bg-white rounded-[2rem] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-gray-100 flex-1 flex flex-col">
                    <h4 className="font-black text-lg text-gray-800 mb-6 border-b border-gray-100 pb-4">Itinerary</h4>
                    
                    <div className="bg-gray-50 border border-gray-100 p-5 rounded-xl mb-6">
                       <h5 className="font-black text-gray-800 mb-1">{bookingData.busName}</h5>
                       <p className="text-xs font-bold text-gray-500">{bookingData.busType}</p>
                    </div>

                    <div className="flex flex-col relative z-0 border-l-[3px] border-dashed border-gray-200 ml-4 pl-8 pt-2 pb-6">
                       <div className="relative mb-10 group">
                          <div className="absolute -left-[43px] top-1 w-5 h-5 rounded-full bg-white border-[5px] border-orange-500 z-10"></div>
                          <div className="flex flex-col gap-1">
                             <span className="text-xs font-black text-orange-600 uppercase tracking-widest">Boarding</span>
                             <h5 className="font-bold text-gray-800 text-sm mt-1">{bookingData.boardingPoint}</h5>
                          </div>
                       </div>
                       <div className="relative group">
                          <div className="absolute -left-[43px] top-1 w-5 h-5 rounded-full bg-white border-[5px] border-blue-500 z-10"></div>
                          <div className="flex flex-col gap-1">
                             <span className="text-xs font-black text-blue-600 uppercase tracking-widest">Dropping</span>
                             <h5 className="font-bold text-gray-800 text-sm mt-1">{bookingData.droppingPoint}</h5>
                          </div>
                       </div>
                    </div>

                    <div className="flex flex-col gap-3 mt-4">
                       {bookingData.passengers.map((p, index) => (
                          <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                             <div className="flex items-center gap-3">
                                <span className="font-black text-xs text-red-500 uppercase bg-red-50 border border-red-100 px-2 py-1 rounded">Seat {p.seat}</span>
                                <div>
                                   <p className="font-bold text-gray-800 text-xs">{p.name}</p>
                                </div>
                             </div>
                          </div>
                       ))}
                    </div>

                    <div className="mt-auto pt-6 border-t border-gray-100">
                       <div className="flex justify-between items-end">
                          <span className="text-sm font-black text-gray-500 uppercase tracking-widest">Amount to Pay</span>
                          <span className="text-4xl font-black text-red-600 tracking-tight">₹{bookingData.totalAmount}</span>
                       </div>
                    </div>
                 </div>
              </div>
           </>
        )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default BusPayment;
