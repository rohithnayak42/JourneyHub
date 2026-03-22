import React from 'react';
import { Star } from 'lucide-react';

const HotelFilter = () => {
  return (
    <div className="w-full bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-black text-gray-800 text-lg uppercase tracking-widest">Filters</h3>
        <span className="text-[10px] font-bold text-indigo-500 cursor-pointer hover:underline uppercase tracking-widest">Clear All</span>
      </div>
      
      {/* Price Range */}
      <div className="mb-8">
        <h4 className="font-bold text-gray-800 text-sm mb-4">Price per night</h4>
        <div className="flex flex-col gap-3">
           <label className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-3">
                 <input type="checkbox" className="w-4 h-4 rounded text-indigo-500 focus:ring-indigo-500 border-gray-300" />
                 <span className="text-sm font-medium text-gray-600 group-hover:text-indigo-500 transition-colors">Under ₹2,000</span>
              </div>
           </label>
           <label className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-3">
                 <input type="checkbox" className="w-4 h-4 rounded text-indigo-500 focus:ring-indigo-500 border-gray-300" defaultChecked />
                 <span className="text-sm font-medium text-gray-600 group-hover:text-indigo-500 transition-colors">₹2,000 - ₹5,000</span>
              </div>
           </label>
           <label className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-3">
                 <input type="checkbox" className="w-4 h-4 rounded text-indigo-500 focus:ring-indigo-500 border-gray-300" />
                 <span className="text-sm font-medium text-gray-600 group-hover:text-indigo-500 transition-colors">₹5,000 - ₹10,000</span>
              </div>
           </label>
           <label className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-3">
                 <input type="checkbox" className="w-4 h-4 rounded text-indigo-500 focus:ring-indigo-500 border-gray-300" />
                 <span className="text-sm font-medium text-gray-600 group-hover:text-indigo-500 transition-colors">Above ₹10,000</span>
              </div>
           </label>
        </div>
      </div>

      {/* Star Category */}
      <div className="mb-8 border-t border-gray-100 pt-6">
        <h4 className="font-bold text-gray-800 text-sm mb-4">Star Category</h4>
        <div className="grid grid-cols-5 gap-2">
           {[5, 4, 3, 2, 1].map(star => (
             <button key={star} className={`py-2 flex flex-col items-center justify-center gap-1 text-[10px] font-bold rounded-xl transition-colors shadow-sm ${star >= 4 ? 'bg-indigo-50 border border-indigo-200 text-indigo-600' : 'bg-gray-50 border border-gray-200 hover:border-indigo-400 hover:text-indigo-600 text-gray-500'}`}>
                <div className="flex items-center text-amber-400"><Star size={12} fill="currentColor" /></div>
                <span>{star} Star</span>
             </button>
           ))}
        </div>
      </div>
      
      {/* Amenities */}
      <div className="border-t border-gray-100 pt-6">
        <h4 className="font-bold text-gray-800 text-sm mb-4">Popular Amenities</h4>
        <div className="flex flex-col gap-3">
           {['Free Breakfast', 'Swimming Pool', 'Spa & Wellness', 'Free WiFi', 'Gym', 'Pet Friendly'].map((amenity, idx) => (
             <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded text-indigo-500 focus:ring-indigo-500 border-gray-300" />
                <span className="text-sm font-medium text-gray-600 group-hover:text-indigo-500 transition-colors">{amenity}</span>
             </label>
           ))}
        </div>
      </div>
    </div>
  );
};
export default HotelFilter;
