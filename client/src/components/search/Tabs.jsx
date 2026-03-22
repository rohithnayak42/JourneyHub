import React from 'react';
import TabItem from './TabItem';
import { Bus, Train, Plane, Hotel } from 'lucide-react';

const Tabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'bus', label: 'Bus', icon: Bus },
    { id: 'train', label: 'Train', icon: Train },
    { id: 'flight', label: 'Flight', icon: Plane },
    { id: 'hotel', label: 'Hotel', icon: Hotel },
  ];

  return (
    <div className="flex justify-around items-center bg-white rounded-2xl shadow-md p-4 max-w-3xl mx-auto mb-6 relative z-30">
      {tabs.map((tab) => (
        <TabItem 
          key={tab.id}
          icon={tab.icon}
          label={tab.label}
          isActive={activeTab === tab.id}
          onClick={() => onTabChange(tab.id)}
        />
      ))}
    </div>
  );
};

export default Tabs;
