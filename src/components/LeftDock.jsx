import React from 'react';
import { Crosshair, Globe, BarChart2, Layers, Flame, Type } from 'lucide-react';

export default function LeftDock({ activeTool, setActiveTool, showLabels, setShowLabels }) {
  return (
    <div className="absolute top-4 left-4 bottom-4 w-14 bg-[#0a0f1ad6] backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl flex flex-col items-center py-4 z-50">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0b84ff] to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(11,132,255,0.4)] mb-4 cursor-pointer" title="EarthSpeaks">
        <Flame size={20} className="text-white" />
      </div>
      <div className="w-8 h-px bg-slate-700/50 mb-4"></div>
      
      <div className="flex flex-col gap-4 w-full px-2 items-center flex-1">
        <button onClick={() => setActiveTool('locate')} className={`p-2.5 rounded-xl transition-all group ${activeTool === 'locate' ? 'text-white bg-[#0b84ff]' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`} title="Locate">
          <Crosshair size={18} className="group-hover:scale-110 transition-transform" />
        </button>
        <button onClick={() => setActiveTool('datasets')} className={`p-2.5 rounded-xl transition-all group ${activeTool === 'datasets' ? 'text-white bg-[#0b84ff]' : 'text-slate-400 hover:text-[#0b84ff] hover:bg-slate-800'}`} title="Datasets">
          <Globe size={18} className="group-hover:scale-110 transition-transform" />
        </button>
        <button onClick={() => setActiveTool('spectra')} className={`p-2.5 rounded-xl transition-all group ${activeTool === 'spectra' ? 'text-white bg-[#00ff00]' : 'text-slate-400 hover:text-[#00ff00] hover:bg-slate-800'}`} title="Spectra">
          <BarChart2 size={18} className="group-hover:scale-110 transition-transform" />
        </button>
        <button onClick={() => setActiveTool('analysis')} className={`p-2.5 rounded-xl transition-all group ${activeTool === 'analysis' ? 'text-white bg-[#b203ed]' : 'text-slate-400 hover:text-[#b203ed] hover:bg-slate-800'}`} title="Analysis">
          <Layers size={18} className="group-hover:scale-110 transition-transform" />
        </button>
      </div>

      <div className="w-8 h-px bg-slate-700/50 mt-auto mb-4"></div>
      <button onClick={() => setShowLabels(!showLabels)} className={`p-2.5 rounded-xl transition-all group ${showLabels ? 'text-white bg-slate-700' : 'text-slate-500 hover:text-white hover:bg-slate-800'}`} title="Toggle Base Map Labels">
        <Type size={18} className="group-hover:scale-110 transition-transform" />
      </button>
    </div>
  );
}