import React, { useState } from 'react';
import TorchMap from './components/TorchMap';
import TopSearch from './components/TopSearch';
import LeftDock from './components/LeftDock';

export default function App() {
  const [showLabels, setShowLabels] = useState(true);
  const [targetLocation, setTargetLocation] = useState(null); // Holds [longitude, latitude]

  return (
    <div className="fixed inset-0 w-full h-[100dvh] bg-[#06060c] text-slate-200 font-sans overflow-hidden flex selection:bg-[#0b84ff]/30">
      
      {/* 3D GLOBE ENGINE */}
      <TorchMap showLabels={showLabels} targetLocation={targetLocation} />

      {/* TOP RIGHT SEARCH */}
      <TopSearch setTargetLocation={setTargetLocation} />

      {/* LEFT VERTICAL DOCK / MOBILE BOTTOM BAR */}
      <LeftDock 
        showLabels={showLabels} 
        setShowLabels={setShowLabels} 
      />

    </div>
  );
}