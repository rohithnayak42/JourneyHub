import React from 'react';

const BusFilter = () => {
  return (
    <div className="w-full bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100">
      <h3 className="font-black text-gray-800 text-lg mb-4 uppercase tracking-widest">Filters</h3>
      
      <div className="mb-6">
        <h4 className="font-bold text-gray-800 text-sm mb-3">Bus Type</h4>
        <div className="flex flex-col gap-2">
           <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded text-red-500 focus:ring-red-500 border-gray-300" defaultChecked />
              <span className="text-sm font-medium text-gray-600 group-hover:text-red-500 transition-colors">A/C Sleeper</span>
           </label>
           <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded text-red-500 focus:ring-red-500 border-gray-300" />
              <span className="text-sm font-medium text-gray-600 group-hover:text-red-500 transition-colors">Non-A/C Sleeper</span>
           </label>
           <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded text-red-500 focus:ring-red-500 border-gray-300" defaultChecked />
              <span className="text-sm font-medium text-gray-600 group-hover:text-red-500 transition-colors">A/C Seater</span>
           </label>
        </div>
      </div>

      <div className="mb-6 border-t border-gray-100 pt-6">
        <h4 className="font-bold text-gray-800 text-sm mb-3">Departure Time</h4>
        <div className="grid grid-cols-2 gap-2">
           <button className="py-2 text-[11px] font-bold bg-gray-50 border border-gray-200 rounded-lg hover:border-red-400 hover:text-red-500 transition-colors">Before 6 AM</button>
           <button className="py-2 text-[11px] font-bold bg-red-50 border border-red-200 text-red-600 rounded-lg transition-colors shadow-sm">6 AM - 12 PM</button>
           <button className="py-2 text-[11px] font-bold bg-gray-50 border border-gray-200 rounded-lg hover:border-red-400 hover:text-red-500 transition-colors">12 PM - 6 PM</button>
           <button className="py-2 text-[11px] font-bold bg-gray-50 border border-gray-200 rounded-lg hover:border-red-400 hover:text-red-500 transition-colors">After 6 PM</button>
        </div>
      </div>
      
      <div className="border-t border-gray-100 pt-6">
        <h4 className="font-bold text-gray-800 text-sm mb-3">Boarding Points</h4>
        <input type="text" placeholder="Search boarding point" className="w-full text-sm font-medium bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-4 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all" />
        <div className="flex flex-col gap-3 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
           {['Kashmere Gate', 'Anand Vihar', 'Dhaula Kuan', 'Majnu Ka Tila'].map((point, idx) => (
             <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded text-red-500 focus:ring-red-500 border-gray-300" />
                <span className="text-sm font-medium text-gray-600 group-hover:text-red-500 transition-colors truncate">{point}</span>
             </label>
           ))}
        </div>
      </div>
    </div>
  );
};

export default BusFilter;
