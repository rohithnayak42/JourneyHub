import React from 'react';
import { motion } from 'framer-motion';
import { Activity, FileCheck2, UserCheck, Clock, Map, Info } from 'lucide-react';

const TrainFeatures = () => {
  const features = [
    { icon: Activity, title: "Running Status", desc: "Track exact train location live", color: "text-blue-500", bg: "bg-blue-500/10" },
    { icon: FileCheck2, title: "PNR Status", desc: "Get confirmation chances easily", color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { icon: UserCheck, title: "Seat Availability", desc: "Real-time seat vacancy check", color: "text-amber-500", bg: "bg-amber-500/10" },
    { icon: Clock, title: "Train Schedule", desc: "Updated arrival/departure times", color: "text-purple-500", bg: "bg-purple-500/10" },
    { icon: Map, title: "Platform Locator", desc: "Know your boarding platform early", color: "text-rose-500", bg: "bg-rose-500/10" },
    { icon: Info, title: "Tatkal Guide", desc: "Smart booking tips & tricks", color: "text-cyan-500", bg: "bg-cyan-500/10" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 mt-24 mb-16 relative z-10">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
      >
        {features.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <motion.div 
              key={idx}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/90 backdrop-blur-md p-5 rounded-[1.5rem] shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-white hover:shadow-[0_20px_40px_rgba(220,38,38,0.1)] hover:border-red-100 transition-all cursor-pointer group flex flex-col items-center text-center isolate"
            >
              <div className={`${feat.bg} w-14 h-14 rounded-[1.2rem] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-inner`}>
                <Icon size={24} className={feat.color} />
              </div>
              <h3 className="font-black text-gray-800 text-[13px] mb-1 group-hover:text-red-500 transition-colors">{feat.title}</h3>
              <p className="text-[10px] font-bold text-gray-400 group-hover:text-gray-500 leading-snug">{feat.desc}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};
export default TrainFeatures;
