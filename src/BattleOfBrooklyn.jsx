import React, { useState, useRef, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import BrooklynMap from './brooklyn-map.svg';
import BackgroundSVG from './background.svg';
import FoughtIcon from './fought.svg';
import RememberedIcon from './remembered.svg';
import ZoomIcon from './zoom.svg';
import LogoIcon from './logo.svg';

// Sample location data - you can adjust coordinates later
const FOUGHT_LOCATIONS = [
  { id: 1, name: 'GOWANUS BAY', x: 520, y: 350 },
  { id: 2, name: 'WALLABOUT BAY', x: 450, y: 180 },
  { id: 3, name: 'FORT\'S RES', x: 430, y: 250 },
  { id: 4, name: 'CRANBERRY STREET HISTORIC HOUSES', x: 615, y: 270 },
  { id: 5, name: 'HESSISCHEN HOUSE', x: 435, y: 305 },
  { id: 6, name: 'BATTLE PASS AND HISTORIC MARKERS', x: 473, y: 318 },
  { id: 7, name: 'MARTYR HALL', x: 425, y: 345 },
  { id: 8, name: 'VETERAN LIONS', x: 395, y: 360 },
  { id: 9, name: 'BRUCK HOUSE', x: 335, y: 485 }
];

const REMEMBERED_LOCATIONS = [
  { id: 1, name: 'PRISON SHIP MARTYRS MONUMENT', x: 445, y: 250 },
  { id: 2, name: 'BATTLE PASS & BROOKLYN', x: 428, y: 306 },
  { id: 3, name: 'GOWANUS MUSEUM', x: 473, y: 318 },
  { id: 4, name: 'DONGAN OAK MONUMENT', x: 468, y: 333 },
  { id: 5, name: 'MARYLAND MONUMENT', x: 460, y: 348 },
  { id: 6, name: 'DEAN STREET & BATTLE THOMAS STONE', x: 413, y: 358 },
  { id: 7, name: 'GRAVELAND-MANNING BRIDGE', x: 285, y: 496 }
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
            <div className="instruction-title">ZOOM ON THE MAP TO ENLARGE DISPLAY</div>
            <div className="instruction-subtitle">SUBMISSIONS ON THE PROJECTION WALL</div>
          </div>
        </div>

        <div className="mode-toggle">
          <button 
            className={`mode-btn fought ${mode === 'fought' ? 'active' : ''}`}
            onClick={() => setMode('fought')}
          >
            <img src={FoughtIcon} alt="Fought" className="mode-icon" />
            <span>FOUGHT</span>
          </button>
          
          <button 
            className={`mode-btn remembered ${mode === 'remembered' ? 'active' : ''}`}
            onClick={() => setMode('remembered')}
          >
            <img src={RememberedIcon} alt="Remembered" className="mode-icon" />
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

        <div className="mode-indicator">
          <span className={mode === 'fought' ? 'active' : ''}>F</span>
          <span className={mode === 'remembered' ? 'active' : ''}>R</span>
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
        <img src={LogoIcon} alt="BKLYN" className="footer-logo" />
        <span className="footer-text">CENTER FOR BROOKLYN HISTORY</span>
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
          background: transparent;
          cursor: pointer;
          font-family: 'Bebas Neue', 'Impact', sans-serif;
          font-size: 20px;
          letter-spacing: 2px;
          transition: all 0.3s ease;
          color: #3D3D3D;
        }

        .mode-icon {
          width: 40px;
          height: 40px;
          filter: brightness(0) saturate(100%);
        }

        /* FOUGHT button styling */
        .mode-btn.fought {
          background: transparent;
          color: #6B3737;
        }

        .mode-btn.fought .mode-icon {
          filter: invert(25%) sepia(28%) saturate(1647%) hue-rotate(332deg) brightness(88%) contrast(86%);
        }

        .mode-btn.fought.active {
          background: #6B3737;
          color: #F5F1E8;
        }

        .mode-btn.fought.active .mode-icon {
          filter: brightness(0) saturate(100%) invert(96%) sepia(6%) saturate(545%) hue-rotate(352deg) brightness(102%) contrast(93%);
        }

        /* REMEMBERED button styling */
        .mode-btn.remembered {
          background: #F5F1E8;
          border: 2px solid #2B4560;
          color: #2B4560;
        }

        .mode-btn.remembered .mode-icon {
          filter: invert(23%) sepia(25%) saturate(1534%) hue-rotate(174deg) brightness(95%) contrast(89%);
        }

        .mode-btn.remembered.active {
          background: #2B4560;
          color: #F5F1E8;
          border: 2px solid #2B4560;
        }

        .mode-btn.remembered.active .mode-icon {
          filter: brightness(0) saturate(100%) invert(96%) sepia(6%) saturate(545%) hue-rotate(352deg) brightness(102%) contrast(93%);
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
          gap: 6px;
          transition: all 0.3s ease;
        }

        .location-marker:hover {
          transform: translate(-50%, -50%) scale(1.15);
          z-index: 6;
        }

        .marker-pin {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 2px solid #F5F1E8;
          position: relative;
        }

        .location-marker.fought .marker-pin {
          background: #6B3737;
          box-shadow: 0 2px 6px rgba(107, 55, 55, 0.4);
        }

        .location-marker.remembered .marker-pin {
          background: #2B4560;
          box-shadow: 0 2px 6px rgba(43, 69, 96, 0.4);
        }

        .marker-pin::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
        }

        .location-marker.fought .marker-pin::after {
          border-top: 8px solid #6B3737;
        }

        .location-marker.remembered .marker-pin::after {
          border-top: 8px solid #2B4560;
        }

        .marker-label {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.5px;
          color: #3D3D3D;
          background: rgba(245, 241, 232, 0.95);
          padding: 4px 8px;
          border-radius: 3px;
          white-space: nowrap;
          text-align: center;
          max-width: 120px;
          line-height: 1.2;
          border: 1px solid #D5CDB8;
        }

        .mode-indicator {
          position: absolute;
          left: 30px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          gap: 8px;
          background: #2B4560;
          padding: 12px 16px;
          border-radius: 30px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .mode-indicator span {
          font-family: 'Bebas Neue', 'Impact', sans-serif;
          font-size: 18px;
          color: #8896A8;
          transition: all 0.3s ease;
        }

        .mode-indicator span.active {
          color: #F5F1E8;
          font-size: 22px;
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
          gap: 15px;
          padding: 15px 30px;
          background: transparent;
        }

        .footer-logo {
          height: 25px;
        }

        .footer-text {
          font-size: 11px;
          letter-spacing: 1px;
          color: #3D3D3D;
          font-weight: 600;
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

          .mode-indicator {
            left: 15px;
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
