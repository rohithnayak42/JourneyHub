import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, MapPin } from 'lucide-react';

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

const SeatSimulator = ({ onClose, basePrice }) => {
  const [total, setTotal] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatChange = (id, priceDelta) => {
     setTotal(prev => prev + priceDelta);
     if (priceDelta > 0) {
        setSelectedSeats(prev => [...prev, id]);
     } else {
        setSelectedSeats(prev => prev.filter(seat => seat !== id));
     }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="bg-gray-50 border-t border-gray-200 p-6 flex flex-col md:flex-row gap-8 overflow-hidden relative shadow-inner w-full"
    >
      <button onClick={onClose} className="absolute top-4 right-4 bg-white p-2.5 rounded-full shadow-md text-gray-500 hover:text-red-500 hover:-rotate-90 transition-all z-50">
         <X size={18} />
      </button>

      {/* Seat Maps */}
      <div className="flex-1 flex flex-col items-center border-r border-gray-200/60 pb-4">
         <div className="flex items-center justify-between w-[320px] mb-4">
            <h4 className="font-black text-xl text-gray-800 tracking-tight">Lower Deck</h4>
            <div className="flex items-center gap-4">
               <div className="flex items-center gap-1.5"><div className="w-3 h-3 border-2 border-gray-300 bg-white rounded-sm"></div><span className="text-[9px] font-bold text-gray-500 uppercase">Avl</span></div>
               <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-red-500 rounded-sm"></div><span className="text-[9px] font-bold text-gray-500 uppercase">Sel</span></div>
            </div>
         </div>
         <SeatLayout isSleeper={true} price={basePrice} onSelectStatus={handleSeatChange} />
      </div>
      
      {/* Boarding Dropping & Summary */}
      <div className="flex-1 flex flex-col pt-2">
         <h4 className="font-black text-xl text-gray-800 mb-6 drop-shadow-sm">Boarding & Dropping Point</h4>
         
         <div className="flex flex-col relative z-0 mb-8 border-l-[3px] border-dashed border-gray-300 ml-4 pl-8 pt-2 pb-4">
            <div className="relative mb-10 group">
               <div className="absolute -left-[45px] top-1 w-5 h-5 rounded-full bg-white border-[5px] border-red-500 shadow-md z-10 group-hover:scale-125 transition-transform"></div>
               <div className="flex items-center gap-4">
                  <span className="text-sm font-black text-red-600 uppercase tracking-widest bg-red-50 border border-red-100 px-3 py-1.5 rounded-lg shadow-sm">21:30</span>
                  <h5 className="font-bold text-gray-800 text-lg">Kashmere Gate ISBT</h5>
               </div>
               <p className="flex items-center gap-1 text-xs font-bold text-gray-500 mt-2 cursor-pointer hover:text-red-500 transition-colors w-fit"><MapPin size={12}/> View on Map</p>
            </div>
            <div className="relative group">
               <div className="absolute -left-[45px] top-1 w-5 h-5 rounded-full bg-white border-[5px] border-gray-800 shadow-md z-10 group-hover:scale-125 transition-transform"></div>
               <div className="flex items-center gap-4">
                  <span className="text-sm font-black text-gray-800 uppercase tracking-widest bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-lg shadow-sm">06:45</span>
                  <h5 className="font-bold text-gray-800 text-lg">Manali Mall Road</h5>
               </div>
               <p className="flex items-center gap-1 text-xs font-bold text-gray-500 mt-2 cursor-pointer hover:text-gray-800 transition-colors w-fit"><MapPin size={12}/> View on Map</p>
            </div>
         </div>

         <div className="mt-auto bg-white rounded-[1.5rem] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-gray-100">
            <div className="flex justify-between items-center mb-3">
               <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Selected Seats</span>
               <span className="text-sm font-black text-gray-800 bg-gray-50 px-3 py-1 rounded-md">{selectedSeats.join(', ') || 'None'}</span>
            </div>
            <div className="flex justify-between items-end mb-6">
               <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Total Amount</span>
               <span className="text-3xl font-black text-red-600 tracking-tight">₹{total}</span>
            </div>
            <button 
               className={`w-full py-4 rounded-xl font-black text-white uppercase tracking-widest shadow-md transition-all flex items-center justify-center gap-2 relative overflow-hidden group btn-shine ${selectedSeats.length > 0 ? 'bg-red-500 hover:bg-red-600 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-500/30' : 'bg-gray-300 cursor-not-allowed opacity-70'}`}
               disabled={selectedSeats.length === 0}
            >
               Proceed to Book <span className="absolute inset-0 w-full h-full -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-[shine_1.5s_ease-in-out_infinite]"></span>
            </button>
         </div>
      </div>
    </motion.div>
  );
};
export default SeatSimulator;
