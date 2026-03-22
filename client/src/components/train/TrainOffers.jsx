import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Copy, CheckCircle, Timer, Tag } from 'lucide-react';

const offers = [
  {
    code: "TATKAL50",
    title: "₹50 Off Tatkal",
    desc: "Get flat ₹50 cashback when you book Tatkal tickets via UPI",
    bank: "All Users",
    gradient: "from-blue-500 to-indigo-600",
    savings: "Save up to ₹50",
    duration: { h: 4, m: 30, s: 0 }
  },
  {
    code: "RLYPASS20",
    title: "20% on Rail Pass",
    desc: "Book an IndianRail tourist pass and save 20% on unlimited travel",
    bank: "Foreign Tourists",
    gradient: "from-amber-400 to-orange-500",
    savings: "Max discount ₹1,200",
    duration: { h: 9, m: 15, s: 0 }
  },
  {
    code: "FIRSTTRAIN",
    title: "First-time Offer",
    desc: "New to JourneyHub? Enjoy ₹100 off on your first train ticket",
    bank: "New Users",
    gradient: "from-emerald-400 to-teal-500",
    savings: "Min booking ₹500",
    duration: { h: 23, m: 59, s: 0 }
  }
];

const Counter = ({ h, m, s }) => {
  const [time, setTime] = useState({ h, m, s });
  useEffect(() => {
    const iv = setInterval(() => setTime(p => {
      let { h, m, s } = p;
      if (s > 0) return { h, m, s: s - 1 };
      if (m > 0) return { h, m: m - 1, s: 59 };
      if (h > 0) return { h: h - 1, m: 59, s: 59 };
      return { h: 23, m: 59, s: 59 };
    }), 1000);
    return () => clearInterval(iv);
  }, []);
  const f = n => String(n).padStart(2, '0');
  return (
    <div className="flex items-center gap-1 font-mono font-black text-sm text-white">
      <span className="bg-white/20 px-1.5 py-0.5 rounded">{f(time.h)}</span>:
      <span className="bg-white/20 px-1.5 py-0.5 rounded">{f(time.m)}</span>:
      <span className="bg-white/20 px-1.5 py-0.5 rounded">{f(time.s)}</span>
    </div>
  );
};

const TrainOffers = () => {
  const [copied, setCopied] = useState(null);
  const [applied, setApplied] = useState(null);

  const copy = (code, idx) => { navigator.clipboard.writeText(code); setCopied(idx); setTimeout(() => setCopied(null), 2000); };
  const apply = (idx) => { setApplied(idx); setTimeout(() => setApplied(null), 2000); };

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
            Exclusive Rail Deals
          </motion.h2>
          <p className="text-slate-500 mt-4 text-xl font-medium max-w-2xl leading-relaxed">
            Curated savings for every type of traveler. Unlock hidden discounts and premium perks for your next journey.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {offers.map((offer, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, scale: 0.95 }} 
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }} 
            viewport={{ once: true }} 
            whileHover={{ y: -12 }}
            className={`bg-gradient-to-br ${offer.gradient} rounded-[2.5rem] p-10 text-white shadow-premium hover:shadow-[0_40px_80px_rgba(0,0,0,0.2)] transition-all duration-500 relative overflow-hidden group`}
          >
            {/* Cinematic Overlay */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/20 transition-all duration-1000" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-white/20 p-2 rounded-lg backdrop-blur-md border border-white/20">
                  <Tag size={16} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-90">{offer.bank}</span>
              </div>
              
              <h3 className="text-3xl font-black mb-3 tracking-tighter">{offer.title}</h3>
              <p className="text-white/80 text-sm mb-8 leading-relaxed font-medium line-clamp-2">{offer.desc}</p>
              
              <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex items-center justify-between mb-8 shadow-inner">
                <span className="font-black text-xl tracking-[0.2em]">{offer.code}</span>
                <button 
                  onClick={() => copy(offer.code, idx)} 
                  className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-white text-slate-900 hover:bg-blue-50 px-5 py-2.5 rounded-xl transition-all shadow-lg active:scale-95"
                >
                  {copied === idx ? <CheckCircle size={14} className="text-emerald-500" /> : <Copy size={14} />}
                  {copied === idx ? 'Copied' : 'Copy'}
                </button>
              </div>

              <div className="flex items-center justify-between mb-10">
                <div>
                   <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Max Benefit</p>
                   <span className="text-lg font-black">{offer.savings.split('₹')[1] ? `₹${offer.savings.split('₹')[1]}` : offer.savings}</span>
                </div>
                <div className="text-right">
                   <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Expires In</p>
                   <div className="flex items-center gap-2 opacity-90"><Timer size={14} /><Counter {...offer.duration} /></div>
                </div>
              </div>

              <motion.button 
                onClick={() => apply(idx)} 
                whileTap={{ scale: 0.95 }}
                className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] transition-all shadow-2xl relative overflow-hidden group/btn
                  ${applied === idx 
                    ? 'bg-emerald-500 text-white shadow-emerald-500/40' 
                    : 'bg-white text-slate-900 hover:bg-slate-50 hover:shadow-white/20'}`}
              >
                <span className="relative z-10">{applied === idx ? '✓ Applied Successfully' : 'Redeem Offer Now'}</span>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TrainOffers;
