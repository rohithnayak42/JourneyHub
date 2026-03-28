import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Train, Clock, ShieldCheck, UserPlus, Info, Tag, ArrowRight, 
  Trash2, Plus, CheckCircle2, AlertCircle, ChevronRight, Check
} from 'lucide-react';

const TrainBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { train, selectedClass, quota } = location.state || {};

  useEffect(() => {
    if (!train || !selectedClass) {
      navigate('/trains');
    }
  }, [train, selectedClass, navigate]);

  // State Management
  const [passengers, setPassengers] = useState([{ id: Date.now(), name: '', age: '', gender: '', berth: '' }]);
  const [preferences, setPreferences] = useState({ autoUpgrade: true, lowerBerthPreferred: false });
  const [irctcUser, setIrctcUser] = useState('');
  const [irctcPass, setIrctcPass] = useState('');
  const [contact, setContact] = useState({ email: '', phone: '' });
  const [boardingStation, setBoardingStation] = useState('');

  const isFormValid = () => {
    return (
      irctcUser.trim() !== '' &&
      irctcPass.trim() !== '' &&
      contact.email.trim() !== '' &&
      contact.phone.trim() !== '' &&
      boardingStation !== '' &&
      passengers.every(p => p.name.trim() !== '' && p.age !== '' && p.gender !== '')
    );
  };
  const [protection, setProtection] = useState(true);
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(1);

  if (!train || !selectedClass) return null;

  // Pricing Logic
  const baseFare = selectedClass.price * passengers.length;
  const convenienceFee = 17.7;
  const agentFee = 40.0;
  const protectionFee = protection ? 250 * passengers.length : 0;
  const discount = couponApplied ? baseFare * 0.1 : 0; // 10% discount for demo
  const total = baseFare + convenienceFee + agentFee + protectionFee - discount;

  // Handlers
  const handleAddPassenger = () => {
    if (passengers.length < 6) {
      setPassengers([...passengers, { id: Date.now(), name: '', age: '', gender: '', berth: '' }]);
    }
  };

  const handleRemovePassenger = (id) => {
    if (passengers.length > 1) {
      setPassengers(passengers.filter(p => p.id !== id));
    }
  };

  const handlePassengerChange = (id, field, value) => {
    setPassengers(passengers.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleApplyCoupon = () => {
    if (coupon.trim().toUpperCase() === 'JOURNEY10') {
      setCouponApplied(true);
    } else {
      alert('Invalid Coupon Code. Try JOURNEY10');
    }
  };

  const validateAndProceed = () => {
    if (!isFormValid()) return;
    
    navigate('/train/payment', { 
      state: { 
        train, 
        selectedClass, 
        passengers, 
        contact, 
        total, 
        quota, 
        bookingDate: "01 Apr 2026",
        pnr: Math.floor(1000000000 + Math.random() * 9000000000).toString(),
        bookingId: `TXN-${Math.floor(Math.random() * 900000) + 100000}`
      } 
    });
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] font-sans selection:bg-indigo-500/20 text-gray-800 pb-20">
      <Navbar />

      {step === 1 ? (
        <>
          {/* 1. Sticky Top Summary Bar */}
          <div className="bg-white border-b border-gray-200 sticky top-20 z-40 shadow-sm transition-all py-4 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4 md:gap-5 w-full md:w-auto">
                <button 
                  onClick={() => navigate(-1)} 
                  className="flex items-center bg-white border border-gray-200 px-3 py-2 md:px-4 md:py-2.5 rounded-xl text-xs md:text-sm font-black text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 transition-all shadow-sm whitespace-nowrap"
                  aria-label="Go back to search results"
                >
                  ← Back to Results
                </button>
                <div className="hidden sm:block bg-gray-900 p-2 md:p-3 rounded-xl md:rounded-2xl text-white shadow-lg shadow-gray-900/10">
                  <Train size={24} className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div>
                  <h1 className="text-xl font-black text-gray-900 tracking-tight leading-none mb-1">
                    {train.trainName} <span className="text-indigo-600 ml-2">({train.trainNumber})</span>
                  </h1>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <span>{train.source}</span>
                    <ArrowRight size={12} className="text-gray-300" />
                    <span>{train.destination}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full mx-1"></span>
                    <span>{train.departureTime} - {train.arrivalTime}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full mx-1"></span>
                    <span className="text-gray-500 font-black flex items-center gap-1"><Clock size={12}/> {train.duration}</span>
                  </p>
                </div>
              </div>
              <div className="bg-indigo-50 border border-indigo-100 px-5 py-2.5 rounded-xl flex items-center gap-3">
                <div className="flex flex-col text-right">
                  <span className="text-[10px] uppercase font-black tracking-widest text-indigo-400">Selected Class</span>
                  <span className="text-sm font-black text-indigo-700">{selectedClass.type} | {quota} Quota</span>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
            <div className="flex flex-col lg:flex-row gap-8">
              
              {/* Left Column - Forms */}
              <div className="flex-[2] flex flex-col gap-6">
                
                {/* Login Integration */}
                {user ? (
                  <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-white p-2 rounded-full shadow-sm text-emerald-600"><CheckCircle2 size={20} /></div>
                      <div>
                        <p className="text-sm font-black text-emerald-800">Logged in as {user.name || 'User'}</p>
                        <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mt-0.5">Booking details will be auto-saved</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-blue-50 border border-blue-100 p-6 rounded-[1.5rem] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="bg-white p-3 rounded-full shadow-sm text-blue-600 border border-blue-50 mt-1"><UserPlus size={24} /></div>
                      <div>
                        <p className="text-lg font-black text-blue-900 tracking-tight">Login for faster booking</p>
                        <p className="text-xs font-bold text-blue-600 mt-1 leading-relaxed">Unlock saved passengers, auto-filled IRCTC details, & exclusive journey offers.</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => navigate('/login', { state: { from: location.pathname, ...location.state } })} 
                      className="bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest text-[10px] px-8 py-3.5 rounded-xl shadow-lg shadow-blue-600/20 transition-all hover:scale-105 whitespace-nowrap"
                    >
                      Login Now
                    </button>
                  </div>
                )}

                {/* 2. Add Travellers */}
                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 md:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                      <UserPlus size={20} className="text-indigo-500"/> Add Travellers
                    </h2>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{passengers.length}/6 Passengers</span>
                  </div>

                  <AnimatePresence mode="popLayout">
                    {passengers.map((p, index) => (
                      <motion.div 
                        key={p.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="p-4 bg-gray-50 border border-gray-200 rounded-2xl mb-4 relative"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-black text-gray-700 uppercase tracking-widest">Passenger {index + 1}</span>
                          {passengers.length > 1 && (
                            <button onClick={() => handleRemovePassenger(p.id)} className="text-red-400 hover:text-red-600 transition-colors">
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                          <div className="md:col-span-5">
                            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 mt-0">Full Name</label>
                            <input type="text" value={p.name} onChange={e=>handlePassengerChange(p.id, 'name', e.target.value)} placeholder="As per Govt ID" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 font-bold text-gray-800 outline-none focus:border-indigo-500 transition-colors shadow-sm" />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 mt-0">Age</label>
                            <input type="number" value={p.age} onChange={e=>handlePassengerChange(p.id, 'age', e.target.value)} placeholder="Yrs" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 font-bold text-gray-800 outline-none focus:border-indigo-500 transition-colors shadow-sm" />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 mt-0">Gender</label>
                            <select value={p.gender} onChange={e=>handlePassengerChange(p.id, 'gender', e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl px-3 py-3 font-bold text-gray-800 outline-none focus:border-indigo-500 transition-colors shadow-sm">
                              <option value="">Select</option>
                              <option value="M">Male</option>
                              <option value="F">Female</option>
                            </select>
                          </div>
                          <div className="md:col-span-3">
                            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 mt-0">Berth Pref.</label>
                            <select value={p.berth} onChange={e=>handlePassengerChange(p.id, 'berth', e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl px-3 py-3 font-bold text-gray-800 outline-none focus:border-indigo-500 transition-colors shadow-sm">
                              <option value="">No Pref</option>
                              <option value="LB">Lower</option>
                              <option value="MB">Middle</option>
                              <option value="UB">Upper</option>
                              <option value="SL">Side Lower</option>
                            </select>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {passengers.length < 6 && (
                    <button onClick={handleAddPassenger} className="flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-widest mt-2 hover:bg-indigo-50 px-4 py-3 rounded-xl transition-colors">
                      <Plus size={16} /> Add Another Traveller
                    </button>
                  )}
                </div>

                {/* 3. Smart Boarding & Prefs */}
                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 md:p-8">
                  <h2 className="text-xl font-black text-gray-900 tracking-tight mb-6">Travel Preferences</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Boarding Station</label>
                      <select value={boardingStation} onChange={(e) => setBoardingStation(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-bold text-gray-800 outline-none focus:border-indigo-500 transition-colors shadow-sm">
                        <option value="">Select Boarding Station</option>
                        <option value={`${train.source} - 16:55`}>{train.source} - 16:55</option>
                      </select>
                    </div>
                    <div className="flex gap-4 items-center">
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <div className="relative flex items-center justify-center mt-0.5">
                          <input type="checkbox" checked={preferences.autoUpgrade} onChange={()=>setPreferences({...preferences, autoUpgrade: !preferences.autoUpgrade})} className="peer w-5 h-5 appearance-none border-2 border-gray-300 rounded focus:outline-none checked:border-indigo-600 checked:bg-indigo-600 transition-all"/>
                          <Check size={14} className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-gray-800">Auto Upgradation</p>
                          <p className="text-[10px] font-bold text-gray-400 mt-0.5">Free upgrade to higher class if available</p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* 5. IRCTC Details */}
                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 md:p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-xl font-black text-gray-900 tracking-tight">IRCTC Details</h2>
                      <p className="text-xs font-bold text-gray-400 mt-1">Required to generate your authentic railway ticket</p>
                    </div>
                    <div className="group relative">
                      <Info size={20} className="text-gray-400 cursor-help" />
                      <div className="absolute right-0 top-6 w-64 bg-gray-900 text-white text-[10px] font-bold p-3 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-10 shadow-xl">
                        Indian Railways requires a valid IRCTC username to book tickets through third-party platforms. Password is required later during payment.
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                    <div className="relative">
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 mt-0">IRCTC Username</label>
                      <input type="text" value={irctcUser} onChange={e=>setIrctcUser(e.target.value)} placeholder="Username" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-bold text-gray-800 outline-none focus:border-indigo-500 transition-colors shadow-sm" />
                      {irctcUser.length > 3 && <CheckCircle2 size={18} className="absolute right-4 top-9 text-emerald-500" />}
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 mt-0">IRCTC Password</label>
                      <input type="password" value={irctcPass} onChange={e=>setIrctcPass(e.target.value)} placeholder="********" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-bold text-gray-800 outline-none focus:border-indigo-500 transition-colors shadow-sm" />
                    </div>
                  </div>
                </div>

                {/* 7. Cancellation Protection */}
                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 md:p-8 overflow-hidden relative">
                  <div className="absolute top-0 right-0 bg-red-500 text-white text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-bl-2xl">Highly Recommended</div>
                  <h2 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2 mb-2">
                    <ShieldCheck size={24} className="text-indigo-500"/> Cancellation Protection
                  </h2>
                  <p className="text-xs font-bold text-gray-500 mb-6">Get instantly refunded to your original payment source upon cancellation.</p>
                  
                  <div className="flex flex-col gap-4">
                    <label className={`flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${protection ? 'border-indigo-600 bg-indigo-50/50 shadow-md' : 'border-gray-100 hover:border-gray-200 bg-white'}`}>
                      <div className="relative flex items-center justify-center mt-0.5">
                        <input type="radio" checked={protection} onChange={()=>setProtection(true)} className="peer w-5 h-5 appearance-none border-2 border-gray-300 rounded-full focus:outline-none checked:border-indigo-600 transition-all"/>
                        <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 absolute opacity-0 peer-checked:opacity-100 pointer-events-none transition-all"></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-sm font-black text-gray-900">Yes, protect my booking</p>
                          <p className="text-xs font-black text-gray-900">₹250 <span className="text-[10px] text-gray-400 font-bold">/pax</span></p>
                        </div>
                        <p className="text-xs font-bold text-gray-600">Zero cancellation charges till departure chart preparation.</p>
                      </div>
                    </label>

                    <label className={`flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${!protection ? 'border-gray-400 bg-gray-50 shadow-sm' : 'border-gray-100 hover:border-gray-200 bg-white'}`}>
                      <div className="relative flex items-center justify-center mt-0.5">
                        <input type="radio" checked={!protection} onChange={()=>setProtection(false)} className="peer w-5 h-5 appearance-none border-2 border-gray-300 rounded-full focus:outline-none checked:border-gray-600 transition-all"/>
                        <div className="w-2.5 h-2.5 rounded-full bg-gray-600 absolute opacity-0 peer-checked:opacity-100 pointer-events-none transition-all"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-black text-gray-900 mb-1">No, I will bear cancellation charges</p>
                        <p className="text-xs font-bold text-gray-500">Standard railway deduction rules will apply.</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* 8. Contact Info */}
                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 md:p-8 mb-8">
                  <h2 className="text-xl font-black text-gray-900 tracking-tight mb-6">Contact Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 mt-0">Email Address (E-Ticket)</label>
                      <input type="email" value={contact.email} onChange={e=>setContact({...contact, email: e.target.value})} placeholder="abc@example.com" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-bold text-gray-800 outline-none focus:border-indigo-500 transition-colors shadow-sm" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 mt-0">Mobile Number (PNR Updates)</label>
                      <input type="tel" value={contact.phone} onChange={e=>setContact({...contact, phone: e.target.value})} placeholder="+91" maxLength="10" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-bold text-gray-800 outline-none focus:border-indigo-500 transition-colors shadow-sm" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Sticky Price Panel */}
              <div className="flex-1">
                <div className="sticky top-44 flex flex-col gap-6">
                  
                  {/* Offers */}
                  <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6">
                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest flex items-center gap-2 mb-4">
                      <Tag size={16} className="text-indigo-500"/> Offers & Promo Codes
                    </h3>
                    {!couponApplied ? (
                      <div className="flex gap-2 relative">
                        <input type="text" value={coupon} onChange={e=>setCoupon(e.target.value)} placeholder="Code (Try JOURNEY10)" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-bold text-gray-800 outline-none focus:border-indigo-500 transition-colors shadow-sm uppercase placeholder-gray-400" />
                        <button onClick={handleApplyCoupon} className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-900 text-white font-black text-[10px] uppercase tracking-widest px-4 py-2 rounded-lg hover:bg-black transition-colors">Apply</button>
                      </div>
                    ) : (
                      <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 flex justify-between items-center">
                        <div>
                          <p className="text-xs font-black text-emerald-700">JOURNEY10 Applied</p>
                          <p className="text-[10px] font-bold text-emerald-600">10% Base Fare Discount</p>
                        </div>
                        <button onClick={() => {setCouponApplied(false); setCoupon('');}} className="text-red-500 hover:text-red-700 text-xs font-bold">Remove</button>
                      </div>
                    )}
                  </div>

                  {/* Fare Summary */}
                  <div className="bg-white rounded-[2rem] border border-gray-100 shadow-lg shadow-gray-200/40 p-6 md:p-8">
                    <h3 className="text-lg font-black text-gray-900 tracking-tight mb-6 pb-4 border-b border-gray-100">Fare Summary</h3>
                    
                    <div className="flex flex-col gap-4 text-sm font-bold text-gray-600 mb-6">
                      <div className="flex justify-between items-center">
                        <span>Base Fare ({passengers.length} Pax)</span>
                        <span className="text-gray-900">₹{baseFare.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>IRCTC Convenience Fee</span>
                        <span className="text-gray-900">₹{convenienceFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Agent Service Charge</span>
                        <span className="text-gray-900">₹{agentFee.toFixed(2)}</span>
                      </div>
                      {protection && (
                        <div className="flex justify-between items-center">
                          <span>Cancellation Protection</span>
                          <span className="text-gray-900">₹{protectionFee.toFixed(2)}</span>
                        </div>
                      )}
                      {couponApplied && (
                        <div className="flex justify-between items-center text-emerald-600 bg-emerald-50/50 p-2 rounded-lg -mx-2 px-2">
                          <span>Promo Code Discount</span>
                          <span>- ₹{discount.toFixed(2)}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="border-t border-gray-100 pt-5 flex justify-between items-end mb-6">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Amount</p>
                        <p className="text-3xl font-black text-gray-900 leading-none mt-1">₹{total.toFixed(2)}</p>
                      </div>
                    </div>

                    <p className="text-[9px] font-bold text-center text-gray-400 mb-4 px-4 uppercase tracking-widest">
                      By proceeding, I agree to the <span className="text-indigo-500">T&C</span> and <span className="text-indigo-500">Privacy Policy</span>
                    </p>

                    <button 
                      onClick={validateAndProceed} 
                      disabled={!isFormValid()}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-xl uppercase tracking-widest text-xs flex justify-center items-center gap-2 transition-all shadow-xl shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none group relative overflow-hidden"
                    >
                      Proceed to Payment
                      {isFormValid() && <span className="absolute inset-0 w-full h-full -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-[shine_1.5s_ease-in-out_infinite]"></span>}
                    </button>
                    {!isFormValid() && <p className="text-[10px] text-center mt-3 text-gray-400 font-bold">Please fill all required fields to proceed.</p>}
                  </div>

                </div>
              </div>

            </div>
          </div>
        </>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center text-center py-20 px-4 min-h-[60vh]">
          <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-8 border border-emerald-100 shadow-inner">
            <Check size={40} className="text-emerald-500" strokeWidth={3} />
          </div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-3">Redirecting to Payment...</h2>
          <p className="text-sm font-bold text-gray-500 mb-8 max-w-md mx-auto">Your booking details for {train.trainName} have been secured. Please complete the payment on the next screen.</p>
          
          <button onClick={() => navigate('/dashboard')} className="bg-gray-900 hover:bg-black text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all shadow-md group">
             Skip to Dashboard Demo <ChevronRight size={14} className="inline ml-1 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      )}

      <style jsx>{`
        button:disabled {
          background: #ccc !important;
          cursor: not-allowed !important;
          opacity: 0.6 !important;
        }
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .loading-pulse { animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      `}</style>
    </div>
  );
};

export default TrainBooking;
