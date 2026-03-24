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
      
      {/* 🔹 Content Section with Luxury Purple Gradient */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full bg-gradient-to-br from-[#3b0764] to-[#9333ea] py-16 md:py-24"
      >
        <div className="layout-container relative z-20 space-y-20">
            <HotelDeals />
            <HotelOffers />
            <HotelWhy />
            <HotelDestinations />
            <HotelRecommendations />
            <HotelStats />
            <HotelFAQ />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HotelSection;
