import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { MapPin, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LocationDropdown = ({ isOpen, locations, onSelect, anchorRef, title = "Popular Cities near you" }) => {
  const [coords, setCoords] = useState({ left: 0, top: 0, width: 0 });

  useEffect(() => {
    if (isOpen && anchorRef?.current) {
      const updatePosition = () => {
        const rect = anchorRef.current.getBoundingClientRect();
        setCoords({
          left: rect.left,
          top: rect.bottom + 8, // 8px spacing below input
          width: rect.width,
        });
      };
      
      updatePosition();
      
      // Update dynamically on resize or scroll
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition, true);
      
      return () => {
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', updatePosition, true);
      };
    }
  }, [isOpen, anchorRef]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          style={{
            position: 'fixed',
            left: coords.left,
            top: coords.top,
            width: coords.width,
            zIndex: 9999,
          }}
          className="bg-white shadow-2xl rounded-2xl p-4 border border-gray-100"
        >
          <div className="pb-3 border-b border-gray-50 mb-2">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2">
              <Star size={12} className="text-amber-500" fill="currentColor" />
              {title}
            </p>
          </div>
          <div className="max-h-80 overflow-y-auto pr-1">
            {locations.map((loc, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(loc);
                }}
                className="w-full flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-gray-50 transition-all text-left group"
              >
                <div className="bg-white border border-gray-100 p-2 rounded-xl group-hover:border-primary/20 group-hover:bg-primary/5 transition-colors shadow-sm">
                  <MapPin size={18} className="text-gray-400 group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <p className="text-sm font-black text-gray-800 group-hover:text-primary transition-colors">{loc}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Popular City</p>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default LocationDropdown;
