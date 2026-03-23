import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MapPin, Search } from 'lucide-react';

const recommendations = [
  { id: 1, to: "Goa", searches: "2.4k recent searches", price: "₹1,200", match: "98%", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920&q=80" },
  { id: 2, to: "Manali", searches: "1.8k recent searches", price: "₹1,500", match: "95%", image: "https://images.unsplash.com/photo-1605649487212-4dcb815c4d29?auto=format&fit=crop&w=1920&q=80" },
  { id: 3, to: "Ooty", searches: "1.2k recent searches", price: "₹800", match: "89%", image: "https://images.unsplash.com/photo-1582285188894-3e91129ee799?auto=format&fit=crop&w=1920&q=80" },
];

const BusRecommendations = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 rounded-[24px] p-8 md:p-12 shadow-xl relative overflow-hidden flex flex-col lg:flex-row items-center gap-12 mb-12 border border-slate-700/50">
          
          {/* Decorative Background Patterns */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

          {/* Left: Context */}
          <div className="flex-1 relative z-10 text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-blue-300 font-semibold mb-6 border border-white/10 backdrop-blur-md"
            >
              <Sparkles className="w-4 h-4" />
              Smart Suggestions
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight"
            >
              Recommended <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Just For You</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-blue-100/80 text-lg max-w-md mx-auto lg:mx-0 font-medium"
            >
              Based on your recent searches from Bangalore and trending weekend getaways.
            </motion.p>
          </div>

          {/* Right: Recommendation Cards */}
          <div className="flex-1 w-full relative z-10">
            <div className="grid grid-cols-1 gap-4">
              {recommendations.map((rec, index) => (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, type: 'spring', stiffness: 100 }}
                  className="relative overflow-hidden rounded-2xl min-h-[120px] group cursor-pointer border border-white/10 shadow-lg"
                >
                  {/* Dynamic Background with Fallback */}
                  <img 
                    src={rec.image || "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1920&q=80"}
                    alt={rec.to}
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1920&q=80";
                    }}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/60 to-black/30 opacity-90 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  
                  {/* Content Container */}
                  <div className="relative z-10 p-5 flex items-center justify-between h-full">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-xl flex items-center justify-center text-white border border-white/30 group-hover:bg-blue-500 group-hover:border-blue-400 transition-colors shadow-lg">
                        <MapPin className="w-6 h-6 drop-shadow-sm" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white mb-1 drop-shadow-md">{rec.to}</h4>
                        <p className="text-sm text-blue-100/80 font-medium drop-shadow-sm">{rec.searches}</p>
                      </div>
                    </div>
                    
                    <div className="text-right flex flex-col items-end gap-2">
                       <span className="text-xl font-black text-white drop-shadow-lg">{rec.price}</span>
                       <button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-blue-500 transition-colors shadow-md border border-white/20">
                         <Search className="w-4 h-4" />
                       </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

    </div>
  );
};

export default BusRecommendations;
