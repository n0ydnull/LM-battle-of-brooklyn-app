import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X } from 'lucide-react';
import { IconProjector } from '../../assets';
import './LoadingModal.css';

const LoadingModal = () => {
  const { selectedLocation, clearSelection, td } = useApp();

  // Auto-play when video is ready - but NOT if paused
  useEffect(() => {
    // FIXED: Also check !td.isPaused to prevent auto-play after manual pause
    if (selectedLocation && td.isReady && !td.isPlaying && !td.isLoading && !td.isPaused) {
      console.log('[Modal] Auto-playing:', selectedLocation.name);
      td.play();
    }
  }, [selectedLocation, td.isReady, td.isPlaying, td.isLoading, td.isPaused]);
  //                                                              ^^^^^^^^^^^ ADDED THIS

  if (!selectedLocation) return null;

  const handleClose = () => {
    clearSelection();
  };

  const togglePlayPause = () => {
    console.log('[Modal] Toggle play/pause');
    if (td.isPlaying) {
      td.pause();
    } else {
      td.play();
    }
  };

  const getStatusMessage = () => {
    if (!td.isConnected) {
      return 'NOT CONNECTED TO TOUCHDESIGNER';
    }
    if (td.isLoading) {
      return 'LOADING BATTLE STORY...';
    }
    if (td.isPlaying) {
      return 'DISPLAYING BATTLE STORY ON THE PROJECTION WALL.';
    }
    if (td.isPaused) {
      return 'PAUSED - CLICK PLAY TO RESUME.';
    }
    if (td.error) {
      return 'ERROR: ' + td.error.toUpperCase();
    }
    return 'READY TO PLAY';
  };

  return (
    <div className="loading-modal">
      <div className="loading-modal__overlay" onClick={handleClose}></div>
      
      <div className="loading-modal__content">
        <button 
          className="loading-modal__close"
          onClick={handleClose}
          aria-label="Close modal"
        >
          <X size={36} color="#00263A" strokeWidth={2} />
        </button>

        <h2 className="loading-modal__title">BATTLE OF BROOKLYN</h2>

        <div className="loading-modal__center">
          {td.isLoading ? (
            <div className="loading-modal__spinner-container">
              <div className="loading-spinner">
                <div className="loading-spinner__track"></div>
                <div className="loading-spinner__progress"></div>
              </div>
              <span className="loading-modal__loading-text">LOADING</span>
            </div>
          ) : (
            <button 
              className="loading-modal__play-button"
              onClick={togglePlayPause}
              disabled={!td.isConnected}
              aria-label={td.isPlaying ? "Pause playback" : "Play video"}
            >
              {td.isPlaying ? (
                <svg viewBox="0 0 100 100" className="loading-modal__play-icon">
                  <rect x="30" y="25" width="15" height="50" fill="#00263A"/>
                  <rect x="55" y="25" width="15" height="50" fill="#00263A"/>
                </svg>
              ) : (
                <svg viewBox="0 0 100 100" className="loading-modal__play-icon">
                  <polygon points="35,25 35,75 75,50" fill="#00263A"/>
                </svg>
              )}
            </button>
          )}
        </div>

        <div className="loading-modal__status">
          <img 
            src={IconProjector} 
            alt="Projector" 
            className="loading-modal__projector-icon"
          />
          <p className="loading-modal__message">
            {getStatusMessage()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingModal;
