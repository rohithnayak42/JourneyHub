import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ShieldCheck, CreditCard, Wallet, Smartphone, ChevronRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const TrainPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingState = location.state;
  
  const [method, setMethod] = useState('UPI');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    if (!bookingState) {
      navigate('/trains');
    }
  }, [bookingState, navigate]);

  if (!bookingState) return null;

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      setTimeout(() => {
        navigate('/train/ticket', { state: bookingState });
      }, 1500);
    }, 2500); // Simulate network
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] font-sans selection:bg-indigo-500/20">
      <Navbar />
      
      <div className="bg-gray-900 pt-10 pb-20 px-4 relative">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">Complete Payment</h1>
            <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">Secure Checkout via IRCTC Server</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Amount to Pay</p>
            <p className="text-2xl font-black text-emerald-400 leading-none">₹{bookingState.total.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 w-full relative z-20 -mt-10 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Payment Methods */}
          <div className="md:col-span-8 bg-white rounded-[2rem] shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="text-xl font-black text-gray-900 tracking-tight mb-6">Select Payment Method</h2>
            
            <div className="flex flex-col gap-4 mb-8">
              {/* UPI */}
              <label className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${method === 'UPI' ? 'border-indigo-600 bg-indigo-50/50 shadow-md' : 'border-gray-100 bg-white hover:border-gray-200'}`}>
                <div className="relative flex items-center justify-center">
                  <input type="radio" checked={method === 'UPI'} onChange={() => setMethod('UPI')} className="peer w-5 h-5 appearance-none border-2 border-gray-300 rounded-full focus:outline-none checked:border-indigo-600 transition-all"/>
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 absolute opacity-0 peer-checked:opacity-100 pointer-events-none transition-all"></div>
                </div>
                <div className="bg-emerald-50 text-emerald-600 p-2 rounded-xl"><Smartphone size={20} /></div>
                <div className="flex-1">
                  <p className="text-sm font-black text-gray-900">UPI (GPay, PhonePe, Paytm)</p>
                  <p className="text-[10px] font-bold text-gray-500">Zero processing fee</p>
                </div>
              </label>

              {/* Card */}
              <label className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${method === 'CARD' ? 'border-indigo-600 bg-indigo-50/50 shadow-md' : 'border-gray-100 bg-white hover:border-gray-200'}`}>
                <div className="relative flex items-center justify-center">
                  <input type="radio" checked={method === 'CARD'} onChange={() => setMethod('CARD')} className="peer w-5 h-5 appearance-none border-2 border-gray-300 rounded-full focus:outline-none checked:border-indigo-600 transition-all"/>
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 absolute opacity-0 peer-checked:opacity-100 pointer-events-none transition-all"></div>
                </div>
                <div className="bg-blue-50 text-blue-600 p-2 rounded-xl"><CreditCard size={20} /></div>
                <div className="flex-1">
                  <p className="text-sm font-black text-gray-900">Credit / Debit Card</p>
                  <p className="text-[10px] font-bold text-gray-500">Supports Visa, Mastercard, RuPay</p>
                </div>
              </label>

              {/* Netbanking */}
              <label className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${method === 'NET' ? 'border-indigo-600 bg-indigo-50/50 shadow-md' : 'border-gray-100 bg-white hover:border-gray-200'}`}>
                <div className="relative flex items-center justify-center">
                  <input type="radio" checked={method === 'NET'} onChange={() => setMethod('NET')} className="peer w-5 h-5 appearance-none border-2 border-gray-300 rounded-full focus:outline-none checked:border-indigo-600 transition-all"/>
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 absolute opacity-0 peer-checked:opacity-100 pointer-events-none transition-all"></div>
                </div>
                <div className="bg-orange-50 text-orange-600 p-2 rounded-xl"><Wallet size={20} /></div>
                <div className="flex-1">
                  <p className="text-sm font-black text-gray-900">Net Banking</p>
                  <p className="text-[10px] font-bold text-gray-500">All major banks supported</p>
                </div>
              </label>
            </div>

            <button 
              onClick={handlePayment} 
              disabled={isProcessing || paymentSuccess}
              className={`w-full text-white font-black py-4 rounded-xl uppercase tracking-widest text-xs flex justify-center items-center gap-2 transition-all shadow-xl disabled:cursor-not-allowed group relative overflow-hidden ${paymentSuccess ? 'bg-emerald-500 shadow-emerald-500/20' : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20 disabled:opacity-50'}`}
            >
              {paymentSuccess ? (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                  <CheckCircle size={18} className="text-white" /> Payment Successful!
                </motion.div>
              ) : isProcessing ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Processing Securely...
                </>
              ) : (
                <>Pay ₹{bookingState.total.toFixed(2)} Now</>
              )}
            </button>
          </div>

          {/* Quick Summary */}
          <div className="md:col-span-4">
            <div className="bg-emerald-50 border border-emerald-100 rounded-[2rem] p-6 sticky top-24">
              <ShieldCheck size={28} className="text-emerald-500 mb-4" />
              <h3 className="text-lg font-black text-gray-900 tracking-tight leading-tight mb-2">100% Secure Payment</h3>
              <p className="text-xs font-bold text-gray-500 mb-6">Your transaction is encrypted with 256-bit SSL technology.</p>
              
              <div className="border border-emerald-200/50 bg-white/50 rounded-xl p-4">
                <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest mb-1">Booking For</p>
                <p className="text-sm font-black text-gray-900">{bookingState.train.trainName}</p>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">{bookingState.passengers.length} Passenger(s) • {bookingState.selectedClass.type}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TrainPayment;
