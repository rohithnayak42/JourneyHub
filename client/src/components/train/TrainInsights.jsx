import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, AlertTriangle, Calendar } from 'lucide-react';

const insights = [
  {
    icon: Calendar,
    title: "Best Time to Book",
    gradient: "from-blue-500 to-indigo-600",
    image: "https://images.unsplash.com/photo-1522881113591-bdfecb94d853?auto=format&fit=crop&w=1920&q=80",
    stat: "60–90 Days",
    statLabel: "before travel",
    desc: "Booking 2–3 months in advance gives you the highest chance of confirmed lower-class seats at base fare."
  },
  {
    icon: Users,
    title: "Crowd Prediction",
    gradient: "from-amber-400 to-orange-500",
    image: "https://images.unsplash.com/photo-1544468631-fb26ebd37107?auto=format&fit=crop&w=1920&q=80",
    stat: "Very High",
    statLabel: "this weekend",
    desc: "Trains toward Goa, Mumbai & Manali are 90%+ full this weekend. Consider booking alternatives or Tatkal."
  },
  {
    icon: AlertTriangle,
    title: "Delay Probability",
    gradient: "from-rose-400 to-red-500",
    image: "https://images.unsplash.com/photo-1471614654469-45e03b2cb1ec?auto=format&fit=crop&w=1920&q=80",
    stat: "~28%",
    statLabel: "avg delay chance",
    desc: "North Indian routes face ~28% delay probability due to fog & track congestion in Dec–Feb. Plan buffers."
  },
  {
    icon: TrendingUp,
    title: "Price Trend",
    gradient: "from-emerald-400 to-teal-500",
    image: "https://images.unsplash.com/photo-1511221762145-667954e177b8?auto=format&fit=crop&w=1920&q=80",
    stat: "Rising",
    statLabel: "next 7 days",
    desc: "Tatkal and Premium Tatkal fares for holiday season trains are expected to rise 15–20% in the next 7 days."
  }
];

const TrainInsights = () => (
  <div className="relative overflow-hidden group shadow-xl border border-white/5 bg-slate-950 rounded-[24px] p-6 md:p-12 mb-12">
    {/* Cinematic Background Elements */}
    <div className="absolute inset-0 opacity-30 pointer-events-none">
      <div className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px]" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] bg-[size:30px_30px]" />
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
            <TrendingUp size={14} /> AI-Powered Analytics
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white tracking-tighter"
          >
            Rail Intelligence <br />
            <span className="text-blue-500">Dashboard</span>
          </motion.h2>
          <p className="text-slate-400 mt-6 text-xl font-medium max-w-2xl leading-relaxed">
            Data-driven predictions to help you navigate India's railway network with confidence.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {insights.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="relative rounded-[2.5rem] p-8 group transition-all duration-500 shadow-2xl overflow-hidden cursor-pointer min-h-[380px] flex flex-col justify-between"
            >
               {/* Dynamic Background Image with Fallback */}
               <img 
                 src={item.image || "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1920&q=80"}
                 alt={item.title}
                 loading="lazy"
                 onError={(e) => {
                   e.target.onerror = null;
                   e.target.src = "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1920&q=80";
                 }}
                 className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
               />
               {/* Gradient Overlay */}
               <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/80 to-black/40 opacity-90 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
               
               {/* Accent line on hover */}
               <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-full shadow-[0_0_20px_white] z-20`} />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.5)] ring-2 ring-white/20 backdrop-blur-md`}>
                  <Icon size={28} strokeWidth={2.5} />
                </div>
                
                <div className="mt-auto">
                  <h3 className="text-xs font-black text-slate-300 drop-shadow-sm uppercase tracking-widest mb-2">{item.title}</h3>
                  <div className="text-4xl font-black text-white mb-1 tracking-tighter drop-shadow-md">{item.stat}</div>
                  <div className="text-[10px] text-blue-300 font-bold uppercase tracking-widest mb-5 drop-shadow-sm">{item.statLabel}</div>
                  <p className="text-sm text-white/70 leading-relaxed font-medium group-hover:text-white/90 transition-colors drop-shadow-sm">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </div>
);

export default TrainInsights;
