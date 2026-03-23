import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Copy, CheckCircle2, Timer } from 'lucide-react';

const offers = [
  {
    id: 1,
    title: "15% Cashback via PayTM",
    code: "PTMBUS15",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1920&q=80",
    terms: "Max cashback ₹250. Credited instantly.",
    expiryHours: 12
  },
  {
    id: 2,
    title: "Flat ₹200 Off First App Booking",
    code: "FIRSTAPP",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1920&q=80",
    terms: "Min booking ₹1000. Mobile App only.",
    expiryHours: 4
  },
  {
    id: 3,
    title: "Save 10% on Sleeper Buses",
    code: "SLEEP10",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1920&q=80",
    terms: "Valid on all Private AC Sleepers.",
    expiryHours: 48
  }
];

const OfferCard = ({ offer, index }) => {
  const [copied, setCopied] = useState(false);
  const [applied, setApplied] = useState(false);
  
  // Fake expiry timer for UI realism
  const [timeLeft, setTimeLeft] = useState(offer.expiryHours * 3600);
  
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(prev => (prev > 0 ? prev - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(offer.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApply = () => {
    setApplied(true);
    setTimeout(() => setApplied(false), 3000); // Reset for demo purposes
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -10 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="relative min-h-[380px] rounded-[24px] overflow-hidden shadow-premium flex flex-col justify-between text-white group cursor-pointer"
    >
      {/* Dynamic Background Image with Fallback */}
      <img 
        src={offer.image || "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1920&q=80"}
        alt={offer.title}
        loading="lazy"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1920&q=80";
        }}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/50 to-black/30 opacity-90 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="relative z-10 p-6 md:p-8 flex flex-col h-full w-full justify-between">
        <div>
          <div className="flex justify-between items-start mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-xl rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10 shadow-lg">
              <Timer className="w-3 h-3 text-amber-400 animate-pulse" />
              Ends in {formatTime(timeLeft)}
            </div>
            <button
              onClick={handleCopy}
              className="w-12 h-12 rounded-2xl bg-white/10 hover:bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/20 transition-all active:scale-95 group/btn shadow-lg"
            >
              {copied ? <CheckCircle2 className="w-6 h-6 text-emerald-400" /> : <Copy className="w-6 h-6 group-hover:scale-110 transition-transform" />}
            </button>
          </div>
          
          <h3 className="text-3xl font-black leading-tight mb-2 tracking-tighter text-white drop-shadow-md">{offer.title}</h3>
          <p className="text-white/80 font-medium text-sm mb-6 leading-relaxed drop-shadow-sm">{offer.terms}</p>
        </div>

        <div className="mt-auto bg-black/40 p-2.5 rounded-2xl flex items-center justify-between border border-white/10 backdrop-blur-2xl shadow-xl">
          <span className="font-mono font-black tracking-[0.3em] px-5 text-xl text-white">{offer.code}</span>
          
          <button
            onClick={handleApply}
            disabled={applied}
            className={`px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
              applied ? 'bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]' : 'bg-white text-slate-900 hover:shadow-2xl active:scale-95'
            }`}
          >
            <AnimatePresence mode="wait">
              {applied ? (
                <motion.span key="applied" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Applied
                </motion.span>
              ) : (
                <motion.span key="apply" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  Apply
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const BusOffers = () => {
  return (
    <div className="block-section">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter flex items-center gap-6"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-600 shadow-sm">
                <Tag className="w-8 h-8" />
              </div>
              Best Deals For You
            </motion.h2>
            <p className="mt-6 text-slate-500 text-xl font-medium max-w-2xl">
              Handpicked offers for your journey. Use these exclusive codes to save big on top bus routes.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {offers.map((offer, index) => (
            <OfferCard key={offer.id} offer={offer} index={index} />
          ))}
        </div>
    </div>
  );
};

export default BusOffers;
