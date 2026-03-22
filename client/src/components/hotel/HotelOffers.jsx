import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Timer, Copy, CheckCircle, Tag } from 'lucide-react';

const offers = [
  {
    code: "HOTEL30",
    title: "Flat 30% Off",
    desc: "Use your HDFC credit card and get 30% off on all 5-star bookings",
    bank: "HDFC Bank",
    gradient: "from-blue-600 to-indigo-700",
    savings: "Save up to ₹5,000",
    duration: { h: 5, m: 30, s: 0 }
  },
  {
    code: "STAY500",
    title: "₹500 Cashback",
    desc: "Flat ₹500 cashback via Paytm wallet on stays of 2 nights or more",
    bank: "Paytm",
    gradient: "from-sky-500 to-blue-600",
    savings: "Min booking ₹3,000",
    duration: { h: 11, m: 0, s: 0 }
  },
  {
    code: "FRESHSTAY",
    title: "First Booking 20% Off",
    desc: "New user? Enjoy 20% off on your very first hotel booking",
    bank: "New Users",
    gradient: "from-emerald-500 to-teal-600",
    savings: "Upto ₹2,000 off",
    duration: { h: 23, m: 45, s: 0 }
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
    <div className="flex items-center gap-1.5 font-black text-[10px] uppercase tracking-widest text-white bg-black/20 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10">
      <span>{fmt(time.h)}h</span>
      <span className="opacity-30">:</span>
      <span>{fmt(time.m)}m</span>
      <span className="opacity-30">:</span>
      <span className="text-amber-300">{fmt(time.s)}s</span>
    </div>
  );
};

const HotelOffers = () => {
  const [copied, setCopied] = useState(null);
  const [applied, setApplied] = useState(null);

  const handleCopy = (code, idx) => {
    navigator.clipboard.writeText(code);
    setCopied(idx);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleApply = (idx) => {
    setApplied(idx);
    setTimeout(() => setApplied(null), 2000);
  };

  return (
    <div className="w-full py-24">
      <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
        <div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter"
          >
            Exclusive <br />
            <span className="text-blue-600">Privilege Vault</span>
          </motion.h2>
          <p className="text-slate-500 mt-6 text-xl font-medium max-w-2xl leading-relaxed">
            Unlock premium value with our collaborative network of financial partners. These vault deals are limited to active sessions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {offers.map((offer, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -15, scale: 1.02 }}
            className={`bg-gradient-to-br ${offer.gradient} rounded-[2.5rem] p-10 text-white shadow-premium hover:shadow-[0_40px_80px_rgba(0,0,0,0.2)] transition-all duration-500 relative overflow-hidden group`}
          >
            {/* Animated Glow Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 blur-[60px] -translate-y-16 translate-x-16 group-hover:translate-x-0 transition-transform duration-1000" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 bg-white/10 rounded-xl border border-white/20 backdrop-blur-md">
                   <Tag size={18} className="text-white" />
                </div>
                <span className="text-white/80 text-[10px] font-black uppercase tracking-[0.2em]">{offer.bank}</span>
              </div>

              <h3 className="text-3xl font-black mb-4 tracking-tight leading-tight">{offer.title}</h3>
              <p className="text-white/70 text-sm font-medium mb-10 leading-relaxed group-hover:text-white transition-colors">{offer.desc}</p>

              <div className="bg-black/20 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 flex items-center justify-between mb-8 group-hover:border-white/30 transition-all">
                <span className="font-black text-xl tracking-[0.3em] uppercase ml-2">{offer.code}</span>
                <button
                  onClick={() => handleCopy(offer.code, idx)}
                  className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-white text-slate-900 px-6 py-3 rounded-xl transition-all hover:bg-slate-100 active:scale-95 shadow-xl"
                >
                  {copied === idx ? <CheckCircle size={14} strokeWidth={3} /> : <Copy size={14} strokeWidth={3} />}
                  {copied === idx ? 'Copied' : 'Copy'}
                </button>
              </div>

              <div className="flex items-center justify-between mb-10">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/80">{offer.savings}</span>
                <div className="flex items-center gap-2">
                  <Timer size={14} className="text-white/60 animate-pulse" /> <Counter {...offer.duration} />
                </div>
              </div>

              <motion.button
                onClick={() => handleApply(idx)}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all shadow-2xl ${applied === idx ? 'bg-emerald-400 text-white' : 'bg-white text-slate-900 hover:shadow-white/20 hover:scale-[1.02]'}`}
              >
                {applied === idx ? '✓ Vault Unlocked' : 'Activate This Offer'}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HotelOffers;
