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

const BusSection = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full flex flex-col items-center"
    >
      <Hero type="bus" />

      {/* 🔹 Staggered Content Section */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 md:py-24"
      >
        <div className="layout-container relative z-20 space-y-24">
          <motion.div variants={itemVariants}><BusOffers /></motion.div>
          <motion.div variants={itemVariants}><BusRecommendations /></motion.div>
          <motion.div variants={itemVariants}><BusRoutes /></motion.div>
          <motion.div variants={itemVariants}><BusTracking /></motion.div>
          <motion.div variants={itemVariants}><SeatPreview /></motion.div>
          <motion.div variants={itemVariants}><BusStats /></motion.div>
          <motion.div variants={itemVariants}><BusFAQ /></motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BusSection;
