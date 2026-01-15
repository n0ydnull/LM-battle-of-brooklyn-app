import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MODES } from '../../utils/constants';
import { BackgroundFought, BackgroundRemembered, BrooklynMap } from '../../assets';
import { getLocationsByMode } from '../../utils/locations';
import LocationMarker from '../LocationMarker';
import './MapView.css';

const MapView = () => {
  const { mode } = useApp();
  const [zoomLevel, setZoomLevel] = useState(1); // 1 = default, 1.5 = zoomed in

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY * -0.001;
    const newZoom = Math.min(Math.max(1, zoomLevel + delta), 2); // Min 1, Max 2
    setZoomLevel(newZoom);
  };

  // Get locations for current mode
  const locations = getLocationsByMode(mode);

  return (
    <div className="map-view" onWheel={handleWheel}>
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
            transition: 'transform 0.2s ease-out'
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
