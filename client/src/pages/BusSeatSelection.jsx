import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin } from 'lucide-react';
import Navbar from '../components/Navbar';

const SeatLayout = ({ isSleeper, price, onSelectStatus }) => {
  const rows = Array.from({ length: 8 }, (_, i) => i + 1);
  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl p-6 flex flex-col w-[320px] relative shadow-inner">
      <div className="absolute -top-3 right-4 bg-gray-800 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full w-fit mb-4 mx-auto shadow-md flex items-center gap-1">
         <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span> Driver
      </div>
      
      <div className="flex gap-10 mt-6 justify-between px-2">
         {/* Left Side (Double) */}
         <div className="flex flex-col gap-3">
            {rows.map(row => (
               <div key={`L-${row}`} className="flex gap-3">
                  <Seat id={`L1-${row}`} price={price} isSleeper={isSleeper} onSelectStatus={onSelectStatus} />
                  <Seat id={`L2-${row}`} price={price} isSleeper={isSleeper} onSelectStatus={onSelectStatus} />
               </div>
            ))}
         </div>
         {/* Right Side (Single) */}
         <div className="flex flex-col gap-3">
            {rows.map(row => (
               <div key={`R-${row}`} className="flex justify-end">
                  <Seat id={`R1-${row}`} price={price} isSleeper={isSleeper} onSelectStatus={onSelectStatus} />
               </div>
            ))}
         </div>
      </div>
    </div>
  );
};

const Seat = ({ id, price, isSleeper, onSelectStatus }) => {
   const [status, setStatus] = useState(() => Math.random() > 0.8 ? 'booked' : 'available');
   
   const toggleSeat = () => {
      if(status === 'booked') return;
      const newStatus = status === 'available' ? 'selected' : 'available';
      setStatus(newStatus);
      onSelectStatus(id, newStatus === 'selected' ? price : -price);
   };

   let bg = 'bg-white border-gray-300';
   if(status === 'booked') bg = 'bg-gray-200 border-gray-300 cursor-not-allowed opacity-50';
   if(status === 'selected') bg = 'bg-red-500 border-red-600 shadow-md text-transparent';

   return (
      <motion.div 
         whileHover={status !== 'booked' ? { scale: 1.05 } : {}}
         onClick={toggleSeat}
         className={`relative group ${isSleeper ? 'w-[35px] h-14 rounded-sm' : 'w-8 h-8 rounded-t-lg rounded-b-sm'} border-2 cursor-pointer transition-colors ${bg} overflow-hidden flex items-center justify-center shadow-sm`}
      >
         {isSleeper && <div className="absolute top-1 left-[2px] right-[2px] bottom-1 rounded-sm border border-gray-200/50"></div>}
         {isSleeper && status !== 'selected' && <div className="absolute top-1 right-1 w-[8px] h-[4px] bg-gray-300 rounded-sm"></div>}
         
         {status === 'available' && (
           <div className="absolute bottom-16 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 flex flex-col items-center group-hover:opacity-100 transition-opacity whitespace-nowrap z-[100] pointer-events-none shadow-xl transform group-hover:-translate-y-2">
              <span className="font-black text-sm">{id}</span>
              <span className="text-[10px] text-gray-300 font-bold uppercase mt-0.5 tracking-widest">₹{price}</span>
           </div>
         )}
      </motion.div>
   );
};

