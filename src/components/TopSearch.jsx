import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';

export default function TopSearch({ setTargetLocation }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const timeoutRef = useRef(null);
  const dropdownRef = useRef(null);

  const fetchLocations = async (text) => {
    if (!text || text.length < 3) {
      setResults([]);
      return;
    }
    
    setIsSearching(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(text)}&limit=5`);
      const data = await res.json();
      setResults(data);
      setShowDropdown(true);
    } catch (err) {
      console.error("Geocoding Error:", err);
    }
    setIsSearching(false);
  };

  const handleInput = (e) => {
    const val = e.target.value;
    setQuery(val);
    
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => fetchLocations(val), 600);
  };

  const handleSelect = (item) => {
    // FIX: Extract the geographic bounding box from the search result
    // Nominatim returns [minLat, maxLat, minLon, maxLon]
    const bbox = item.boundingbox;
    const bounds = [
      [parseFloat(bbox[2]), parseFloat(bbox[0])], // [West Longitude, South Latitude]
      [parseFloat(bbox[3]), parseFloat(bbox[1])]  // [East Longitude, North Latitude]
    ];

    setTargetLocation({
      center: [parseFloat(item.lon), parseFloat(item.lat)],
      bounds: bounds
    });
    
    setQuery(item.display_name.split(',')[0]); 
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="absolute top-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-80">
      
      <div className="relative flex items-center w-full h-11 rounded-xl bg-[#080c18eb] backdrop-blur-lg border border-slate-700/50 shadow-2xl focus-within:border-[#0b84ff]/50 transition-all">
        <Search size={16} className="absolute left-3 text-slate-400" />
        <input 
          type="text" 
          value={query}
          onChange={handleInput}
          onFocus={() => { if (results.length > 0) setShowDropdown(true) }}
          placeholder="Search locations, landmarks..." 
          className="w-full h-full bg-transparent border-none outline-none pl-10 pr-10 text-sm text-slate-200 placeholder:text-slate-500"
        />
        {isSearching && <Loader2 size={16} className="absolute right-3 text-[#0b84ff] animate-spin" />}
      </div>

      {showDropdown && results.length > 0 && (
        <div className="absolute top-12 left-0 right-0 bg-[#080c18eb] backdrop-blur-lg border border-slate-700/50 shadow-2xl rounded-xl mt-2 overflow-hidden flex flex-col">
          {results.map((item, index) => (
            <button 
              key={index}
              onPointerDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleSelect(item);
              }}
              className="flex items-start text-left gap-3 w-full p-3 hover:bg-[#0b84ff]/20 transition-colors border-b border-slate-800 last:border-b-0"
            >
              <MapPin size={16} className="text-slate-400 mt-0.5 shrink-0" />
              <div className="flex flex-col">
                <span className="text-sm text-slate-200 line-clamp-1">{item.display_name.split(',')[0]}</span>
                <span className="text-[10px] text-slate-500 line-clamp-1">{item.display_name.split(',').slice(1).join(',')}</span>
              </div>
            </button>
          ))}
        </div>
      )}
      
    </div>
  );
}