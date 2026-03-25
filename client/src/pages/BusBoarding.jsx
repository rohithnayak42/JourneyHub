import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ArrowLeft, MapPin, Navigation } from 'lucide-react';

const BusBoarding = () => {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState(null);
  const [selectedBoarding, setSelectedBoarding] = useState('');
  const [selectedDropping, setSelectedDropping] = useState('');

  useEffect(() => {
    const data = localStorage.getItem('busBookingData');
    if (data) {
      setBookingData(JSON.parse(data));
    } else {
      navigate('/buses'); // redirect if no data
    }
  }, [navigate]);

  if (!bookingData) return null; // or loading spinner

  const isFormValid = selectedBoarding !== '' && selectedDropping !== '';

  const handleProceed = () => {
    if (!isFormValid) return;
    
    const updatedData = {
      ...bookingData,
      boardingPoint: selectedBoarding,
      droppingPoint: selectedDropping
    };
    localStorage.setItem('busBookingData', JSON.stringify(updatedData));
    navigate('/bus/payment');
  };

  // Mock data for Boarding and Dropping points
  const boardingPoints = [
    { id: 'b1', name: 'Kashmere Gate ISBT', time: '21:30' },
    { id: 'b2', name: 'Anand Vihar', time: '22:15' },
    { id: 'b3', name: 'Majnu Ka Tila', time: '22:45' }
  ];

  const droppingPoints = [
    { id: 'd1', name: 'Manali Private Bus Stand', time: '08:30' },
    { id: 'd2', name: 'Patlikuhl', time: '09:00' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />

      <div className="bg-gray-900 pt-8 pb-16 px-4 relative">
         <div className="max-w-7xl mx-auto flex items-center gap-6">
            <button 
               onClick={() => navigate(-1)} 
               className="p-2 hover:bg-gray-800 rounded-full transition-colors text-gray-400 hover:text-white"
            >
               <ArrowLeft size={24} />
            </button>
            <div className="flex flex-col flex-1">
               <h1 className="text-2xl font-black text-white tracking-tight">{bookingData.busName}</h1>
               <p className="text-xs font-black text-gray-400 uppercase tracking-widest mt-1">
               {bookingData.from} → {bookingData.to} • {bookingData.time} • {bookingData.busType}
               </p>
            </div>
         </div>
         
         {/* Stepper */}
         <div className="max-w-3xl mx-auto mt-8 relative z-10 w-full overflow-hidden">
            <div className="flex items-center gap-2">
               <div className="flex items-center gap-2 text-white">
                  <span className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-black bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]">✓</span>
                  <span className="text-sm font-bold uppercase tracking-widest hidden md:block">Seats & Passengers</span>
               </div>
               <div className="flex-1 h-[2px] bg-emerald-500 mx-4"></div>
               <div className="flex items-center gap-2 text-white">
                  <span className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-black bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]">2</span>
                  <span className="text-sm font-bold uppercase tracking-widest hidden md:block">Boarding</span>
               </div>
               <div className="flex-1 h-[2px] bg-gray-700 mx-4"></div>
               <div className="flex items-center gap-2 text-gray-500">
                  <span className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-black bg-gray-800 border border-gray-700">3</span>
                  <span className="text-sm font-bold uppercase tracking-widest hidden md:block">Payment</span>
               </div>
            </div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 w-full flex flex-col lg:flex-row gap-8 relative z-20 -mt-10 mb-16 flex-1">
        
        {/* Left Side: Boarding & Dropping Points */}
        <div className="flex-[1.5] flex flex-col gap-6">
           <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 relative overflow-hidden">
               <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
                     <Navigation size={20} />
                  </div>
                  <h2 className="text-xl font-black text-gray-800 tracking-tight">Select Boarding Point</h2>
               </div>
               
               <div className="flex flex-col gap-3">
                  {boardingPoints.map(point => (
                     <label 
                        key={point.id} 
                        className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedBoarding === point.name ? 'border-orange-500 bg-orange-50/30' : 'border-gray-100 hover:border-orange-200 hover:bg-gray-50'}`}
                     >
                        <input 
                           type="radio" 
                           name="boarding" 
                           value={point.name} 
                           className="hidden" 
                           checked={selectedBoarding === point.name} 
                           onChange={() => setSelectedBoarding(point.name)} 
                        />
                        <div className="flex items-center gap-4">
                           <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedBoarding === point.name ? 'border-orange-500' : 'border-gray-300'}`}>
                              {selectedBoarding === point.name && <div className="w-2.5 h-2.5 rounded-full bg-orange-500"></div>}
                           </div>
                           <div>
                              <p className="font-bold text-gray-800">{point.name}</p>
                              <p className="text-xs font-bold text-gray-500 mt-1">{bookingData.from}</p>
                           </div>
                        </div>
                        <span className="font-black text-orange-600 bg-orange-100 px-3 py-1.5 rounded-lg shadow-sm">{point.time}</span>
                     </label>
                  ))}
               </div>
           </div>

           <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 relative overflow-hidden">
               <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                     <MapPin size={20} />
                  </div>
                  <h2 className="text-xl font-black text-gray-800 tracking-tight">Select Dropping Point</h2>
               </div>
               
               <div className="flex flex-col gap-3">
                  {droppingPoints.map(point => (
                     <label 
                        key={point.id} 
                        className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedDropping === point.name ? 'border-blue-500 bg-blue-50/30' : 'border-gray-100 hover:border-blue-200 hover:bg-gray-50'}`}
                     >
                        <input 
                           type="radio" 
                           name="dropping" 
                           value={point.name} 
                           className="hidden" 
                           checked={selectedDropping === point.name} 
                           onChange={() => setSelectedDropping(point.name)} 
                        />
                        <div className="flex items-center gap-4">
                           <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedDropping === point.name ? 'border-blue-500' : 'border-gray-300'}`}>
                              {selectedDropping === point.name && <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>}
                           </div>
                           <div>
                              <p className="font-bold text-gray-800">{point.name}</p>
                              <p className="text-xs font-bold text-gray-500 mt-1">{bookingData.to}</p>
                           </div>
                        </div>
                        <span className="font-black text-blue-600 bg-blue-100 px-3 py-1.5 rounded-lg shadow-sm">{point.time}</span>
                     </label>
                  ))}
               </div>
           </div>
        </div>

        {/* Right Side: Summary Component */}
        <div className="flex-[1] xl:max-w-[450px] flex flex-col gap-6">
           <div className="bg-white rounded-[2rem] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-gray-100 flex-1 flex flex-col">
              <h4 className="font-black text-lg text-gray-800 mb-6 border-b border-gray-100 pb-4">Booking Summary</h4>
              
              <div className="flex flex-col gap-4 mb-6">
                 {bookingData.passengers.map((p, index) => (
                    <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs">👤</div>
                          <div>
                             <p className="font-bold text-gray-800 text-sm">{p.name}</p>
                             <p className="text-xs text-gray-500">{p.age} yrs • {p.gender}</p>
                          </div>
                       </div>
                       <span className="font-black text-xs text-red-500 uppercase bg-red-50 border border-red-100 px-2 py-1 rounded">Seat {p.seat}</span>
                    </div>
                 ))}
              </div>

              <div className="mt-auto pt-6 border-t border-gray-100">
                 <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Selected Seats</span>
                    <span className="text-sm font-black text-gray-800 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-2">
                       {bookingData.selectedSeats.length > 0 ? bookingData.selectedSeats.join(', ') : 'None'}
                    </span>
                 </div>
                 <div className="flex justify-between items-end mb-8">
                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Total Amount</span>
                    <span className="text-4xl font-black text-gray-800 tracking-tight">₹{bookingData.totalAmount}</span>
                 </div>
                 <button 
                    onClick={handleProceed}
                    className={`w-full py-4.5 rounded-xl font-black text-white uppercase tracking-widest shadow-lg transition-all flex items-center justify-center gap-2 relative overflow-hidden group btn-shine ${isFormValid ? 'bg-gray-900 hover:bg-black hover:-translate-y-1 hover:shadow-2xl hover:shadow-gray-900/40' : 'bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-300 shadow-none'}`}
                    disabled={!isFormValid}
                 >
                    {isFormValid ? 'Continue to Payment' : 'Select Boarding Points'} 
                    {isFormValid && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="m9 18 6-6-6-6"/></svg>}
                    {isFormValid && <span className="absolute inset-0 w-full h-full -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shine_1.5s_ease-in-out_infinite]"></span>}
                 </button>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default BusBoarding;
