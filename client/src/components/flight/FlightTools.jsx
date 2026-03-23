import React from 'react';
import { motion } from 'framer-motion';
import { BellRing, Lock, Users, PlaneTakeoff, Globe, Map } from 'lucide-react';

const tools = [
  {
    icon: PlaneTakeoff,
    title: "Flight Tracker",
    desc: "Track live status and delays",
    tag: "Free",
    tagColor: "bg-green-100 text-green-700",
    color: "text-blue-500",
    bg: "bg-blue-50"
  },
  {
    icon: BellRing,
    title: "Fare Alerts",
    desc: "Get notified on price drops",
    tag: "Pro",
    tagColor: "bg-amber-100 text-amber-700",
    color: "text-amber-500",
    bg: "bg-amber-50"
  },
  {
    icon: Lock,
    title: "Price Lock",
    desc: "Lock fares & pay later",
    tag: "New",
    tagColor: "bg-purple-100 text-purple-700",
    color: "text-purple-500",
    bg: "bg-purple-50"
  },
  {
    icon: Users,
    title: "Group Booking",
    desc: "Special rates for 10+ pax",
    tag: null,
    color: "text-indigo-500",
    bg: "bg-indigo-50"
  },
  {
    icon: Globe,
    title: "Visa Assistance",
    desc: "E-visa made simple",
    tag: "Pro",
    tagColor: "bg-amber-100 text-amber-700",
    color: "text-rose-500",
    bg: "bg-rose-50"
  },
  {
    icon: Map,
    title: "Travel Planner",
    desc: "AI-powered itineraries",
    tag: "New",
    tagColor: "bg-purple-100 text-purple-700",
    color: "text-teal-500",
    bg: "bg-teal-50"
  }
];

const FlightTools = () => {
  return (
    <div className="block-section">
      <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
        <div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter"
          >
            Aviation Hub <br />
            <span className="text-blue-600">Smart Services</span>
          </motion.h2>
          <p className="text-slate-500 mt-6 text-xl font-medium max-w-2xl leading-relaxed">
            From live tracking to AI travel planning, our premium tools ensure you stay ahead of your flight schedule.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {tools.map((tool, idx) => {
          const Icon = tool.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ y: -12, scale: 1.05 }}
              className="relative glass-card p-8 rounded-[2.5rem] border border-slate-100 shadow-premium hover:shadow-[0_30px_60px_rgba(0,0,0,0.1)] transition-all duration-500 cursor-pointer group flex flex-col items-center text-center overflow-hidden"
            >
              {/* Subtle glass glow on hover */}
              <div className={`absolute top-0 right-0 w-24 h-24 ${tool.bg} blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000`} />
              
              {tool.tag && (
                <div className={`absolute top-4 right-4 text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl shadow-sm ${tool.tagColor} backdrop-blur-md border border-white/20`}>
                  {tool.tag}
                </div>
              )}
              
              <div className={`${tool.bg} ${tool.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm relative overflow-hidden ring-4 ring-slate-50 group-hover:ring-blue-50`}>
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-white/20 blur-md translate-y-4" />
                <Icon size={28} strokeWidth={2.5} className="relative z-10" />
              </div>
              
              <h3 className="text-xs font-black text-slate-900 mb-2 uppercase tracking-widest leading-tight">{tool.title}</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight leading-relaxed">{tool.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default FlightTools;
