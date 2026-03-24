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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const FlightSection = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full flex flex-col items-center"
    >
      <Hero type="flight" />
      
      {/* 🔹 Staggered Content Section */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full bg-gradient-to-br from-[#1e3a8a] to-[#2563eb] py-16 md:py-24"
      >
        <div className="layout-container relative z-20 space-y-24">
            <motion.div variants={itemVariants}><FlightTools /></motion.div>
            <motion.div variants={itemVariants}><FlightWhy /></motion.div>
            <motion.div variants={itemVariants}><FlightRoutes /></motion.div>
            <motion.div variants={itemVariants}><FlightDeals /></motion.div>
            <motion.div variants={itemVariants}><FlightAirlines /></motion.div>
            <motion.div variants={itemVariants}><FlightRecommendations /></motion.div>
            <motion.div variants={itemVariants}><FlightFAQ /></motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FlightSection;
