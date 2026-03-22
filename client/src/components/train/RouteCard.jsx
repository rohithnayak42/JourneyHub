import React from 'react';
import { motion } from 'framer-motion';
import { Train } from 'lucide-react';

const RouteCard = ({ route }) => {
  return (
    <div className="bg-white/80 backdrop-blur-xl p-6 rounded-[2rem] border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(220,38,38,0.1)] hover:border-red-200 hover:-translate-y-2 transition-all duration-300 group cursor-pointer flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <h4 className="font-black text-red-600 text-sm uppercase tracking-widest">{route.name}</h4>
        <span className="bg-red-50 text-red-600 text-[10px] font-black px-3 py-1.5 rounded-full border border-red-100">{route.number}</span>
      </div>
      
      <div className="flex items-center justify-between mt-2 mb-2">
        <div className="flex flex-col">
          <span className="text-3xl font-black text-gray-800 tracking-tight">{route.departure}</span>
          <span className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">{route.from}</span>
        </div>
        
        <div className="flex-1 mx-8 relative flex flex-col items-center justify-center">
          <span className="text-[10px] font-black text-gray-400 absolute -top-5 tracking-widest">{route.duration}</span>
          {/* Animated Line Container */}
          <div className="w-full h-[3px] bg-gray-100 rounded-full relative overflow-visible">
            <motion.div 
               className="h-full bg-gradient-to-r from-red-300 to-red-500 rounded-full"
               initial={{ width: "0%" }}
               whileInView={{ width: "100%" }}
               transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
               viewport={{ once: true }}
            />
            {/* Animated Train Icon */}
            <motion.div
               className="absolute top-1/2 -translate-y-1/2 text-red-500 drop-shadow-md"
               initial={{ left: "0%" }}
               whileInView={{ left: "100%" }}
               transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
               viewport={{ once: true }}
               style={{ x: "-50%" }}
            >
               <Train size={20} fill="currentColor" className="text-red-500" />
            </motion.div>
          </div>
        </div>
        
        <div className="flex flex-col text-right">
          <span className="text-3xl font-black text-gray-800 tracking-tight">{route.arrival}</span>
          <span className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">{route.to}</span>
        </div>
      </div>
      
      <div className="mt-auto pt-6 border-t border-gray-100/60 flex justify-between items-center">
         <span className="bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md">Available</span>
         <span className="text-xl font-black text-gray-800">{route.price}</span>
      </div>
    </div>
  );
};
export default RouteCard;
