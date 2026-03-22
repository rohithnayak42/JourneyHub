import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Wifi, MapPin, Clock, Utensils, Navigation, CalendarDays, Ticket } from 'lucide-react';

const tools = [
  {
    icon: Ticket, color: "text-blue-500", bg: "bg-blue-50",
    title: "PNR Status",
    desc: "Instant booking status",
    placeholder: "Enter 10-digit PNR",
    result: "🟢 Confirmed | Coach S4 | Seat 32"
  },
  {
    icon: Navigation, color: "text-emerald-500", bg: "bg-emerald-50",
    title: "Live Train Status",
    desc: "Real-time train location",
    placeholder: "Train number or name",
    result: "🚂 Running 12 mins late | Hapur Jn"
  },
  {
    icon: CalendarDays, color: "text-violet-500", bg: "bg-violet-50",
    title: "Seat Availability",
    desc: "Check before you book",
    placeholder: "Train no. + Date + Class",
    result: "✅ SL: 42 | 3A: 8 | 2A: AVAILABLE"
  },
  {
    icon: Clock, color: "text-amber-500", bg: "bg-amber-50",
    title: "Train Schedule",
    desc: "Full stop-by-stop timetable",
    placeholder: "Train name or number",
    result: "📋 35 stops | Departure 06:05"
  },
  {
    icon: MapPin, color: "text-rose-500", bg: "bg-rose-50",
    title: "Platform Locator",
    desc: "Find your coach position",
    placeholder: "Station + Train number",
    result: "🚉 Platform 3 | Coach S4 → End"
  },
  {
    icon: Utensils, color: "text-orange-500", bg: "bg-orange-50",
    title: "E-Catering",
    desc: "Order food to your seat",
    placeholder: "PNR number",
    result: "🍱 Available at Kanpur, Allahabad"
  }
];

const TrainTools = () => {
  const [active, setActive] = useState({});
  const [results, setResults] = useState({});

  const handleSearch = (idx) => {
    setResults(prev => ({ ...prev, [idx]: tools[idx].result }));
  };

  return (
    <div className="w-full py-20">
      <div className="mb-14">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter"
        >
          Smart Rail Dashboard
        </motion.h2>
        <p className="text-slate-500 mt-4 text-xl font-medium max-w-2xl leading-relaxed">
          The ultimate companion for your rail journey. Access critical status, live updates, and e-catering in one unified interface.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tools.map((tool, idx) => {
          const Icon = tool.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="glass-card p-8 rounded-[2rem] border border-slate-100 shadow-premium hover:shadow-[0_25px_50px_rgba(0,0,0,0.1)] transition-all duration-500 group relative overflow-hidden"
            >
              {/* Subtle gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-blue-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex items-start gap-6 mb-8 relative z-10">
                <div className={`${tool.bg} ${tool.color} w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-sm relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-white/20 blur-md translate-y-8" />
                  <Icon size={26} strokeWidth={2.5} className="relative z-10" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-black text-slate-800 text-lg tracking-tight uppercase tracking-widest text-[13px]">{tool.title}</h3>
                  <p className="text-slate-400 text-sm font-medium leading-tight">{tool.desc}</p>
                </div>
              </div>

              {/* Enhanced Input Section */}
              <div className="flex gap-3 mb-6 relative z-10">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder={tool.placeholder}
                    className={`w-full text-sm px-6 py-4 rounded-2xl border-2 transition-all font-bold outline-none placeholder:text-slate-400 placeholder:font-medium
                      ${active[idx] 
                        ? 'border-blue-500 bg-white ring-8 ring-blue-500/5' 
                        : 'border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-200'}`}
                    onFocus={() => setActive(p => ({ ...p, [idx]: true }))}
                    onBlur={() => setActive(p => ({ ...p, [idx]: false }))}
                  />
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleSearch(idx)}
                  className="bg-slate-900 hover:bg-blue-600 text-white w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-xl group/btn"
                >
                  <Search size={20} className="group-hover/btn:scale-110 transition-transform" />
                </motion.button>
              </div>

              {/* Dynamic Result preview */}
              <AnimatePresence>
                {results[idx] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="overflow-hidden relative z-10"
                  >
                    <div className="bg-slate-900 text-white rounded-2xl px-6 py-4 text-xs font-black uppercase tracking-widest border border-slate-800 shadow-2xl flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse shadow-[0_0_8px_#60a5fa]" />
                      {results[idx]}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default TrainTools;
