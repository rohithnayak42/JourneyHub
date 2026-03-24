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

      {/* 🔹 Content Section with Premium Dark Gradient */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 md:py-24"
      >
        <div className="layout-container relative z-20 space-y-20">
          <BusOffers />
          <BusRecommendations />
          <BusRoutes />
          <BusTracking />
          <SeatPreview />
          <BusStats />
          <BusFAQ />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BusSection;
