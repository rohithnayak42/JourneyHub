import React from 'react';
import { motion } from 'framer-motion';
import Hero from './common/Hero';
import TrainTools from './train/TrainTools';
import TrainRoutes from './train/TrainRoutes';
import TrainInsights from './train/TrainInsights';
import TrainStats from './train/TrainStats';
import TrainOffers from './train/TrainOffers';
import TrainFAQ from './train/TrainFAQ';

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

const TrainSection = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full flex flex-col items-center"
    >
      <Hero type="train" />
      
      {/* 🔹 Staggered Content Section */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full bg-gradient-to-br from-[#0a1f44] to-[#1b3a6b] py-16 md:py-24"
      >
        <div className="layout-container relative z-20 space-y-24">
          <motion.div variants={itemVariants}><TrainTools /></motion.div>
          <motion.div variants={itemVariants}><TrainRoutes /></motion.div>
          <motion.div variants={itemVariants}><TrainInsights /></motion.div>
          <motion.div variants={itemVariants}><TrainStats /></motion.div>
          <motion.div variants={itemVariants}><TrainOffers /></motion.div>
          <motion.div variants={itemVariants}><TrainFAQ /></motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TrainSection;
