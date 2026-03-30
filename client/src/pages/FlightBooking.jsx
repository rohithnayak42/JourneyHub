import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plane, UserPlus, CheckCircle2, ChevronRight, Check,
  Armchair, Utensils, ShieldCheck, CreditCard, BaggageClaim, ArrowRight, Info
} from 'lucide-react';

// --- Modular Logic Functions --- //

const loadFlightData = () => {
  const data = localStorage.getItem('selectedFlight');
  return data ? JSON.parse(data) : null;
};

const validateForm = (step, passengers, contact, selectedSeats) => {
  if (step === 1) {
    const isPassengersValid = passengers.every(p => p.name.trim() !== '' && p.age !== '' && p.gender !== '');
    const isContactValid = contact.email.trim() !== '' && contact.phone.trim() !== '';
    return isPassengersValid && isContactValid;
  }
  if (step === 2) {
    return selectedSeats.length === passengers.length;
  }
  return true; // steps 3 & 4 don't strictly block navigation inherently
};

const updatePrice = (basePrice, passengersCount, addons, selectedSeats) => {
  const convenienceFee = 350 * passengersCount;
  const seatTotal = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  const addOnsTotal = (addons.meal ? 450 * passengersCount : 0) + 
                      (addons.baggage ? 1200 : 0) + 
                      (addons.insurance ? 249 * passengersCount : 0);
  
  return (basePrice * passengersCount) + convenienceFee + seatTotal + addOnsTotal;
};

// --- Main Component --- //

