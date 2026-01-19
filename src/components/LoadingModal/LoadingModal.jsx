import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { IconClose, IconProjector } from '../../assets';
import './LoadingModal.css';

const LoadingModal = () => {
  const { selectedLocation, clearSelection } = useApp();
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  // Simulate loading completion after 3 seconds
  useEffect(() => {
    if (selectedLocation) {
      setIsLoading(true);
      setIsPlaying(false);
      
      const timer = setTimeout(() => {
        setIsLoading(false);
        setIsPlaying(true);
      }, 3000); // 3 second loading time

      return () => clearTimeout(timer);
    }
  }, [selectedLocation]);

  if (!selectedLocation) return null;

  const handleClose = () => {
    clearSelection();
    setIsLoading(true);
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="loading-modal">
      {/* Overlay background */}
      <div className="loading-modal__overlay" onClick={handleClose}></div>
      
      {/* Modal content */}
      <div className="loading-modal__content">
        {/* Close button */}
        <button 
          className="loading-modal__close"
          onClick={handleClose}
          aria-label="Close modal"
        >
          <img src={IconClose} alt="Close" />
        </button>

        {/* Title */}
        <h2 className="loading-modal__title">BATTLE OF BROOKLYN</h2>

        {/* Center content - changes based on state */}
        <div className="loading-modal__center">
          {isLoading ? (
            /* LOADING STATE - Spinner */
            <div className="loading-modal__spinner-container">
              <div className="loading-spinner">
                <div className="loading-spinner__track"></div>
                <div className="loading-spinner__progress"></div>
              </div>
              <span className="loading-modal__loading-text">LOADING</span>
            </div>
          ) : (
            /* PLAYING/PAUSED STATE - Play/Pause Button */
            <button 
              className={`loading-modal__play-button ${isPlaying ? 'loading-modal__play-button--playing' : ''}`}
              onClick={togglePlayPause}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                /* Pause icon - two vertical bars */
                <svg viewBox="0 0 100 100" className="loading-modal__play-icon">
                  <rect x="30" y="25" width="15" height="50" fill="currentColor"/>
                  <rect x="55" y="25" width="15" height="50" fill="currentColor"/>
                </svg>
              ) : (
                /* Play icon - triangle */
                <svg viewBox="0 0 100 100" className="loading-modal__play-icon">
                  <polygon points="35,25 35,75 75,50" fill="currentColor"/>
                </svg>
              )}
            </button>
          )}
        </div>

        {/* Status section (icon + message) - only show when not loading */}
        {!isLoading && (
          <div className="loading-modal__status">
            <img 
              src={IconProjector} 
              alt="Projector" 
              className="loading-modal__projector-icon"
            />
            <p className="loading-modal__message">
              {isPlaying 
                ? 'DISPLAYING BATTLE STORY ON THE PROJECTION WALL.'
                : 'PAUSED - CLICK PLAY TO RESUME.'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingModal;
