import React, { useState, useRef, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import BrooklynMap from './brooklyn-map.svg';
import BackgroundSVG from './background.svg';
import FoughtWhiteIcon from './fought-white.svg';
import FoughtBurgundyIcon from './fought-burgundy.svg';
import RememberedWhiteIcon from './remembered-white.svg';
import RememberedNavyIcon from './remembered-navy.svg';
import ZoomIcon from './zoom.svg';
import LogoIcon from './logo.svg';

// Sample location data - you can adjust coordinates later
const FOUGHT_LOCATIONS = [
  { id: 1, name: 'WALLABOUT BAY', x: 520, y: 350 },
  { id: 2, name: 'PEBBLE BEACH', x: 487, y: 506 },
  { id: 3, name: 'PRISON SHIP MARTYRS MONUMENT', x: 530, y: 250 },
  { id: 4, name: "TRADER JOE'S", x: 515, y: 270 },
  { id: 5, name: 'OLD STONE HOUSE OF BROOKLYN', x: 535, y: 305 },
  { id: 6, name: 'BATTLE PASS HISTORIC MARKER', x: 573, y: 318 },
  { id: 7, name: "HOWARD'S INN HISTORIC MARKER", x: 725, y: 345 },
  { id: 8, name: 'MELODY LANES', x: 495, y: 360 }
];

const REMEMBERED_LOCATIONS = [
  { id: 1, name: 'PRISON SHIP MARTYRS MONUMENT', x: 545, y: 250 },
  { id: 2, name: 'OLD STONE HOUSE OF BROOKLYN', x: 528, y: 306 },
  { id: 3, name: 'BROOKLYN MUSEUM', x: 573, y: 318 },
  { id: 4, name: 'DONGAN OAK MONUMENT', x: 568, y: 333 },
  { id: 5, name: 'MARYLAND MONUMENT', x: 560, y: 348 },
  { id: 6, name: 'ALTAR TO LIBERTY - MINERVA STATUE', x: 513, y: 358 },
  { id: 7, name: 'VERRAZZANO-NARROWS BRIDGE', x: 385, y: 496 }
];

export default function BattleOfBrooklyn() {
  const [mode, setMode] = useState('fought');
  const [loading, setLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const mapRef = useRef(null);

  const locations = mode === 'fought' ? FOUGHT_LOCATIONS : REMEMBERED_LOCATIONS;

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
    setLoading(true);
    
    console.log('Sending to projection:', { mode, location });
    
    setTimeout(() => {
      setLoading(false);
      setSelectedLocation(null);
    }, 2000);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newZoom = Math.min(Math.max(zoom * delta, 0.5), 3);
    setZoom(newZoom);
  };

  const handleMouseDown = (e) => {
    if (e.button === 0) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  return (
    <div className="app-container">
      <header className="header">
        <div className="zoom-instruction">
          <img src={ZoomIcon} alt="Zoom" className="zoom-icon" />
          <div className="instruction-text">
            <div className="instruction-title">ZOOM ON THE MAP TO ENLARGeeeeeeeeeeeeeeeeeE DISPLAY</div>
            <div className="instruction-subtitle">SUBMISSIONS ON THE PROJECTION WALL</div>
          </div>
        </div>

        <div className="mode-toggle">
          <button 
            className={`mode-btn fought ${mode === 'fought' ? 'active' : ''}`}
            onClick={() => setMode('fought')}
          >
            <img 
              src={mode === 'fought' ? FoughtWhiteIcon : FoughtBurgundyIcon} 
              alt="Fought" 
              className="mode-icon" 
            />
            <span>FOUGHT</span>
          </button>
          
          <button 
            className={`mode-btn remembered ${mode === 'remembered' ? 'active' : ''}`}
            onClick={() => setMode('remembered')}
          >
            <img 
              src={mode === 'remembered' ? RememberedWhiteIcon : RememberedNavyIcon} 
              alt="Remembered" 
              className="mode-icon" 
            />
            <span>REMEMBERED</span>
          </button>
        </div>
      </header>

      <div 
        className="map-container" 
        ref={mapRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
      >
        <div 
          className="map-wrapper"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            cursor: isDragging ? 'grabbing' : 'grab'
          }}
        >
          <img 
            src={BrooklynMap} 
            alt="Brooklyn Map"
            className="brooklyn-map"
          />

          {locations.map((location) => (
            <div
              key={location.id}
              className={`location-marker ${mode}`}
              style={{
                left: `${location.x}px`,
                top: `${location.y}px`
              }}
              onClick={() => handleLocationClick(location)}
            >
              <div className="marker-pin" />
              <div className="marker-label">{location.name}</div>
            </div>
          ))}
        </div>
      </div>

      {loading && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setLoading(false)}>×</button>
            <h2 className="modal-title">BATTLE OF BROOKLYN</h2>
            <div className="loading-spinner">
              <Loader2 className="spinner-icon" />
              <span>LOADING</span>
            </div>
            <div className="modal-description">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                <rect x="8" y="10" width="14" height="10" stroke="#3D3D3D" strokeWidth="2" fill="none"/>
                <circle cx="15" cy="15" r="2" fill="#3D3D3D"/>
                <path d="M12 8L18 8M15 8L15 10" stroke="#3D3D3D" strokeWidth="2"/>
              </svg>
              <span>DISPLAYING BATTLE STORY ON THE PROJECTION WALL</span>
            </div>
          </div>
        </div>
      )}

      <footer className="footer">
        <img src={LogoIcon} alt="BKLYN Center for Brooklyn History" className="footer-logo" />
      </footer>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .app-container {
          width: 100vw;
          height: 100vh;
          background-image: url(${BackgroundSVG});
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          font-family: 'Libre Franklin', 'Franklin Gothic', sans-serif;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 30px;
          background: transparent;
          z-index: 10;
        }

        .zoom-instruction {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .zoom-icon {
          width: 40px;
          height: 40px;
        }

        .instruction-text {
          display: flex;
          flex-direction: column;
        }

        .instruction-title {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.5px;
          color: #3D3D3D;
        }

        .instruction-subtitle {
          font-size: 10px;
          color: #666;
          letter-spacing: 0.3px;
        }

        .mode-toggle {
          display: flex;
          gap: 15px;
        }

        .mode-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 28px;
          border: none;
          cursor: pointer;
          font-family: 'Bebas Neue', 'Impact', sans-serif;
          font-size: 20px;
          letter-spacing: 2px;
          transition: all 0.3s ease;
        }

        .mode-icon {
          width: 40px;
          height: 40px;
          object-fit: contain;
        }

        /* FOUGHT button - burgundy when active */
        .mode-btn.fought {
          background: #6B3737;
          color: #F5F1E8;
        }

        .mode-btn.fought:not(.active) {
          background: transparent;
          color: #6B3737;
          border: 2px solid #6B3737;
        }

        /* REMEMBERED button - navy when active */
        .mode-btn.remembered {
          background: #F5F1E8;
          border: 2px solid #2B4560;
          color: #2B4560;
        }

        .mode-btn.remembered.active {
          background: #2B4560;
          color: #F5F1E8;
        }

        .mode-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .map-container {
          flex: 1;
          position: relative;
          overflow: hidden;
          background: transparent;
        }

        .map-wrapper {
          width: 100%;
          height: 100%;
          transition: transform 0.1s ease-out;
          transform-origin: center center;
          position: relative;
        }

        .brooklyn-map {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          max-width: 900px;
          max-height: 90%;
          width: auto;
          height: auto;
          filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1));
        }

        .location-marker {
          position: absolute;
          transform: translate(-50%, -50%);
          cursor: pointer;
          z-index: 5;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: px;
          transition: all 0.3s ease;
        }

        .location-marker:hover {
          transform: translate(-50%, -50%) scale(1.15);
          z-index: 6;
        }

        /* UPDATED: Marker size increased from 16px to 46.2px */
        .marker-pin {
          width: 46.2px;
          height: 46.2px;
          border-radius: 50%;
          border: 3px solid #F5F1E8;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Add the crosshair icon inside the marker */
        .marker-pin::before {
          content: '';
          position: absolute;
          width: 24px;
          height: 24px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23F5F1E8' stroke-width='2'%3E%3Cline x1='12' y1='2' x2='12' y2='10'/%3E%3Cline x1='12' y1='14' x2='12' y2='22'/%3E%3Cline x1='2' y1='12' x2='10' y2='12'/%3E%3Cline x1='14' y1='12' x2='22' y2='12'/%3E%3Ccircle cx='12' cy='12' r='3'/%3E%3C/svg%3E");
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
        }

        .location-marker.fought .marker-pin {
          background: #6B3737;
          box-shadow: 0 3px 10px rgba(107, 55, 55, 0.5);
        }

        .location-marker.remembered .marker-pin {
          background: #2B4560;
          box-shadow: 0 3px 10px rgba(43, 69, 96, 0.5);
        }

        /* UPDATED: Arrow pointer scaled proportionally */
        .marker-pin::after {
          content: '';
          position: absolute;
          bottom: -12px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
        }

        .location-marker.fought .marker-pin::after {
          border-top: 14px solid #6B3737;
        }

        .location-marker.remembered .marker-pin::after {
          border-top: 14px solid #2B4560;
        }

        .marker-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.5px;
          color: #3D3D3D;
          background: rgba(245, 241, 232, 0.95);
          padding: 6px 10px;
          border-radius: 4px;
          white-space: nowrap;
          text-align: center;
          max-width: 160px;
          line-height: 1.3;
          border: 1px solid #D5CDB8;
          margin-top: 4px;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-content {
          background: #F5F1E8;
          padding: 50px 60px;
          border-radius: 8px;
          max-width: 500px;
          position: relative;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
          animation: slideUp 0.4s ease;
        }

        @keyframes slideUp {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .modal-close {
          position: absolute;
          top: 15px;
          right: 15px;
          background: none;
          border: none;
          font-size: 32px;
          cursor: pointer;
          color: #3D3D3D;
          line-height: 1;
          padding: 5px 10px;
        }

        .modal-close:hover {
          color: #6B3737;
        }

        .modal-title {
          font-family: 'Bebas Neue', 'Impact', sans-serif;
          font-size: 32px;
          letter-spacing: 3px;
          color: #2B4560;
          text-align: center;
          margin-bottom: 30px;
        }

        .loading-spinner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
          margin-bottom: 30px;
        }

        .spinner-icon {
          width: 60px;
          height: 60px;
          color: #2B4560;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .loading-spinner span {
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 2px;
          color: #3D3D3D;
        }

        .modal-description {
          display: flex;
          align-items: center;
          gap: 12px;
          justify-content: center;
          font-size: 12px;
          color: #3D3D3D;
          font-weight: 500;
          letter-spacing: 0.5px;
        }

        .footer {
          display: flex;
          align-items: center;
          padding: 15px 30px;
          background: transparent;
        }

        .footer-logo {
          height: 30px;
        }

        @media (max-width: 768px) {
          .header {
            flex-direction: column;
            gap: 15px;
            padding: 15px;
          }

          .mode-toggle {
            width: 100%;
            justify-content: center;
          }

          .mode-btn {
            flex: 1;
            justify-content: center;
            padding: 10px 15px;
            font-size: 16px;
          }

          .modal-content {
            margin: 20px;
            padding: 40px 30px;
          }
        }
      `}</style>
    </div>
  );
}
