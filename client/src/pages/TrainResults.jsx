import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import API from '../services/api';
import Navbar from '../components/Navbar';
import BookingCard from '../components/BookingCard';
import { Filter, Search, Loader2, Train } from 'lucide-react';
import { motion } from 'framer-motion';

const TrainResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const source = queryParams.get('source');
  const destination = queryParams.get('destination');
  const date = queryParams.get('date');

  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/trains/search?source=${source}&destination=${destination}&date=${date}`);
        setTrains(res.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch trains. Please try again.');
        setLoading(false);
      }
    };

    if (source && destination) {
      fetchTrains();
    }
  }, [source, destination, date]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />
      
      {/* Search Summary Header (Updated for Consistency) */}
      <div className="bg-white border-b border-gray-100 py-4 sticky top-20 z-40 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-green-50 p-2.5 rounded-xl border border-green-100">
              <Train className="text-green-600" size={20} />
            </div>
            <div className="flex flex-col">
              <h2 className="text-lg md:text-xl font-black text-gray-800 flex items-center gap-2">
                {source} <span className="text-gray-300 font-medium">→</span> {destination}
              </h2>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{new Date(date).toDateString()} • {trains.length} Trains Found</p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
             <button className="flex-1 md:flex-initial bg-gray-50 hover:bg-gray-100 border border-gray-200 px-5 py-2.5 rounded-xl font-black uppercase tracking-widest text-[9px] text-gray-500 transition-all">
                Modify Search
             </button>
             <div className="h-8 w-[1px] bg-gray-100 hidden md:block"></div>
             <button className="flex-1 md:flex-initial bg-white border border-gray-200 px-5 py-2.5 rounded-xl font-black uppercase tracking-widest text-[9px] text-gray-500 shadow-sm transition-all hover:border-green-200">
                Sort: Fastest
             </button>
          </div>
        </div>
      </div>

      <div className="mmt-container py-10 px-4 flex flex-col md:flex-row gap-8">
        {/* Sidebar: Filters */}
        <aside className="w-full md:w-72 space-y-6">
          <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 sticky top-44">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-black text-gray-800 uppercase tracking-[0.15em] text-[10px]">Filter Options</h3>
              <Filter size={16} className="text-gray-300" />
            </div>
            
            <div className="space-y-8">
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Availability</p>
                <div className="space-y-3">
                  {['Show Confirmed Only', 'Hide Waiting List'].map(option => (
                    <label key={option} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center">
                        <input type="checkbox" className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-200 transition-all checked:bg-primary checked:border-primary" />
                        <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 group-hover:text-gray-800 font-bold transition-colors">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Journey Class</p>
                 <div className="grid grid-cols-2 gap-2">
                    {['1A', '2A', '3A', 'SL', 'EC', 'CC'].map(cls => (
                      <button key={cls} className="text-[9px] font-black border border-gray-100 py-2.5 rounded-xl text-gray-400 hover:border-primary/30 hover:bg-primary/5 hover:text-primary transition-all uppercase tracking-widest">{cls}</button>
                    ))}
                 </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content: Results */}
        <main className="flex-1">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 space-y-6">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                <Train className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary" size={24} />
              </div>
              <p className="font-black text-gray-400 uppercase tracking-[0.3em] text-[10px] animate-pulse">Scanning railway network...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20 bg-white rounded-[32px] border border-dashed border-gray-200">
              <p className="text-red-500 font-bold">{error}</p>
            </div>
          ) : trains.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-[40px] border-2 border-dashed border-gray-100">
              <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="text-gray-300" size={32} />
              </div>
              <h3 className="text-2xl font-black text-gray-800 mb-2">No trains found</h3>
              <p className="text-gray-400 font-medium px-4">There are no direct trains for this route on the selected date.</p>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between mb-8 ml-2">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{trains.length} Trains found matching your route</p>
                <span className="text-[10px] font-black text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-widest">IRCTC Authorized</span>
              </div>
              {trains.map(train => (
                <BookingCard key={train._id} item={train} type="train" />
              ))}
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
};

export default TrainResults;
