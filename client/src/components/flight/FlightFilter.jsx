import React from 'react';

const FlightFilter = () => {
  return (
    <div className="w-full bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100">
      <h3 className="font-black text-gray-800 text-lg mb-4 uppercase tracking-widest">Filters</h3>
      
      {/* Stops */}
      <div className="mb-6">
        <h4 className="font-bold text-gray-800 text-sm mb-3">Stops From Delhi</h4>
        <div className="flex flex-col gap-2">
           <label className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-3">
                 <input type="checkbox" className="w-4 h-4 rounded text-blue-500 focus:ring-blue-500 border-gray-300" defaultChecked />
                 <span className="text-sm font-medium text-gray-600 group-hover:text-blue-500 transition-colors">Non Stop</span>
              </div>
              <span className="text-xs font-bold text-gray-400">₹3,450</span>
           </label>
           <label className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-3">
                 <input type="checkbox" className="w-4 h-4 rounded text-blue-500 focus:ring-blue-500 border-gray-300" />
                 <span className="text-sm font-medium text-gray-600 group-hover:text-blue-500 transition-colors">1 Stop</span>
              </div>
              <span className="text-xs font-bold text-gray-400">₹4,120</span>
           </label>
        </div>
      </div>

      {/* Departure Time */}
      <div className="mb-6 border-t border-gray-100 pt-6">
        <h4 className="font-bold text-gray-800 text-sm mb-3">Departure Time</h4>
        <div className="grid grid-cols-2 gap-2">
           <button className="py-2 flex flex-col items-center justify-center gap-1 text-[10px] font-bold bg-gray-50 border border-gray-200 rounded-xl hover:border-blue-400 hover:text-blue-600 text-gray-500 transition-colors shadow-sm">
              <span className="text-sm">🌅</span> Before 6 AM
           </button>
           <button className="py-2 flex flex-col items-center justify-center gap-1 text-[10px] font-bold bg-blue-50 border border-blue-200 text-blue-600 rounded-xl transition-colors shadow-sm">
              <span className="text-sm">☀️</span> 6 AM - 12 PM
           </button>
           <button className="py-2 flex flex-col items-center justify-center gap-1 text-[10px] font-bold bg-gray-50 border border-gray-200 rounded-xl hover:border-blue-400 hover:text-blue-600 text-gray-500 transition-colors shadow-sm">
              <span className="text-sm">🌤️</span> 12 PM - 6 PM
           </button>
           <button className="py-2 flex flex-col items-center justify-center gap-1 text-[10px] font-bold bg-gray-50 border border-gray-200 rounded-xl hover:border-blue-400 hover:text-blue-600 text-gray-500 transition-colors shadow-sm">
              <span className="text-sm">🌙</span> After 6 PM
           </button>
        </div>
      </div>
      
      {/* Airlines */}
      <div className="border-t border-gray-100 pt-6">
        <h4 className="font-bold text-gray-800 text-sm mb-3">Airlines</h4>
        <div className="flex flex-col gap-3">
           {[
             { name: 'IndiGo', price: '₹3,450' },
             { name: 'Vistara', price: '₹4,200' },
             { name: 'Air India', price: '₹3,900' },
             { name: 'SpiceJet', price: '₹3,850' },
             { name: 'Akasa Air', price: '₹4,500' }
           ].map((air, idx) => (
             <label key={idx} className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-3">
                   <input type="checkbox" className="w-4 h-4 rounded text-blue-500 focus:ring-blue-500 border-gray-300" />
                   <span className="text-sm font-medium text-gray-600 group-hover:text-blue-500 transition-colors truncate">{air.name}</span>
                </div>
                <span className="text-xs font-bold text-gray-400">{air.price}</span>
             </label>
           ))}
        </div>
      </div>
    </div>
  );
};
export default FlightFilter;
