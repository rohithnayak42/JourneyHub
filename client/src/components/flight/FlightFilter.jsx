import React from 'react';

const STOP_OPTIONS = [
  { value: 'nonstop', label: 'Non Stop', price: '₹3,450' },
  { value: '1stop',   label: '1 Stop',   price: '₹3,900' },
];

const DEP_SLOTS = [
  { value: 'before6', label: 'Before 6 AM', icon: '🌅' },
  { value: '6to12',   label: '6 AM - 12 PM', icon: '☀️' },
  { value: '12to18',  label: '12 PM - 6 PM', icon: '🌤️' },
  { value: 'after18', label: 'After 6 PM',   icon: '🌙' },
];

const AIRLINES = [
  { name: 'IndiGo',    price: '₹3,450' },
  { name: 'Vistara',   price: '₹4,200' },
  { name: 'Air India', price: '₹3,900' },
  { name: 'SpiceJet',  price: '₹3,850' },
  { name: 'Akasa Air', price: '₹4,500' },
];

const FlightFilter = ({ filters, onToggleStop, onToggleDepSlot, onToggleAirline }) => {
  return (
    <div className="w-full bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100">
      <h3 className="font-black text-gray-800 text-lg mb-4 uppercase tracking-widest">Filters</h3>

      {/* ── Stops ─────────────────────────────────────────────── */}
      <div className="mb-6">
        <h4 className="font-bold text-gray-800 text-sm mb-3">Stops From Delhi</h4>
        <div className="flex flex-col gap-2">
          {STOP_OPTIONS.map((opt) => (
            <label key={opt.value} className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded text-blue-500 focus:ring-blue-500 border-gray-300"
                  checked={filters.stops.has(opt.value)}
                  onChange={() => onToggleStop(opt.value)}
                />
                <span className="text-sm font-medium text-gray-600 group-hover:text-blue-500 transition-colors">{opt.label}</span>
              </div>
              <span className="text-xs font-bold text-gray-400">{opt.price}</span>
            </label>
          ))}
        </div>
      </div>

      {/* ── Departure Time ────────────────────────────────────── */}
      <div className="mb-6 border-t border-gray-100 pt-6">
        <h4 className="font-bold text-gray-800 text-sm mb-3">Departure Time</h4>
        <div className="grid grid-cols-2 gap-2">
          {DEP_SLOTS.map((slot) => {
            const isActive = filters.depSlots.has(slot.value);
            return (
              <button
                key={slot.value}
                onClick={() => onToggleDepSlot(slot.value)}
                className={`py-2 flex flex-col items-center justify-center gap-1 text-[10px] font-bold rounded-xl transition-colors shadow-sm ${
                  isActive
                    ? 'bg-blue-50 border border-blue-200 text-blue-600'
                    : 'bg-gray-50 border border-gray-200 hover:border-blue-400 hover:text-blue-600 text-gray-500'
                }`}
              >
                <span className="text-sm">{slot.icon}</span> {slot.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Airlines ──────────────────────────────────────────── */}
      <div className="border-t border-gray-100 pt-6">
        <h4 className="font-bold text-gray-800 text-sm mb-3">Airlines</h4>
        <div className="flex flex-col gap-3">
          {AIRLINES.map((air) => (
            <label key={air.name} className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded text-blue-500 focus:ring-blue-500 border-gray-300"
                  checked={filters.airlines.has(air.name)}
                  onChange={() => onToggleAirline(air.name)}
                />
                <span className="text-sm font-medium text-gray-600 group-hover:text-blue-500 transition-colors truncate">{air.name}</span>
              </div>
              <span className="text-xs font-bold text-gray-400">{air.price}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlightFilter;
