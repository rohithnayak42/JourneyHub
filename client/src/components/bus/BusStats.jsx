import React, { useEffect, useState, useRef } from 'react';
import { motion, animate, useInView } from 'framer-motion';
import { BusFront, Map, Ticket, HeartHandshake } from 'lucide-react';

const StatCard = ({ icon: Icon, value, label, prefix = "", suffix = "+", progress = 100 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate: (v) => {
          setCount(Math.floor(v));
        }
      });
      return controls.stop;
    }
  }, [value, isInView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6 }}
      className="flex flex-col p-6 bg-white rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group"
    >
      {/* Background Pulse Glow */}
      <div className="absolute -right-16 -top-16 bg-blue-100 w-48 h-48 rounded-full blur-[40px] group-hover:bg-blue-200 group-hover:blur-[60px] transition-all duration-700 -z-0" />
      
      <div className="bg-blue-50/50 text-blue-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 relative z-10 border border-blue-100">
        <Icon className="w-7 h-7" />
      </div>
      
      <div className="text-4xl font-black text-slate-900 mb-1 relative z-10 flex items-center tracking-tight">
        {prefix}
        <span>{count.toLocaleString()}</span>
        {suffix}
      </div>
      
      <p className="text-slate-500 font-semibold text-sm mb-6 relative z-10 uppercase tracking-wide">{label}</p>

      {/* Mini Progress Bar */}
      <div className="w-full bg-slate-100 h-1.5 rounded-full mt-auto overflow-hidden relative z-10">
        <motion.div 
          initial={{ width: 0 }}
          animate={isInView ? { width: `${progress}%` } : {}}
          transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full relative"
        >
          {/* Shimmer on progress bar */}
          <div className="absolute top-0 right-0 w-8 h-full bg-white/40 blur-[2px] -skew-x-12 translate-x-4 group-hover:-translate-x-full transition-transform duration-1000 ease-in-out" />
        </motion.div>
      </div>
    </motion.div>
  );
};

const BusStats = () => {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-slate-900 mb-6"
          >
            The Scale of our Network
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "100px" }}
            viewport={{ once: true }}
            className="h-1.5 bg-blue-600 mx-auto rounded-full mb-6"
          />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 text-xl font-medium max-w-2xl mx-auto"
          >
            Connecting people and places with the most reliable tech-driven bus network in the country.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatCard icon={Map} value={650} prefix="" suffix="k+" label="Routes Across India" progress={85} />
          <StatCard icon={BusFront} value={6200} prefix="" suffix="+" label="Partner Operators" progress={70} />
          <StatCard icon={Ticket} value={140} prefix="" suffix="k+" label="Daily Bookings" progress={90} />
          <StatCard icon={HeartHandshake} value={5} prefix="" suffix="Cr+" label="Happy Travelers" progress={95} />
        </div>
      </div>
    </section>
  );
};

export default BusStats;
