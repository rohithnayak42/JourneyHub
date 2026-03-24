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
      
      {/* 🔹 Content Section with Deep Blue Rail Gradient */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full bg-gradient-to-br from-[#0a1f44] to-[#1b3a6b] py-16 md:py-24"
      >
        <div className="layout-container relative z-20 space-y-20">
          <TrainTools />
          <TrainRoutes />
          <TrainInsights />
          <TrainStats />
          <TrainOffers />
          <TrainFAQ />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TrainSection;
