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

      {/* Replaced full-width overlay with a grid stack layout */}
      <div className="layout-container relative z-20 -mt-10 md:-mt-20 pb-24 space-y-12">
        <BusOffers />
        <BusRecommendations />
        <BusRoutes />
        <BusTracking />
        <SeatPreview />
        <BusStats />
        <BusFAQ />
      </div>
    </motion.div>
  );
};

export default BusSection;
