import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { 
  CreditCard, Smartphone, Building2, CheckCircle2, 
  Lock, ChevronRight, ArrowLeft, ShieldCheck
} from 'lucide-react';
import { motion } from 'framer-motion';

const HotelPayment = () => {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('finalHotelBooking');
    if (!data) {
      navigate('/hotels');
      return;
    }
    setBookingData(JSON.parse(data));
  }, [navigate]);

  const handlePay = () => {
    setProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      navigate('/hotel/confirmation');
    }, 2500);
  };

  if (!bookingData) return <div className="h-screen flex items-center justify-center font-black text-indigo-600 uppercase tracking-widest">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      {/* Step Indicator */}
      <div className="bg-white border-b border-gray-100 py-6 mb-8">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-4 text-center">
          <div className="flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-widest">
            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center"><CheckCircle2 size={14}/></span>
            Review Details
          </div>
          <ChevronRight size={14} className="text-gray-300" />
          <div className="flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-widest">
            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center">2</span>
            Secure Payment
          </div>
          <ChevronRight size={14} className="text-gray-300" />
          <div className="flex items-center gap-2 text-gray-400 font-black text-[10px] uppercase tracking-widest">
            <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center">3</span>
            Confirmation
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row gap-8 pb-20">
        
        {/* Payment Options */}
        <div className="md:w-2/3 space-y-6">
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
             <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                <h3 className="text-xl font-black text-gray-800 tracking-tight">Payment Method</h3>
                <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-full">
                  <Lock size={12} /> 256-bit SSL Secure
                </div>
             </div>

             <div className="p-4 space-y-2">
                {[
                  { id: 'upi', name: 'UPI (GPay, PhonePe, Paytm)', icon: <Smartphone className="text-indigo-600"/>, desc: 'Pay instantly using your preferred UPI app' },
                  { id: 'card', name: 'Credit / Debit Card', icon: <CreditCard className="text-indigo-600"/>, desc: 'Visa, Mastercard, RuPay & more' },
                  { id: 'netbanking', name: 'Net Banking', icon: <Building2 className="text-indigo-600"/>, desc: 'Select from all major Indian banks' }
                ].map((method) => (
                  <div 
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`flex items-start gap-4 p-6 rounded-[1.8rem] cursor-pointer transition-all border-2 ${paymentMethod === method.id ? 'bg-indigo-50/50 border-indigo-600 shadow-md' : 'bg-white border-transparent hover:bg-gray-50'}`}
                  >
                     <div className={`p-4 rounded-2xl ${paymentMethod === method.id ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-600'}`}>
                        {method.icon}
                     </div>
                     <div className="flex-1">
                        <p className="font-black text-gray-800 text-sm mb-1">{method.name}</p>
                        <p className="text-xs font-bold text-gray-400">{method.desc}</p>
                     </div>
                     <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${paymentMethod === method.id ? 'border-indigo-600 bg-white' : 'border-gray-200'}`}>
                        {paymentMethod === method.id && <div className="w-3 h-3 rounded-full bg-indigo-600"></div>}
                     </div>
                  </div>
                ))}
             </div>

             <div className="p-8 bg-gray-50/50 border-t border-gray-100 italic">
                <p className="text-[10px] font-bold text-gray-400 leading-relaxed">
                   * You will be redirected to a secure payment gateway to complete your transaction. JourneyHub does not store your card or UPI credentials.
                </p>
             </div>
          </div>

          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-indigo-600 transition-colors ml-4"
          >
            <ArrowLeft size={14} /> Back to review
          </button>
        </div>

        {/* Amount Summary */}
        <div className="md:w-1/3">
           <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden sticky top-44">
              <div className="p-8 pb-0">
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">You are paying for</p>
                 <h4 className="text-lg font-black text-gray-800 tracking-tight leading-tight mb-2">{bookingData.hotelName}</h4>
                 <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-6">{bookingData.roomName}</p>
                 
                 <div className="space-y-3 pt-6 border-t border-gray-50">
                    <div className="flex justify-between text-xs font-bold text-gray-500">
                       <span>Total Amount</span>
                       <span className="text-gray-800">₹{bookingData.priceSummary.total}</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold text-emerald-600">
                       <span>Instant Discount</span>
                       <span>- ₹{Math.round(bookingData.priceSummary.discount)}</span>
                    </div>
                 </div>
              </div>

              <div className="p-8">
                 <div className="p-6 bg-indigo-600 rounded-[1.5rem] text-white shadow-lg shadow-indigo-600/20 text-center relative overflow-hidden group">
                    <span className="relative z-10 text-[10px] font-black uppercase tracking-widest opacity-80">Payable Amount</span>
                    <h3 className="relative z-10 text-3xl font-black tracking-tight mt-1">₹{bookingData.priceSummary.total}</h3>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl translate-x-12 -translate-y-12"></div>
                 </div>

                 <button 
                  onClick={handlePay}
                  disabled={processing}
                  className={`w-full mt-6 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl transition-all flex items-center justify-center gap-3 ${processing ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20'}`}
                 >
                   {processing ? (
                      <>
                        <div className="w-5 h-5 border-3 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
                        Processing Payment...
                      </>
                   ) : (
                      <>Secure Payment <ChevronRight size={18}/></>
                   )}
                 </button>
                 
                 <div className="mt-6 flex items-center justify-center gap-4">
                    <ShieldCheck size={24} className="text-gray-300" />
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-tight">
                       Trusted by 10M+ Travelers <br/> Worldwide
                    </span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default HotelPayment;
