import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MapPin, Star, TrendingUp } from 'lucide-react';

const stays = [
  { name: "The Dune Eco Village", city: "Puducherry", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=90", price: "₹6,200", rating: 4.8, match: 96, reason: "Matches your eco-travel preference" },
  { name: "Zostel Manali", city: "Manali", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=90", price: "₹1,800", rating: 4.6, match: 90, reason: "Popular with solo backpackers" },
  { name: "Jungle Lodges Coorg", city: "Coorg", image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=90", price: "₹9,500", rating: 4.9, match: 88, reason: "Based on your nature searches" },
  { name: "Beach House Varkala", city: "Varkala", image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=90", price: "₹4,800", rating: 4.7, match: 83, reason: "Price dropped by ₹1,200 today" }
];

const HotelRecommendations = () => (
  <div className="w-full py-24 bg-slate-950 rounded-[3.5rem] px-8 lg:px-20 relative overflow-hidden group shadow-[0_40px_100px_rgba(0,0,0,0.5)] border border-white/5 mt-16">
    {/* Cinematic Background Glow */}
    <div className="absolute inset-0 opacity-40 pointer-events-none">
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-rose-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px]" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] bg-[size:30px_30px]" />
    </div>

    <div className="relative z-10">
      <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
         <div>
           <motion.div
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-rose-500/10 text-rose-400 font-black text-[10px] uppercase tracking-widest border border-rose-500/20 backdrop-blur-md mb-6"
           >
             <Sparkles size={14} className="text-amber-400" /> Neural Curation Engine
           </motion.div>
           <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
             Smart <br />
             <span className="text-rose-500 text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">Recommendations</span>
           </h2>
           <p className="text-slate-400 mt-6 text-xl font-medium max-w-2xl leading-relaxed">
             Hyper-personalized stay suggestions calibrated by our global hospitality index to match your unique travel DNA.
           </p>
         </div>
         <div className="flex items-center gap-2 text-slate-500 font-black uppercase tracking-[0.2em] text-[10px] bg-white/5 px-6 py-3 rounded-2xl border border-white/5">
           <TrendingUp size={16} className="text-emerald-500" /> 94% Accuracy in Match
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {stays.map((stay, idx) => (
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
              <img src={stay.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={stay.name} />
              
              {/* Match Score Badge */}
              <div className="absolute top-6 right-6 z-20 bg-rose-600 text-[10px] font-black text-white px-4 py-2 rounded-xl shadow-2xl ring-4 ring-rose-600/20">
                {stay.match}% DNA MATCH
              </div>

              {/* Tag Over Image */}
              <div className="absolute bottom-6 left-8 z-20">
                 <div className="flex items-center gap-2 text-white font-black text-xl tracking-tight leading-tight">
                   <MapPin size={16} className="text-rose-400" /> {stay.city}
                 </div>
              </div>
            </div>

            {/* Info Area */}
            <div className="p-8">
              <h3 className="text-white font-black text-lg mb-2 truncate group-hover:text-rose-400 transition-colors tracking-tight">{stay.name}</h3>
              <p className="text-slate-400 text-[11px] font-medium mb-6 leading-relaxed bg-white/5 p-4 rounded-2xl border border-white/5 group-hover:text-slate-200 transition-colors italic">
                "{stay.reason}"
              </p>
              
              <div className="flex items-center justify-between">
                 <div>
                   <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-1 translate-x-1">Starting From</p>
                   <p className="text-2xl font-black text-white tracking-tighter">{stay.price}<span className="text-xs text-slate-500 ml-1">/NT</span></p>
                 </div>
                 <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1.5 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                       <Star size={14} fill="#10b981" color="#10b981" />
                       <span className="text-emerald-400 font-black text-xs">{stay.rating}</span>
                    </div>
                 </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default HotelRecommendations;
