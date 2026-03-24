import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';

const DatePicker = ({ value, onChange, label = "Date of Journey" }) => {
  return (
    <div className="relative p-4 cursor-pointer hover:bg-gray-50/50 transition-all flex items-center gap-4 group h-full">
      <style>{`
        input[type="date"]::-webkit-calendar-picker-indicator {
          background: transparent;
          bottom: 0;
          color: transparent;
          cursor: pointer;
          height: auto;
          left: 0;
          position: absolute;
          right: 0;
          top: 0;
          width: auto;
        }
      `}</style>
      <div className="flex items-center justify-center text-gray-400 group-hover:text-red-500 transition-colors">
        <CalendarIcon size={24} strokeWidth={1.5} />
      </div>
      <div className="flex flex-col flex-1">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">{label}</span>
        <input 
          type="date" 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-transparent border-none outline-none text-lg font-black text-gray-800 w-full cursor-pointer focus:ring-0 p-0 relative z-10"
        />
      </div>
    </div>
  );
};

export default DatePicker;
