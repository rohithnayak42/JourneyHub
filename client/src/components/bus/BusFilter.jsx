import React, { useState } from 'react';

const BusFilter = ({ filters, onFilterChange, onBoardingToggle }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const allBoardingPoints = ['Kashmere Gate', 'Anand Vihar', 'Dhaula Kuan', 'Majnu Ka Tila'];
  
  const filteredBoardingPoints = allBoardingPoints.filter(p => p.toLowerCase().includes(searchTerm.toLowerCase()));
  return (
    <div className="w-full bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100">
      <h3 className="font-black text-gray-800 text-lg mb-4 uppercase tracking-widest">Filters</h3>
      
      <div className="mb-6">
        <h4 className="font-bold text-gray-800 text-sm mb-3">Bus Type</h4>
        <div className="flex flex-col gap-2">
           <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" checked={filters.acSleeper} onChange={(e) => onFilterChange('acSleeper', e.target.checked)} className="w-4 h-4 rounded text-red-500 focus:ring-red-500 border-gray-300" />
              <span className="text-sm font-medium text-gray-600 group-hover:text-red-500 transition-colors">A/C Sleeper</span>
           </label>
           <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" checked={filters.nonAcSleeper} onChange={(e) => onFilterChange('nonAcSleeper', e.target.checked)} className="w-4 h-4 rounded text-red-500 focus:ring-red-500 border-gray-300" />
              <span className="text-sm font-medium text-gray-600 group-hover:text-red-500 transition-colors">Non-A/C Sleeper</span>
           </label>
           <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" checked={filters.acSeater} onChange={(e) => onFilterChange('acSeater', e.target.checked)} className="w-4 h-4 rounded text-red-500 focus:ring-red-500 border-gray-300" />
              <span className="text-sm font-medium text-gray-600 group-hover:text-red-500 transition-colors">A/C Seater</span>
           </label>
        </div>
      </div>

      <div className="mb-6 border-t border-gray-100 pt-6">
        <h4 className="font-bold text-gray-800 text-sm mb-3">Departure Time</h4>
        <div className="grid grid-cols-2 gap-2">
           <button onClick={() => onFilterChange('timeBefore6AM', !filters.timeBefore6AM)} className={`py-2 text-[11px] font-bold border rounded-lg hover:border-red-400 hover:text-red-500 transition-colors ${filters.timeBefore6AM ? 'bg-red-50 border-red-200 text-red-600 shadow-sm' : 'bg-gray-50 border-gray-200'}`}>Before 6 AM</button>
           <button onClick={() => onFilterChange('time6AMto12PM', !filters.time6AMto12PM)} className={`py-2 text-[11px] font-bold border rounded-lg hover:border-red-400 hover:text-red-500 transition-colors ${filters.time6AMto12PM ? 'bg-red-50 border-red-200 text-red-600 shadow-sm' : 'bg-gray-50 border-gray-200'}`}>6 AM - 12 PM</button>
           <button onClick={() => onFilterChange('time12PMto6PM', !filters.time12PMto6PM)} className={`py-2 text-[11px] font-bold border rounded-lg hover:border-red-400 hover:text-red-500 transition-colors ${filters.time12PMto6PM ? 'bg-red-50 border-red-200 text-red-600 shadow-sm' : 'bg-gray-50 border-gray-200'}`}>12 PM - 6 PM</button>
           <button onClick={() => onFilterChange('timeAfter6PM', !filters.timeAfter6PM)} className={`py-2 text-[11px] font-bold border rounded-lg hover:border-red-400 hover:text-red-500 transition-colors ${filters.timeAfter6PM ? 'bg-red-50 border-red-200 text-red-600 shadow-sm' : 'bg-gray-50 border-gray-200'}`}>After 6 PM</button>
        </div>
      </div>
      
      <div className="border-t border-gray-100 pt-6">
        <h4 className="font-bold text-gray-800 text-sm mb-3">Boarding Points</h4>
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search boarding point" className="w-full text-sm font-medium bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-4 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all" />
        <div className="flex flex-col gap-3 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
           {filteredBoardingPoints.length > 0 ? filteredBoardingPoints.map((point, idx) => (
             <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={filters.boardingPoints.includes(point)}
                  onChange={() => onBoardingToggle(point)}
                  className="w-4 h-4 rounded text-red-500 focus:ring-red-500 border-gray-300" 
                />
                <span className="text-sm font-medium text-gray-600 group-hover:text-red-500 transition-colors truncate">{point}</span>
             </label>
           )) : (
              <span className="text-sm text-gray-500">No matching points.</span>
           )}
        </div>
      </div>
    </div>
  );
};

export default BusFilter;
