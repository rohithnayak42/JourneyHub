import React from 'react';
import { motion } from 'framer-motion';
import PnrWidget from './widgets/PnrWidget';
import LiveStatusWidget from './widgets/LiveStatusWidget';
import SeatAvailabilityWidget from './widgets/SeatAvailabilityWidget';
import TrainTimelineWidget from './widgets/TrainTimelineWidget';
import FoodOrderWidget from './widgets/FoodOrderWidget';
import InfoWidgets from './widgets/InfoWidgets';

const TrainDashboard = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 mt-20 mb-8 relative z-10">
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-black text-gray-800 tracking-tight">Smart Tracking</h2>
        <p className="text-xs font-bold text-gray-500 mt-2 uppercase tracking-[0.3em]">Real-time updates & insights</p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <motion.div variants={itemVariants} className="h-[320px]">
          <PnrWidget />
        </motion.div>
        
        <motion.div variants={itemVariants} className="h-[320px]">
           <LiveStatusWidget />
        </motion.div>
        
        <motion.div variants={itemVariants} className="h-[320px]">
           <SeatAvailabilityWidget />
        </motion.div>
        
        <motion.div variants={itemVariants} className="h-[400px]">
           <TrainTimelineWidget />
        </motion.div>
        
        <motion.div variants={itemVariants} className="h-[400px]">
           <FoodOrderWidget />
        </motion.div>
        
        <motion.div variants={itemVariants} className="h-[400px]">
           <InfoWidgets />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TrainDashboard;
