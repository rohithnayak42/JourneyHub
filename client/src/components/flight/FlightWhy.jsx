import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MapPin, HeadphonesIcon, ThumbsUp, Wallet } from 'lucide-react';

const reasons = [
  {
    icon: Wallet,
    title: "Cheapest Fares AI",
    desc: "Our AI scans millions of fares to guarantee you the absolute lowest flight prices.",
    gradient: "from-blue-500 to-indigo-600"
  },
  {
    icon: MapPin,
    title: "Live Flight Tracking",
    desc: "Track any flight in real-time. Know exactly when your boarding starts.",
    gradient: "from-emerald-400 to-teal-500"
  },
  {
    icon: HeadphonesIcon,
    title: "24x7 Priority Support",
    desc: "Instant resolution for cancellations, modifications, and emergency queries.",
    gradient: "from-orange-400 to-red-500"
  },
  {
    icon: Sparkles,
    title: "Smart Recommendations",
    desc: "Personalized trip suggestions based on your past travel and search history.",
    gradient: "from-purple-500 to-fuchsia-600"
  },
  {
    icon: ThumbsUp,
    title: "Flexible Cancellations",
    desc: "Get 100% refund on flight cancellations right up to 2 hours before departure.",
    gradient: "from-sky-400 to-blue-500"
  }
];

const FlightWhy = () => {
  return (
    <section className="w-full py-20 bg-slate-950 rounded-[3.5rem] px-8 lg:px-16 relative overflow-hidden group shadow-[0_40px_100px_rgba(0,0,0,0.5)] border border-white/5 mt-16">
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
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
              <Sparkles size={14} /> The Gold Standard
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black text-white tracking-tighter"
            >
              Why Fly With <br />
              <span className="text-blue-500 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">JourneyHub?</span>
            </motion.h2>
            <p className="text-slate-400 mt-6 text-xl font-medium max-w-2xl leading-relaxed">
              Experience the definitive travel standard with our AI-powered flight booking engine and world-class support.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {reasons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 group hover:bg-white/10 hover:border-white/20 transition-all duration-500 shadow-2xl relative overflow-hidden"
              >
                 {/* Accent line on hover */}
                 <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-full shadow-[0_0_20px_white]`} />
                
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.3)] ring-4 ring-black/20`}>
                  <Icon size={28} strokeWidth={2.5} />
                </div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed font-medium group-hover:text-slate-200 transition-colors">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FlightWhy;
