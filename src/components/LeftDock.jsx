import React from 'react';
import { Flame, Type } from 'lucide-react';

export default function LeftDock({ showLabels, setShowLabels }) {
  return (
    <div className="absolute z-50 bg-[#0a0f1ad6] backdrop-blur-xl border border-slate-700/50 shadow-2xl flex items-center
      bottom-4 left-4 right-4 h-16 rounded-2xl flex-row px-4
      md:top-4 md:bottom-4 md:left-4 md:right-auto md:w-16 md:h-auto md:rounded-2xl md:flex-col md:py-4 md:px-0
    ">
      
      {/* Logo */}
      <div className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br from-[#0b84ff] to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(11,132,255,0.4)] cursor-pointer md:mb-4" title="Earth Speaks">
        <Flame size={20} className="text-white" />
      </div>
      
      {/* Spacer to push tools to the bottom/right */}
      <div className="flex-1 md:flex-auto md:mt-auto"></div>
      
      {/* Map Labels Toggle - NOW WITH TEXT */}
      <button 
        onClick={() => setShowLabels(!showLabels)} 
        className={`p-2 flex flex-col items-center justify-center gap-1 shrink-0 rounded-xl transition-all group ${showLabels ? 'text-white bg-slate-700/80' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`} 
      >
        <Type size={18} className="group-hover:scale-110 transition-transform" />
        <span className="text-[10px] font-medium tracking-wide">Labels</span>
      </button>

    </div>
  );
}