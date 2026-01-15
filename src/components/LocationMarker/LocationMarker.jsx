import React from 'react';
import { useApp } from '../../context/AppContext';
import { MODES } from '../../utils/constants';
import { MarkerFought, MarkerRemembered } from '../../assets';
import './LocationMarker.css';

const LocationMarker = ({ location }) => {
  const { mode, selectLocation, selectedLocation } = useApp();
  
  const isSelected = selectedLocation?.id === location.id;
  const markerIcon = mode === MODES.FOUGHT ? MarkerFought : MarkerRemembered;

  const handleClick = () => {
    selectLocation(location);
  };

  return (
    <div 
      className={`location-marker location-marker--${mode} ${isSelected ? 'location-marker--selected' : ''}`}
      style={{
        left: `${location.x}%`,
        top: `${location.y}%`,
      }}
      onClick={handleClick}
    >
      <img 
        src={markerIcon} 
        alt="" 
        className="location-marker__icon"
      />
      <span className="location-marker__label">
        {location.name}
      </span>
    </div>
  );
};

export default LocationMarker;
