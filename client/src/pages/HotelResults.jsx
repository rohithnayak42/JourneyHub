import React from 'react';
import Navbar from '../components/Navbar';
import HotelFilter from '../components/hotel/HotelFilter';
import HotelCard from '../components/hotel/HotelCard';

const HotelResults = () => {
  const dummyHotels = [
     { id: 1, name: "Taj Mahal Palace", location: "Colaba, Mumbai - 1.2km from center", rating: "4.9", reviews: 4520, stars: 5, price: 18500, image: "https://images.unsplash.com/photo-1542314831-c6a4d14d8373?auto=format&fit=crop&w=800&q=80" },
     { id: 2, name: "The Oberoi Mumbai", location: "Nariman Point, Mumbai - 2.5km from center", rating: "4.8", reviews: 3105, stars: 5, price: 15200, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80" },
     { id: 3, name: "Trident Nariman Point", location: "Nariman Point, Mumbai - 2.6km from center", rating: "4.7", reviews: 2890, stars: 5, price: 12500, image: "https://images.unsplash.com/photo-1551882547-ff40c0d588fa?auto=format&fit=crop&w=800&q=80" },
     { id: 4, name: "Holiday Inn Resort", location: "Andheri East, Mumbai - 4.1km from Airport", rating: "4.5", reviews: 1840, stars: 4, price: 8500, image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80" },
     { id: 5, name: "Fern Residency", location: "Chembur, Mumbai - 3.2km from Airport", rating: "4.3", reviews: 920, stars: 4, price: 6200, image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80" }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
      <Navbar />
      
      {/* Search Header Banner */}
      <div className="bg-indigo-900 pt-24 pb-16 px-4 shadow-[0_10px_30px_rgba(49,46,129,0.3)] sticky top-0 z-40 relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-20 mix-blend-luminosity"></div>
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-white relative z-10">
            <div>
               <h1 className="text-4xl md:text-5xl font-black drop-shadow-[0_4px_10px_rgba(0,0,0,0.4)] tracking-tight">Mumbai, India</h1>
               <p className="text-[11px] font-black text-indigo-100 mt-3 uppercase tracking-[0.3em] drop-shadow-sm flex items-center flex-wrap gap-2">
                 <span>Showing {dummyHotels.length} Hotels</span> <span className="w-1 h-1 bg-indigo-400 rounded-full hidden md:block"></span> <span>01 Apr - 03 Apr 2026</span> <span className="w-1 h-1 bg-indigo-400 rounded-full hidden md:block"></span> <span>2 Adults, 1 Room</span>
               </p>
            </div>
            <button className="mt-6 md:mt-0 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all shadow-md hover:shadow-xl hover:-translate-y-1">
               Modify Search
            </button>
         </div>
      </div>

      {/* Main Content Dashboard */}
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col xl:flex-row gap-8 w-full relative z-10 -mt-10">
         {/* Left Sidebar Filters */}
         <div className="xl:w-1/4 hidden xl:block">
            <div className="sticky top-32">
               <HotelFilter />
            </div>
         </div>
         
         {/* Hotel Listings */}
         <div className="xl:w-3/4 flex flex-col gap-6">

            <div className="flex flex-col md:flex-row md:justify-between md:items-center bg-white p-4 rounded-[1.5rem] shadow-sm border border-gray-100 gap-4 mb-2">
               <h2 className="text-xl font-black text-gray-800 tracking-tight ml-2">Recommended Hotels</h2>
               <div className="flex items-center justify-between w-full md:w-auto gap-4">
                 <button className="flex items-center gap-2 border border-gray-200 text-[10px] font-black uppercase tracking-widest text-indigo-600 px-4 py-3 rounded-xl hover:bg-indigo-50 hover:border-indigo-200 transition-colors shadow-sm">
                    Show Map
                 </button>
                 <select className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[10px] font-black uppercase tracking-widest text-gray-600 outline-none hover:border-indigo-400 cursor-pointer shadow-sm transition-colors focus:ring-2 focus:ring-indigo-100">
                    <option>Sort by: Recommended</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Guest Ratings</option>
                 </select>
               </div>
            </div>
            
            <div className="flex flex-col gap-8">
               {dummyHotels.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} />
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default HotelResults;
