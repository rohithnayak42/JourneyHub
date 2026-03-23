import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircleQuestion, Search } from 'lucide-react';

const faqs = [
  {
    question: "Can I cancel my bus ticket online?",
    answer: "Yes, you can easily cancel your bus ticket through the 'My Bookings' section on our app or website. Cancellation charges may apply depending on the operator's policy and how close to the departure time you cancel."
  },
  {
    question: "How do I get my M-ticket or E-ticket?",
    answer: "Once your booking is confirmed, an E-ticket is sent to your registered email ID, and an M-ticket (SMS/WhatsApp) is sent to your mobile number. You can show either of these along with a valid ID proof while boarding."
  },
  {
    question: "What is the baggage limit for bus travel?",
    answer: "Generally, passengers are allowed up to 15 kg of luggage and one small carry-on bag for the cabin. Excess baggage may incur additional charges depending on the bus operator."
  },
  {
    question: "Do buses have rest stops for long journeys?",
    answer: "Yes, most long-distance buses have designated rest stops for meals and restrooms every 3 to 4 hours. Premium services often feature onboard washrooms as well."
  },
  {
    question: "How do I track my bus location?",
    answer: "You can track your bus in real-time using our Live Tracking feature. Simply enter your PNR or Bus Number in the tracking section to see the exact location and ETA."
  }
];

const BusFAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0); // Open first one by default
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const filteredFaqs = useMemo(() => {
    if (!searchQuery) return faqs;
    return faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="block-section !bg-slate-50 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-20 h-20 bg-blue-100 text-blue-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-inner border border-white"
          >
            <MessageCircleQuestion className="w-10 h-10" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-slate-900 mb-6"
          >
            Frequently Asked Questions
          </motion.h2>

          {/* Smart Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-md mx-auto relative group"
          >
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input 
              type="text" 
              placeholder="Search for answers..." 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setActiveIndex(0); // Reset accordion memory on search
              }}
              className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-700 placeholder-slate-400"
            />
          </motion.div>
        </div>

        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => {
                const isActive = activeIndex === index;

                return (
                  <motion.div 
                    layout
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${isActive ? 'border-blue-500 shadow-xl ring-2 ring-blue-500/20' : 'border-slate-200 hover:border-blue-300 hover:shadow-md'}`}
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className={`w-full flex items-center justify-between p-6 text-left focus:outline-none transition-colors ${isActive ? 'bg-blue-50/50' : ''}`}
                    >
                      <span className={`text-lg font-bold pr-8 transition-colors ${isActive ? 'text-blue-700' : 'text-slate-800'}`}>
                        {faq.question}
                      </span>
                      <motion.div
                        animate={{ rotate: isActive ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-xl transition-colors ${isActive ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-500'}`}
                      >
                        <ChevronDown className="w-5 h-5" />
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                        >
                          <div className={`px-6 pb-6 pt-2 text-slate-600 leading-relaxed border-t text-lg bg-blue-50/50 ${isActive ? 'border-blue-100' : 'border-slate-100'}`}>
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No results found</h3>
                <p className="text-slate-500">We couldn't find any FAQs matching "{searchQuery}"</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default BusFAQ;