const BusSeatSelection = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const busName = searchParams.get('bus') || 'Unknown Bus';
  const time = searchParams.get('time') || '00:00';
  const price = parseInt(searchParams.get('price')) || 0;
  const from = searchParams.get('from') || 'Origin';
  const to = searchParams.get('to') || 'Destination';
  const busType = searchParams.get('type') || 'A/C Sleeper';
  
  const isSleeper = busType.toLowerCase().includes('sleeper');

  const [total, setTotal] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengers, setPassengers] = useState([]);

  const handleSeatChange = (id, priceDelta) => {
     setTotal(prev => prev + priceDelta);
     if (priceDelta > 0) {
        setSelectedSeats(prev => [...prev, id]);
        setPassengers(prev => [...prev, { seat: id, name: '', age: '', gender: '' }]);
     } else {
        setSelectedSeats(prev => prev.filter(seat => seat !== id));
        setPassengers(prev => prev.filter(p => p.seat !== id));
     }
  };

  const handlePassengerChange = (seatId, field, value) => {
     setPassengers(prev => prev.map(p => p.seat === seatId ? { ...p, [field]: value } : p));
  };

  const isFormValid = passengers.length > 0 && passengers.every(p => p.name.trim() !== '' && p.age !== '' && p.gender !== '' && p.gender !== 'Gender');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />

      <div className="bg-white border-b border-gray-100 py-6 shadow-sm sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-6">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600 hover:text-red-500"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex flex-col">
            <h1 className="text-2xl font-black text-gray-800 tracking-tight">{busName}</h1>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mt-1">
              {from} → {to} • {time} • {busType}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8 w-full flex-1">
        
        {/* Left Side: Seat Layout */}
        <div className="flex-1 bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 flex flex-col items-center justify-center">
            <h2 className="text-xl font-black text-gray-800 mb-6 drop-shadow-sm text-center w-full">Select Your Seats</h2>
            <div className="flex items-center justify-center w-[320px] mb-6 border-b border-gray-100 pb-6">
               <div className="flex items-center gap-6">
                  <div className="flex items-center gap-1.5"><div className="w-4 h-4 border-2 border-gray-300 bg-white rounded-sm"></div><span className="text-[10px] font-black tracking-widest text-gray-500 uppercase">Available</span></div>
                  <div className="flex items-center gap-1.5"><div className="w-4 h-4 bg-red-500 rounded-sm"></div><span className="text-[10px] font-black tracking-widest text-gray-500 uppercase">Selected</span></div>
                  <div className="flex items-center gap-1.5"><div className="w-4 h-4 bg-gray-200 border border-gray-300 rounded-sm"></div><span className="text-[10px] font-black tracking-widest text-gray-500 uppercase">Booked</span></div>
               </div>
            </div>
            <SeatLayout isSleeper={isSleeper} price={price} onSelectStatus={handleSeatChange} />
        </div>

        {/* Right Side: Details & passenger info */}
        <div className="flex-1 xl:w-[400px] flex flex-col">
           <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 mb-6 flex-1">
              <h4 className="font-black text-lg text-gray-800 mb-6 border-b border-gray-100 pb-4">Journey Summary</h4>
              
              <div className="flex flex-col relative z-0 border-l-[3px] border-dashed border-gray-200 ml-4 pl-8 pt-2 pb-4">
                 <div className="relative mb-8 group">
                    <div className="absolute -left-[43px] top-1 w-5 h-5 rounded-full bg-white border-[5px] border-red-500 shadow-sm z-10 transition-transform"></div>
                    <div className="flex items-center gap-4">
                       <span className="text-sm font-black text-red-600 uppercase tracking-widest bg-red-50 border border-red-100 px-3 py-1.5 rounded-lg shadow-sm">{time}</span>
                       <h5 className="font-bold text-gray-800 text-base">{from}</h5>
                    </div>
                 </div>
                 <div className="relative group">
                    <div className="absolute -left-[43px] top-1 w-5 h-5 rounded-full bg-white border-[5px] border-gray-800 shadow-sm z-10 transition-transform"></div>
                    <div className="flex items-center gap-4">
                       <span className="text-sm font-black text-gray-800 uppercase tracking-widest bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-lg shadow-sm">Drop</span>
                       <h5 className="font-bold text-gray-800 text-base">{to}</h5>
                    </div>
                 </div>
              </div>

              <div className="mt-6 p-6 bg-gray-50 rounded-2xl border border-gray-100 flex-1 overflow-y-auto max-h-[300px] custom-scrollbar">
                  <div className="flex justify-between items-center mb-4">
                     <h4 className="font-black text-sm text-gray-800 uppercase tracking-widest">Passenger Information</h4>
                     <span className="text-xs font-bold text-gray-500 bg-white px-2 py-1 rounded border border-gray-200">{selectedSeats.length} Seats Selected</span>
                  </div>
                  
                  {passengers.length === 0 ? (
                     <p className="text-sm text-gray-500 text-center py-6">Please select your seats on the left to enter passenger details.</p>
                  ) : (
                     <div className="flex flex-col gap-4">
                        {passengers.map((p, index) => (
                           <div key={p.seat} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                              <span className="text-xs font-black text-red-500 uppercase tracking-widest mb-3 block">Passenger {index + 1} <span className="text-gray-400 font-bold">(Seat {p.seat})</span></span>
                              <div className="flex flex-col gap-3">
                                 <input 
                                    type="text" 
                                    placeholder="Full Name" 
                                    value={p.name}
                                    onChange={(e) => handlePassengerChange(p.seat, 'name', e.target.value)}
                                    className="w-full text-sm font-medium bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all" 
                                 />
                                 <div className="flex gap-3">
                                    <input 
                                       type="number" 
                                       placeholder="Age" 
                                       value={p.age}
                                       min="1"
                                       max="120"
                                       onChange={(e) => handlePassengerChange(p.seat, 'age', e.target.value)}
                                       className="w-1/3 text-sm font-medium bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all" 
                                    />
                                    <select 
                                       value={p.gender || 'Gender'}
                                       onChange={(e) => handlePassengerChange(p.seat, 'gender', e.target.value)}
                                       className={`w-2/3 text-sm font-medium bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all ${p.gender ? 'text-gray-800' : 'text-gray-400'}`}
                                    >
                                       <option disabled>Gender</option>
                                       <option value="Male">Male</option>
                                       <option value="Female">Female</option>
                                       <option value="Other">Other</option>
                                    </select>
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  )}
              </div>
           </div>

           <div className="bg-white rounded-[2rem] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-gray-100 mt-auto">
              <div className="flex justify-between items-center mb-3">
                 <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Selected Seats</span>
                 <span className="text-sm font-black text-gray-800 bg-gray-50 px-3 py-1 rounded-md">{selectedSeats.join(', ') || 'None'}</span>
              </div>
              <div className="flex justify-between items-end mb-6">
                 <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Total Amount</span>
                 <span className="text-3xl font-black text-red-600 tracking-tight">₹{total}</span>
              </div>
              <button 
                 className={`w-full py-4 rounded-xl font-black text-white uppercase tracking-widest shadow-md transition-all flex items-center justify-center gap-2 relative overflow-hidden group btn-shine ${isFormValid ? 'bg-red-500 hover:bg-red-600 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-500/30' : 'bg-gray-300 cursor-not-allowed opacity-70'}`}
                 disabled={!isFormValid}
              >
                 {isFormValid ? 'Proceed to Pay' : (passengers.length === 0 ? 'Select Seats' : 'Incomplete Details')} {isFormValid && <span className="absolute inset-0 w-full h-full -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-[shine_1.5s_ease-in-out_infinite]"></span>}
              </button>
           </div>
        </div>

      </div>
    </div>
  );
};

export default BusSeatSelection;
