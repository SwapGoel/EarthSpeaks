import React from 'react';
import { Search } from 'lucide-react';

export default function TopSearch() {
  return (
    <div className="absolute top-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-72">
      <div className="relative flex items-center w-full h-10 rounded-xl bg-[#080c18eb] backdrop-blur-lg border border-slate-700/50 shadow-2xl focus-within:border-[#0b84ff]/50 transition-all">
        <Search size={14} className="absolute left-3 text-slate-400" />
        <input 
          type="text" 
          placeholder="Search global coordinates..." 
          className="w-full h-full bg-transparent border-none outline-none pl-9 pr-3 text-xs text-slate-200 placeholder:text-slate-500"
        />
      </div>
    </div>
  );
}