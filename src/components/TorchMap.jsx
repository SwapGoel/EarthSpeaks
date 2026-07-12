import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function TorchMap({ showLabels, targetLocation }) {
  const mapContainer = useRef(null);
  const miniMapContainer = useRef(null);
  const starsRef = useRef(null);
  
  const mapRef = useRef(null);
  const miniMapRef = useRef(null);
  
  const [isReady, setIsReady] = useState(false);

  const starPos = useRef({ x: 0, y: 0 });
  const lastCenter = useRef({ lng: -40, lat: 20 });
  const lastTime = useRef(performance.now());
  const animationFrameRef = useRef(null);
  
  const userInteractedRef = useRef(false); 

  useEffect(() => {
    if (mapRef.current) return;

    const isMobile = window.innerWidth < 768;
    const startingZoom = isMobile ? 1.6 : 3.2;

    mapRef.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
      center: [-40, 20],
      zoom: startingZoom,
      maxTileCacheSize: 500, 
      pitch: 0, 
      attributionControl: false,
    });

    miniMapRef.current = new maplibregl.Map({
      container: miniMapContainer.current,
      style: 'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json',
      center: [-40, 20],
      zoom: 0,
      interactive: false,
      attributionControl: false,
    });

    let spinFrame;

    miniMapRef.current.on('load', () => {
      try {
        if (miniMapRef.current.setProjection) miniMapRef.current.setProjection({ type: 'globe' });
      } catch (e) {}
    });

    mapRef.current.on('load', () => {
      try {
        if (mapRef.current.setProjection) mapRef.current.setProjection({ type: 'globe' });
      } catch (e) {}

      try {
        const layers = mapRef.current.getStyle().layers;
        layers.forEach(layer => {
          try {
            if (layer.id.includes('water')) {
              mapRef.current.setPaintProperty(layer.id, 'fill-color', '#182c47');
            }
            if (layer.id === 'background') {
              mapRef.current.setPaintProperty(layer.id, 'background-color', '#000000');
              mapRef.current.setPaintProperty(layer.id, 'background-opacity', 1);
            }

            if (layer.type === 'symbol') {
              const currentSize = mapRef.current.getLayoutProperty(layer.id, 'text-size');
              if (currentSize) {
                mapRef.current.setLayoutProperty(layer.id, 'text-size', ['*', 0.7, currentSize]);
              }
            }
          } catch (layerErr) {}
        });
      } catch (styleErr) {}

      setTimeout(() => setIsReady(true), 150);

      const spinGlobe = () => {
        if (!userInteractedRef.current && mapRef.current.getZoom() < 4) {
          const currentCenter = mapRef.current.getCenter();
          currentCenter.lng += 0.05; 
          mapRef.current.jumpTo({ center: currentCenter });
          spinFrame = requestAnimationFrame(spinGlobe);
        }
      };
      spinGlobe();

      animationFrameRef.current = requestAnimationFrame(updateStarPhysics);
    });

    const stopSpinForever = () => {
      userInteractedRef.current = true;
      if (spinFrame) cancelAnimationFrame(spinFrame);
    };

    mapRef.current.on('mousedown', stopSpinForever);
    mapRef.current.on('dragstart', stopSpinForever);
    mapRef.current.on('zoomstart', stopSpinForever);
    mapRef.current.on('touchstart', stopSpinForever);

    mapRef.current.on('move', () => {
      if (miniMapRef.current) {
        miniMapRef.current.setCenter(mapRef.current.getCenter());
      }
    });

    return () => {
      if (spinFrame) cancelAnimationFrame(spinFrame);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; }
      if (miniMapRef.current) { miniMapRef.current.remove(); miniMapRef.current = null; }
    };
  }, []);

  const updateStarPhysics = () => {
    if (!mapRef.current || !starsRef.current) return;

    const now = performance.now();
    const dt = (now - lastTime.current) / 1000;
    lastTime.current = now;

    const center = mapRef.current.getCenter();
    
    let dlng = center.lng - lastCenter.current.lng;
    let dlat = center.lat - lastCenter.current.lat;

    if (dlng > 180) dlng -= 360;
    if (dlng < -180) dlng += 360;

    starPos.current.x -= 2 * dt; 
    starPos.current.y -= 1 * dt;

    starPos.current.x += dlng * 2.5; 
    starPos.current.y -= dlat * 2.5;

    lastCenter.current = { lng: center.lng, lat: center.lat };

    const px = starPos.current.x;
    const py = starPos.current.y;

    starsRef.current.style.backgroundPosition = `
      ${px}px ${py}px, 
      ${px * 0.8}px ${py * 0.8}px, 
      ${px * 0.6}px ${py * 0.6}px, 
      ${px * 0.4}px ${py * 0.4}px, 
      ${px * 0.2}px ${py * 0.2}px
    `;

    animationFrameRef.current = requestAnimationFrame(updateStarPhysics);
  };

  useEffect(() => {
    if (!mapRef.current || !mapRef.current.isStyleLoaded()) return;
    try {
      const layers = mapRef.current.getStyle().layers;
      layers.forEach(layer => {
        if (layer.type === 'symbol') {
          try {
            mapRef.current.setLayoutProperty(layer.id, 'visibility', showLabels ? 'visible' : 'none');
          } catch (e) {}
        }
      });
    } catch (e) {}
  }, [showLabels]);

  // 🚀 FLUID, SINGLE-TRANSITION FLIGHT ENGINE
  useEffect(() => {
    if (targetLocation && mapRef.current) {
      userInteractedRef.current = true; 
      const map = mapRef.current;

      map.stop(); // Instantly kill any current animations

      const targetCenter = targetLocation.center;
      let calculatedZoom = 12; // Default for specific points
      
      const isMobile = window.innerWidth < 768;

      // Dynamically calculate the final zoom level based on the size of the requested area
      if (targetLocation.bounds) {
        const camera = map.cameraForBounds(targetLocation.bounds, { padding: isMobile ? 20 : 50 });
        if (camera && camera.zoom) {
          calculatedZoom = Math.min(camera.zoom, 15);
        }
      }

      const currentCenter = map.getCenter();
      const dist = Math.sqrt(
        Math.pow(currentCenter.lng - targetCenter[0], 2) + 
        Math.pow(currentCenter.lat - targetCenter[1], 2)
      );

      // Micro-Jump: If you search for something right next to you, just slide over
      if (dist < 0.5) {
        map.easeTo({
          center: targetCenter,
          zoom: calculatedZoom,
          duration: 1200,
          pitch: 0,
          essential: true
        });
      } 
      // Full Jump: One seamless parabolic arc (Google Earth style)
      else {
        map.flyTo({
          center: targetCenter,
          zoom: calculatedZoom,
          pitch: 0,
          bearing: 0,
          speed: 0.8, // Slightly slowed down to give the network time to stream tiles
          curve: 1.42, // The mathematical curve that creates the "swoop" up to orbit and back down
          essential: true 
        });
      }
    }
  }, [targetLocation]);

  return (
    <div className="absolute inset-0 z-0 bg-[#06060c] overflow-hidden flex items-center justify-center">
      
      <div 
        ref={starsRef}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(1.5px 1.5px at 25px 25px, #ffffff80, transparent),
            radial-gradient(2px 2px at 150px 125px, #ffffff60, transparent),
            radial-gradient(1.5px 1.5px at 250px 45px, #ffffff90, transparent),
            radial-gradient(1px 1px at 350px 185px, #ffffff50, transparent),
            radial-gradient(2.5px 2.5px at 450px 95px, #ffffff80, transparent)
          `,
          backgroundSize: '500px 500px',
        }}
      />

      <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, #0a1128 0%, transparent 60%)' }} />

      <div 
        ref={mapContainer} 
        className={`absolute inset-0 w-full h-full transition-opacity duration-[1500ms] ease-in-out ${isReady ? 'opacity-100' : 'opacity-0'}`} 
      />

      <div className={`absolute right-4 bottom-24 md:bottom-6 md:right-6 z-40 pointer-events-none transition-opacity duration-[1500ms] delay-500 ${isReady ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 rounded-full bg-[#00e5ff]/10 blur-xl scale-110"></div>
        <div className="relative w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-full overflow-hidden border-[1.5px] border-[#00e5ff30] shadow-[0_0_15px_rgba(0,0,0,0.8)] bg-[#06060c]">
          <div ref={miniMapContainer} className="w-full h-full opacity-80" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#00e5ff] border-[1px] border-white animate-pulse shadow-[0_0_8px_#00e5ff]" />
        </div>
      </div>

    </div>
  );
}