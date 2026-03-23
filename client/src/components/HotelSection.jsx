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
      
      {/* Replaced full-width overlay with a grid stack layout */}
      <div className="layout-container relative z-20 -mt-10 md:-mt-20 pb-24 space-y-12">
          <HotelDeals />
          <HotelOffers />
          <HotelWhy />
          <HotelDestinations />
          <HotelRecommendations />
          <HotelStats />
          <HotelFAQ />
      </div>
    </motion.div>
  );
};

export default HotelSection;
