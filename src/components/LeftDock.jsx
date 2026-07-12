import React from 'react';
import { Crosshair, Globe, BarChart2, Layers, Flame, Type } from 'lucide-react';

export default function LeftDock({ activeTool, setActiveTool, showLabels, setShowLabels }) {
  return (
    <div className="absolute z-50 bg-[#0a0f1ad6] backdrop-blur-xl border border-slate-700/50 shadow-2xl flex items-center
      bottom-4 left-4 right-4 h-14 rounded-2xl flex-row px-4
      md:top-4 md:bottom-4 md:left-4 md:right-auto md:w-14 md:h-auto md:rounded-2xl md:flex-col md:py-4 md:px-0
    ">
      
      {/* Logo */}
      <div className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br from-[#0b84ff] to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(11,132,255,0.4)] cursor-pointer md:mb-4" title="Earth Speaks">
        <Flame size={20} className="text-white" />
      </div>
      
      {/* Divider */}
      <div className="w-px h-8 bg-slate-700/50 mx-2 shrink-0 md:mx-0 md:my-4 md:w-8 md:h-px"></div>
      
      {/* Tools Array */}
      <div className="flex flex-row md:flex-col gap-1 sm:gap-4 w-full md:px-2 items-center justify-around md:justify-start flex-1">
        <button onClick={() => setActiveTool('locate')} className={`p-2 rounded-xl transition-all group ${activeTool === 'locate' ? 'text-white bg-[#0b84ff]' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`} title="Locate">
          <Crosshair size={18} className="group-hover:scale-110 transition-transform" />
        </button>
        <button onClick={() => setActiveTool('datasets')} className={`p-2 rounded-xl transition-all group ${activeTool === 'datasets' ? 'text-white bg-[#0b84ff]' : 'text-slate-400 hover:text-[#0b84ff] hover:bg-slate-800'}`} title="Datasets">
          <Globe size={18} className="group-hover:scale-110 transition-transform" />
        </button>
        <button onClick={() => setActiveTool('spectra')} className={`p-2 rounded-xl transition-all group ${activeTool === 'spectra' ? 'text-white bg-[#00ff00]' : 'text-slate-400 hover:text-[#00ff00] hover:bg-slate-800'}`} title="Spectra">
          <BarChart2 size={18} className="group-hover:scale-110 transition-transform" />
        </button>
        <button onClick={() => setActiveTool('analysis')} className={`p-2 rounded-xl transition-all group ${activeTool === 'analysis' ? 'text-white bg-[#b203ed]' : 'text-slate-400 hover:text-[#b203ed] hover:bg-slate-800'}`} title="Analysis">
          <Layers size={18} className="group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Divider */}
      <div className="w-px h-8 bg-slate-700/50 mx-2 shrink-0 md:mx-0 md:mt-auto md:mb-4 md:w-8 md:h-px"></div>
      
      {/* Map Labels Toggle */}
      <button onClick={() => setShowLabels(!showLabels)} className={`p-2 shrink-0 rounded-xl transition-all group ${showLabels ? 'text-white bg-slate-700' : 'text-slate-500 hover:text-white hover:bg-slate-800'}`} title="Toggle Base Map Labels">
        <Type size={18} className="group-hover:scale-110 transition-transform" />
      </button>

    </div>
  );
}