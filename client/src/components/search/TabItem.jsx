import React from 'react';

const TabItem = ({ icon: Icon, label, isActive, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 cursor-pointer transition-all duration-300 pb-2 px-4 border-b-2 ${
        isActive 
          ? 'border-blue-600 text-blue-600' 
          : 'border-transparent text-gray-500 hover:text-blue-500 hover:border-gray-200'
      }`}
    >
      <Icon size={24} className={isActive ? "scale-110 transition-transform" : "scale-100 transition-transform"} />
      <span className="text-xs font-black uppercase tracking-widest">{label}</span>
    </div>
  );
};

export default TabItem;
