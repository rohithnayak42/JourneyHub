import React from 'react';
import { motion } from 'framer-motion';
import Hero from './common/Hero';
import FlightTools from './flight/FlightTools';
import FlightWhy from './flight/FlightWhy';
import FlightRoutes from './flight/FlightRoutes';
import FlightAirlines from './flight/FlightAirlines';
import FlightDeals from './flight/FlightDeals';
import FlightRecommendations from './flight/FlightRecommendations';
import FlightFAQ from './flight/FlightFAQ';

const FlightSection = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full flex flex-col items-center"
    >
      <Hero type="flight" />
      
      {/* 🔹 Content Section with Aviation Blue Gradient */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full bg-gradient-to-br from-[#1e3a8a] to-[#2563eb] py-16 md:py-24"
      >
        <div className="layout-container relative z-20 space-y-20">
            <FlightTools />
            <FlightWhy />
            <FlightRoutes />
            <FlightDeals />
            <FlightAirlines />
            <FlightRecommendations />
            <FlightFAQ />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FlightSection;
