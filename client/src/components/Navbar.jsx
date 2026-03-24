import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, LogOut, Menu, X, Search, History, Briefcase } from 'lucide-react';
import NotificationBell from './common/NotificationBell';
import { FaBus, FaTrain, FaPlane, FaHotel } from 'react-icons/fa';

const Navbar = ({ activeTab, setActiveTab }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMenuOpen(false);
  };

  const tabs = [
    { id: 'bus', label: 'Bus', icon: FaBus },
    { id: 'train', label: 'Train', icon: FaTrain },
    { id: 'flight', label: 'Flight', icon: FaPlane },
    { id: 'hotel', label: 'Hotel', icon: FaHotel },
  ];

  const handleTabClick = (tabId) => {
     if (setActiveTab) {
       setActiveTab(tabId);
     }
     // Always update the URL search params so the state is persistent on refresh
     navigate('/?tab=' + tabId);
  };

  return (
    <nav className="bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* LEFT: Logo */}
          <Link to="/" className="flex items-center space-x-2 shrink-0">
            <div className="bg-red-500 p-1.5 rounded-lg shadow-sm transition-transform hover:scale-105">
              <span className="text-white font-black text-xl italic tracking-tighter">JH</span>
            </div>
            <span className="font-black text-xl text-gray-800 tracking-tight hidden sm:block">JourneyHub</span>
          </Link>

          {/* CENTER: Navigation Tabs (Hidden on Mobile, Visible on Tablet/Desktop) */}
          <div className="hidden md:flex items-center justify-center flex-1 px-4 lg:px-8 gap-4 md:gap-6 lg:gap-10">
             {tabs.map((tab) => {
               const Icon = tab.icon;
               const isActive = activeTab === tab.id;
               
               return (
                 <button
                   key={tab.id}
                   onClick={() => handleTabClick(tab.id)}
                   className={`flex flex-col items-center justify-center py-2 px-2 lg:px-4 transition-all duration-300 relative group cursor-pointer ${
                     isActive ? 'text-red-500' : 'text-gray-500 hover:text-red-400'
                   }`}
                 >
                   <span className={`transition-transform duration-300 ${isActive ? 'scale-110 drop-shadow-sm' : 'group-hover:scale-110'}`}>
                      <Icon className="text-xl lg:text-2xl" />
                   </span>
                   <span className={`text-[10px] lg:text-xs font-bold mt-1 transition-colors`}>
                     {tab.label}
                   </span>
                   
                   {/* Active Underline Indicator */}
                   <div 
                     className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-[3px] rounded-t-lg transition-all duration-300 origin-center ${
                       isActive ? 'bg-red-500 scale-x-100' : 'bg-transparent scale-x-0'
                     }`}
                   />
                 </button>
               );
             })}
          </div>

          {/* RIGHT: Actions (Hidden on Mobile) */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6 shrink-0 text-sm">
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-red-500 font-bold flex items-center gap-1.5 transition-colors">
                  <History size={18} />
                  <span className="hidden lg:inline">My Bookings</span>
                </Link>
                <NotificationBell />
                <div className="relative group">
                  <button className="flex items-center gap-3 bg-white hover:bg-gray-50 px-3 lg:px-4 py-2 rounded-full border border-gray-200 hover:border-red-200 hover:shadow-md transition-all duration-300">
                    <div className="bg-red-50 p-1.5 rounded-full text-red-500 border border-red-100 shadow-sm">
                      <User size={16} />
                    </div>
                    <span className="font-bold text-gray-700 max-w-[80px] lg:max-w-[100px] truncate">{user.name}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                    <div className="p-2">
                       <button 
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-2 px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-bold"
                      >
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-4 lg:gap-6">
                <Link to="/login" className="text-gray-600 font-bold hover:text-red-500 transition-colors px-2 py-1">
                  Login
                </Link>
                <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-6 lg:px-8 py-2.5 rounded-full font-bold transition-all shadow-[0_4px_12px_rgba(37,99,235,0.25)] hover:shadow-lg hover:-translate-y-0.5">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button (Hamburger) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-600 hover:text-red-500 focus:outline-none transition-colors"
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU (Slides from Top) */}
      <div 
         className={`md:hidden absolute top-20 left-0 w-full bg-white border-t border-gray-100 shadow-xl overflow-hidden transition-all duration-300 ease-in-out origin-top ${menuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="px-4 py-6 space-y-2">
          
          {/* Mobile Navigation Tabs */}
          <div className="flex justify-between border-b border-gray-50 pb-6 mb-4">
             {tabs.map(tab => (
                <button 
                  key={tab.id} 
                  onClick={() => { handleTabClick(tab.id); setMenuOpen(false); }} 
                  className={`flex flex-col items-center gap-1.5 p-2 transition-all ${activeTab === tab.id ? 'text-red-500 scale-105 drop-shadow-sm' : 'text-gray-500 hover:text-red-400'}`}
                >
                   <tab.icon size={22} />
                   <span className="text-[10px] font-bold">{tab.label}</span>
                </button>
             ))}
          </div>
          
          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="block px-3 py-3 text-gray-700 font-bold border-b border-gray-50 flex items-center gap-2 hover:text-red-500 transition-colors"><Briefcase size={18}/> My Bookings</Link>
              <div className="px-3 py-4 flex items-center space-x-3 border-b border-gray-50">
                <div className="bg-red-50 p-2 rounded-full text-red-500 border border-red-100">
                  <User size={20} />
                </div>
                <span className="font-black text-gray-800">{user.name}</span>
                <div className="ml-auto"><NotificationBell /></div>
              </div>
              <button 
                onClick={handleLogout}
                className="w-full text-left px-3 py-4 text-red-600 font-black flex items-center space-x-2 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <div className="pt-4 space-y-4 px-2">
              <Link to="/login" onClick={() => setMenuOpen(false)} className="block w-full text-center py-3 bg-gray-50 border border-gray-200 rounded-xl font-black text-gray-700 shadow-sm hover:bg-gray-100 transition-colors">Login</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="block w-full text-center py-3 bg-blue-600 text-white rounded-xl font-black shadow-md hover:bg-blue-700 transition-colors">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
