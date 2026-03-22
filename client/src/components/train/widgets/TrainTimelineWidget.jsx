import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

const TrainTimelineWidget = () => {
  const stations = [
    { name: "New Delhi (NDLS)", arr: "Source", dep: "16:55", date: "Day 1" },
    { name: "Kota Jn (KOTA)", arr: "21:30", dep: "21:40", date: "Day 1", delay: "10m late" },
    { name: "Vadodara Jn (BRC)", arr: "03:45", dep: "03:55", date: "Day 2", delay: "On time" },
    { name: "Mumbai Central (MMCT)", arr: "08:35", dep: "Destination", date: "Day 2" }
  ];

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white/90 backdrop-blur-xl p-6 rounded-[2rem] border border-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgba(220,38,38,0.1)] transition-all flex flex-col h-full col-span-1 md:col-span-2 lg:col-span-1"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-purple-500/10 p-3 rounded-2xl text-purple-600">
           <Clock size={24} />
        </div>
        <h3 className="font-black text-xl text-gray-800 tracking-tight">Live Schedule</h3>
      </div>

      <div className="relative pl-6 flex-1 flex flex-col py-2">
         {/* Vertical dashed line */}
         <div className="absolute top-4 bottom-4 left-[11px] w-[2px] border-l-2 border-dashed border-gray-300"></div>
         
         {stations.map((st, idx) => (
           <div key={idx} className="relative mb-6 last:mb-0">
             {/* Timeline Node */}
             <div className="absolute -left-[29px] top-1 w-[14px] h-[14px] rounded-full bg-white border-4 border-purple-500 shadow-sm z-10"></div>
             
             <div className="flex justify-between items-start">
               <div>
                  <h4 className="font-bold text-gray-800 text-sm">{st.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-black text-gray-500">{st.arr} - {st.dep}</span>
                    {st.delay && (
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-sm ${st.delay === 'On time' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>{st.delay}</span>
                    )}
                  </div>
               </div>
               <span className="text-[10px] font-bold text-gray-400">{st.date}</span>
             </div>
           </div>
         ))}
      </div>
    </motion.div>
  );
};
export default TrainTimelineWidget;
