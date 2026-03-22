import React from 'react';
import { FaBus, FaTrain, FaPlane, FaHotel } from 'react-icons/fa';

const NavbarTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'bus', label: 'Bus', icon: FaBus },
    { id: 'train', label: 'Train', icon: FaTrain },
    { id: 'flight', label: 'Flight', icon: FaPlane },
    { id: 'hotel', label: 'Hotel', icon: FaHotel },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-md border border-gray-100 px-4 py-2 relative z-30 flex justify-center">
      <div className="flex justify-between md:justify-center w-full md:gap-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center gap-1.5 py-3 px-4 transition-all duration-300 relative group cursor-pointer ${
                isActive ? 'text-red-500' : 'text-gray-500 hover:text-red-400'
              }`}
            >
              <span className={`transition-transform duration-300 ${isActive ? 'scale-110 drop-shadow-sm' : 'group-hover:scale-110'}`}>
                 <Icon size={24} />
              </span>
              <span className={`text-xs md:text-sm font-bold transition-colors`}>
                {tab.label}
              </span>
              
              {/* Active Underline Indicator */}
              <div 
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[3px] rounded-t-lg transition-all duration-300 origin-center ${
                  isActive ? 'bg-red-500 scale-x-100' : 'bg-transparent scale-x-0'
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default NavbarTabs;
