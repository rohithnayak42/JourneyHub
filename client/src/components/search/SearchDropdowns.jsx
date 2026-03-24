import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Check, X } from 'lucide-react';

// 🔹 1. TRAIN: Class selection
export const ClassDropdown = ({ isOpen, selected, onSelect, onClose }) => {
  const classes = [
    { label: "Sleeper", code: "SL" },
    { label: "AC 3 Tier", code: "3A" },
    { label: "AC 2 Tier", code: "2A" },
    { label: "AC First Class", code: "1A" },
    { label: "AC Chair Car", code: "CC" },
    { label: "Second Sitting", code: "2S" }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
           initial={{ opacity: 0, y: 10, scale: 0.95 }}
           animate={{ opacity: 1, y: 0, scale: 1 }}
           exit={{ opacity: 0, y: 10, scale: 0.95 }}
           className="absolute top-full left-0 mt-3 w-72 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 z-[100] p-2"
        >
          <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
            {classes.map((item) => (
              <button
                key={item.code}
                onClick={() => { onSelect(`${item.label} (${item.code})`); onClose(); }}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-green-50 rounded-xl transition-all group mb-1"
              >
                <div className="flex flex-col items-start text-left">
                  <span className="text-sm font-bold text-gray-800">{item.label}</span>
                  <span className="text-[10px] text-gray-400 font-medium group-hover:text-green-600 uppercase">({item.code})</span>
                </div>
                {selected.includes(item.code) && <Check size={18} className="text-green-600" />}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// 🔹 2. FLIGHT: Passenger selection
export const PassengerDropdown = ({ isOpen, counts, onUpdate, onClose }) => {
  const total = counts.adults + counts.children + counts.infants;
  const maxPax = 9;

  const updateCount = (type, delta) => {
    const newValue = counts[type] + delta;
    if (type === 'adults' && newValue < 1) return;
    if (newValue < 0) return;
    if (delta > 0 && total >= maxPax) return;
    
    onUpdate({ ...counts, [type]: newValue });
  };

  const rows = [
    { id: 'adults', label: 'Adults', sub: '12+ yrs' },
    { id: 'children', label: 'Children', sub: '2-12 yrs' },
    { id: 'infants', label: 'Infants', sub: 'Under 2 yrs' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          className="absolute top-full right-0 mt-3 w-[320px] bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 z-[100] p-6"
        >
          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] mb-2">Select Passengers</h4>
            {rows.map((row) => (
              <div key={row.id} className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-800">{row.label}</span>
                  <span className="text-[10px] text-gray-400 font-medium">{row.sub}</span>
                </div>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => updateCount(row.id, -1)}
                    className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:border-blue-500 hover:text-blue-500 hover:bg-blue-50 transition-all active:scale-90"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-6 text-center text-base font-black text-gray-800">{counts[row.id]}</span>
                  <button 
                    onClick={() => updateCount(row.id, 1)}
                    className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:border-blue-500 hover:text-blue-500 hover:bg-blue-50 transition-all active:scale-90"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-5 border-t border-gray-100 flex flex-col gap-4">
            <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 px-1">
              <span>Limit: {maxPax} Passengers</span>
              <span className={total >= maxPax ? 'text-red-500' : 'text-blue-500'}>{total}/{maxPax}</span>
            </div>
            <button 
              onClick={onClose}
              className="w-full py-4 bg-blue-600 text-white rounded-2xl text-[11px] font-black shadow-[0_10px_20px_rgba(37,99,235,0.2)] hover:bg-blue-700 transition-all active:scale-95 tracking-widest"
            >
              APPLY SELECTION
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// 🔹 3. HOTEL: Rooms & Guests
export const GuestDropdown = ({ isOpen, counts, onUpdate, onClose }) => {
  const updateCount = (type, delta) => {
    const newValue = counts[type] + delta;
    if ((type === 'rooms' || type === 'adults') && newValue < 1) return;
    if (newValue < 0) return;
    onUpdate({ ...counts, [type]: newValue });
  };

  const rows = [
    { id: 'rooms', label: 'Rooms', sub: 'Minimum 1' },
    { id: 'adults', label: 'Adults', sub: '12+ yrs' },
    { id: 'children', label: 'Children', sub: '2-12 yrs' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
           initial={{ opacity: 0, y: 10, scale: 0.95 }}
           animate={{ opacity: 1, y: 0, scale: 1 }}
           exit={{ opacity: 0, y: 10, scale: 0.95 }}
           className="absolute top-full right-0 mt-3 w-[320px] bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 z-[100] p-6"
        >
          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] mb-2">Rooms & Guests</h4>
            {rows.map((row) => (
              <div key={row.id} className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-800">{row.label}</span>
                  <span className="text-[10px] text-gray-400 font-medium">{row.sub}</span>
                </div>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => updateCount(row.id, -1)}
                    className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:border-purple-500 hover:text-purple-500 hover:bg-purple-50 transition-all active:scale-90"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-6 text-center text-base font-black text-gray-800">{counts[row.id]}</span>
                  <button 
                    onClick={() => updateCount(row.id, 1)}
                    className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:border-purple-500 hover:text-purple-500 hover:bg-purple-50 transition-all active:scale-90"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-5 border-t border-gray-100">
            <button 
              onClick={onClose}
              className="w-full py-4 bg-purple-600 text-white rounded-2xl text-[11px] font-black shadow-[0_10px_20px_rgba(147,51,234,0.2)] hover:bg-purple-700 transition-all active:scale-95 tracking-widest"
            >
              APPLY SELECTION
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
