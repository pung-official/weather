import React from 'react';
import { FaSearch, FaTrash } from "react-icons/fa";

function SearchHistory({ cities, onSearch, onDelete }) {
  if (!cities || cities.length === 0) return null;

  return (
    <div className="mt-6 bg-[#1A1A1A80] rounded-3xl p-6 w-full">
      <h3 className="text-md font-semibold mb-2">Search History</h3>
      <ul className="space-y-4">
        {cities.map((city, idx) => (
          <li key={idx} className="flex justify-between items-center bg-white/10 px-4 py-2 rounded-xl">
            <div className="md:flex items-center justify-between md:flex-1 md:pr-2">
              <p className="font-medium">{city.name}</p>
              <p className="text-sm">{city.date}</p>
            </div>
            <div className="flex gap-2">
              <button 
                className="icon-circle"
                onClick={() => onSearch(city.name)}
              >
                <FaSearch className="w-3 h-3" />
              </button>
              <button 
                className="icon-circle"
                onClick={() => onDelete(idx)}
              >
                <FaTrash className="w-3 h-3" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchHistory;