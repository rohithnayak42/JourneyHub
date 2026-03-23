import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';

const faqs = [
  { q: "How do I cancel my flight booking?", a: "You can cancel your flight from 'My Bookings' up to 2 hours before departure. Refunds are processed within 5-7 business days based on the airline's policy." },
  { q: "Can I change the date of my flight?", a: "Yes! Date change is supported for most airlines. Go to 'Manage Booking', select your trip and click 'Reschedule'. Fare difference and change fees may apply." },
  { q: "How do I get my boarding pass?", a: "Your boarding pass will be emailed to you 24 hours before departure. You can also download it from 'My Bookings'. Web check-in is required for most airlines." },
  { q: "Are the flight fares inclusive of baggage?", a: "It depends on the fare type. Economy Lite fares often have no check-in baggage; Economy and above include 15-25 kg. Always verify during booking." },
  { q: "What if my flight is delayed or cancelled?", a: "In case of cancellation or delay over 3 hours, we'll send you an alert and options to rebook or claim a full refund." },
  { q: "How early should I reach the airport?", a: "For domestic flights, arrive 1.5–2 hours early. For international flights, arrive 3 hours before departure. Check-in closes 45 minutes before for most airlines." },
  { q: "Can I book a flight for someone else?", a: "Absolutely! You can book for any passenger. Just enter their correct name as on their government ID. Contact details can be yours." },
  { q: "What is a Price Lock feature?", a: "Price Lock lets you freeze the current fare for 24-48 hours by paying a small fee. If prices go up, you still pay the original locked price." }
];

const FlightFAQ = () => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(null);

  const filtered = faqs.filter(f =>
    f.q.toLowerCase().includes(query.toLowerCase()) ||
    f.a.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="block-section">
      <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8 text-center md:text-left">
        <div className="flex-1">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter"
          >
            Aviation <br />
            <span className="text-blue-600">Concierge FAQ</span>
          </motion.h2>
          <p className="text-slate-500 mt-6 text-xl font-medium max-w-xl leading-relaxed">
            Instant answers to your most common flight queries. Our ground staff is always ready to assist your journey.
          </p>
        </div>
        
        <div className="relative w-full md:w-96 group">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <Search size={20} className="text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <input 
            type="text" 
            placeholder="Search across flight topics..." 
            value={query} 
            onChange={e => setQuery(e.target.value)}
            className="w-full pl-16 pr-8 py-5 bg-white border-2 border-slate-100 rounded-2xl text-sm font-black uppercase tracking-widest focus:outline-none focus:ring-8 focus:ring-blue-500/5 focus:border-blue-500 shadow-premium transition-all placeholder:text-slate-400 placeholder:font-medium placeholder:tracking-normal" 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto text-left">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full py-20 text-center">
               <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                 <Search size={32} className="text-slate-300" />
               </div>
               <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-xs">No answers found for "{query}"</p>
            </motion.div>
          )}
          {filtered.map((faq, idx) => (
            <motion.div 
              key={faq.q} 
              layout
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: idx * 0.05 }}
              className={`rounded-[2rem] border-2 transition-all duration-500 overflow-hidden
                ${open === idx 
                  ? 'border-blue-500 bg-white shadow-[0_25px_50px_rgba(37,99,235,0.1)]' 
                  : 'border-slate-50 bg-white hover:bg-slate-50/50 shadow-premium group'}`}
            >
              <button 
                onClick={() => setOpen(open === idx ? null : idx)} 
                className="w-full text-left flex items-start justify-between p-8 gap-6"
              >
                <span className={`font-black text-lg tracking-tight leading-tight ${open === idx ? 'text-blue-600' : 'text-slate-800'}`}>
                  {faq.q}
                </span>
                <motion.div 
                  animate={{ rotate: open === idx ? 180 : 0, scale: open === idx ? 1.2 : 1 }} 
                  className={`flex-shrink-0 mt-1 transition-colors duration-300 ${open === idx ? 'text-blue-600' : 'text-slate-300 group-hover:text-slate-500'}`}
                >
                  <ChevronDown size={24} strokeWidth={3} />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {open === idx && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} 
                    animate={{ height: 'auto', opacity: 1 }} 
                    exit={{ height: 0, opacity: 0 }} 
                    transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                    <div className="px-8 pb-10 border-t border-slate-50/50 pt-6">
                       <p className="text-slate-500 leading-relaxed font-medium text-lg border-l-4 border-blue-500 pl-6 bg-blue-50/30 py-4 rounded-r-2xl">
                         {faq.a}
                       </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FlightFAQ;
