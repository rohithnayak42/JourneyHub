import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { 
  Hotel, MapPin, Star, Calendar, Users, CheckCircle2, 
  ChevronRight, ShieldCheck, Coffee, Car, Clock, Plus, Trash2, 
  Tag, Info, ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const HotelBooking = () => {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState(null);
  const [guests, setGuests] = useState([{ id: 1, title: 'Mr', firstName: '', lastName: '' }]);
  const [addons, setAddons] = useState([]);
  const [insurance, setInsurance] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(null);
  const [showGst, setShowGst] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('selectedHotelBooking');
    if (!data) {
      navigate('/hotels');
      return;
    }
    setBookingData(JSON.parse(data));
  }, [navigate]);

  const addonOptions = [
    { id: 'breakfast', name: 'Daily Breakfast', price: 500, icon: <Coffee size={16} /> },
    { id: 'extra_bed', name: 'Extra Bed', price: 1200, icon: <Users size={16} /> },
    { id: 'pickup', name: 'Airport Pickup', price: 1500, icon: <Car size={16} /> },
    { id: 'early_checkin', name: 'Early Check-in', price: 800, icon: <Clock size={16} /> }
  ];

  const calculateNights = (checkIn, checkOut) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };

  const nights = useMemo(() => {
    if (!bookingData) return 1;
    return calculateNights(bookingData.checkIn, bookingData.checkOut);
  }, [bookingData]);

  const priceSummary = useMemo(() => {
    if (!bookingData) return { base: 0, addons: 0, insurance: 0, taxes: 0, total: 0 };
    
    const base = bookingData.roomPrice * nights;
    const addonsTotal = addons.reduce((sum, id) => {
      const option = addonOptions.find(o => o.id === id);
      return sum + (option ? option.price : 0);
    }, 0);
    const insuranceCost = insurance ? 299 : 0;
    const subtotal = base + addonsTotal + insuranceCost;
    
    let discount = 0;
    if (couponApplied) {
      discount = subtotal * (couponApplied.discount / 100);
    }
    
    const taxes = Math.round((subtotal - discount) * 0.18);
    const total = subtotal - discount + taxes;
    
    return { base, addons: addonsTotal, insurance: insuranceCost, discount, taxes, total };
  }, [bookingData, nights, addons, insurance, couponApplied]);

  const handleAddGuest = () => {
    setGuests([...guests, { id: Date.now(), title: 'Mr', firstName: '', lastName: '' }]);
  };

  const handleRemoveGuest = (id) => {
    if (guests.length > 1) {
      setGuests(guests.filter(g => g.id !== id));
    }
  };

  const handleToggleAddon = (id) => {
    setAddons(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);
  };

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'JOURNEY20') {
      setCouponApplied({ code: 'JOURNEY20', discount: 20 });
    } else {
      alert('Invalid coupon code');
    }
  };

  const handlePayment = () => {
    const finalData = {
      ...bookingData,
      guests,
      addons: addons.map(id => addonOptions.find(o => o.id === id).name),
      priceSummary
    };
    localStorage.setItem('finalHotelBooking', JSON.stringify(finalData));
    navigate('/hotel/payment');
  };

  if (!bookingData) return <div className="h-screen flex items-center justify-center font-black text-indigo-600 uppercase tracking-widest">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      <Navbar />
      
      {/* Step Indicator */}
      <div className="bg-white border-b border-gray-100 py-6 mb-8">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-4">
          <div className="flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-widest">
            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center">1</span>
            Review Details
          </div>
          <ChevronRight size={14} className="text-gray-300" />
          <div className="flex items-center gap-2 text-gray-400 font-black text-[10px] uppercase tracking-widest">
            <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center">2</span>
            Secure Payment
          </div>
          <ChevronRight size={14} className="text-gray-300" />
          <div className="flex items-center gap-2 text-gray-400 font-black text-[10px] uppercase tracking-widest">
            <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center">3</span>
            Confirmation
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 flex flex-col xl:flex-row gap-8">
        
        {/* LEFT COLUMN */}
        <div className="xl:w-2/3 space-y-8">
          
          {/* Hotel Summary */}
          <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -z-0 opacity-50"></div>
            <div className="flex flex-col md:flex-row gap-6 relative z-10">
              <div className="w-full md:w-48 h-32 rounded-2xl overflow-hidden shadow-md">
                <img src={bookingData.hotelImage} className="w-full h-full object-cover" alt="Hotel" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1 mb-1">
                   {Array.from({ length: bookingData.hotelStars }).map((_, i) => (
                      <Star key={i} size={12} fill="currentColor" className="text-amber-400" />
                   ))}
                </div>
                <h2 className="text-2xl font-black text-gray-800 tracking-tight mb-2">{bookingData.hotelName}</h2>
                <p className="text-xs font-bold text-gray-400 flex items-center gap-1.5 mb-4">
                  <MapPin size={14} /> {bookingData.hotelLocation}
                </p>
                <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-50">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Check-In</span>
                    <span className="text-sm font-bold text-gray-800">{bookingData.checkIn}</span>
                  </div>
                  <div className="w-px h-8 bg-gray-100"></div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Check-Out</span>
                    <span className="text-sm font-bold text-gray-800">{bookingData.checkOut}</span>
                  </div>
                  <div className="w-px h-8 bg-gray-100"></div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Stay Duration</span>
                    <span className="text-sm font-bold text-indigo-600">{nights} Night(s)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Room Details */}
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
            <h3 className="text-lg font-black text-gray-800 uppercase tracking-widest mb-6 flex items-center gap-3">
              <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600"><CheckCircle2 size={18} /></div>
              Selected Room
            </h3>
            <div className="p-6 bg-emerald-50/50 rounded-2xl border border-emerald-100">
              <h4 className="text-xl font-black text-gray-800 mb-2">{bookingData.roomName}</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                 {bookingData.roomAmenities?.map((a, i) => (
                    <span key={i} className="text-[10px] font-bold text-emerald-700 bg-white border border-emerald-100 px-3 py-1.5 rounded-lg">{a}</span>
                 ))}
              </div>
              <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-emerald-600">
                {bookingData.roomInclusions?.map((inc, i) => (
                  <span key={i} className="flex items-center gap-1.5"><CheckCircle2 size={14}/> {inc}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Guest Details Form */}
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-lg font-black text-gray-800 uppercase tracking-widest flex items-center gap-3">
                <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600"><Users size={18} /></div>
                Guest Details
              </h3>
              <button 
                onClick={handleAddGuest}
                className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline flex items-center gap-1.5"
              >
                <Plus size={14} /> Add Guest
              </button>
            </div>

            <div className="space-y-6">
              {guests.map((guest, index) => (
                <div key={guest.id} className="p-6 border border-gray-100 rounded-2xl bg-gray-50/30 relative group">
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    {guests.length > 1 && (
                      <button onClick={() => handleRemoveGuest(guest.id)} className="text-red-400 hover:text-red-500">
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Guest {index + 1}</p>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <select className="col-span-1 bg-white border border-gray-200 rounded-xl p-3 text-sm font-bold focus:ring-2 focus:ring-indigo-100 outline-none">
                      <option>Mr</option>
                      <option>Ms</option>
                      <option>Mrs</option>
                    </select>
                    <input 
                      type="text" 
                      placeholder="First Name" 
                      className="col-span-1 md:col-span-1.5 bg-white border border-gray-200 rounded-xl p-3 text-sm font-bold focus:ring-2 focus:ring-indigo-100 outline-none"
                    />
                    <input 
                      type="text" 
                      placeholder="Last Name" 
                      className="col-span-1 md:col-span-1.5 bg-white border border-gray-200 rounded-xl p-3 text-sm font-bold focus:ring-2 focus:ring-indigo-100 outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                <input type="email" placeholder="email@example.com" className="bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-sm font-bold focus:ring-2 focus:ring-indigo-100 outline-none" />
              </div>
              <div className="flex flex-col">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Phone Number</label>
                <input type="tel" placeholder="+91 9876543210" className="bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-sm font-bold focus:ring-2 focus:ring-indigo-100 outline-none" />
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
               <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" checked={showGst} onChange={() => setShowGst(!showGst)} className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                  <span className="text-sm font-bold text-gray-600 group-hover:text-indigo-600 transition-colors">I have a GST number for tax benefits</span>
               </label>
               <AnimatePresence>
                 {showGst && (
                   <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
                        <input type="text" placeholder="Registration No" className="bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-sm font-bold outline-none border-dashed" />
                        <input type="text" placeholder="Registered Company name" className="bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-sm font-bold outline-none border-dashed" />
                      </div>
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>
          </div>

          {/* Add-ons & Insurance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
                <h3 className="text-lg font-black text-gray-800 uppercase tracking-widest mb-6 flex items-center gap-3">
                  <div className="p-2 bg-amber-50 rounded-xl text-amber-600"><Plus size={18} /></div>
                  Add-ons
                </h3>
                <div className="space-y-3">
                   {addonOptions.map(option => (
                     <label key={option.id} className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${addons.includes(option.id) ? 'bg-amber-50 border-amber-200' : 'bg-gray-50 border-gray-100 hover:bg-white hover:shadow-md'}`}>
                        <div className="flex items-center gap-3">
                           <input type="checkbox" checked={addons.includes(option.id)} onChange={() => handleToggleAddon(option.id)} className="w-4 h-4 rounded text-amber-600 outline-none focus:ring-amber-500 border-gray-300" />
                           <div className="flex flex-col">
                              <span className="text-xs font-black text-gray-700 flex items-center gap-1.5">{option.icon} {option.name}</span>
                              <span className="text-[10px] font-bold text-gray-400">Apply for all {nights} nights</span>
                           </div>
                        </div>
                        <span className="text-xs font-black text-amber-600">₹{option.price}</span>
                     </label>
                   ))}
                </div>
             </div>

             <div className="bg-indigo-600 rounded-[2rem] p-8 shadow-xl text-white relative overflow-hidden group">
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                <div className="relative z-10">
                   <h3 className="text-lg font-black uppercase tracking-widest mb-4 flex items-center gap-3 text-white">
                    <ShieldCheck size={20} /> Trip Protection
                   </h3>
                   <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold text-indigo-100">Recommended for your trip</span>
                        <span className="text-xs font-black bg-indigo-400/50 px-2 py-1 rounded-md">₹299</span>
                      </div>
                      <ul className="space-y-2 text-[10px] font-bold text-indigo-50">
                        <li className="flex items-center gap-2 text-white"><CheckCircle2 size={12}/> Medical Cover up to ₹1,00,000</li>
                        <li className="flex items-center gap-2 text-white"><CheckCircle2 size={12}/> Trip Cancellation Coverage</li>
                        <li className="flex items-center gap-2 text-white"><CheckCircle2 size={12}/> 24x7 Assistance</li>
                      </ul>
                   </div>
                   <button 
                    onClick={() => setInsurance(!insurance)}
                    className={`w-full py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${insurance ? 'bg-emerald-500 text-white border border-emerald-400' : 'bg-white text-indigo-600 hover:bg-indigo-50 shadow-lg shadow-indigo-800/20'}`}
                   >
                     {insurance ? '✓ Insurance Added' : 'Add Protection'}
                   </button>
                </div>
             </div>
          </div>
        </div>

        {/* RIGHT COLUMN - Price Summary */}
        <div className="xl:w-1/3">
           <div className="sticky top-44 space-y-6">
              
              {/* Payment Summary */}
              <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden">
                 <div className="bg-gray-800 p-6 text-white">
                    <h3 className="font-black text-sm uppercase tracking-widest flex items-center gap-2">
                       <Tag size={16} className="text-indigo-400" /> Fare Summary
                    </h3>
                 </div>
                 
                 <div className="p-8 space-y-4">
                    <div className="flex justify-between items-center text-sm">
                       <span className="font-bold text-gray-500">Base Fare ({nights} nights)</span>
                       <span className="font-black text-gray-800">₹{priceSummary.base}</span>
                    </div>
                    {priceSummary.addons > 0 && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-bold text-gray-500 flex items-center gap-1.5">Add-ons Selected <Info size={12} className="text-gray-400"/></span>
                        <span className="font-black text-emerald-600">+ ₹{priceSummary.addons}</span>
                      </div>
                    )}
                    {priceSummary.insurance > 0 && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-bold text-gray-500">Trip Protection</span>
                        <span className="font-black text-emerald-600">+ ₹{priceSummary.insurance}</span>
                      </div>
                    )}
                    {priceSummary.discount > 0 && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-bold text-emerald-600">Coupon Discount ({couponApplied.code})</span>
                        <span className="font-black text-emerald-600">- ₹{Math.round(priceSummary.discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center text-sm pt-4 border-t border-gray-50">
                       <span className="font-bold text-gray-500">Taxes & Service Fees</span>
                       <span className="font-black text-gray-800">₹{priceSummary.taxes}</span>
                    </div>
                    
                    <div className="pt-6 mt-6 border-t-2 border-dashed border-gray-100 flex justify-between items-end">
                       <div className="flex flex-col">
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Amount</span>
                          <span className="text-4xl font-black text-gray-800 tracking-tight leading-none">₹{priceSummary.total}</span>
                       </div>
                       <div className="bg-emerald-50 text-emerald-600 animate-pulse px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest">
                          Best Price
                       </div>
                    </div>

                    <button 
                      onClick={handlePayment}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-5 rounded-[1.2rem] shadow-xl shadow-indigo-500/20 transition-all uppercase tracking-[0.2em] text-[11px] mt-8 flex items-center justify-center gap-3 group"
                    >
                       Proceed to Payment <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <p className="text-[9px] font-bold text-center text-gray-400 uppercase tracking-widest mt-4">
                       By proceeding, I agree to JourneyHub's Terms & Conditions
                    </p>
                 </div>
              </div>

              {/* Coupon Section */}
              <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
                 <h4 className="font-black text-[10px] uppercase tracking-widest text-gray-400 mb-4 ml-1">Available Coupon</h4>
                 <div className="flex gap-2 p-1 bg-gray-50 rounded-2xl border border-gray-100">
                    <input 
                      type="text" 
                      placeholder="ENTER CODE" 
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      className="flex-1 bg-transparent border-none outline-none text-xs font-black p-3 tracking-widest placeholder:text-gray-300"
                    />
                    <button 
                      onClick={applyCoupon}
                      className="bg-indigo-600 text-white px-6 rounded-xl font-black text-[10px] uppercase tracking-widest"
                    >
                       Apply
                    </button>
                 </div>
                 <div className="mt-4 p-4 border border-indigo-100 rounded-2xl bg-indigo-50/50 flex items-start gap-3">
                    <div className="p-2 bg-indigo-600 text-white rounded-lg"><Tag size={12} /></div>
                    <div>
                       <p className="text-xs font-black text-indigo-600 tracking-tight">JOURNEY20</p>
                       <p className="text-[10px] font-bold text-gray-500 mt-1">Get 20% flat discount on your first booking</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default HotelBooking;
