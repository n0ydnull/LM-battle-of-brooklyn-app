import React from 'react';
import { IconZoom } from '../../assets';
import './ZoomInstruction.css';

const ZoomInstruction = () => {
  return (
    <div className="zoom-instruction">
      <img 
        src={IconZoom} 
        alt="Zoom gesture" 
        className="zoom-instruction__icon"
      />
      <div className="zoom-instruction__text">
        <p className="zoom-instruction__line1">ZOOM ON THE MAP TO ENLARGE DISPLAY.</p>
        <p className="zoom-instruction__line2">SUBMISSIONS ON THE PROJECTION WALL.</p>
      </div>
    </div>
  );
};

export default ZoomInstruction;
