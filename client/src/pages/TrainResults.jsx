import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import API from '../services/api';
import Navbar from '../components/Navbar';
import TrainCard from '../components/TrainCard';
import FilterSidebar from '../components/FilterSidebar';
import { 
  Search, 
  Train as TrainIcon, 
  ChevronLeft, 
  ChevronRight,
  ArrowUpDown,
  Zap,
  Clock,
  CircleDollarSign,
  Flame
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TrainResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const source = queryParams.get('source');
  const destination = queryParams.get('destination');
  const initialDate = queryParams.get('date') ? new Date(queryParams.get('date')) : new Date();

  const [trains, setTrains] = useState([]);
  const [filteredTrains, setFilteredTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [sortBy, setSortBy] = useState('relevance');
  const [selectedClasses, setSelectedClasses] = useState({}); // kept for potential future use
  const [filters, setFilters] = useState({
    availability: [],
    classes: [],
    departureTime: [],
    runningDays: [],
    quota: 'General'
  });

  const dateSliderRef = useRef(null);

  // Generate date range for the slider
  const dates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        setLoading(true);
        const formattedDate = selectedDate.toISOString().split('T')[0];
        const res = await API.get(`/trains/search?source=${source}&destination=${destination}&date=${formattedDate}`);
        
        if (res.status !== 200 || !res.data) throw new Error("API failed");
        
        setTrains(res.data.data || []);
        setError('');
        setLoading(false);
      } catch (err) {
        // Enhanced Dummy Data for Redesign
        const dummyData = [
          {
            _id: "t1",
            trainName: "Rajdhani Special",
            trainNumber: "12952",
            source: source || "New Delhi",
            destination: destination || "Mumbai Central",
            departureTime: "16:55",
            arrivalTime: "08:35",
            duration: "15h 40m",
            isFastest: true,
            runningDays: [0, 1, 2, 3, 4, 5, 6],
            classes: [
              { type: "1A", price: 4850, status: "AVAILABLE", available: 12 },
              { type: "2A", price: 2890, status: "AVAILABLE", available: 45 },
              { type: "3A", price: 2100, status: "WL", wlNumber: 14 }
            ]
          },
          {
            _id: "t2",
            trainName: "Aug Kranti Tejas",
            trainNumber: "12954",
            source: source || "New Delhi",
            destination: destination || "Mumbai Central",
            departureTime: "17:15",
            arrivalTime: "10:05",
            duration: "16h 50m",
            runningDays: [0, 2, 4, 6],
            classes: [
              { type: "2A", price: 2750, status: "AVAILABLE", available: 8 },
              { type: "3A", price: 1980, status: "AVAILABLE", available: 122 },
              { type: "SL", price: 850, status: "NOT_AVAILABLE" }
            ]
          },
          {
            _id: "t3",
            trainName: "Duronto Express",
            trainNumber: "12268",
            source: source || "New Delhi",
            destination: destination || "Mumbai Central",
            departureTime: "22:20",
            arrivalTime: "15:50",
            duration: "17h 30m",
            runningDays: [1, 3, 5],
            classes: [
              { type: "3A", price: 1850, status: "AVAILABLE", available: 204 },
              { type: "SL", price: 720, status: "WL", wlNumber: 8 }
            ]
          }
        ];
        setTrains(dummyData);
        setError('');
        setLoading(false);
      }
    };

    if (source && destination) fetchTrains();
  }, [source, destination, selectedDate]);

  // Apply Filtering & Sorting
  useEffect(() => {
    let result = [...trains];

    // Filter by Availability
    if (filters.availability?.length > 0) {
      if (filters.availability.includes('Show Confirmed Only')) {
        result = result.filter(t => t.classes.some(c => c.status === 'AVAILABLE'));
      }
      if (filters.availability.includes('Hide Waiting List')) {
        // This is tricky: do we hide the train or just the classes?
        // Requirements say "Hide Waiting List", usually meaning show only available confirmed seats.
        result = result.filter(t => t.classes.some(c => c.status === 'AVAILABLE'));
      }
    }

    // Filter by Class
    if (filters.classes?.length > 0) {
      result = result.filter(t => t.classes.some(c => filters.classes.includes(c.type)));
    }

    // Filter by Running Days
    if (filters.runningDays?.length > 0) {
      result = result.filter(t => t.runningDays && t.runningDays.some(day => filters.runningDays.includes(day)));
    }

    // Filter by Departure Time Slots
    if (filters.departureTime?.length > 0) {
      result = result.filter(t => {
        const hour = parseInt(t.departureTime.split(':')[0]);
        if (filters.departureTime.includes('Morning') && hour >= 6 && hour < 12) return true;
        if (filters.departureTime.includes('Afternoon') && hour >= 12 && hour < 18) return true;
        if (filters.departureTime.includes('Evening') && hour >= 18 && hour < 24) return true;
        if (filters.departureTime.includes('Night') && (hour >= 0 && hour < 6)) return true;
        return false;
      });
    }

    // Sorting Logic
    if (sortBy === 'price') {
      result.sort((a, b) => Math.min(...a.classes.map(c => c.price)) - Math.min(...b.classes.map(c => c.price)));
    } else if (sortBy === 'duration') {
      result.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
    } else if (sortBy === 'departure') {
      result.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
    }

    setFilteredTrains(result);
  }, [trains, filters, sortBy]);

  const handleSelectClass = (train, cls) => {
    navigate(`/booking/train/${train._id}?class=${cls}&quota=${filters.quota}`);
  };

  const scrollDates = (direction) => {
    if (dateSliderRef.current) {
      const scrollAmt = direction === 'left' ? -200 : 200;
      dateSliderRef.current.scrollBy({ left: scrollAmt, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] flex flex-col font-sans selection:bg-primary/20">
      <Navbar />
      
      {/* Smart Search Summary & Date Slider */}
      <div className="bg-white border-b border-gray-200 sticky top-20 z-40 transition-all duration-500 py-6 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            
            {/* Route Summary */}
            <div className="flex items-center gap-6">
              <div className="p-4 bg-gray-900 rounded-[24px] text-white shadow-xl shadow-gray-400/20">
                <TrainIcon size={24} />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-black text-gray-900 leading-tight">{source}</h2>
                  <div className="w-8 h-[3px] bg-primary/20 rounded-full"></div>
                  <h2 className="text-2xl font-black text-gray-900 leading-tight">{destination}</h2>
                </div>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mt-1">
                  {filteredTrains.length} Premium Trains Available • <span className="text-primary">{filters.quota} Quota</span>
                </p>
              </div>
            </div>

            {/* Date Selection Slider */}
            <div className="flex-1 max-w-2xl relative group">
              <button 
                onClick={() => scrollDates('left')}
                className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-lg border border-gray-200 text-gray-500 hover:text-primary opacity-0 group-hover:opacity-100 transition-all"
              >
                <ChevronLeft size={16} />
              </button>
              
              <div 
                ref={dateSliderRef}
                className="flex gap-3 overflow-x-hidden px-4 no-scrollbar"
              >
                {dates.map((date, i) => {
                  const isSelected = date.toDateString() === selectedDate.toDateString();
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedDate(date)}
                      className={`flex-shrink-0 flex flex-col items-center justify-center w-20 py-4 rounded-[24px] transition-all duration-300 border-2 ${
                        isSelected 
                          ? 'bg-primary border-primary text-white shadow-xl shadow-primary/20 scale-105' 
                          : 'bg-white border-gray-100 text-gray-500 hover:border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <span className={`text-[10px] font-black uppercase tracking-wider mb-1 ${isSelected ? 'text-white/80' : 'text-gray-400'}`}>
                        {date.toLocaleString('default', { weekday: 'short' })}
                      </span>
                      <span className="text-lg font-black">{date.getDate()}</span>
                    </button>
                  )
                })}
              </div>

              <button 
                onClick={() => scrollDates('right')}
                className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-lg border border-gray-200 text-gray-500 hover:text-primary opacity-0 group-hover:opacity-100 transition-all"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 py-12 flex flex-col lg:flex-row gap-12">
        
        {/* Advanced Filters */}
        <FilterSidebar filters={filters} setFilters={setFilters} />

        {/* Main Results Area */}
        <main className="flex-1 space-y-8">
          
          {/* Action Bar (Sorting & Quick Filters) */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-6 rounded-[32px] border border-gray-200 shadow-sm">
             <div className="flex items-center gap-3">
               <div className="p-2.5 bg-gray-900 rounded-xl text-white shadow-lg shadow-gray-900/10">
                  <Flame size={18} />
               </div>
               <div>
                 <p className="text-[10px] font-black text-gray-900 uppercase tracking-widest leading-none">Smart Sort</p>
                 <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Best matched routes for you</p>
               </div>
             </div>
             
             <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto p-1">
                {[
                  { id: 'relevance', label: 'Best Match', icon: Zap },
                  { id: 'price', label: 'Lowest Price', icon: CircleDollarSign },
                  { id: 'duration', label: 'Fastest', icon: Clock },
                  { id: 'departure', label: 'Early Birds', icon: ArrowUpDown }
                ].map(option => (
                  <button
                    key={option.id}
                    onClick={() => setSortBy(option.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border-2 ${
                      sortBy === option.id 
                        ? 'bg-gray-900 border-gray-900 text-white shadow-xl scale-105' 
                        : 'bg-white text-gray-500 border-gray-100 hover:border-gray-300 hover:text-gray-900'
                    }`}
                  >
                    <option.icon size={14} />
                    {option.label}
                  </button>
                ))}
             </div>
          </div>

          {/* Results List */}
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-64 bg-white/50 rounded-[32px] animate-pulse border border-gray-50 shadow-sm overflow-hidden">
                   <div className="h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                </div>
              ))}
            </div>
          ) : filteredTrains.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-32 bg-white rounded-[40px] border border-dashed border-gray-200"
            >
              <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
                <Search className="text-gray-200" size={40} />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">No trains found</h3>
              <p className="text-gray-400 font-bold px-4 max-w-sm mx-auto">Try adjusting your filters or changing the date of your journey.</p>
              <button 
                onClick={() => setFilters({ availability: [], classes: [], departureTime: [], runningDays: [], quota: 'General' })}
                className="mt-8 text-primary font-black uppercase tracking-widest text-[10px] bg-primary/10 px-6 py-3 rounded-xl hover:bg-primary hover:text-white transition-all"
              >
                Clear All Filters
              </button>
            </motion.div>
          ) : (
            <div className="space-y-6">
              <AnimatePresence mode="popLayout">
                {filteredTrains.map((train) => (
                  <TrainCard 
                    key={train._id || train.trainNumber} 
                    train={train}
                    onConfirmBooking={handleSelectClass}
                    activeWeekdays={filters.runningDays}
                    onToggleWeekday={(idx) => {
                      setFilters(prev => {
                        const active = prev.runningDays || [];
                        const updated = active.includes(idx)
                          ? active.filter(v => v !== idx)
                          : [...active, idx];
                        return { ...prev, runningDays: updated };
                      });
                    }}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </main>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite linear;
        }
      `}</style>
    </div>
  );
};

export default TrainResults;
