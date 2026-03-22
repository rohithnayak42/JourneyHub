import React from 'react';
import { motion } from 'framer-motion';
import Hero from './common/Hero';
import TrainTools from './train/TrainTools';
import TrainRoutes from './train/TrainRoutes';
import TrainInsights from './train/TrainInsights';
import TrainStats from './train/TrainStats';
import TrainOffers from './train/TrainOffers';
import TrainFAQ from './train/TrainFAQ';

const TrainSection = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full flex flex-col items-center"
    >
      <Hero type="train" />
      
      {/* Main Train Experience Content */}
      <div className="w-full bg-white text-slate-900 rounded-t-[3rem] relative z-20 -mt-10 overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.15)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 py-12">
          <TrainTools />
          <TrainRoutes />
          <TrainInsights />
          <TrainStats />
          <TrainOffers />
          <TrainFAQ />
        </div>
      </div>
    </motion.div>
  );
};

export default TrainSection;
