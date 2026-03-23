import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, Headphones } from 'lucide-react';

const faqs = [
  { q: "What is the cancellation policy?", a: "We offer free cancellation on most hotels up to 24 hours before check-in. Select 'Free Cancellation' filter during search to see eligible properties only." },
  { q: "Can I book a hotel for someone else?", a: "Yes! You can make bookings for friends or family. Just enter their name at the guest details step. Contact info and payment can be yours." },
  { q: "How do I get a GST invoice for my stay?", a: "You can request a GST invoice from 'My Bookings' after your stay. Enter your GSTIN and business details to generate the invoice instantly." },
  { q: "Is early check-in or late check-out available?", a: "Early check-in and late check-out depends on the property. You can request it during booking or contact the hotel directly via our concierge." },
  { q: "Are pets allowed in hotels?", a: "Pet policies vary by property. Look for the 'Pet Friendly' badge when searching. Our filters help you narrow down pet-friendly stays easily." },
  { q: "What is the 'Pay at Hotel' option?", a: "With Pay at Hotel, you reserve your room now and pay when you arrive. No upfront payment needed, though your card may be kept as a guarantee." },
  { q: "How do I redeem a coupon code?", a: "Enter your coupon code on the payment page before completing the transaction. The discount is applied instantly and shown in the price summary." }
];

const HotelFAQ = () => {
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
            Stay <br />
            <span className="text-rose-600">Concierge FAQ</span>
          </motion.h2>
          <p className="text-slate-500 mt-6 text-xl font-medium max-w-xl leading-relaxed">
            Everything you need to know about your next stay. Our hospitality specialists are available 24/7.
          </p>
        </div>
        
        <div className="relative w-full md:w-96 group">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <Search size={20} className="text-slate-400 group-focus-within:text-rose-500 transition-colors" />
          </div>
          <input 
            type="text" 
            placeholder="Search stay topics..." 
            value={query} 
            onChange={e => setQuery(e.target.value)}
            className="w-full pl-16 pr-8 py-5 bg-white border-2 border-slate-100 rounded-2xl text-sm font-black uppercase tracking-widest focus:outline-none focus:ring-8 focus:ring-rose-500/5 focus:border-rose-500 shadow-premium transition-all placeholder:text-slate-400 placeholder:font-medium placeholder:tracking-normal" 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto text-left">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full py-20 text-center">
               <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                 <Headphones size={32} className="text-slate-300" />
               </div>
               <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-xs">Our concierge couldn't find matches for "{query}"</p>
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
                  ? 'border-rose-500 bg-white shadow-[0_25px_50px_rgba(225,29,72,0.1)]' 
                  : 'border-slate-50 bg-white hover:bg-rose-50/30 shadow-premium group'}`}
            >
              <button 
                onClick={() => setOpen(open === idx ? null : idx)} 
                className="w-full text-left flex items-start justify-between p-8 gap-6"
              >
                <span className={`font-black text-lg tracking-tight leading-tight ${open === idx ? 'text-rose-600' : 'text-slate-800'}`}>
                  {faq.q}
                </span>
                <motion.div 
                  animate={{ rotate: open === idx ? 180 : 0, scale: open === idx ? 1.2 : 1 }} 
                  className={`flex-shrink-0 mt-1 transition-colors duration-300 ${open === idx ? 'text-rose-600' : 'text-slate-300 group-hover:text-rose-400'}`}
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
                       <p className="text-slate-500 leading-relaxed font-medium text-lg border-l-4 border-rose-500 pl-6 bg-rose-50/30 py-4 rounded-r-2xl">
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

export default HotelFAQ;
