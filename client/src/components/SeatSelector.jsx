import React from 'react';
import { motion } from 'framer-motion';

const SeatSelector = ({ seats, selectedSeats, onToggleSeat }) => {
  // Assuming seats is an object { total, booked: [] }
  const totalSeats = seats.total || 40;
  const bookedSeats = seats.booked || [];

  const rows = Math.ceil(totalSeats / 4);
  const layout = Array.from({ length: rows }, (_, rowIdx) => {
    return Array.from({ length: 4 }, (_, colIdx) => rowIdx * 4 + colIdx + 1);
  });

  return (
    <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 inline-block">
      <div className="flex flex-col gap-4">
        {/* Bus Front Indicator */}
        <div className="flex justify-center mb-6">
           <div className="w-40 h-8 bg-gray-200 rounded-t-full relative flex items-center justify-center">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Driver Front</span>
              <div className="absolute -top-1 w-20 h-1 bg-gray-300 rounded-full"></div>
           </div>
        </div>

        {layout.map((row, rowIdx) => (
          <div key={rowIdx} className="flex gap-4 items-center">
            {row.map((seatNum, colIdx) => {
              if (seatNum > totalSeats) return null;
              
              const isBooked = bookedSeats.includes(seatNum.toString()) || bookedSeats.includes(seatNum);
              const isSelected = selectedSeats.includes(seatNum);

              return (
                <React.Fragment key={seatNum}>
                  <motion.button
                    whileHover={!isBooked ? { scale: 1.1 } : {}}
                    whileTap={!isBooked ? { scale: 0.95 } : {}}
                    onClick={() => !isBooked && onToggleSeat(seatNum)}
                    disabled={isBooked}
                    className={`w-10 h-12 rounded-lg border-2 flex items-center justify-center transition-all ${
                      isBooked 
                        ? 'bg-gray-200 border-gray-200 text-gray-400 cursor-not-allowed' 
                        : isSelected
                          ? 'bg-primary border-primary text-white shadow-lg shadow-primary/30'
                          : 'bg-white border-gray-100 text-gray-600 hover:border-primary/50'
                    }`}
                  >
                    <span className="text-[10px] font-bold">{seatNum}</span>
                  </motion.button>
                  {colIdx === 1 && <div className="w-8" />} {/* Aisle */}
                </React.Fragment>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-10 flex justify-center gap-6 border-t border-gray-200 pt-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-white border border-gray-100 rounded"></div>
          <span className="text-[10px] font-bold text-gray-400 uppercase">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-200 rounded"></div>
          <span className="text-[10px] font-bold text-gray-400 uppercase">Booked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-primary rounded"></div>
          <span className="text-[10px] font-bold text-gray-400 uppercase">Selected</span>
        </div>
      </div>
    </div>
  );
};

export default SeatSelector;
