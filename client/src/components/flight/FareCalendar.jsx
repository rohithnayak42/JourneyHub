import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const FareCalendar = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      current.scrollBy({ left: direction === 'left' ? -200 : 200, behavior: 'smooth' });
    }
  };

  const dates = [
    { date: "01 Apr", day: "Mon", price: "₹3,450", active: true },
    { date: "02 Apr", day: "Tue", price: "₹3,200", active: false },
    { date: "03 Apr", day: "Wed", price: "₹3,500", active: false },
    { date: "04 Apr", day: "Thu", price: "₹3,800", active: false },
    { date: "05 Apr", day: "Fri", price: "₹4,100", active: false, isWeekend: true },
    { date: "06 Apr", day: "Sat", price: "₹4,500", active: false, isWeekend: true },
    { date: "07 Apr", day: "Sun", price: "₹4,200", active: false, isWeekend: true },
    { date: "08 Apr", day: "Mon", price: "₹3,200", active: false },
    { date: "09 Apr", day: "Tue", price: "₹3,150", active: false },
  ];

  return (
    <div className="bg-white rounded-2xl md:rounded-[2rem] shadow-sm border border-gray-100 p-2 flex items-center relative mb-6">
      <button onClick={() => scroll('left')} className="p-3 bg-gray-50 hover:bg-white text-gray-600 rounded-full shadow-inner border border-gray-100 hover:shadow-md hover:text-blue-500 transition-all z-10 hidden md:block">
         <ChevronLeft size={18} />
      </button>
      
      <div ref={scrollRef} className="flex-1 flex overflow-x-auto no-scrollbar gap-2 px-2 scroll-smooth">
         {dates.map((d, idx) => (
           <div 
             key={idx} 
             className={`flex-shrink-0 flex flex-col items-center justify-center w-[25%] md:w-[120px] py-3 px-2 md:px-0 rounded-2xl cursor-pointer transition-all border ${d.active ? 'bg-blue-500 border-blue-500 shadow-md text-white' : 'bg-transparent border-transparent hover:bg-blue-50 text-gray-600'}`}
           >
              <span className={`text-[10px] font-bold uppercase tracking-widest ${d.active ? 'text-blue-100' : 'text-gray-400'}`}>{d.day}</span>
              <span className={`text-sm md:text-lg font-black mt-0.5 mb-1 tracking-tight ${d.active ? 'text-white' : 'text-gray-800'}`}>{d.date}</span>
              <span className={`text-[10px] font-black ${d.active ? 'text-white' : (d.isWeekend ? 'text-red-500' : 'text-emerald-500')}`}>{d.price}</span>
           </div>
         ))}
      </div>

      <button onClick={() => scroll('right')} className="p-3 bg-gray-50 hover:bg-white text-gray-600 rounded-full shadow-inner border border-gray-100 hover:shadow-md hover:text-blue-500 transition-all z-10 hidden md:block">
         <ChevronRight size={18} />
      </button>
    </div>
  );
};
export default FareCalendar;
