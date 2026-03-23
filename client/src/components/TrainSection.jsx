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
      
      {/* Replaced full-width overlay with a grid stack layout */}
      <div className="layout-container relative z-20 -mt-10 md:-mt-20 pb-24 space-y-12">
        <TrainTools />
        <TrainRoutes />
        <TrainInsights />
        <TrainStats />
        <TrainOffers />
        <TrainFAQ />
      </div>
    </motion.div>
  );
};

export default TrainSection;
