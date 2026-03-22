import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Train, MapPin, Users, Clock } from 'lucide-react';

const stats = [
  { value: 13500, suffix: "+", label: "Daily Trains", icon: Train, color: "text-blue-500", bg: "bg-blue-50", bar: "bg-blue-400", pct: 88 },
  { value: 7349, suffix: "+", label: "Stations Covered", icon: MapPin, color: "text-emerald-500", bg: "bg-emerald-50", bar: "bg-emerald-400", pct: 80 },
  { value: 23000000, suffix: "+", label: "Daily Passengers", icon: Users, color: "text-violet-500", bg: "bg-violet-50", bar: "bg-violet-400", pct: 95 },
  { value: 99, suffix: "%", label: "On-time Arrivals", icon: Clock, color: "text-amber-500", bg: "bg-amber-50", bar: "bg-amber-400", pct: 99 }
];

const fmt = n => n >= 1000000 ? `${(n / 1000000).toFixed(0)}M` : n >= 1000 ? `${(n / 1000).toFixed(0)}K` : n;

const StatCard = ({ stat, active }) => {
  const [count, setCount] = useState(0);
  const Icon = stat.icon;
  
  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const total = 120;
    const timer = setInterval(() => {
      frame++;
      const progress = 1 - Math.pow(1 - frame / total, 3);
      setCount(Math.floor(progress * stat.value));
      if (frame >= total) { setCount(stat.value); clearInterval(timer); }
    }, 16);
    return () => clearInterval(timer);
  }, [active, stat.value]);

  const fmt = n => {
    if (n >= 10000000) return `${(n / 10000000).toFixed(1)} Cr`;
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
    return n;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true }} 
      whileHover={{ y: -12 }}
      className="glass-card p-10 rounded-[2.5rem] border border-slate-100 shadow-premium group transition-all duration-500 relative overflow-hidden"
    >
      {/* Subtle accent glow */}
      <div className={`absolute top-0 right-0 w-24 h-24 ${stat.bg} blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000`} />
      
      <div className={`${stat.bg} ${stat.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500`}>
        <Icon size={28} strokeWidth={2.5} />
      </div>
      
      <div className="text-5xl font-black text-slate-900 mb-2 tracking-tighter flex items-baseline gap-1">
        {fmt(count)}
        <span className="text-2xl text-blue-600">{stat.suffix}</span>
      </div>
      
      <p className="text-slate-500 font-black text-[10px] uppercase tracking-[0.2em] mb-8">{stat.label}</p>
      
      <div className="space-y-3">
        <div className="flex justify-between items-end">
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Network Reach</span>
           <span className="text-xs font-black text-slate-900">{stat.pct}%</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
          <motion.div 
            initial={{ width: 0 }} 
            whileInView={{ width: `${stat.pct}%` }} 
            transition={{ duration: 2, ease: 'easeOut', delay: 0.2 }} 
            viewport={{ once: true }} 
            className={`h-full ${stat.bar} rounded-full shadow-[0_0_15px_rgba(0,0,0,0.1)]`} 
          />
        </div>
      </div>
    </motion.div>
  );
};

const TrainStats = () => {
  const ref = useRef(null);
  const active = useInView(ref, { once: true, margin: '-100px' });
  
  return (
    <section ref={ref} className="w-full py-24">
      <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
        <div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter"
          >
            The Lifeline Of <br />
            <span className="text-blue-600">Bharat</span>
          </motion.h2>
          <p className="text-slate-500 mt-6 text-xl font-medium max-w-2xl leading-relaxed">
            Unveiling the sheer scale of the world's most impressive railway infrastructure through live data.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {stats.map((s, i) => <StatCard key={i} stat={s} active={active} />)}
      </div>
    </section>
  );
};

export default TrainStats;
