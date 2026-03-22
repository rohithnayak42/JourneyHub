import React from 'react';
import { Search } from 'lucide-react';
import SearchBar from './search/SearchBar';

const SearchForm = ({ type = 'bus' }) => {
  return (
    <div className="p-10">
      <div className="mb-8 text-center md:text-left">
          <h2 className="text-3xl font-black text-gray-800 tracking-tight">
             Where do you want to go?
          </h2>
          <p className="text-xs font-black text-gray-400 uppercase tracking-[0.4em] mt-2">
             Book {type === 'hotel' ? 'Luxury Stays' : `Premium ${type.charAt(0).toUpperCase() + type.slice(1)}s`}
          </p>
      </div>
      
      <SearchBar type={type} />
      
    </div>
  );
};

export default SearchForm;
