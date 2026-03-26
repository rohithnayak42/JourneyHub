import React, { useState } from 'react';
import { 
  Filter, 
  Clock, 
  ChevronDown, 
  Check,
  Zap,
  Tag,
  Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FilterSection = ({ title, icon: Icon, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-50 py-6 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full mb-4 group"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gray-50 text-gray-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
            <Icon size={16} />
          </div>
          <h3 className="text-[10px] font-black text-gray-800 uppercase tracking-[0.15em]">{title}</h3>
        </div>
        <ChevronDown size={16} className={`text-gray-300 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden space-y-3"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FilterSidebar = ({ filters, setFilters }) => {
  const toggleFilter = (category, value) => {
    setFilters(prev => {
      const active = prev[category] || [];
      const updated = active.includes(value)
        ? active.filter(v => v !== value)
        : [...active, value];
      return { ...prev, [category]: updated };
    });
  };

  return (
    <aside className="w-full md:w-80 space-y-6">
      <div className="bg-white p-8 rounded-[40px] shadow-xl shadow-gray-200/50 border border-gray-200 sticky top-44">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-gray-900 p-2.5 rounded-2xl text-white shadow-lg shadow-gray-900/20">
              <Filter size={18} />
            </div>
            <h2 className="font-black text-gray-900 uppercase tracking-widest text-xs">Smart Filters</h2>
          </div>
          <button 
            onClick={() => setFilters({ availability: [], classes: [], departureTime: [], quota: 'General' })}
            className="text-[9px] font-black text-primary hover:underline uppercase tracking-wider"
          >
            Reset
          </button>
        </div>
        
        <div className="max-h-[calc(100vh-300px)] overflow-y-auto pr-2 custom-scrollbar">
          
          <FilterSection title="Availability" icon={Check}>
            {['Show Confirmed Only', 'Hide Waiting List'].map(option => (
              <label key={option} className="flex items-center gap-3 cursor-pointer group py-1">
                <div className="relative flex items-center">
                  <input 
                    type="checkbox" 
                    onChange={() => toggleFilter('availability', option)}
                    checked={filters.availability?.includes(option)}
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-lg border-2 border-gray-300 transition-all checked:bg-primary checked:border-primary" 
                  />
                  <Check className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" size={12} strokeWidth={4} />
                </div>
                <span className="text-sm text-gray-700 group-hover:text-gray-900 font-bold transition-colors">{option}</span>
              </label>
            ))}
          </FilterSection>

          <FilterSection title="Running Days" icon={Clock}>
            <div className="flex gap-1.5 flex-wrap">
              {[
                { l: 'M', v: 0 }, { l: 'T', v: 1 }, { l: 'W', v: 2 }, { l: 'T', v: 3 }, 
                { l: 'F', v: 4 }, { l: 'S', v: 5 }, { l: 'S', v: 6 }
              ].map(day => {
                const isActive = filters.runningDays?.includes(day.v);
                return (
                  <button 
                    key={day.v + day.l}
                    onClick={() => toggleFilter('runningDays', day.v)}
                    className={`w-8 h-8 text-[10px] font-black rounded-lg border-2 transition-all flex items-center justify-center ${
                      isActive 
                        ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-105' 
                        : 'bg-gray-50 border-gray-100 text-gray-400 hover:border-gray-300 hover:bg-white hover:text-gray-900'
                    }`}
                  >
                    {day.l}
                  </button>
                )
              })}
            </div>
          </FilterSection>

          <FilterSection title="Journey Class" icon={Zap}>
            <div className="grid grid-cols-3 gap-2">
              {['1A', '2A', '3A', 'SL', 'CC', 'EC'].map(cls => {
                const isActive = filters.classes?.includes(cls);
                return (
                  <button 
                    key={cls}
                    onClick={() => toggleFilter('classes', cls)}
                    className={`text-[11px] font-black py-3.5 rounded-2xl border-2 transition-all uppercase tracking-widest ${
                      isActive 
                        ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-105' 
                        : 'bg-gray-50 border-gray-100 text-gray-500 hover:border-gray-300 hover:bg-white hover:text-gray-900'
                    }`}
                  >
                    {cls}
                  </button>
                )
              })}
            </div>
          </FilterSection>

          <FilterSection title="Booking Quota" icon={Users}>
             <div className="space-y-2">
                {['General', 'Tatkal', 'Ladies', 'Senior Citizen'].map(quota => (
                  <button 
                    key={quota}
                    onClick={() => setFilters({...filters, quota})}
                    className={`w-full text-left px-5 py-3.5 rounded-2xl border-2 transition-all text-xs font-black uppercase tracking-wider ${
                      filters.quota === quota 
                        ? 'bg-gray-900 border-gray-900 text-white shadow-xl translate-x-1' 
                        : 'bg-gray-50 border-gray-100 text-gray-500 hover:border-gray-300 hover:bg-white hover:text-gray-900'
                    }`}
                  >
                    {quota}
                  </button>
                ))}
             </div>
          </FilterSection>

          <FilterSection title="Time Preference" icon={Clock}>
            <div className="space-y-4 pt-2">
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Departure Time</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Morning', time: '06:00-12:00' },
                    { label: 'Afternoon', time: '12:00-18:00' },
                    { label: 'Evening', time: '18:00-00:00' },
                    { label: 'Night', time: '00:00-06:00' }
                  ].map(slot => (
                    <button 
                      key={slot.label}
                      onClick={() => toggleFilter('departureTime', slot.label)}
                      className={`text-[10px] font-black py-3 rounded-xl border-2 transition-all uppercase tracking-tight ${
                        filters.departureTime?.includes(slot.label)
                          ? 'bg-secondary border-secondary text-white shadow-lg shadow-secondary/20'
                          : 'bg-gray-50 border-gray-100 text-gray-500 hover:border-gray-300 hover:bg-white hover:text-gray-900'
                      }`}
                    >
                      {slot.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </FilterSection>

          <FilterSection title="Special Filters" icon={Tag}>
             <div className="space-y-4">
               {[
                 { label: 'Free Cancellation', color: 'bg-emerald-500' },
                 { label: 'Premium Trains Only', color: 'bg-amber-500' }
               ].map(special => (
                 <label key={special.label} className="flex items-center justify-between cursor-pointer group py-1">
                    <span className="text-[11px] font-black text-gray-700 uppercase tracking-wider group-hover:text-gray-900">{special.label}</span>
                    <div className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                    </div>
                 </label>
               ))}
             </div>
          </FilterSection>

        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
