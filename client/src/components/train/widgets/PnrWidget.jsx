import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileCheck2, ArrowRight } from 'lucide-react';

const PnrWidget = () => {
  const [pnr, setPnr] = useState('');
  const [status, setStatus] = useState(null);

  const checkStatus = (e) => {
    e.preventDefault();
    if (pnr.length >= 5) {
      setStatus({ status: 'CNF', coach: 'B4', seat: '72', type: 'Side Lower' });
    }
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white/90 backdrop-blur-xl p-6 rounded-[2rem] border border-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgba(220,38,38,0.1)] transition-all flex flex-col h-full"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-emerald-500/10 p-3 rounded-2xl text-emerald-600">
           <FileCheck2 size={24} />
        </div>
        <h3 className="font-black text-xl text-gray-800 tracking-tight">PNR Status</h3>
      </div>

      <form onSubmit={checkStatus} className="flex gap-2 mb-6">
        <input 
          type="text" 
          value={pnr} 
          onChange={(e) => setPnr(e.target.value.replace(/\D/g, '').slice(0, 10))}
          placeholder="Enter 10-digit PNR" 
          className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-bold text-gray-700 outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder:font-medium placeholder:text-gray-400"
        />
        <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white p-3 rounded-xl transition-colors shadow-md flex items-center justify-center">
           <ArrowRight size={20} />
        </button>
      </form>

      {status ? (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-auto bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex items-center justify-between">
           <div>
             <span className="bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md shadow-sm">{status.status}</span>
             <p className="font-bold text-gray-800 mt-2">{status.coach} - {status.seat} ({status.type})</p>
           </div>
           <div className="text-right">
              <span className="text-[10px] font-bold text-emerald-600 uppercase">Confirmed</span>
           </div>
        </motion.div>
      ) : (
        <div className="mt-auto text-sm text-gray-400 font-medium bg-gray-50 p-4 rounded-xl border border-gray-100 border-dashed text-center">
          Enter PNR to see real-time confirmation chances and seat details.
        </div>
      )}
    </motion.div>
  );
};

export default PnrWidget;
