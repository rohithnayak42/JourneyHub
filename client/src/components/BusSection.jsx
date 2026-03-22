import React from 'react';
import { motion } from 'framer-motion';
import Hero from './common/Hero';
import BusRecommendations from './bus/BusRecommendations';
import BusRoutes from './bus/BusRoutes';
import BusTracking from './bus/BusTracking';
import BusStats from './bus/BusStats';
import BusOffers from './bus/BusOffers';
import SeatPreview from './bus/SeatPreview';
import BusFAQ from './bus/BusFAQ';

const BusSection = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full flex flex-col items-center"
    >
      <Hero type="bus" />

      {/* Main Bus Experience Content wrapping below the fold */}
      <div className="w-full bg-white text-slate-900 rounded-t-[3.5rem] relative z-20 -mt-24 overflow-hidden shadow-[0_-30px_60px_rgba(0,0,0,0.2)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 py-12">
          <BusOffers />
          <BusRecommendations />
          <BusRoutes />
          <BusTracking />
          <SeatPreview />
          <BusStats />
          <BusFAQ />
        </div>
      </div>
    </motion.div>
  );
};

export default BusSection;
