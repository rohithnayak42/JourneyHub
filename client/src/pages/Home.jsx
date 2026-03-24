import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { AnimatePresence } from 'framer-motion';
import BusSection from '../components/BusSection';
import TrainSection from '../components/TrainSection';
import FlightSection from '../components/FlightSection';
import HotelSection from '../components/HotelSection';
import { motion } from 'framer-motion';

const Home = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('bus');

  // Sync activeTab with URL query param 'tab'
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab && ['bus', 'train', 'flight', 'hotel'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [location.search]);

  const backgrounds = {
    bus: "/src/assets/bus-hero-final.png",
    train: "/src/assets/train-hero-final.png",
    flight: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=2560",
    hotel: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2560"
  };

  const bgImage = backgrounds[activeTab];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Dynamic Sections (Each handles its own Hero & Features) */}
      <div className="relative w-full flex flex-col flex-1">
        <AnimatePresence mode="wait">
          {activeTab === 'bus' && <BusSection key="bus" />}
          {activeTab === 'train' && <TrainSection key="train" />}
          {activeTab === 'flight' && <FlightSection key="flight" />}
          {activeTab === 'hotel' && <HotelSection key="hotel" />}
        </AnimatePresence>
      </div>

      {/* Footer Info */}
      <footer className="mt-auto py-12 border-t border-gray-100 bg-white">
        <div className="mmt-container text-center">
          <p className="text-gray-400 font-bold text-xs uppercase tracking-[0.2em]">© 2026 JourneyHub Travel Booking Platform</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
