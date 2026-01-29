import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { MODES } from '../../utils/constants';
import { BackgroundFought, BackgroundRemembered, BrooklynMap } from '../../assets';
import { getLocationsByMode } from '../../utils/locations';
import LocationMarker from '../LocationMarker';
import './MapView.css';

const MapView = () => {
  const { mode } = useApp();
  const [zoomLevel, setZoomLevel] = useState(1);
  
  // Touch state for pinch zoom
  const touchStartDistance = useRef(null);
  const touchStartZoom = useRef(1);

  // Mouse wheel zoom (for desktop)
  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY * -0.001;
    const newZoom = Math.min(Math.max(1, zoomLevel + delta), 2);
    setZoomLevel(newZoom);
  };

  // Calculate distance between two touch points
  const getTouchDistance = (touches) => {
    const touch1 = touches[0];
    const touch2 = touches[1];
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Touch start - record initial pinch distance
  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      touchStartDistance.current = getTouchDistance(e.touches);
      touchStartZoom.current = zoomLevel;
    }
  };

  // Touch move - calculate zoom based on pinch
  const handleTouchMove = (e) => {
    if (e.touches.length === 2 && touchStartDistance.current) {
      e.preventDefault();
      
      const currentDistance = getTouchDistance(e.touches);
      const scale = currentDistance / touchStartDistance.current;
      const newZoom = touchStartZoom.current * scale;
      
      // Clamp between 1 and 2
      const clampedZoom = Math.min(Math.max(1, newZoom), 2);
      setZoomLevel(clampedZoom);
    }
  };

  // Touch end - reset tracking
  const handleTouchEnd = (e) => {
    if (e.touches.length < 2) {
      touchStartDistance.current = null;
    }
  };

  // Get locations for current mode
  const locations = getLocationsByMode(mode);

  return (
    <div 
      className="map-view" 
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Layer 1: Background texture (switches based on mode) */}
      <div className="map-view__background">
        <img
          src={mode === MODES.FOUGHT ? BackgroundFought : BackgroundRemembered}
          alt="Background texture"
          className={`map-view__background-image map-view__background-image--${mode}`}
        />
      </div>

      {/* Layer 2: Brooklyn map + markers (zoom together) */}
      <div className="map-view__map-layer">
        <div 
          className="map-view__map-container"
          style={{
            transform: `scale(${zoomLevel})`,
            transition: touchStartDistance.current ? 'none' : 'transform 0.2s ease-out'
          }}
        >
          {/* Brooklyn map */}
          <img
            src={BrooklynMap}
            alt="Brooklyn map"
            className="map-view__brooklyn-map"
          />
          
          {/* Markers overlay - now inside the scaled container */}
          <div className="map-view__markers">
            {locations.map((location) => (
              <LocationMarker 
                key={location.id} 
                location={location}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
