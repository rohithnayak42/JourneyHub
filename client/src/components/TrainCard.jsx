import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Train, 
  MapPin, 
  Info, 
  Coffee, 
  Wifi, 
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';

// Each TrainCard manages its OWN selectedClass state independently.
// This ensures no cross-card state leakage.
const TrainCard = ({ train, onConfirmBooking }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedWeekdays, setSelectedWeekdays] = useState([]);
  const hasAvailableSeats = train.classes?.some(c => c.status === 'AVAILABLE' || c.availableSeats > 0);

  useEffect(() => {
    if (!selectedClass && train.classes) {
      const firstAvailable = train.classes.find(c => c.status === 'AVAILABLE' || c.availableSeats > 0);
      if (firstAvailable) {
        setSelectedClass(firstAvailable.type || firstAvailable.className);
      }
    }
  }, [train.classes, selectedClass]);

  const getStatusColor = (status, availableSeats) => {
    const s = status?.toUpperCase();
    if (s === 'AVAILABLE' || availableSeats > 0) return 'text-emerald-600 bg-emerald-50';
    if (s === 'WL') return 'text-amber-600 bg-amber-50';
    return 'text-rose-500 bg-rose-50';
  };

  const getStatusLabel = (item) => {
    const s = item.status?.toUpperCase();
    if (s === 'AVAILABLE' || item.availableSeats > 0) return `Avail. ${item.available || item.availableSeats || ''}`.trim();
    if (s === 'WL') return `WL ${item.wlNumber || ''}`.trim();
    return 'Sold Out';
  };

  // Handle class chip click — scoped to THIS card only
  const handleClassClick = (cls) => {
    setSelectedClass(prev => prev === cls.type ? null : cls.type);
  };

  const handleConfirm = () => {
    if (selectedClass && onConfirmBooking) {
      onConfirmBooking(train, selectedClass);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      // train-card class is used for the user-specified scoped JS approach
      className="train-card group relative bg-white border border-gray-200 rounded-[32px] shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 overflow-hidden"
      data-selected-class={selectedClass || ''}
    >
      {/* Fastest Route Badge */}
      {train.isFastest && (
        <div className="absolute top-4 left-6 z-10 flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20">
          <TrendingUp size={12} className="stroke-[3]" />
          <span className="text-[10px] font-black uppercase tracking-wider">Fastest Route</span>
        </div>
      )}

      <div className="p-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* ── Section 1: Train Identity + Weekday Indicators ── */}
          <div className="flex flex-col gap-4 w-full lg:w-1/4">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-gray-50 rounded-2xl group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-500">
                <Train size={28} />
              </div>
              <div>
                <h3 className="text-xl font-black text-gray-900 leading-tight group-hover:text-primary transition-colors">
                  {train.trainName}
                </h3>
                <p className="text-sm font-bold text-gray-500 tracking-wide uppercase">
                  {train.trainNumber}
                </p>
              </div>
            </div>

            {/* Weekday Indicator Buttons — scoped click via onToggleWeekday prop */}
            <div className="flex gap-2 flex-wrap">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((dayLabel, idx) => {
                const isRunning = train.runningDays?.includes(idx);
                // isActive = this day is locally selected on this specific card
                const isActive = selectedWeekdays.includes(idx);
                return (
                  <button
                    key={idx}
                    data-day={dayLabel}
                    onClick={() => {
                      if (isRunning) {
                        setSelectedWeekdays(prev => 
                          prev.includes(idx) ? prev.filter(v => v !== idx) : [...prev, idx]
                        );
                      }
                    }}
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '8px',
                      fontSize: '9px',
                      fontWeight: '900',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid',
                      transition: 'all 0.2s ease',
                      cursor: isRunning ? 'pointer' : 'default',
                      // Active (filtered) → blue; Running (not filtered) → dark; Not running → faded
                      backgroundColor: isRunning
                        ? (isActive ? '#2563eb' : '#1f2937')
                        : 'transparent',
                      color: isRunning ? '#ffffff' : '#e5e7eb',
                      borderColor: isRunning
                        ? (isActive ? '#2563eb' : '#1f2937')
                        : '#f9fafb',
                      transform: isActive ? 'scale(1.1)' : 'scale(1)',
                      boxShadow: isActive ? '0 4px 12px rgba(37,99,235,0.3)' : 'none',
                    }}
                  >
                    {dayLabel}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Section 2: Journey Timeline ── */}
          <div className="flex-1 flex items-center justify-between w-full px-4 lg:px-8 border-x border-gray-100">
            <div className="text-left space-y-1">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 block">Departure</span>
              <p className="text-2xl font-black text-gray-900">{train.departureTime}</p>
              <div className="flex items-center gap-1.5 text-gray-600 font-bold">
                <MapPin size={14} className="text-primary" />
                <span className="text-sm">{train.source}</span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 px-8 flex-1">
              <span className="text-[10px] font-black text-primary/40 uppercase tracking-widest">{train.duration}</span>
              <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-gray-200 to-transparent relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 py-1">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                </div>
              </div>
              <div className="flex items-center gap-4 text-[9px] font-black text-gray-300 uppercase tracking-tighter">
                <span>Direct</span><span>•</span><span>Punctual</span>
              </div>
            </div>

            <div className="text-right space-y-1">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 block">Arrival</span>
              <p className="text-2xl font-black text-gray-800">{train.arrivalTime}</p>
              <div className="flex items-center gap-1.5 text-gray-500 font-bold justify-end">
                <span className="text-sm">{train.destination}</span>
                <MapPin size={14} className="text-secondary" />
              </div>
            </div>
          </div>

          {/* ── Section 3: Class / Price Grid (per-card scoped) ── */}
          <div className="w-full lg:w-1/3 grid grid-cols-2 gap-3">
            {train.classes?.map((cls) => {
              const classType = cls.type || cls.className;
              const isActive = selectedClass === classType;
              return (
                <button
                  key={classType}
                  data-class={classType}
                  onClick={() => handleClassClick({ type: classType, ...cls })}
                  style={{
                    padding: '16px',
                    borderRadius: '16px',
                    border: isActive ? '2px solid #2563eb' : '2px solid #f3f4f6',
                    backgroundColor: isActive ? '#2563eb' : '#fafafa',
                    cursor: 'pointer',
                    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: isActive ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
                    boxShadow: isActive ? '0 10px 30px rgba(37,99,235,0.25)' : 'none',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: '900',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: isActive ? '#ffffff' : '#9ca3af',
                    }}>
                      {classType}
                    </span>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: '900',
                      color: isActive ? 'rgba(255,255,255,0.85)' : '#2563eb',
                    }}>
                      ₹{cls.price}
                    </span>
                  </div>
                  <div style={{
                    fontSize: '9px',
                    fontWeight: '700',
                    padding: '3px 8px',
                    borderRadius: '8px',
                    textAlign: 'center',
                    backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : undefined,
                    color: isActive ? '#ffffff' : undefined,
                  }}
                    className={isActive ? '' : getStatusColor(cls.status, cls.availableSeats)}
                  >
                    {getStatusLabel(cls)}
                  </div>
                </button>
              );
            })}
          </div>

        </div>

        {/* ── Action Bar ── */}
        <div className="mt-8 pt-8 border-t border-gray-50 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="group/info flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-primary transition-colors"
            >
              <div className={`p-1.5 rounded-lg bg-gray-50 group-hover/info:bg-primary/10 transition-all ${isExpanded ? 'rotate-180' : ''}`}>
                <Info size={14} />
              </div>
              {isExpanded ? 'Hide Details' : 'View Train Details'}
            </button>
            <div className="h-4 w-[1px] bg-gray-100" />
            <div className="flex items-center gap-3">
              {[Coffee, Wifi, ShieldCheck].map((Icon, idx) => (
                <div key={idx} className="p-2 bg-gray-50/50 rounded-lg text-gray-300 hover:text-primary hover:bg-primary/5 transition-all cursor-help">
                  <Icon size={16} />
                </div>
              ))}
            </div>
          </div>

          <button
            disabled={!hasAvailableSeats}
            onClick={handleConfirm}
            className={`px-10 py-4 rounded-full font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 transition-all duration-500 shadow-2xl ${
              hasAvailableSeats
                ? 'bg-[#ff4d4f] text-white hover:bg-red-600 shadow-red-500/20 translate-x-1 cursor-pointer'
                : 'bg-[#ccc] text-gray-500 cursor-not-allowed shadow-none border border-gray-300'
            }`}
          >
            <span>Confirm Booking</span>
            <ChevronRight size={18} />
          </button>
        </div>

        {/* ── Expandable Detail Panel ── */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.1em]">Stoppages & Frequency</h4>
                  <p className="text-gray-600 font-medium">This train stops at 12 major stations including Kota, Vadodara, and Surat. It has a 98% punctuality record.</p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.1em]">On-board Facilities</h4>
                  <ul className="space-y-2 text-xs font-bold text-gray-500">
                    <li className="flex items-center gap-2"><Award size={14} className="text-primary" /> Premium Catering Available</li>
                    <li className="flex items-center gap-2"><Award size={14} className="text-primary" /> Cleanliness Rated 4.5/5</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.1em]">Cancellation Policy</h4>
                  <p className="text-xs text-emerald-600 bg-emerald-50 p-3 rounded-xl font-bold">Free cancellation available if cancelled 48 hours before departure.</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
};

export default TrainCard;
