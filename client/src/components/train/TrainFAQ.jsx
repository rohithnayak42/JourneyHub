import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';

const faqs = [
  { q: "How do I check PNR status?", a: "Enter your 10-digit PNR in the 'PNR Status' tool above. You'll see your booking status, coach, seat number, and any changes instantly." },
  { q: "What is Tatkal booking?", a: "Tatkal is a premium quota for last-minute travelers. It opens 1 day before departure (excluding the date of journey) and charges an extra fee above the base fare." },
  { q: "How can I cancel a train ticket?", a: "Log into your account, go to 'My Bookings', select the ticket and click 'Cancel'. Refunds are processed per Railway's cancellation rules based on how early you cancel." },
  { q: "What is the difference between 2A and 3A?", a: "2A (Second AC) has 4 berths per bay with curtains and is more private. 3A (Third AC) has 6 berths with more passengers. 2A is ~₹400–₹600 more expensive typically." },
  { q: "Can I board from an intermediate station?", a: "Yes! If your ticket is from an intermediate station, you can board from any previous station as long as it falls in the same train path." },
  { q: "What is a RAC ticket?", a: "RAC (Reservation Against Cancellation) gives you a confirmed seat but a shared berth. It usually gets upgraded to a full confirmed berth when cancellations happen." },
  { q: "How do I order food on the train?", a: "Use our E-Catering tool above or visit IRCTC's official food app. Enter your PNR, select a station stop, and choose from restaurants along the route." }
];

const TrainFAQ = () => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(null);
  const filtered = faqs.filter(f => f.q.toLowerCase().includes(query.toLowerCase()) || f.a.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="w-full py-24 pb-32">
      <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8 text-center md:text-left">
        <div className="flex-1">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter"
          >
            Train Travel <br />
            <span className="text-blue-600">Concierge</span>
          </motion.h2>
          <p className="text-slate-500 mt-6 text-xl font-medium max-w-xl leading-relaxed">
            Quick answers to your most common rail journey questions. Our AI is here to help you de-board with ease.
          </p>
        </div>
        
        <div className="relative w-full md:w-96 group">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <Search size={20} className="text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <input 
            type="text" 
            placeholder="Search across 200+ topics..." 
            value={query} 
            onChange={e => setQuery(e.target.value)}
            className="w-full pl-16 pr-8 py-5 bg-white border-2 border-slate-100 rounded-2xl text-sm font-black uppercase tracking-widest focus:outline-none focus:ring-8 focus:ring-blue-500/5 focus:border-blue-500 shadow-premium transition-all placeholder:text-slate-400 placeholder:font-medium placeholder:tracking-normal" 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
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

export default TrainFAQ;
