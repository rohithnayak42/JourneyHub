import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MapPin, Search } from 'lucide-react';

const recommendations = [
  { id: 1, to: "Goa", searches: "2.4k recent searches", price: "₹1,200", match: "98%" },
  { id: 2, to: "Manali", searches: "1.8k recent searches", price: "₹1,500", match: "95%" },
  { id: 3, to: "Ooty", searches: "1.2k recent searches", price: "₹800", match: "89%" },
];

const BusRecommendations = () => {
  return (
    <section className="py-16 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center gap-12">
          
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
            <div className="flex flex-col gap-4">
              {recommendations.map((rec, index) => (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, type: 'spring', stiffness: 100 }}
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl flex items-center justify-between cursor-pointer group transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-300 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-1 group-hover:text-blue-200 transition-colors">{rec.to}</h4>
                      <p className="text-sm text-blue-200/60 font-medium">{rec.searches}</p>
                    </div>
                  </div>
                  
                  <div className="text-right flex flex-col items-end gap-2">
                    <span className="text-lg font-black text-emerald-400">{rec.price}</span>
                    <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-blue-500 transition-colors">
                      <Search className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BusRecommendations;
