import React, { useState } from 'react';
import TorchMap from './components/TorchMap';
import TopSearch from './components/TopSearch';
import LeftDock from './components/LeftDock';

export default function App() {
  const [activeTool, setActiveTool] = useState(null);
  const [showLabels, setShowLabels] = useState(true);

  return (
    // FIX: Using fixed inset-0 and 100dvh guarantees it never overflows the mobile browser UI
    <div className="fixed inset-0 w-full h-[100dvh] bg-[#06060c] text-slate-200 font-sans overflow-hidden flex selection:bg-[#0b84ff]/30">
      
      {/* 3D GLOBE ENGINE */}
      <TorchMap showLabels={showLabels} />

      {/* TOP RIGHT SEARCH */}
      <TopSearch />

      {/* LEFT VERTICAL DOCK / MOBILE BOTTOM BAR */}
      <LeftDock 
        activeTool={activeTool} 
        setActiveTool={setActiveTool} 
        showLabels={showLabels} 
        setShowLabels={setShowLabels} 
      />

    </div>
  );
}