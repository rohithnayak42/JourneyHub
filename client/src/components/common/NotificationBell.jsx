import React, { useState, useRef, useEffect } from 'react';
import { Bell } from 'lucide-react';

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  
  const notifications = [
    { title: "Price Dropped!", desc: "Delhi to Manali bus fare dropped by ₹200.", time: "10 mins ago", unread: true },
    { title: "Web Check-in Open", desc: "For your upcoming flight 6E-2054 to Mumbai.", time: "2 hours ago", unread: true },
    { title: "Booking Confirmed", desc: "Taj Mahal Palace booking successful.", time: "1 day ago", unread: false }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [containerRef]);

  return (
    <div className="relative" ref={containerRef}>
      <button 
         onClick={() => setIsOpen(!isOpen)}
         className="relative p-2 text-gray-500 hover:text-blue-600 transition-colors bg-white hover:bg-blue-50 rounded-full border border-gray-100 shadow-sm hover:shadow-md"
      >
         <Bell size={20} />
         <span className="absolute top-0 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></span>
         <span className="absolute top-0 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-white"></span>
      </button>

      {isOpen && (
         <div className="absolute top-12 right-0 w-80 bg-white rounded-[1.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden z-[100] animate-in slide-in-from-top-2 duration-200">
            <div className="bg-gray-50 px-5 py-3 border-b border-gray-100 flex justify-between items-center">
               <h4 className="font-black text-gray-800 tracking-tight">Notifications</h4>
               <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest cursor-pointer hover:underline">Mark all as read</span>
            </div>
            <div className="max-h-80 overflow-y-auto custom-scrollbar">
               {notifications.map((notif, idx) => (
                  <div key={idx} className={`px-5 py-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer ${notif.unread ? 'bg-blue-50/30' : ''}`}>
                     <div className="flex justify-between items-start mb-1">
                        <h5 className={`text-sm tracking-tight ${notif.unread ? 'font-black text-gray-800' : 'font-bold text-gray-600'}`}>{notif.title}</h5>
                        {notif.unread && <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-1.5"></span>}
                     </div>
                     <p className="text-xs font-semibold text-gray-500 mb-2">{notif.desc}</p>
                     <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{notif.time}</p>
                  </div>
               ))}
            </div>
            <div className="bg-gray-50 p-3 text-center border-t border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors">
               <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">View All</span>
            </div>
         </div>
      )}
    </div>
  );
};

export default NotificationBell;
