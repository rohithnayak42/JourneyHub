import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck } from 'lucide-react';

const SeatAvailabilityWidget = () => {
  const classes = [
    { name: "1A", status: "AVAILABLE", count: "12", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" },
    { name: "2A", status: "RAC", count: "18", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" },
    { name: "3A", status: "WL", count: "45", color: "text-red-600", bg: "bg-red-50", border: "border-red-200" },
    { name: "SL", status: "AVAILABLE", count: "120", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" }
  ];

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white/90 backdrop-blur-xl p-6 rounded-[2rem] border border-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgba(220,38,38,0.1)] transition-all flex flex-col h-full"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-amber-500/10 p-3 rounded-2xl text-amber-600">
           <UserCheck size={24} />
        </div>
        <h3 className="font-black text-xl text-gray-800 tracking-tight">Seat Availability</h3>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-auto">
        {classes.map((c, idx) => (
          <div key={idx} className={`flex flex-col p-3 rounded-xl border ${c.bg} ${c.border} items-center justify-center text-center cursor-pointer hover:shadow-md transition-shadow`}>
             <span className="font-black text-gray-800 text-lg">{c.name}</span>
             <span className={`text-[9px] font-black uppercase tracking-widest mt-1 ${c.color}`}>{c.status} {c.count}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default SeatAvailabilityWidget;
