import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LocateFixed, Navigation2, Search, MapPin, Clock } from 'lucide-react';

const BusTracking = () => {
  const [trackingId, setTrackingId] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [timeLeft, setTimeLeft] = useState(7265); // Time in seconds (approx 2h 1m)

  useEffect(() => {
    let timer;
    if (isTracking && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTracking, timeLeft]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleTrack = (e) => {
    e.preventDefault();
    if(trackingId.trim() !== '') {
      setIsTracking(true);
    }
  };

  return (
    <div className="relative overflow-hidden bg-slate-900 rounded-[24px] p-8 md:p-12 shadow-xl mb-12 flex items-center justify-center">
      {/* Premium Cinematic Background */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `radial-gradient(#3b82f6 0.5px, transparent 0.5px)`,
        backgroundSize: '30px 30px'
      }} />
      <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      
      <div className="w-full relative z-10 flex flex-col lg:flex-row items-center gap-16">
        {/* Left: Interactive Form */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex-1 w-full"
        >
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-blue-500/10 text-blue-400 font-black text-xs uppercase tracking-widest border border-blue-500/20 backdrop-blur-xl mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500 shadow-[0_0_10px_#3b82f6]"></span>
            </span>
            Live Satellite Status
          </div>
          <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-[1.05]">
            Track Your Journey <br />
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text">In Real-Time</span>
          </h2>
          <p className="text-slate-400 text-xl mb-12 max-w-lg leading-relaxed font-medium">
            Experience military-grade GPS accuracy. Monitor speed, location, and ETA with a single tap.
          </p>

          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4 w-full max-w-xl group/form">
            <div className="relative flex-1">
              <input 
                type="text" 
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="Enter PNR or Bus Number"
                className="w-full bg-slate-800/50 border-2 border-slate-700/50 text-white placeholder-slate-500 px-8 py-5 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-2xl backdrop-blur-md"
              />
            </div>
            <button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-premium hover:shadow-[0_0_40px_rgba(37,99,235,0.4)] active:scale-95 flex items-center justify-center gap-3"
            >
              <Search className="w-5 h-5" /> Track Now
            </button>
          </form>
        </motion.div>

        {/* Right: Premium Tracking Interface */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex-1 w-full glass-panel p-1 md:p-1.5 rounded-[3rem] shadow-premium relative min-h-[500px]"
        >
          <div className="w-full h-full bg-slate-950/40 rounded-[2.8rem] p-8 flex flex-col relative overflow-hidden">
            {/* Top Gloss */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

            {!isTracking ? (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-500 space-y-6">
                <div className="w-28 h-28 rounded-3xl bg-slate-900 flex items-center justify-center border border-slate-800 shadow-premium relative group">
                  <div className="absolute inset-0 bg-blue-500/20 blur-2xl group-hover:bg-blue-500/40 transition-all duration-1000" />
                  <Navigation2 className="w-12 h-12 text-blue-500 relative z-10 animate-bounce" />
                </div>
                <p className="font-black text-xs uppercase tracking-[0.3em] text-slate-400">Waiting for Signal</p>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full flex-1 flex flex-col relative z-10"
                >
                  <div className="flex justify-between items-center bg-slate-900/50 border border-white/5 p-6 rounded-3xl mb-12 shadow-2xl backdrop-blur-xl">
                    <div className="space-y-2">
                       <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Live Status</p>
                       <div className="flex items-center gap-2 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
                         <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                         <p className="text-emerald-400 font-black text-[10px] uppercase">En Route</p>
                       </div>
                    </div>
                    
                    <div className="text-center">
                       <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Current Speed</p>
                       <p className="text-white font-black text-3xl tracking-tighter">72 <span className="text-xs font-bold text-slate-500">km/h</span></p>
                    </div>

                    <div className="text-right">
                       <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-2 justify-end">
                         <Clock className="w-3 h-3 text-blue-400" /> Live ETA
                       </p>
                       <p className="text-blue-400 font-mono font-black text-3xl tracking-tighter">{formatTime(timeLeft)}</p>
                    </div>
                  </div>

                  <div className="relative flex-1 min-h-[220px] mx-8 mt-12">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-900 -translate-y-1/2 rounded-full overflow-hidden shadow-inner">
                      <div className="w-full h-full bg-[radial-gradient(#475569_1px,_transparent_1px)] bg-[size:10px_10px] opacity-30"></div>
                    </div>
                    
                    <motion.div 
                      initial={{ width: "0%" }}
                      animate={{ width: "70%" }}
                      transition={{ duration: 3, ease: "easeOut" }}
                      className="absolute top-1/2 left-0 h-2 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 -translate-y-1/2 rounded-full shadow-[0_0_30px_rgba(37,99,235,0.8)]"
                    />

                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
                      <div className="w-6 h-6 rounded-full bg-blue-600 border-4 border-slate-950 z-10 shadow-[0_0_15px_rgba(37,99,235,0.6)]" />
                      <span className="text-[10px] text-white font-black uppercase tracking-widest absolute top-8">Source</span>
                    </div>

                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 flex flex-col items-center gap-4">
                      <div className="w-6 h-6 rounded-full bg-slate-800 border-4 border-slate-950 z-10" />
                      <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest absolute top-8">Dest</span>
                    </div>

                    <motion.div
                      initial={{ left: "0%" }}
                      animate={{ left: "70%" }}
                      transition={{ duration: 3, ease: "easeOut" }}
                      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20"
                    >
                      <div className="bg-white p-3 rounded-2xl shadow-indigo border-2 border-blue-600 text-blue-600 relative overflow-hidden group">
                        <LocateFixed className="w-7 h-7 animate-[spin_6s_linear_infinite]" />
                        <span className="absolute inset-0 rounded-2xl bg-blue-400 animate-ping opacity-20"></span>
                      </div>
                      
                      <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 3 }}
                        className="absolute -top-20 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest py-2 px-5 rounded-xl whitespace-nowrap shadow-premium border border-blue-400/50"
                      >
                        Near Agra Toll
                        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-blue-600 rotate-45 border-r border-b border-blue-400/50" />
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BusTracking;
