import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Building2, MapPin, Users, ThumbsUp, Sparkles } from 'lucide-react';

const stats = [
  { value: 1000000, suffix: "+", label: "Global properties", icon: Building2, color: "text-rose-500", bg: "bg-rose-500/10", bar: "bg-rose-500", pct: 90 },
  { value: 850, suffix: "+ cities", label: "Expedition centers", icon: MapPin, color: "text-blue-500", bg: "bg-blue-500/10", bar: "bg-blue-500", pct: 75 },
  { value: 50000000, suffix: "+", label: "Cultured travelers", icon: Users, color: "text-emerald-500", bg: "bg-emerald-500/10", bar: "bg-emerald-500", pct: 95 },
  { value: 98, suffix: "%", label: "Hospitality index", icon: ThumbsUp, color: "text-amber-500", bg: "bg-amber-500/10", bar: "bg-amber-500", pct: 98 }
];

const formatNum = n => n >= 1000000 ? `${(n / 1000000).toFixed(0)}M` : n >= 1000 ? `${(n / 1000).toFixed(0)}K` : n;

const StatCard = ({ stat, active, idx }) => {
  const [count, setCount] = useState(0);
  const Icon = stat.icon;
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const duration = 2500;
    const step = 16;
    const total = Math.ceil(duration / step);
    let frame = 0;
    const timer = setInterval(() => {
      frame++;
      const progress = frame / total;
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * stat.value));
      if (frame >= total) { setCount(stat.value); clearInterval(timer); }
    }, step);
    return () => clearInterval(timer);
  }, [active, stat.value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-premium hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all duration-700 group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 opacity-50 blur-[40px] -translate-y-16 translate-x-16 group-hover:translate-x-0 transition-transform duration-1000" />
      
      <div className={`${stat.bg} ${stat.color} w-20 h-20 rounded-3xl flex items-center justify-center mb-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl ring-4 ring-white/20`}>
        <Icon size={32} strokeWidth={2.5} />
      </div>
      
      <div className="text-5xl font-black text-slate-900 mb-2 tracking-tighter">
        {formatNum(count)}{stat.suffix}
      </div>
      <p className="text-slate-500 font-black uppercase tracking-widest text-[10px] mb-8 translate-x-1">{stat.label}</p>
      
      <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${stat.pct}%` }}
          transition={{ duration: 2, ease: [0.34, 1.56, 0.64, 1] }}
          viewport={{ once: true }}
          className={`h-full ${stat.bar} rounded-full relative shadow-[0_0_20px_rgba(0,0,0,0.1)]`}
        >
           <div className="absolute inset-0 bg-white/20 animate-pulse" />
        </motion.div>
      </div>
      
      <div className="flex justify-between mt-4">
         <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Momentum Index</span>
         <Sparkles size={12} className={`${stat.color} animate-bounce`} />
      </div>
    </motion.div>
  );
};

const HotelStats = () => {
  const ref = useRef(null);
  const active = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="w-full py-24">
      <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
        <div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter"
          >
            Hospitality <br />
            <span className="text-emerald-500">Benchmark Data</span>
          </motion.h2>
          <p className="text-slate-500 mt-6 text-xl font-medium max-w-2xl leading-relaxed">
            The numerical foundation of our travel ecosystem. Every point represents a curated stay and a satisfied guest.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {stats.map((stat, idx) => <StatCard key={idx} stat={stat} active={active} idx={idx} />)}
      </div>
    </div>
  );
};

export default HotelStats;
