import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MousePointerClick, CheckCircle, XCircle, Search } from 'lucide-react';

const generateSeats = () => {
  const layout = [];
  let idCounter = 1;
  for (let row = 1; row <= 10; row++) {
    const basePrice = row <= 4 ? 1200 : row <= 8 ? 850 : 600;
    
    const leftSeat1 = { id: idCounter++, row, col: 'A', status: Math.random() > 0.7 ? 'booked' : 'available', price: basePrice + 100 };
    const leftSeat2 = { id: idCounter++, row, col: 'B', status: Math.random() > 0.8 ? 'booked' : 'available', price: basePrice };
    
    const rightSeat1 = { id: idCounter++, row, col: 'C', status: Math.random() > 0.6 ? 'booked' : 'available', price: basePrice };
    const rightSeat2 = { id: idCounter++, row, col: 'D', status: Math.random() > 0.9 ? 'booked' : 'available', price: basePrice + 100 };

    layout.push([leftSeat1, leftSeat2, null, rightSeat1, rightSeat2]);
  }
  return layout;
};

const SeatPreview = () => {
  const [seats, setSeats] = useState(generateSeats());
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [hoveredSeat, setHoveredSeat] = useState(null);

  const handleSeatClick = (seat) => {
    if (seat.status === 'booked') return;

    if (selectedSeats.find(s => s.id === seat.id)) {
      setSelectedSeats(selectedSeats.filter(s => s.id !== seat.id));
    } else {
      if (selectedSeats.length >= 6) {
        alert("You can only select up to 6 seats max.");
        return;
      }
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const isSelected = (seatId) => selectedSeats.some(s => s.id === seatId);
  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  return (
    <div className="block-section !overflow-visible relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 skew-x-12 translate-x-32 pointer-events-none rounded-r-[24px]" />

      <div className="w-full relative z-10 flex flex-col lg:flex-row items-center lg:items-start gap-16">
        
        <div className="flex-1 lg:max-w-md w-full">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-blue-500/10 text-blue-400 font-black text-[10px] uppercase tracking-widest mb-8 border border-blue-200/50">
              <MousePointerClick className="w-4 h-4" />
              Smart Interactive Seating
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-[1.05] tracking-tighter">
              Pick Your <br />
              <span className="text-blue-600">Perfect Spot</span>
            </h2>
            <p className="text-slate-500 text-xl mb-12 leading-relaxed font-medium">
              Real-time availability with dynamic pricing. Select from our range of Prime Window, Aisle, and Premium Sleeper seats.
            </p>

            <div className="glass-card p-8 rounded-3xl mb-12 flex flex-col gap-6 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-2 h-full bg-blue-600 shadow-[0_0_20px_#2563eb]" />
              <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest flex items-center gap-3">
                <Search className="w-4 h-4 text-blue-500" /> Availability Legend
              </h4>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl border-2 border-slate-200 bg-white shadow-sm" />
                  <span className="text-slate-600 font-bold text-xs uppercase tracking-wider">Available</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200 shadow-inner">
                    <XCircle className="w-5 h-5 opacity-40" />
                  </div>
                  <span className="text-slate-400 font-bold text-xs uppercase tracking-wider">Reserved</span>
                </div>
                <div className="flex items-center gap-4 col-span-2 mt-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 shadow-[0_4px_20px_rgba(37,99,235,0.4)] flex items-center justify-center text-white ring-2 ring-blue-400/50 ring-offset-2">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <span className="text-blue-600 font-black text-xs uppercase tracking-wider">Your Selection</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 text-white p-1 rounded-3xl shadow-premium relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/30 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-600/50 transition-colors duration-1000" />
              
              <div className="bg-slate-800/40 p-8 rounded-[1.4rem] flex items-center justify-between border border-white/5 backdrop-blur-3xl relative z-10">
                <div>
                  <p className="text-slate-500 font-black text-[10px] uppercase tracking-[0.2em] mb-2">Estimated Fare</p>
                  <p className="text-4xl font-black text-white tracking-tighter flex items-center gap-3">
                    ₹{totalPrice.toLocaleString()} 
                    {selectedSeats.length > 0 && <span className="text-blue-400 text-sm font-bold tracking-normal">× {selectedSeats.length}</span>}
                  </p>
                </div>
                <button 
                  disabled={selectedSeats.length === 0}
                  className="bg-blue-600 disabled:bg-slate-700 disabled:opacity-50 hover:bg-blue-500 text-white font-black uppercase tracking-widest text-[10px] py-4 px-10 rounded-2xl transition-all shadow-premium hover:shadow-[0_0_30px_#2563eb80] active:scale-95 disabled:shadow-none"
                >
                  Continue
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex-1 w-full max-w-sm"
        >
          <div className="bg-white border-4 border-slate-50 rounded-[4rem] p-8 shadow-premium relative min-h-[700px] flex flex-col ring-8 ring-slate-100/50 ring-inset">
            
            <div className="border-b-2 border-slate-100 pb-10 mb-10 flex justify-end">
              <div className="w-14 h-14 rounded-2xl border-2 border-slate-200 flex items-center justify-center bg-slate-50 shadow-inner group transition-colors hover:border-blue-200 hover:bg-blue-50">
                <span className="text-[10px] font-black text-slate-400 group-hover:text-blue-400 transition-colors -rotate-90 tracking-widest">CABIN</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-4 hide-scrollbar relative">
              <div className="grid grid-cols-5 gap-y-7 gap-x-3">
                {seats.map((row, rowIndex) => (
                  <React.Fragment key={rowIndex}>
                    {row.map((seat, colIndex) => {
                      if (seat === null) {
                        return <div key={`aisle-${rowIndex}-${colIndex}`} className="w-10"></div>;
                      }

                      const selected = isSelected(seat.id);
                      const isBooked = seat.status === 'booked';
                      const isHovered = hoveredSeat === seat.id && !isBooked;

                      return (
                        <div key={seat.id} className="relative" onMouseEnter={() => setHoveredSeat(seat.id)} onMouseLeave={() => setHoveredSeat(null)}>
                          <AnimatePresence>
                            {isHovered && (
                              <motion.div initial={{ opacity: 0, scale: 0.8, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8, y: 10 }} className="absolute -top-16 left-1/2 -translate-x-1/2 bg-slate-900 text-white p-3 rounded-xl flex flex-col items-center pointer-events-none z-50 shadow-2xl backdrop-blur-xl border border-white/10">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Row {seat.row} {seat.col}</span>
                                <span className="text-sm font-black text-blue-400 tracking-tight">₹{seat.price}</span>
                                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 rotate-45 border-r border-b border-white/5" />
                              </motion.div>
                            )}
                          </AnimatePresence>

                          <button onClick={() => handleSeatClick(seat)} disabled={isBooked} className={`relative w-14 h-14 rounded-2xl transition-all duration-300 group overflow-hidden flex items-center justify-center border-2 shadow-sm ${isBooked ? 'bg-slate-50 border-slate-100 cursor-not-allowed grayscale' : selected ? 'bg-blue-600 border-blue-400 shadow-[0_10px_25px_rgba(37,99,235,0.5)] scale-110 active:scale-95 z-20 border-white/20' : 'bg-white border-slate-200 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/10 hover:scale-105 active:scale-95'}`}>
                            {!isBooked && !selected && <div className="absolute inset-x-2 bottom-2 h-1.5 bg-slate-100 rounded-full group-hover:bg-blue-50 transition-colors" />}
                            {selected && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 12 }}><CheckCircle className="w-8 h-8 text-white drop-shadow-md" /></motion.div>}
                            {isBooked && <XCircle className="w-6 h-6 text-slate-300 opacity-40" />}
                          </button>
                        </div>
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>
            </div>

          </div>
        </motion.div>
      </div>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default SeatPreview;
