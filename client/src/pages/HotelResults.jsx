import React, { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import HotelFilter from '../components/hotel/HotelFilter';
import HotelCard from '../components/hotel/HotelCard';
import ModifySearchButton from '../components/common/ModifySearchButton';
import { Hotel, X, MapPin } from 'lucide-react';

const HotelResults = () => {
  const dummyHotels = [
     { id: 1, name: "Taj Mahal Palace", location: "Colaba, Mumbai - 1.2km from center", rating: "4.9", reviews: 4520, stars: 5, price: 18500, image: "https://images.unsplash.com/photo-1542314831-c6a4d14d8373?auto=format&fit=crop&w=800&q=80", amenities: ['Free WiFi', 'Swimming Pool', 'Spa & Wellness', 'Free Breakfast'] },
     { id: 2, name: "The Oberoi Mumbai", location: "Nariman Point, Mumbai - 2.5km from center", rating: "4.8", reviews: 3105, stars: 5, price: 15200, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80", amenities: ['Free WiFi', 'Swimming Pool', 'Gym', 'Free Breakfast'] },
     { id: 3, name: "Trident Nariman Point", location: "Nariman Point, Mumbai - 2.6km from center", rating: "4.7", reviews: 2890, stars: 5, price: 12500, image: "https://images.unsplash.com/photo-1551882547-ff40c0d588fa?auto=format&fit=crop&w=800&q=80", amenities: ['Free WiFi', 'Gym', 'Free Breakfast'] },
     { id: 4, name: "Holiday Inn Resort", location: "Andheri East, Mumbai - 4.1km from Airport", rating: "4.5", reviews: 1840, stars: 4, price: 8500, image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80", amenities: ['Free WiFi', 'Swimming Pool', 'Pet Friendly'] },
     { id: 5, name: "Fern Residency", location: "Chembur, Mumbai - 3.2km from Airport", rating: "4.3", reviews: 920, stars: 4, price: 6200, image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80", amenities: ['Free WiFi', 'Free Breakfast'] }
  ];

  const [filters, setFilters] = useState({
     priceRanges: [],
     stars: [],
     amenities: []
  });
  const [sortOrder, setSortOrder] = useState('Recommended');
  const [showMap, setShowMap] = useState(false);

  // Filter Logic: Reads selected filters dynamically and loops through hotel cards
  const filteredHotels = useMemo(() => {
     let filtered = dummyHotels;

     if (filters.priceRanges.length > 0) {
        filtered = filtered.filter(hotel => {
            return filters.priceRanges.some(range => {
                if (range === 'Under ₹2,000') return hotel.price < 2000;
                if (range === '₹2,000 - ₹5,000') return hotel.price >= 2000 && hotel.price <= 5000;
                if (range === '₹5,000 - ₹10,000') return hotel.price > 5000 && hotel.price <= 10000;
                if (range === 'Above ₹10,000') return hotel.price > 10000;
                return false;
            });
        });
     }

     if (filters.stars.length > 0) {
        filtered = filtered.filter(hotel => filters.stars.includes(hotel.stars));
     }

     if (filters.amenities.length > 0) {
        filtered = filtered.filter(hotel => {
            return filters.amenities.every(amenity => hotel.amenities.includes(amenity));
        });
     }

     return filtered;
  }, [filters]);

  // Sort Logic: Reorder dynamically based on Sort By dropdown
  const sortedHotels = useMemo(() => {
     const sorted = [...filteredHotels];
     if (sortOrder === 'Price: Low to High') {
        sorted.sort((a, b) => a.price - b.price);
     } else if (sortOrder === 'Price: High to Low') {
        sorted.sort((a, b) => b.price - a.price);
     } else if (sortOrder === 'Guest Ratings') {
        sorted.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
     }
     return sorted;
  }, [filteredHotels, sortOrder]);

  const handleClearAll = () => {
     setFilters({ priceRanges: [], stars: [], amenities: [] });
  };


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />
      
      {/* Search Header Banner (Compact Redesign) */}
      <div className="bg-white border-b border-gray-100 py-4 sticky top-20 z-40 shadow-sm transition-all">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <ModifySearchButton />
              <div className="bg-indigo-50 p-2.5 rounded-xl border border-indigo-100">
                <Hotel className="text-indigo-600" size={20} />
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg md:text-xl font-black text-gray-800 tracking-tight flex items-center gap-2">
                   Mumbai, India
                </h1>
                <p className="text-[10px] font-black text-gray-400 mt-0.5 uppercase tracking-[0.2em] flex items-center gap-2">
                  <span>{dummyHotels.length} Hotels</span> <span className="w-1 h-1 bg-gray-300 rounded-full"></span> <span>01 Apr - 03 Apr 2026</span> <span className="w-1 h-1 bg-gray-300 rounded-full"></span> <span>2 Adults, 1 Room</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
               <button className="flex-1 md:flex-initial bg-white border border-gray-200 px-5 py-2.5 rounded-xl font-black uppercase tracking-widest text-[9px] text-gray-500 shadow-sm transition-all hover:border-indigo-200">
                  Sort: Recommended
               </button>
            </div>
         </div>
      </div>

      {/* Main Content Dashboard */}
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col xl:flex-row gap-8 w-full relative z-10">
         {/* Left Sidebar Filters */}
         <div className="xl:w-1/4 hidden xl:block">
            <div className="sticky top-44">
               <HotelFilter filters={filters} setFilters={setFilters} onClearAll={handleClearAll} />
            </div>
         </div>
         
         {/* Hotel Listings */}
         <div className="xl:w-3/4 flex flex-col gap-6">

            <div className="flex flex-col md:flex-row md:justify-between md:items-center bg-white p-4 rounded-[1.5rem] shadow-sm border border-gray-100 gap-4 mb-2">
               <h2 className="text-xl font-black text-gray-800 tracking-tight ml-2">
                  {sortedHotels.length > 0 ? `Recommended Hotels (${sortedHotels.length})` : 'No Hotels Found'}
               </h2>
               <div className="flex items-center justify-between w-full md:w-auto gap-4">
                 <button onClick={() => setShowMap(true)} className="flex items-center gap-2 border border-gray-200 text-[10px] font-black uppercase tracking-widest text-indigo-600 px-4 py-3 rounded-xl hover:bg-indigo-50 hover:border-indigo-200 transition-colors shadow-sm">
                    Show Map
                 </button>
                 <select 
                    value={sortOrder} 
                    onChange={(e) => setSortOrder(e.target.value)} 
                    className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[10px] font-black uppercase tracking-widest text-gray-600 outline-none hover:border-indigo-400 cursor-pointer shadow-sm transition-colors focus:ring-2 focus:ring-indigo-100"
                 >
                    <option value="Recommended">Sort by: Recommended</option>
                    <option value="Price: Low to High">Price: Low to High</option>
                    <option value="Price: High to Low">Price: High to Low</option>
                    <option value="Guest Ratings">Guest Ratings (High to Low)</option>
                 </select>
               </div>
            </div>
            
            <div className="flex flex-col gap-8">
               {sortedHotels.length > 0 ? (
                  sortedHotels.map((hotel) => (
                     <HotelCard key={hotel.id} hotel={hotel} />
                  ))
               ) : (
                  <div className="bg-white rounded-[2rem] p-12 text-center border border-gray-100 shadow-sm">
                     <p className="text-gray-500 font-bold mb-4">No hotels match your selected filters.</p>
                     <button onClick={handleClearAll} className="bg-indigo-600 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition">
                        Clear Filters
                     </button>
                  </div>
               )}
            </div>
         </div>
      </div>

      {/* Show Map Modal */}
      {showMap && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowMap(false)}></div>
            <div className="bg-white rounded-[2rem] w-full max-w-5xl h-[80vh] relative z-10 flex flex-col overflow-hidden shadow-2xl animate-fade-in">
               <div className="flex items-center justify-between p-6 border-b border-gray-100">
                  <h3 className="font-black text-xl text-gray-800 flex items-center gap-2"><MapPin className="text-indigo-600" /> Map View</h3>
                  <button onClick={() => setShowMap(false)} className="bg-gray-100 p-2 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors">
                     <X size={20} />
                  </button>
               </div>
               <div className="flex-1 bg-blue-50 relative flex items-center justify-center">
                  <p className="text-gray-500 font-bold flex flex-col items-center gap-2">
                     <MapPin size={48} className="text-indigo-300" />
                     Interactive Google Maps Embed Placeholder
                  </p>
                  {/* Decorative Map markers for UI effect */}
                  {sortedHotels.map((hotel, idx) => (
                     <div key={idx} className="absolute w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg border-2 border-white translate-x-[randompx] translate-y-[randompx]" style={{
                        top: `${20 + (idx * 15 % 60)}%`,
                        left: `${20 + (idx * 25 % 60)}%`
                     }}>
                        <MapPin size={16} />
                     </div>
                  ))}
               </div>
            </div>
         </div>
      )}
    </div>
  );
};

export default HotelResults;

