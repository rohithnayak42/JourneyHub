import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Search, MapPin } from 'lucide-react';

const LiveStatusWidget = () => {
  const [trainNo, setTrainNo] = useState('');
  const [searched, setSearched] = useState(false);

  const checkStatus = (e) => {
    e.preventDefault();
    if(trainNo.length > 3) setSearched(true);
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white/90 backdrop-blur-xl p-6 rounded-[2rem] border border-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgba(220,38,38,0.1)] transition-all flex flex-col h-full overflow-hidden relative"
    >
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="bg-blue-500/10 p-3 rounded-2xl text-blue-600">
           <Activity size={24} />
        </div>
        <h3 className="font-black text-xl text-gray-800 tracking-tight">Live Status</h3>
      </div>

      <form onSubmit={checkStatus} className="flex gap-2 mb-6 relative z-10">
        <input 
          type="text" 
          value={trainNo} 
          onChange={(e) => setTrainNo(e.target.value.toUpperCase())}
          placeholder="Train No. (e.g. 12951)" 
          className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:font-medium placeholder:text-gray-400"
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl transition-colors shadow-md flex items-center justify-center">
           <Search size={20} className="drop-shadow-sm" />
        </button>
      </form>

      <div className="mt-auto relative z-10">
        <AnimatePresence mode="wait">
          {searched ? (
            <motion.div 
              key="result"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-blue-50 border border-blue-100 p-4 rounded-xl"
            >
               <div className="flex justify-between items-center mb-3">
                 <span className="text-[10px] font-black uppercase text-blue-600 tracking-widest px-2 py-1 bg-blue-100/50 rounded-md">Running 15m Late</span>
                 <span className="text-[10px] font-bold text-gray-500">Updated 2m ago</span>
               </div>
               <div className="flex items-center gap-3">
                  <div className="bg-white p-2 text-blue-500 rounded-full shadow-sm">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">Crossed Surat (ST)</p>
                    <p className="text-[10px] font-bold text-gray-500 mt-0.5">Next stop: Vadodara Jn (BRC) at 14:30</p>
                  </div>
               </div>
            </motion.div>
          ) : (
            <motion.div key="empty" className="text-sm text-gray-400 font-medium bg-gray-50 p-4 rounded-xl border border-gray-100 border-dashed text-center">
              Track exact train location and ETA using GPS telemetry data.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Background decoration */}
      <div className="absolute -bottom-10 -right-10 opacity-[0.03] pointer-events-none">
         <Activity size={180} />
      </div>
    </motion.div>
  );
};

export default LiveStatusWidget;
