import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, MapPin } from 'lucide-react';

const destinations = [
  { city: "Goa", props: "4,200+ properties", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80", size: "large" },
  { city: "Jaipur", props: "2,800+ properties", image: "https://images.unsplash.com/photo-1599639668273-53538f9b58f6?auto=format&fit=crop&w=800&q=80", size: "small" },
  { city: "Shimla", props: "1,900+ properties", image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80", size: "small" },
  { city: "Mumbai", props: "6,500+ properties", image: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&w=1200&q=80", size: "large" },
  { city: "Manali", props: "1,200+ properties", image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80", size: "small" },
  { city: "Varanasi", props: "900+ properties", image: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=800&q=80", size: "small" }
];

const HotelDestinations = () => (
  <div className="block-section">
    <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
      <div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter"
        >
          Cultural <br />
          <span className="text-rose-600">Epicenters</span>
        </motion.h2>
        <p className="text-slate-500 mt-6 text-xl font-medium max-w-2xl leading-relaxed">
          Embark on a journey through India's most iconic landscapes. Our global network ensures a luxury hearth awaits in every corner.
        </p>
      </div>
      <button className="text-rose-500 font-black uppercase tracking-widest text-xs flex items-center gap-3 bg-rose-50 px-10 py-5 rounded-2xl hover:bg-rose-100 transition-all group shadow-sm active:scale-95">
        Map the World <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 auto-rows-[300px]">
      {destinations.map((dest, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: idx * 0.1, duration: 0.6 }}
          viewport={{ once: true }}
          whileHover={{ y: -10, scale: 1.02 }}
          className={`relative overflow-hidden rounded-[2.5rem] cursor-pointer group shadow-premium hover:shadow-[0_40px_80px_rgba(0,0,0,0.2)] transition-all duration-700
            ${dest.size === 'large' ? 'lg:col-span-2 row-span-2' : 'col-span-2 md:col-span-1'}`}
        >
          {/* Cinematic Background */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent z-10 group-hover:via-slate-900/20 transition-all duration-700" />
          <img 
            src={dest.image} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
            alt={dest.city} 
          />
          
          {/* Glassmorphism Content Overlay */}
          <div className="absolute inset-0 z-20 p-10 flex flex-col justify-end">
             <motion.div 
               initial={{ y: 20, opacity: 0 }}
               whileInView={{ y: 0, opacity: 1 }}
               transition={{ delay: idx * 0.1 + 0.3 }}
               className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
             >
                <div className="flex items-center gap-2 text-rose-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
                   <MapPin size={12} strokeWidth={3} /> Trending Destination
                </div>
                <h3 className="text-white font-black text-3xl tracking-tight mb-2">{dest.city}</h3>
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2 text-white/70 text-xs font-bold font-mono">
                     <Building2 size={14} strokeWidth={2.5} className="text-blue-400" /> {dest.props}
                   </div>
                   <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-900 group-hover:bg-rose-500 group-hover:text-white transition-all shadow-xl">
                      <ArrowRight size={20} />
                   </div>
                </div>
             </motion.div>
          </div>

          {/* Animated Overlay Pulse */}
          <div className="absolute top-8 right-8 w-2 h-2 bg-rose-500 rounded-full animate-ping z-30" />
        </motion.div>
      ))}
    </div>
  </div>
);

export default HotelDestinations;
