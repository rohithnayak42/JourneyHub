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

const HotelSection = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full flex flex-col items-center"
    >
      <Hero type="hotel" />
      
      {/* 🔹 Staggered Content Section */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full bg-gradient-to-br from-[#3b0764] to-[#9333ea] py-16 md:py-24"
      >
        <div className="layout-container relative z-20 space-y-24">
            <motion.div variants={itemVariants}><HotelDeals /></motion.div>
            <motion.div variants={itemVariants}><HotelOffers /></motion.div>
            <motion.div variants={itemVariants}><HotelWhy /></motion.div>
            <motion.div variants={itemVariants}><HotelDestinations /></motion.div>
            <motion.div variants={itemVariants}><HotelRecommendations /></motion.div>
            <motion.div variants={itemVariants}><HotelStats /></motion.div>
            <motion.div variants={itemVariants}><HotelFAQ /></motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HotelSection;
