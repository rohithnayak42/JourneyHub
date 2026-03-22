import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';

const DatePicker = ({ value, onChange, label = "Date of Journey" }) => {
  return (
    <div className="flex-1 min-w-[180px] p-4 group cursor-pointer border-r border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">{label}</p>
      <div className="relative flex items-center gap-3">
        <CalendarIcon size={20} className="text-primary group-hover:scale-110 transition-transform" />
        <input 
          type="date" 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-transparent border-none outline-none text-lg font-black text-gray-800 w-full cursor-pointer focus:ring-0 p-0"
        />
      </div>
    </div>
  );
};

export default DatePicker;
