import React from 'react';
import { motion } from 'framer-motion';
import { Map, Info } from 'lucide-react';

const InfoWidgets = () => {
  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Platform Locator */}
      <motion.div 
        whileHover={{ x: 5 }}
        className="flex-1 bg-white/90 backdrop-blur-xl p-6 rounded-[2rem] border border-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgba(220,38,38,0.1)] transition-all flex items-center gap-4 cursor-pointer group"
      >
        <div className="bg-rose-500/10 p-4 rounded-2xl text-rose-600 group-hover:scale-110 transition-transform shadow-inner">
           <Map size={24} />
        </div>
        <div>
          <h3 className="font-black text-gray-800 text-lg">Platform Locator</h3>
          <p className="text-[10px] uppercase tracking-widest font-black text-gray-400 mt-0.5">Find boarding platform</p>
        </div>
      </motion.div>

      {/* Tatkal Guide */}
      <motion.div 
        whileHover={{ x: 5 }}
        className="flex-1 bg-white/90 backdrop-blur-xl p-6 rounded-[2rem] border border-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgba(220,38,38,0.1)] transition-all flex items-center gap-4 cursor-pointer group"
      >
        <div className="bg-cyan-500/10 p-4 rounded-2xl text-cyan-600 group-hover:scale-110 transition-transform shadow-inner">
           <Info size={24} />
        </div>
        <div>
          <h3 className="font-black text-gray-800 text-lg">Tatkal Guide</h3>
          <p className="text-[10px] uppercase tracking-widest font-black text-gray-400 mt-0.5">AC opens 10 AM, Non-AC 11 AM</p>
        </div>
      </motion.div>
    </div>
  );
};

export default InfoWidgets;
