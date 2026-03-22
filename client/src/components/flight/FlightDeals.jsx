import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Timer, TrendingDown, Zap, Moon } from 'lucide-react';

const deals = [
  {
    icon: TrendingDown,
    iconColor: "text-green-500",
    bg: "from-green-50 to-emerald-100",
    badge: "Budget Pick",
    badgeColor: "bg-green-100 text-green-800",
    title: "Flights under ₹3,000",
    desc: "Unbeatable fares to top cities",
    routes: ["DEL→BOM", "BLR→HYD"],
    price: "₹2,499",
    duration: { h: 3, m: 0, s: 0 }
  },
  {
    icon: Zap,
    iconColor: "text-amber-500",
    bg: "from-amber-50 to-orange-100",
    badge: "Weekend Deal",
    badgeColor: "bg-amber-100 text-amber-800",
    title: "Fly This Weekend",
    desc: "Sat & Sun getaway specials",
    routes: ["BOM→GOA", "DEL→JAI"],
    price: "₹3,850",
    duration: { h: 11, m: 30, s: 0 }
  },
  {
    icon: Moon,
    iconColor: "text-purple-500",
    bg: "from-purple-50 to-violet-100",
    badge: "Last Minute",
    badgeColor: "bg-purple-100 text-purple-800",
    title: "Last Minute Deals",
    desc: "Grab seats before they're gone",
    routes: ["CCU→DEL", "MAA→BOM"],
    price: "₹4,199",
    duration: { h: 1, m: 45, s: 0 }
  }
];

const Counter = ({ h, m, s }) => {
  const [time, setTime] = useState({ h, m, s });
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => {
        let { h, m, s } = prev;
        if (s > 0) return { h, m, s: s - 1 };
        if (m > 0) return { h, m: m - 1, s: 59 };
        if (h > 0) return { h: h - 1, m: 59, s: 59 };
        return { h: 23, m: 59, s: 59 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const fmt = n => String(n).padStart(2, '0');
  return (
    <div className="flex items-center gap-1.5 font-black text-[10px] uppercase tracking-widest text-slate-900 bg-white/40 backdrop-blur-md px-3 py-2 rounded-xl border border-white/20">
      <span className="w-6 text-center">{fmt(time.h)}h</span>
      <span className="opacity-30">:</span>
      <span className="w-6 text-center">{fmt(time.m)}m</span>
      <span className="opacity-30">:</span>
      <span className="w-6 text-center text-blue-600 font-black">{fmt(time.s)}s</span>
    </div>
  );
};

const FlightDeals = () => {
  return (
    <div className="w-full py-20">
      <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
        <div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter"
          >
            Flash Fare <br />
            <span className="text-blue-600">Deal Engine</span>
          </motion.h2>
          <p className="text-slate-500 mt-6 text-xl font-medium max-w-2xl leading-relaxed">
            Real-time algorithmic pricing captured for your next getaway. These fares expire as soon as the seats fill up.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {deals.map((deal, idx) => {
          const Icon = deal.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -15, scale: 1.02 }}
              className={`bg-gradient-to-br ${deal.bg} rounded-[2.5rem] p-10 border border-white shadow-premium hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all duration-500 relative overflow-hidden group`}
            >
              {/* Animated Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 blur-[60px] -translate-y-16 translate-x-16 group-hover:translate-x-0 transition-transform duration-1000" />
              
              <div className="flex justify-between items-start mb-10">
                <div className={`p-4 bg-white rounded-2xl shadow-xl ${deal.iconColor} ring-4 ring-white/20`}>
                  <Icon size={32} strokeWidth={2.5} />
                </div>
                <span className={`${deal.badgeColor} text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl shadow-lg border border-white/40 backdrop-blur-sm`}>
                  {deal.badge}
                </span>
              </div>

              <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight leading-tight">{deal.title}</h3>
              <p className="text-sm text-slate-500 font-medium mb-8 leading-relaxed">{deal.desc}</p>

              <div className="flex flex-wrap gap-2 mb-10">
                {deal.routes.map((r, i) => (
                  <span key={i} className="text-[10px] font-black uppercase tracking-widest bg-white/60 backdrop-blur-md px-4 py-2 rounded-xl text-slate-700 shadow-sm border border-white/40">
                    {r}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1.5 translate-x-1">Starting @</p>
                  <motion.p
                    className="text-4xl font-black text-slate-900 tracking-tighter"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {deal.price}
                  </motion.p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em] mb-2 flex items-center justify-end gap-2">
                    <Timer size={12} strokeWidth={3} className="text-blue-500" /> Expires In
                  </p>
                  <Counter {...deal.duration} />
                </div>
              </div>

              <button className="w-full py-5 bg-slate-900 hover:bg-blue-600 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl transition-all shadow-xl active:scale-95 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)]">
                Secure This Rate
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default FlightDeals;
