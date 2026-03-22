import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Zap, TrendingDown, Users } from 'lucide-react';

const routes = [
  {
    name: "Rajdhani Express",
    number: "12301",
    from: "New Delhi (NDLS)", fromTime: "16:55",
    to: "Howrah Jn (HWH)", toTime: "10:00",
    duration: "17h 05m",
    price: "₹2,085",
    avail: "Available",
    badge: "Most Popular",
    badgeColor: "bg-blue-600",
    type: "⚡ Premium AC",
    img: "https://images.unsplash.com/photo-1474487056217-7683d42bc89b?auto=format&fit=crop&w=1200"
  },
  {
    name: "Vande Bharat",
    number: "22436",
    from: "New Delhi (NDLS)", fromTime: "06:00",
    to: "Varanasi (BSB)", toTime: "14:00",
    duration: "8h 00m",
    price: "₹1,750",
    avail: "Filling Fast",
    badge: "High Speed",
    badgeColor: "bg-emerald-600",
    type: "🚄 Semi-High Speed",
    img: "https://images.unsplash.com/photo-1590644365607-1c5a519a7a37?auto=format&fit=crop&w=1200"
  },
  {
    name: "Shatabdi Express",
    number: "12002",
    from: "New Delhi (NDLS)", fromTime: "06:00",
    to: "Bhopal Jn (BPL)", toTime: "14:00",
    duration: "8h 00m",
    price: "₹1,245",
    avail: "Available",
    badge: "Executive Class",
    badgeColor: "bg-violet-600",
    type: "🪑 Chair Car",
    img: "https://images.unsplash.com/photo-1532105956691-1ad5529f7943?auto=format&fit=crop&w=1200"
  },
  {
    name: "Duronto Express",
    number: "12213",
    from: "Mumbai (CSMT)", fromTime: "23:00",
    to: "Delhi (NZM)", toTime: "19:00",
    duration: "20h 00m",
    price: "₹1,740",
    avail: "2 Left",
    badge: "Non-Stop",
    badgeColor: "bg-rose-600",
    type: "🌙 Overnight",
    img: "https://images.unsplash.com/photo-1541423408854-af47309acc61?auto=format&fit=crop&w=1200"
  }
];

const TrainRoutes = () => (
  <div className="w-full py-20">
    <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
      <div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter"
        >
          Prime Rail Corridors
        </motion.h2>
        <p className="text-slate-500 mt-4 text-xl font-medium max-w-2xl">
          The most searched and traveled train routes across the Indian subcontinent.
        </p>
      </div>
      <button className="text-blue-600 font-black uppercase tracking-widest text-xs flex items-center gap-3 bg-blue-50 px-8 py-4 rounded-2xl hover:bg-blue-100 transition-all group">
        All Destinations <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {routes.map((route, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ y: -12 }}
          className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-premium hover:shadow-[0_30px_60px_rgba(0,0,0,0.1)] transition-all duration-500 group cursor-pointer"
        >
          {/* HD Visual Header */}
          <div className="relative h-64 overflow-hidden">
            <img 
              src={route.img} 
              alt={route.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
            
            <div className="absolute top-6 left-6 flex flex-col gap-2">
              <span className={`${route.badgeColor} text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl shadow-xl backdrop-blur-md`}>
                {route.badge}
              </span>
            </div>

            <div className="absolute bottom-6 left-8 right-8 flex justify-between items-end">
              <div>
                <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest block mb-1">{route.number}</span>
                <h3 className="text-2xl font-black text-white tracking-tight">{route.name}</h3>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">{route.type}</span>
                <div className="flex items-center gap-1 text-emerald-400">
                  <Zap size={14} className="fill-emerald-400" />
                  <span className="text-xs font-black uppercase tracking-tighter">Superfast</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-10">
            {/* Route Timeline */}
            <div className="flex items-center gap-6 mb-10">
              <div className="text-center">
                <div className="text-3xl font-black text-slate-900 tracking-tighter">{route.fromTime}</div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 max-w-[100px] mx-auto">{route.from.split(' ')[0]}</div>
              </div>
              
              <div className="flex-1 flex flex-col items-center gap-2">
                <div className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Clock size={12} strokeWidth={3} /> {route.duration}
                </div>
                <div className="w-full h-1 bg-slate-100 rounded-full relative group/line">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full w-full opacity-20" />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-4 border-blue-600 rounded-full shadow-lg z-10" />
                </div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-black text-slate-900 tracking-tighter">{route.toTime}</div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 max-w-[100px] mx-auto">{route.to.split(' ')[0]}</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-8 border-t border-slate-50">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Fare Starts At</p>
                <span className="text-3xl font-black text-slate-900 tracking-tighter">{route.price}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl ${route.avail === 'Available' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                  {route.avail}
                </span>
                <button className="bg-slate-900 hover:bg-blue-600 text-white font-black uppercase tracking-widest text-[10px] px-8 py-4 rounded-2xl transition-all shadow-xl active:scale-95">
                  Book Seat
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

export default TrainRoutes;
