import React from 'react';
import { motion } from 'framer-motion';
import Hero from './common/Hero';
import HotelDeals from './hotel/HotelDeals';
import HotelOffers from './hotel/HotelOffers';
import HotelWhy from './hotel/HotelWhy';
import HotelDestinations from './hotel/HotelDestinations';
import HotelRecommendations from './hotel/HotelRecommendations';
import HotelStats from './hotel/HotelStats';
import HotelFAQ from './hotel/HotelFAQ';

const HotelSection = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full flex flex-col items-center"
    >
      <Hero type="hotel" />
      
      {/* Main Hotel Experience Content */}
      <div className="w-full bg-white text-slate-900 rounded-t-[3rem] relative z-20 -mt-10 overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.15)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 py-12">
          <HotelDeals />
          <HotelOffers />
          <HotelWhy />
          <HotelDestinations />
          <HotelRecommendations />
          <HotelStats />
          <HotelFAQ />
        </div>
      </div>
    </motion.div>
  );
};

export default HotelSection;
