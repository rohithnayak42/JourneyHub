import React from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, ArrowRight, Flame, Tag, ShieldCheck } from 'lucide-react';

const routesData = [
  {
    id: 1,
    from: "Bangalore",
    to: "Hyderabad",
    price: "₹899",
    duration: "6h 45m",
    rating: 4.9,
    type: "AC Sleeper 2+1",
    trending: true,
    cheapest: false,
    img: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200",
  },
  {
    id: 2,
    from: "Mumbai",
    to: "Pune",
    price: "₹499",
    duration: "3h 30m",
    rating: 4.7,
    type: "Mercedes AC Seater",
    trending: false,
    cheapest: true,
    img: "https://images.unsplash.com/photo-1590073844006-33379778ae09?auto=format&fit=crop&w=1200",
  },
  {
    id: 3,
    from: "Chennai",
    to: "Coimbatore",
    price: "₹750",
    duration: "7h 15m",
    rating: 4.8,
    type: "Volvo Multi-Axle",
    trending: true,
    cheapest: false,
    img: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200",
  },
  {
    id: 4,
    from: "Delhi",
    to: "Jaipur",
    price: "₹650",
    duration: "5h 00m",
    rating: 4.8,
    type: "Scania AC Sleeper",
    trending: false,
    cheapest: false,
    img: "https://images.unsplash.com/photo-1524492707947-2f85a6e5a065?auto=format&fit=crop&w=1200",
  }
];

const BusRoutes = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter"
            >
              Popular Bus Routes
            </motion.h2>
            <p className="mt-6 text-slate-500 text-xl font-medium max-w-2xl">
              Experience India's most traveled routes with the comfort and safety of our premium partner operators.
            </p>
          </div>
          <button className="text-secondary font-black uppercase tracking-widest text-xs flex items-center gap-3 mt-8 md:mt-0 group bg-slate-50 px-8 py-4 rounded-2xl hover:bg-slate-100 transition-all">
            Explore All 
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {routesData.map((route, index) => (
            <motion.div
              key={route.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -12 }}
              className="bg-white rounded-3xl overflow-hidden shadow-premium border border-slate-100 group transition-all duration-500 cursor-pointer"
            >
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={route.img} 
                  alt={`${route.from} to ${route.to}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                
                {/* Badges */}
                <div className="absolute top-5 left-5 flex flex-col gap-2">
                  {route.trending && (
                    <div className="bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-xl">
                      <Flame className="w-3 h-3" /> Trending
                    </div>
                  )}
                  {route.cheapest && (
                    <div className="bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-xl">
                      <Tag className="w-3 h-3" /> Best Value
                    </div>
                  )}
                </div>

                <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl flex items-center gap-1.5 shadow-2xl">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  <span className="text-sm font-black text-slate-800">{route.rating}</span>
                </div>

                <div className="absolute bottom-5 left-6 right-6 text-white text-center">
                   <div className="flex items-center justify-center gap-3 text-xl font-black tracking-tight">
                     <span>{route.from}</span>
                     <ArrowRight className="w-4 h-4 text-blue-400" />
                     <span>{route.to}</span>
                   </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-7">
                <div className="flex justify-between items-start mb-6">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Premium Service</span>
                    <h4 className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      {route.type}
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Starting From</span>
                    <span className="text-2xl font-black text-blue-600 tracking-tighter">{route.price}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-5 border-t border-slate-50">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full">
                    <Clock className="w-3.5 h-3.5 text-blue-500" />
                    <span>{route.duration}</span>
                  </div>
                  <button className="text-xs font-black text-blue-600 uppercase tracking-widest hover:text-blue-800 transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BusRoutes;
