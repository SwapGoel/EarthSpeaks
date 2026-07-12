import React, { useState } from 'react';
import TorchMap from './components/TorchMap';
import TopSearch from './components/TopSearch';
import LeftDock from './components/LeftDock';

export default function App() {
  const [activeTool, setActiveTool] = useState(null);
  const [showLabels, setShowLabels] = useState(true);

  return (
    <div className="w-screen h-screen bg-[#06060c] text-slate-200 font-sans overflow-hidden flex relative selection:bg-[#0b84ff]/30">
      
      {/* 3D GLOBE ENGINE */}
      <TorchMap showLabels={showLabels} />

      {/* TOP RIGHT SEARCH */}
      <TopSearch />

      {/* LEFT VERTICAL DOCK */}
      <LeftDock 
        activeTool={activeTool} 
        setActiveTool={setActiveTool} 
        showLabels={showLabels} 
        setShowLabels={setShowLabels} 
      />

    </div>
  );
}