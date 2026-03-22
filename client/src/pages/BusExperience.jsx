import React from 'react';
import BusHero from '../components/bus/BusHero';
import BusRoutes from '../components/bus/BusRoutes';
import BusTracking from '../components/bus/BusTracking';
import BusStats from '../components/bus/BusStats';
import BusOffers from '../components/bus/BusOffers';
import BusFAQ from '../components/bus/BusFAQ';
import SeatPreview from '../components/bus/SeatPreview';
import BusRecommendations from '../components/bus/BusRecommendations';
import Navbar from '../components/Navbar';

const BusExperience = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />
      <main>
        {/* 1. Hero Section + Search Bar */}
        <BusHero />

        {/* 8. Recommendations */}
        <BusRecommendations />

        {/* 6. Promotional Offers */}
        <BusOffers />

        {/* 2. Popular Routes */}
        <BusRoutes />

        {/* 7. Interactive Seat Preview */}
        <SeatPreview />

        {/* 3. Live Tracking */}
        <BusTracking />

        {/* 4. Statistics */}
        <BusStats />

        {/* 5. FAQs */}
        <BusFAQ />
      </main>
      
      {/* Simple Footer just to finish the page nicely */}
      <footer className="bg-slate-950 text-slate-400 py-12 text-center border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <div className="text-2xl font-black text-white mb-4 tracking-tighter mix-blend-difference">
            Journ<span className="text-blue-500">ey</span>Hub
          </div>
          <p className="mb-6">&copy; {new Date().getFullYear()} JourneyHub. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-white cursor-pointer transition">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition">Terms of Service</span>
            <span className="hover:text-white cursor-pointer transition">Contact Us</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BusExperience;
