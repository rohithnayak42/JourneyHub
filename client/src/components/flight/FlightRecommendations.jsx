import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Sparkles, MapPin } from 'lucide-react';

const recommendations = [
  {
    city: "Goa",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=90&w=1200",
    tag: "Beach Getaway",
    tagColor: "bg-cyan-100 text-cyan-700",
    price: "₹4,200",
    match: 97,
    reason: "Based on your recent searches"
  },
  {
    city: "Shimla",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=90&w=1200",
    tag: "Hill Station",
    tagColor: "bg-green-100 text-green-700",
    price: "₹5,600",
    match: 91,
    reason: "Trending in your city"
  },
  {
    city: "Jaipur",
    image: "https://images.unsplash.com/photo-1599639668273-53538f9b58f6?auto=format&fit=crop&q=90&w=1200",
    tag: "Heritage",
    tagColor: "bg-amber-100 text-amber-700",
    price: "₹3,800",
    match: 85,
    reason: "Popular with similar travellers"
  },
  {
    city: "Andaman",
    image: "https://images.unsplash.com/photo-1559136560-5ad3d0226aff?auto=format&fit=crop&q=90&w=1200",
    tag: "Island Escape",
    tagColor: "bg-blue-100 text-blue-700",
    price: "₹8,500",
    match: 79,
    reason: "Price drop alert: flat ₹1,200 off"
  }
];

const FlightRecommendations = () => {
  return (
    <div className="w-full py-24 bg-slate-950 rounded-[3.5rem] px-8 lg:px-20 relative overflow-hidden group shadow-[0_40px_100px_rgba(0,0,0,0.5)] border border-white/5 mt-16">
      {/* Cinematic Background Glow */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] bg-[size:30px_30px]" />
      </div>

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
           <div>
             <motion.div
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 font-black text-[10px] uppercase tracking-widest border border-blue-500/20 backdrop-blur-md mb-6"
             >
               <Sparkles size={14} className="text-amber-400" /> AI-Powered Curator
             </motion.div>
             <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
               Smart <br />
               <span className="text-blue-500 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Recommendations</span>
             </h2>
             <p className="text-slate-400 mt-6 text-xl font-medium max-w-2xl leading-relaxed">
               Personalized destinations calibrated by our neural travel engine based on your global exploration patterns.
             </p>
           </div>
           <div className="flex items-center gap-2 text-slate-500 font-black uppercase tracking-[0.2em] text-[10px] bg-white/5 px-6 py-3 rounded-2xl border border-white/5">
             <TrendingUp size={16} className="text-green-500" /> 12% Higher Savings Found
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {recommendations.map((rec, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -15, scale: 1.02 }}
              className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] overflow-hidden cursor-pointer group hover:bg-white/10 hover:border-white/20 transition-all duration-500 shadow-2xl relative"
            >
              {/* Image Container */}
              <div className="h-52 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/10 to-transparent z-10" />
                <img src={rec.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={rec.city} />
                
                {/* Match Score Badge */}
                <div className="absolute top-6 right-6 z-20 bg-blue-600 text-[10px] font-black text-white px-4 py-2 rounded-xl shadow-2xl ring-4 ring-blue-600/20">
                  {rec.match}% AI MATCH
                </div>

                {/* City Tag Over Image */}
                <div className="absolute bottom-6 left-8 z-20">
                   <div className="flex items-center gap-2 text-white font-black text-2xl tracking-tighter">
                     <MapPin size={20} className="text-blue-400" /> {rec.city}
                   </div>
                </div>
              </div>

              {/* Info Area */}
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className={`${rec.tagColor} text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg bg-opacity-20 backdrop-blur-md border border-white/5`}>
                    {rec.tag}
                  </span>
                </div>
                <p className="text-slate-400 text-xs font-medium mb-6 leading-relaxed bg-white/5 p-4 rounded-2xl border border-white/5 group-hover:text-slate-200 transition-colors">
                  {rec.reason}
                </p>
                <div className="flex items-end justify-between">
                   <div>
                     <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-1 translate-x-1">Starting From</p>
                     <p className="text-2xl font-black text-white tracking-tighter">{rec.price}</p>
                   </div>
                   <button className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white hover:bg-blue-600 transition-all active:scale-95 shadow-lg">
                      <Sparkles size={20} />
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

export default FlightRecommendations;
