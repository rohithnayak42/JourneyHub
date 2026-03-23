import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Plane, Clock, CheckCircle } from 'lucide-react';

const routes = [
  {
    from: "Delhi",
    to: "Mumbai",
    image: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&q=80&w=600",
    price: "₹3,200",
    airlines: ["Indigo", "Air India", "Vistara"],
    duration: "2h 15m",
    badge: "Most Popular"
  },
  {
    from: "Bangalore",
    to: "Delhi",
    image: "https://images.unsplash.com/photo-1587474260580-2d88d223fa8c?auto=format&fit=crop&q=80&w=600",
    price: "₹4,100",
    airlines: ["Indigo", "Akasa Air"],
    duration: "2h 45m",
    badge: "Price Drop"
  },
  {
    from: "Mumbai",
    to: "Goa",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=600",
    price: "₹2,500",
    airlines: ["SpiceJet", "Indigo"],
    duration: "1h 10m",
    badge: "Fastest Route"
  },
  {
    from: "Hyderabad",
    to: "Chennai",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=600",
    price: "₹2,800",
    airlines: ["Indigo", "AirAsia"],
    duration: "1h 25m",
    badge: "Trending"
  }
];

const FlightRoutes = () => {
  return (
    <div className="block-section">
      <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
        <div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter"
          >
            Hot Flight <br />
            <span className="text-blue-600">Destinations</span>
          </motion.h2>
          <p className="text-slate-500 mt-6 text-xl font-medium max-w-2xl leading-relaxed">
            Curated list of the most popular and affordable flight routes trending this week across the globe.
          </p>
        </div>
        <button className="text-blue-600 font-black uppercase tracking-widest text-xs flex items-center gap-3 bg-blue-50 px-10 py-5 rounded-2xl hover:bg-blue-100 transition-all group shadow-sm active:scale-95">
          View Global Routes <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {routes.map((route, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ y: -15 }}
            className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-premium hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all duration-500 group relative cursor-pointer"
          >
            {/* Cinematic Image Banner */}
            <div className="h-60 w-full relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent z-10 pointer-events-none" />
              <img 
                src={route.image || "https://images.unsplash.com/photo-1436491865332-7a61f114f509?auto=format&fit=crop&w=1920&q=80"} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                alt={`${route.to}`} 
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1436491865332-7a61f114f509?auto=format&fit=crop&w=1920&q=80";
                }}
              />
              
              {/* Premium Badge */}
              <div className="absolute top-6 left-6 z-20 bg-white text-slate-900 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl shadow-2xl backdrop-blur-md border border-white/20">
                {route.badge}
              </div>

              {/* Route Overlay Title */}
              <div className="absolute bottom-6 left-8 right-8 z-20">
                <div className="flex items-center gap-3 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
                  <span>{route.from}</span>
                  <Plane size={14} className="rotate-45" />
                  <span>{route.to}</span>
                </div>
                <div className="text-white font-black text-3xl tracking-tighter">
                  {route.price}
                </div>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-8">
              <div className="flex items-center justify-between text-slate-400 text-[11px] font-black uppercase tracking-widest mb-6">
                <div className="flex items-center gap-2">
                  <Clock size={14} strokeWidth={3} className="text-blue-500" /> {route.duration}
                </div>
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 border-2 border-white flex items-center justify-center text-[10px] font-black text-white shadow-lg">6i</div>
                  <div className="w-8 h-8 rounded-xl bg-red-600 border-2 border-white flex items-center justify-center text-[10px] font-black text-white shadow-lg">AI</div>
                  <div className="w-8 h-8 rounded-xl bg-slate-900 border-2 border-white flex items-center justify-center text-[10px] font-black text-white shadow-lg">+{route.airlines.length - 2}</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {route.airlines.map((airline, i) => (
                  <span key={i} className="text-[9px] font-black uppercase tracking-widest bg-slate-50 text-slate-400 px-3 py-1.5 rounded-lg border border-slate-100">
                    {airline}
                  </span>
                ))}
              </div>

              <button className="w-full bg-slate-900 hover:bg-blue-600 text-white font-black uppercase tracking-widest text-[10px] py-4 rounded-2xl transition-all shadow-xl active:scale-95">
                Explore Fares
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FlightRoutes;
