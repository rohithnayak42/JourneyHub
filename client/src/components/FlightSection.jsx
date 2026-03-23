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
      
      {/* Replaced full-width overlay with a grid stack layout */}
      <div className="layout-container relative z-20 -mt-10 md:-mt-20 pb-24 space-y-12">
          <FlightTools />
          <FlightWhy />
          <FlightRoutes />
          <FlightDeals />
          <FlightAirlines />
          <FlightRecommendations />
          <FlightFAQ />
      </div>
    </motion.div>
  );
};

export default FlightSection;
