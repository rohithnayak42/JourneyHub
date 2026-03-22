import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, ArrowRight } from 'lucide-react';

const FoodOrderWidget = () => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white/90 backdrop-blur-xl rounded-[2rem] border border-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgba(220,38,38,0.1)] transition-all flex flex-col h-full overflow-hidden"
    >
      <div className="h-28 w-full relative group cursor-pointer overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/30 transition-colors"></div>
        <img src="https://images.unsplash.com/photo-1589302168068-964664d93cb0?auto=format&fit=crop&w=800&q=80" alt="Biryani" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 text-white">
          <div className="bg-orange-500 p-2 rounded-xl shadow-md">
             <Utensils size={18} />
          </div>
          <span className="font-black tracking-tight text-lg drop-shadow-md">E-Catering</span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-black text-gray-800 mb-1">Order Food to Your Seat</h3>
        <p className="text-xs text-gray-500 font-bold mb-4">Hot & hygienic meals from top restaurants delivered at 300+ stations.</p>
        
        <div className="mt-auto flex gap-2">
          <input type="text" placeholder="Enter PNR" className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-orange-500/50" />
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-1 transition-colors shadow-md">
             Menu <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
export default FoodOrderWidget;
