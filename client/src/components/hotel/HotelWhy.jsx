import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, HeadphonesIcon, Building2, CreditCard, Heart } from 'lucide-react';

const reasons = [
  { icon: Wallet, title: "Best Price Promise", desc: "We scan 100+ platforms to guarantee the lowest hotel rate.", gradient: "from-blue-600 to-indigo-700" },
  { icon: HeadphonesIcon, title: "24x7 Concierge", desc: "Real humans available round the clock for instant support.", gradient: "from-rose-500 to-pink-700" },
  { icon: Building2, title: "1M+ Properties", desc: "From heritage havelis to sea-view resorts, we have it all.", gradient: "from-emerald-500 to-teal-700" },
  { icon: CreditCard, title: "Pay At Hotel", desc: "Reserve now, pay at check-in. No card needed right away.", gradient: "from-amber-500 to-orange-700" },
  { icon: Heart, title: "Wishlist & Alerts", desc: "Save your dream hotels and get notified on price drops.", gradient: "from-purple-600 to-fuchsia-800" }
];

const HotelWhy = () => (
  <div className="w-full py-24 bg-slate-950 rounded-[3.5rem] px-10 lg:px-20 relative overflow-hidden group shadow-[0_50px_100px_rgba(0,0,0,0.5)] border border-white/5">
    {/* Cinematic Background Glow */}
    <div className="absolute inset-0 opacity-40 pointer-events-none">
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-rose-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px]" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]" />
    </div>

    <div className="relative z-10">
      <div className="max-w-3xl mb-16">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6"
        >
          Why Choose <br />
          <span className="text-rose-500 text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">JourneyHub Stays?</span>
        </motion.h2>
        <p className="text-slate-400 text-xl font-medium leading-relaxed">
          We redefine the art of staying. From algorithmic price protection to global human support, we ensure your comfort is never compromised.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {reasons.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -15, scale: 1.05 }}
              className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[2.5rem] group hover:bg-white/10 hover:border-white/20 transition-all duration-500 shadow-2xl flex flex-col items-center text-center"
            >
              <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-[0_20px_40px_rgba(0,0,0,0.3)] ring-4 ring-white/10`}>
                <Icon size={32} strokeWidth={2.5} />
              </div>
              <h3 className="text-xl font-black text-white mb-4 tracking-tight">{item.title}</h3>
              <p className="text-sm text-slate-400 font-medium leading-relaxed group-hover:text-slate-200 transition-colors">{item.desc}</p>
              
              {/* Decorative Accent */}
              <div className="mt-8 w-12 h-1 bg-white/10 rounded-full group-hover:w-24 group-hover:bg-rose-500 transition-all duration-500" />
            </motion.div>
          );
        })}
      </div>
    </div>
  </div>
);

export default HotelWhy;