const FlightBooking = () => {
  const navigate = useNavigate();
  const [flight, setFlight] = useState(null);
  
  // States
  const [step, setStep] = useState(1);
  const [passengers, setPassengers] = useState([{ id: 1, name: '', age: '', gender: '' }]);
  const [contact, setContact] = useState({ email: '', phone: '' });
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [addons, setAddons] = useState({ meal: false, baggage: false, insurance: true });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Initialize Data
  useEffect(() => {
    const data = loadFlightData();
    if (!data) {
      navigate('/flights');
    } else {
      setFlight(data);
    }
  }, [navigate]);

  // Derived UI Data
  const currentTotal = useMemo(() => {
    if (!flight) return 0;
    return updatePrice(flight.price, passengers.length, addons, selectedSeats);
  }, [flight, passengers.length, addons, selectedSeats]);

  const isValid = useMemo(() => validateForm(step, passengers, contact, selectedSeats), 
    [step, passengers, contact, selectedSeats]);

  // Handlers
  const handleStepNavigation = (direction) => {
    if (direction === 'next' && isValid) {
      if (step === 4) {
        handlePayment();
      } else {
        setStep(prev => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (direction === 'prev') {
      setStep(prev => Math.max(1, prev - 1));
    }
  };

  const handlePayment = () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      // Save full booking data
      const finalBooking = {
        bookingId: `FLT-${Math.floor(Math.random() * 900000) + 100000}`,
        pnr: Math.random().toString(36).substring(2, 8).toUpperCase(),
        flight,
        passengers,
        contact,
        seats: selectedSeats.map(s => s.id),
        totalPaid: currentTotal,
        date: "01 Apr 2026"
      };
      localStorage.setItem('finalFlightBooking', JSON.stringify(finalBooking));
      navigate('/flight/ticket');
    }, 2500);
  };

  // --- Layout Renderers --- //

  const renderProgress = () => (
    <div className="flex items-center justify-between mb-8 relative">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 z-0 rounded-full"></div>
      <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-600 z-0 rounded-full transition-all duration-500 ease-in-out" style={{ width: `${((step - 1) / 3) * 100}%` }}></div>
      
      {['Travellers', 'Seats', 'Add-ons', 'Payment'].map((label, idx) => {
        const stepNum = idx + 1;
        const isActive = step >= stepNum;
        const isCurrent = step === stepNum;
        return (
          <div key={label} className="relative z-10 flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm border-4 transition-all duration-300 ${isActive ? 'bg-blue-600 border-blue-100 text-white shadow-lg shadow-blue-500/30' : 'bg-gray-100 border-white text-gray-400'}`}>
               {isActive && !isCurrent ? <Check size={16} strokeWidth={3} /> : stepNum}
            </div>
            <span className={`text-[10px] uppercase tracking-widest font-bold mt-2 ${isActive ? 'text-blue-600' : 'text-gray-400'}`}>{label}</span>
          </div>
        );
      })}
    </div>
  );

  const renderTravellerForm = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <UserPlus size={20} className="text-blue-500"/> Traveller Details
          </h2>
        </div>
        
        {passengers.map((p, index) => (
          <div key={p.id} className="p-5 bg-gray-50 border border-gray-200 rounded-2xl mb-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-black text-gray-700 uppercase tracking-widest">Passenger {index + 1}</span>
              {passengers.length > 1 && (
                <button onClick={() => setPassengers(passengers.filter(pass => pass.id !== p.id))} className="text-red-400 text-xs font-bold hover:text-red-600">Remove</button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-6">
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 mt-0">Full Name</label>
                <input type="text" value={p.name} onChange={e => {
                  const newP = [...passengers];
                  newP[index].name = e.target.value;
                  setPassengers(newP);
                }} placeholder="As per Govt ID" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 font-bold text-gray-800 outline-none focus:border-blue-500 shadow-sm" />
              </div>
              <div className="md:col-span-3">
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 mt-0">Age</label>
                <input type="number" value={p.age} onChange={e => {
                  const newP = [...passengers];
                  newP[index].age = e.target.value;
                  setPassengers(newP);
                }} placeholder="Yrs" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 font-bold text-gray-800 outline-none focus:border-blue-500 shadow-sm" />
              </div>
              <div className="md:col-span-3">
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 mt-0">Gender</label>
                <select value={p.gender} onChange={e => {
                  const newP = [...passengers];
                  newP[index].gender = e.target.value;
                  setPassengers(newP);
                }} className="w-full bg-white border border-gray-200 rounded-xl px-3 py-3 font-bold text-gray-800 outline-none focus:border-blue-500 shadow-sm">
                  <option value="">Select</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
              </div>
            </div>
          </div>
        ))}
        {passengers.length < 6 && (
           <button onClick={() => setPassengers([...passengers, { id: Date.now(), name: '', age: '', gender: '' }])} className="text-blue-600 text-xs font-black uppercase tracking-widest hover:underline mt-2 inline-block">+ Add Another Passenger</button>
        )}
      </div>

      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 md:p-8">
        <h2 className="text-xl font-black text-gray-900 tracking-tight mb-6 flex items-center gap-2">Contact Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 mt-0">Email Address (E-Ticket)</label>
            <input type="email" value={contact.email} onChange={e => setContact({...contact, email: e.target.value})} placeholder="abc@example.com" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-bold text-gray-800 outline-none focus:border-blue-500 shadow-sm" />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 mt-0">Mobile Number (PNR Updates)</label>
            <input type="tel" value={contact.phone} onChange={e => setContact({...contact, phone: e.target.value})} placeholder="+91" maxLength="10" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-bold text-gray-800 outline-none focus:border-blue-500 shadow-sm" />
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderSeatSelection = () => {
    const columns = ['A', 'B', 'C', ' ', 'D', 'E', 'F'];
    const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    
    // Simulate some disabled seats
    const disabledSeats = ['1A', '1C', '2D', '5B', '5E', '8F', '9A'];
    
    const handleSeatClick = (seatId) => {
      if (disabledSeats.includes(seatId)) return;
      
      const isSelected = selectedSeats.find(s => s.id === seatId);
      if (isSelected) {
        setSelectedSeats(selectedSeats.filter(s => s.id !== seatId));
      } else {
        if (selectedSeats.length < passengers.length) {
          // Premium for front rows, else free or cheap
          const rowNum = parseInt(seatId.replace(/\D/g, ''));
          const price = rowNum <= 3 ? 500 : (rowNum <= 6 ? 250 : 0);
          setSelectedSeats([...selectedSeats, { id: seatId, price }]);
        } else {
          alert(`You can only select ${passengers.length} seats.`);
        }
      }
    };

    return (
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
           <h2 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2"><Armchair className="text-blue-500"/> Select Seats</h2>
           <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-3 py-1 rounded-full uppercase tracking-widest">{selectedSeats.length}/{passengers.length} Selected</span>
        </div>
        
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="bg-[#f8fafc] border-[6px] border-[#e2e8f0] rounded-[3rem] p-8 mx-auto self-center max-w-[350px]">
            {/* Plane nose simulation */}
            <div className="w-full h-10 border-b-2 border-gray-200 mb-8 rounded-t-full"></div>
            
            <div className="flex font-black text-[10px] text-gray-400 mb-4 uppercase tracking-widest justify-between text-center">
              {columns.map((c, i) => (
                <div key={i} className={`w-8 ${c === ' ' ? 'w-4' : ''}`}>{c}</div>
              ))}
            </div>
            
            <div className="flex flex-col gap-3">
              {rows.map(row => (
                <div key={row} className="flex justify-between items-center">
                  <span className="text-[9px] font-black text-gray-400 w-4 block text-left absolute -ml-6">{row}</span>
                  {columns.map((col, cIdx) => {
                    if (col === ' ') return <div key={cIdx} className="w-4"></div>;
                    const seatId = `${row}${col}`;
                    const isDisabled = disabledSeats.includes(seatId);
                    const isSelected = selectedSeats.find(s => s.id === seatId);
                    
                    return (
                      <button
                        key={seatId}
                        disabled={isDisabled}
                        onClick={() => handleSeatClick(seatId)}
                        className={`w-8 h-8 rounded-t-lg rounded-b-sm font-bold text-[10px] transition-all flex items-center justify-center border hover:-translate-y-1 ${
                          isDisabled ? 'bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed opacity-50' :
                          isSelected ? 'bg-blue-600 border-blue-700 text-white shadow-md shadow-blue-500/40' :
                          'bg-white border-blue-200 text-blue-800 hover:bg-blue-50 cursor-pointer shadow-sm'
                        }`}
                      >
                        {isSelected ? <Check size={12}/> : ''}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex-1 space-y-4 w-full">
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
               <div className="flex items-center gap-3 text-xs font-black text-gray-800 mb-2">
                 <div className="w-4 h-4 rounded-t block border border-blue-700 bg-blue-600"></div> Selected
               </div>
               <div className="flex items-center gap-3 text-xs font-black text-gray-600 mb-2">
                 <div className="w-4 h-4 rounded-t border-blue-200 bg-white shadow-sm block"></div> Available
               </div>
               <div className="flex items-center gap-3 text-xs font-black text-gray-400">
                 <div className="w-4 h-4 rounded-t border-gray-300 bg-gray-200 block"></div> Unavailable
               </div>
            </div>
            
            {selectedSeats.length > 0 && (
              <div className="mt-6 border-t border-gray-100 pt-6">
                <h4 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-3">Your Selection</h4>
                <div className="flex flex-col gap-2">
                  {selectedSeats.map(s => (
                    <div key={s.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <span className="font-black text-blue-900 border-b-2 border-blue-200">{s.id}</span>
                      <span className="text-xs font-bold text-gray-500">{s.price === 0 ? 'Free' : `+ ₹${s.price}`}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  const renderAddons = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 md:p-8">
         <h2 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2 mb-6"><Utensils className="text-blue-500"/> Travel Add-ons</h2>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className={`flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${addons.meal ? 'border-blue-600 bg-blue-50' : 'border-gray-100 bg-white'}`}>
              <input type="checkbox" checked={addons.meal} onChange={(e) => setAddons({...addons, meal: e.target.checked})} className="mt-1 w-5 h-5 accent-blue-600 rounded"/>
              <div>
                 <h4 className="font-black text-gray-900 text-sm">In-flight Meal</h4>
                 <p className="text-xs text-gray-500 font-bold mt-1">Gourmet hot meal served at your seat.</p>
                 <p className="text-xs font-black text-blue-700 mt-2">+ ₹450 <span className="text-[10px] text-gray-400">/pax</span></p>
              </div>
            </label>
            
            <label className={`flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${addons.baggage ? 'border-blue-600 bg-blue-50' : 'border-gray-100 bg-white'}`}>
              <input type="checkbox" checked={addons.baggage} onChange={(e) => setAddons({...addons, baggage: e.target.checked})} className="mt-1 w-5 h-5 accent-blue-600 rounded"/>
              <div>
                 <h4 className="font-black text-gray-900 text-sm flex items-center gap-1"><BaggageClaim size={14}/> Extra Baggage (5KG)</h4>
                 <p className="text-xs text-gray-500 font-bold mt-1">Avoid pricey airport counter fees.</p>
                 <p className="text-xs font-black text-blue-700 mt-2">+ ₹1,200</p>
              </div>
            </label>
         </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 md:p-8 overflow-hidden relative">
         <div className="absolute top-0 right-0 bg-red-500 text-white text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-bl-2xl">Recommended</div>
         <h2 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2 mb-2">
            <ShieldCheck size={24} className="text-blue-500"/> Travel Insurance
         </h2>
         <p className="text-xs font-bold text-gray-500 mb-6">Medical emergencies and baggage loss covered up to ₹10,000.</p>
         
         <label className={`flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${addons.insurance ? 'border-emerald-500 bg-emerald-50' : 'border-gray-100 bg-white'}`}>
            <input type="checkbox" checked={addons.insurance} onChange={(e) => setAddons({...addons, insurance: e.target.checked})} className="mt-1 w-5 h-5 accent-emerald-600 rounded"/>
            <div>
               <h4 className="font-black text-gray-900 text-sm">Secure my trip</h4>
               <p className="text-xs text-emerald-700 font-black mt-2">+ ₹249 <span className="text-[10px] text-gray-400">/pax</span></p>
            </div>
         </label>
      </div>
    </motion.div>
  );

  const renderPayment = () => (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 md:p-8">
      {isProcessing ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
           <div className="w-20 h-20 bg-blue-50 rounded-full flex flex-col items-center justify-center relative shadow-inner overflow-hidden mb-6 border border-blue-100">
             <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
             <Plane className="absolute text-blue-300 -translate-x-1 animate-pulse" size={24}/>
           </div>
           <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-2">Processing Payment...</h3>
           <p className="text-sm font-bold text-gray-500">Please do not refresh or hit back.</p>
        </div>
      ) : (
        <>
          <h2 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2 mb-6"><CreditCard className="text-blue-500"/> Payment Gateway</h2>
          
          <div className="space-y-4">
            <label className={`flex items-center gap-4 p-5 border-2 rounded-2xl cursor-pointer transition-all ${paymentMethod === 'upi' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'}`}>
              <input type="radio" name="payment" onChange={() => setPaymentMethod('upi')} className="w-5 h-5 accent-blue-600" />
              <div className="flex-1 font-black text-gray-800 tracking-tight disabled:opacity-50">UPI / QR (GPay, PhonePe)</div>
              <div className="bg-emerald-100 text-emerald-700 text-[10px] px-2 py-1 rounded font-black uppercase tracking-widest">Saved Info</div>
            </label>
            <label className={`flex items-center gap-4 p-5 border-2 rounded-2xl cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'}`}>
              <input type="radio" name="payment" onChange={() => setPaymentMethod('card')} className="w-5 h-5 accent-blue-600" />
              <div className="flex-1 font-black text-gray-800 tracking-tight">Credit / Debit Card</div>
            </label>
            <label className={`flex items-center gap-4 p-5 border-2 rounded-2xl cursor-pointer transition-all ${paymentMethod === 'netbanking' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'}`}>
              <input type="radio" name="payment" onChange={() => setPaymentMethod('netbanking')} className="w-5 h-5 accent-blue-600" />
              <div className="flex-1 font-black text-gray-800 tracking-tight">Net Banking (All Banks)</div>
            </label>
          </div>
        </>
      )}
    </motion.div>
  );

  if (!flight) return null;

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col font-sans pb-20">
      <Navbar />

      {/* Header Banner */}
      <div className="bg-white border-b border-gray-100 sticky top-20 z-40 shadow-sm transition-all py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between w-full md:items-center gap-4">
          <div className="flex items-center gap-4">
             <div className="bg-blue-600 p-2.5 rounded-xl text-white drop-shadow-sm border border-blue-500"><Plane size={24}/></div>
             <div>
               <h1 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                 {flight.origin} <ArrowRight className="text-gray-300" size={16}/> {flight.dest}
               </h1>
               <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">
                 <span className="text-blue-600 font-black">{flight.airline} {flight.flightNo}</span>
                 <span className="w-1 h-1 bg-gray-300 rounded-full block"></span>
                 <span>01 Apr 2026</span>
                 <span className="w-1 h-1 bg-gray-300 rounded-full block"></span>
                 <span>{flight.departure} - {flight.arrival}</span>
               </div>
             </div>
          </div>
          <button onClick={() => navigate(-1)} className="text-xs font-black uppercase tracking-widest text-gray-400 hover:text-gray-800 border border-gray-200 bg-white px-4 py-2 rounded-lg cursor-pointer transition-all">Cancel</button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8 w-full relative z-10 w-full mt-4">
        
        {/* LEFT COLUMN: Dynamic Steps */}
        <div className="lg:w-2/3 flex flex-col relative w-full overflow-hidden px-1">
           {renderProgress()}
           
           <AnimatePresence mode="wait">
             {step === 1 && renderTravellerForm()}
             {step === 2 && renderSeatSelection()}
             {step === 3 && renderAddons()}
             {step === 4 && renderPayment()}
           </AnimatePresence>
        </div>

        {/* RIGHT COLUMN: Sticky Fare Summary */}
        <div className="lg:w-1/3 flex flex-col">
          <div className="sticky top-44 flex flex-col gap-6">
             <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/40 p-6 md:p-8">
                <h3 className="text-lg font-black text-gray-900 tracking-tight mb-6 pb-4 border-b border-gray-100">Fare Summary</h3>
                
                <div className="flex flex-col gap-4 text-sm font-bold text-gray-600 mb-6 border-b border-gray-100 pb-6 border-dashed">
                   <div className="flex justify-between items-center">
                     <span>Base Fare <span className="text-[10px] font-black text-gray-300 px-1">x{passengers.length}</span></span>
                     <span className="text-gray-900 font-black">₹{(flight.price * passengers.length).toLocaleString('en-IN')}</span>
                   </div>
                   <div className="flex justify-between items-center">
                     <span>Taxes & Convenience</span>
                     <span className="text-gray-900 font-black">₹{(350 * passengers.length).toLocaleString('en-IN')}</span>
                   </div>
                   
                   {/* Conditional Dynamic Additions */}
                   {selectedSeats.length > 0 && selectedSeats.reduce((a,b)=>a+b.price,0) > 0 && (
                     <div className="flex justify-between items-center text-blue-700">
                       <span>Seat selection</span>
                       <span className="font-black">+ ₹{selectedSeats.reduce((a,b)=>a+b.price,0).toLocaleString('en-IN')}</span>
                     </div>
                   )}
                   {addons.meal && (
                     <div className="flex justify-between items-center text-blue-700">
                       <span>Meals <span className="text-[10px] text-blue-300 opacity-80 px-1">x{passengers.length}</span></span>
                       <span className="font-black">+ ₹{(450 * passengers.length).toLocaleString('en-IN')}</span>
                     </div>
                   )}
                   {addons.baggage && (
                     <div className="flex justify-between items-center text-blue-700">
                       <span>Extra Baggage</span>
                       <span className="font-black">+ ₹1,200</span>
                     </div>
                   )}
                   {addons.insurance && (
                     <div className="flex justify-between items-center text-emerald-600">
                       <span>Insurance <span className="text-[10px] text-emerald-300 opacity-80 px-1">x{passengers.length}</span></span>
                       <span className="font-black">+ ₹{(249 * passengers.length).toLocaleString('en-IN')}</span>
                     </div>
                   )}
                </div>
                
                <div className="flex justify-between items-end mb-6">
                   <div>
                     <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Amount</p>
                     <p className="text-3xl font-black text-gray-900 leading-none mt-1">₹{currentTotal.toLocaleString('en-IN')}</p>
                   </div>
                </div>

                {!isProcessing && (
                  <div className="flex gap-3">
                    {step > 1 && (
                      <button onClick={() => handleStepNavigation('prev')} className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-black uppercase tracking-widest text-xs py-4 px-6 rounded-xl transition-all shadow-sm">
                        Back
                      </button>
                    )}
                    <button 
                      onClick={() => handleStepNavigation('next')}
                      disabled={!isValid && step !== 4} // Block next if invalid
                      className={`flex-1 flex justify-center items-center gap-2 py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all ${
                         (!isValid && step !== 4) ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30 border border-blue-500 btn-shine relative overflow-hidden group'
                      }`}
                    >
                      {step === 4 ? 'Pay Securely' : 'Continue'}
                      {isValid && step !== 4 && <span className="absolute inset-0 w-full h-full -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-[shine_1.5s_ease-in-out_infinite]"></span>}
                    </button>
                  </div>
                )}
                
                {step === 1 && !isValid && (
                  <div className="flex items-center gap-2 mt-4 text-[10px] font-bold text-red-400 justify-center">
                     <Info size={12}/> Please fill all passenger & contact fields.
                  </div>
                )}
                {step === 2 && !isValid && (
                  <div className="flex items-center gap-2 mt-4 text-[10px] font-bold text-red-400 justify-center">
                     <Info size={12}/> Please select all {passengers.length} seats.
                  </div>
                )}

             </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default FlightBooking;
