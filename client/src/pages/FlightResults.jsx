import React, { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import FlightFilter from '../components/flight/FlightFilter';
import FareCalendar from '../components/flight/FareCalendar';
import FlightCard from '../components/flight/FlightCard';
import ModifySearchButton from '../components/common/ModifySearchButton';
import { Plane } from 'lucide-react';

// ─── Raw flight data ────────────────────────────────────────────────────────
const ALL_FLIGHTS = [
  { id: 1, airline: "IndiGo",    flightNo: "6E-2054", departure: "06:00", arrival: "08:15", origin: "DEL", dest: "BOM", duration: "2h 15m", stops: "Non Stop",      price: 3450, baggage: "15 Kg", refundable: "Partially Refundable" },
  { id: 2, airline: "Vistara",   flightNo: "UK-993",  departure: "10:00", arrival: "12:15", origin: "DEL", dest: "BOM", duration: "2h 15m", stops: "Non Stop",      price: 4200, baggage: "15 Kg", refundable: "Partially Refundable" },
  { id: 3, airline: "Air India", flightNo: "AI-315",  departure: "14:30", arrival: "18:45", origin: "DEL", dest: "BOM", duration: "4h 15m", stops: "1 Stop (AMD)", price: 3900, baggage: "25 Kg", refundable: "Partially Refundable" },
  { id: 4, airline: "Akasa Air", flightNo: "QP-1372", departure: "19:00", arrival: "21:10", origin: "DEL", dest: "BOM", duration: "2h 10m", stops: "Non Stop",      price: 4500, baggage: "15 Kg", refundable: "Partially Refundable" },
  { id: 5, airline: "SpiceJet",  flightNo: "SG-8709", departure: "22:15", arrival: "00:30", origin: "DEL", dest: "BOM", duration: "2h 15m", stops: "Non Stop",      price: 3850, baggage: "15 Kg", refundable: "Non-Refundable" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
const parseHour = (timeStr) => {
  const [h, m] = timeStr.split(':').map(Number);
  return h + m / 60;
};

const getStopCategory = (stops) =>
  stops === 'Non Stop' ? 'nonstop' : '1stop';

const getDepartureSlot = (timeStr) => {
  const h = parseHour(timeStr);
  if (h < 6)  return 'before6';
  if (h < 12) return '6to12';
  if (h < 18) return '12to18';
  return 'after18';
};

// ─── Filter logic ─────────────────────────────────────────────────────────────
const applyFilters = (flights, filters) => {
  return flights.filter((flight) => {
    // Stops filter — only active if at least one option is checked
    if (filters.stops.size > 0) {
      if (!filters.stops.has(getStopCategory(flight.stops))) return false;
    }

    // Departure time filter — only active if at least one slot is selected
    if (filters.depSlots.size > 0) {
      if (!filters.depSlots.has(getDepartureSlot(flight.departure))) return false;
    }

    // Airlines filter — only active if at least one airline is checked
    if (filters.airlines.size > 0) {
      if (!filters.airlines.has(flight.airline)) return false;
    }

    return true;
  });
};

// ─── Sort logic ───────────────────────────────────────────────────────────────
const applySort = (flights, sortBy) => {
  const sorted = [...flights];
  switch (sortBy) {
    case 'cheapest':
      return sorted.sort((a, b) => a.price - b.price);
    case 'highest':
      return sorted.sort((a, b) => b.price - a.price);
    case 'earliest':
      return sorted.sort((a, b) => parseHour(a.departure) - parseHour(b.departure));
    default:
      return sorted;
  }
};

// ─── Component ────────────────────────────────────────────────────────────────
const FlightResults = () => {
  // Filter state — using Sets for O(1) membership checks
  const [filters, setFilters] = useState({
    stops:    new Set(),   // 'nonstop' | '1stop'
    depSlots: new Set(),   // 'before6' | '6to12' | '12to18' | 'after18'
    airlines: new Set(),   // airline name strings
  });

  const [sortBy, setSortBy] = useState('cheapest');

  // ── Filter handlers ─────────────────────────────────────────────────────────
  const toggleStop = (value) => {
    setFilters((prev) => {
      const next = new Set(prev.stops);
      next.has(value) ? next.delete(value) : next.add(value);
      return { ...prev, stops: next };
    });
  };

  const toggleDepSlot = (value) => {
    setFilters((prev) => {
      const next = new Set(prev.depSlots);
      next.has(value) ? next.delete(value) : next.add(value);
      return { ...prev, depSlots: next };
    });
  };

  const toggleAirline = (value) => {
    setFilters((prev) => {
      const next = new Set(prev.airlines);
      next.has(value) ? next.delete(value) : next.add(value);
      return { ...prev, airlines: next };
    });
  };

  // ── Derived list (filter → sort → render) ──────────────────────────────────
  const visibleFlights = useMemo(() => {
    const filtered = applyFilters(ALL_FLIGHTS, filters);
    return applySort(filtered, sortBy);
  }, [filters, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />

      {/* Search Header Banner */}
      <div className="bg-white border-b border-gray-100 py-4 sticky top-20 z-40 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <ModifySearchButton />
            <div className="bg-blue-50 p-2.5 rounded-xl border border-blue-100">
              <Plane className="text-blue-600" size={20} />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg md:text-xl font-black text-gray-800 tracking-tight flex items-center gap-2">
                New Delhi <span className="text-gray-300 font-medium">→</span> Mumbai
              </h1>
              <p className="text-[10px] font-black text-gray-400 mt-0.5 uppercase tracking-[0.2em] flex items-center gap-2">
                <span>{visibleFlights.length} of {ALL_FLIGHTS.length} Flights</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span>01 Apr 2026</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span>1 Adult, Economy</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8 w-full relative z-10">
        {/* Left Sidebar Filters */}
        <div className="lg:w-1/4 hidden lg:block">
          <div className="sticky top-44">
            <FlightFilter
              filters={filters}
              onToggleStop={toggleStop}
              onToggleDepSlot={toggleDepSlot}
              onToggleAirline={toggleAirline}
            />
          </div>
        </div>

        {/* Flight Listings */}
        <div className="lg:w-3/4 flex flex-col">
          <FareCalendar />

          <div className="flex flex-col md:flex-row md:justify-between md:items-center bg-white p-4 rounded-[1.5rem] shadow-sm border border-gray-100 gap-4 mb-6">
            <h2 className="text-xl font-black text-gray-800 tracking-tight ml-2">Available Flights</h2>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Sort By</span>
              <select
                id="flight-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs font-black uppercase tracking-widest text-gray-600 outline-none hover:border-blue-400 cursor-pointer shadow-sm transition-colors focus:ring-2 focus:ring-blue-100"
              >
                <option value="cheapest">Cheapest First</option>
                <option value="highest">Highest Price</option>
                <option value="earliest">Earliest Departure</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {visibleFlights.length > 0 ? (
              visibleFlights.map((flight) => (
                <FlightCard key={flight.id} flight={flight} />
              ))
            ) : (
              <div className="bg-white rounded-[2rem] p-12 flex flex-col items-center justify-center border border-gray-100 shadow-sm text-center">
                <Plane className="text-gray-200 mb-4" size={48} />
                <h3 className="font-black text-gray-700 text-lg tracking-tight">No flights match your filters</h3>
                <p className="text-sm text-gray-400 mt-2">Try adjusting or clearing your filters to see more results.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightResults;
