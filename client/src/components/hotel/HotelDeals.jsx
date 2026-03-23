import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, ArrowRight, Flame, Clock } from 'lucide-react';

const hotels = [
  {
    name: "The Leela Palace",
    location: "New Delhi",
    image: "https://images.unsplash.com/photo-1542314831-c6a4d14b4fb3?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviews: 2840,
    price: "₹8,500",
    original: "₹12,000",
    discount: "29% OFF",
    badge: "Best Deal",
    badgeColor: "bg-emerald-500",
    rooms: "Only 3 left!"
  },
  {
    name: "Taj Lake Palace",
    location: "Udaipur",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviews: 1920,
    price: "₹15,200",
    original: "₹22,000",
    discount: "31% OFF",
    badge: "Luxury Pick",
    badgeColor: "bg-violet-500",
    rooms: "Only 2 left!"
  },
  {
    name: "ITC Grand Bharat",
    location: "Gurgaon",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    reviews: 3100,
    price: "₹11,000",
    original: "₹15,500",
    discount: "29% OFF",
    badge: "Top Rated",
    badgeColor: "bg-amber-500",
    rooms: "Selling fast"
  },
  {
    name: "Ritz-Carlton Mumbai",
    location: "Mumbai",
    image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviews: 4200,
    price: "₹18,000",
    original: "₹26,000",
    discount: "31% OFF",
    badge: "Trending",
    badgeColor: "bg-rose-500",
    rooms: "Only 5 left!"
  }
];

const HotelDeals = () => (
  <div className="block-section">
    <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
      <div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter"
        >
          Luxury <br />
          <span className="text-rose-500">Stay Curations</span>
        </motion.h2>
        <p className="text-slate-500 mt-6 text-xl font-medium max-w-2xl leading-relaxed">
          Unveiling the most prestigious properties with exclusive member-only rates. Experience pure hospitality.
        </p>
      </div>
      <button className="text-rose-500 font-black uppercase tracking-widest text-xs flex items-center gap-3 bg-rose-50 px-10 py-5 rounded-2xl hover:bg-rose-100 transition-all group shadow-sm active:scale-95">
        Explore All Havens <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
      {hotels.map((hotel, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1, duration: 0.6 }}
          viewport={{ once: true }}
          whileHover={{ y: -15 }}
          className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-premium hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all duration-500 group relative cursor-pointer"
        >
          {/* Cinematic Image Banner */}
          <div className="h-64 w-full relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent z-10 pointer-events-none" />
            <img 
              src={hotel.image || "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80"} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
              alt={hotel.name} 
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80";
              }}
            />
            
            {/* Premium Badges */}
            <div className={`absolute top-6 left-6 z-20 ${hotel.badgeColor} text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl shadow-2xl backdrop-blur-md`}>
              {hotel.badge}
            </div>
            <div className="absolute top-6 right-6 z-20 bg-white/20 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl flex items-center gap-2 shadow-2xl">
              <Flame size={12} strokeWidth={3} className="text-orange-400 animate-pulse" /> {hotel.discount}
            </div>

            {/* Title Overlay */}
            <div className="absolute bottom-6 left-8 right-8 z-20">
              <div className="flex items-center gap-2 text-rose-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
                <MapPin size={12} strokeWidth={3} /> {hotel.location}
              </div>
              <h3 className="text-white font-black text-2xl tracking-tight line-clamp-1">{hotel.name}</h3>
            </div>
          </div>

          {/* Luxury Content Area */}
          <div className="p-8">
            {/* Social Proof */}
            <div className="flex items-center justify-between mb-8">
               <div className="inline-flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100/50">
                  <Star size={14} fill="#10b981" color="#10b981" />
                  <span className="text-emerald-700 font-black text-sm">{hotel.rating}</span>
               </div>
               <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
                 {hotel.reviews.toLocaleString()} REVIEWS
               </span>
            </div>

            {/* Pricing Dashboard */}
            <div className="bg-slate-50/50 rounded-[1.5rem] p-6 border border-slate-100 mb-8 group-hover:bg-rose-50/30 group-hover:border-rose-100 transition-colors duration-500">
               <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1 translate-x-1">Member Special</p>
               <div className="flex items-baseline gap-3">
                 <span className="text-3xl font-black text-slate-900 underline decoration-rose-500/30 decoration-4 underline-offset-4">{hotel.price}</span>
                 <span className="text-xs text-slate-400 line-through font-bold">{hotel.original}</span>
               </div>
            </div>

            {/* Availability Alert */}
            <div className="flex items-center gap-2.5 mb-8 text-rose-500 text-[10px] font-black uppercase tracking-[0.2em]">
               <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-ping" />
               <Clock size={12} strokeWidth={3} /> {hotel.rooms}
            </div>

            <button className="w-full bg-slate-900 hover:bg-rose-600 text-white font-black uppercase tracking-widest text-[10px] py-5 rounded-2xl transition-all shadow-xl active:scale-95 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)]">
               Check Availability
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

export default HotelDeals;
