import React from 'react';

const ToggleSwitch = ({ label, enabled, onChange }) => {
  return (
    <div className="flex items-center gap-4 px-6 border-l border-gray-100">
      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-tight w-24">
        {label}
      </span>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
          enabled ? 'bg-primary' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
};

export default ToggleSwitch;
