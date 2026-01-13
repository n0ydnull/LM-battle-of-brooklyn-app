import React from 'react';
import { useApp } from '../../context/AppContext';
import { MODES } from '../../utils/constants';
import { IconGunsActive, IconGuns, IconMonumentActive, IconMonument } from '../../assets';
import './ModeToggle.css';

const ModeToggle = () => {
  const { mode, setMode } = useApp();

  const handleModeChange = (newMode) => {
    setMode(newMode);
  };

  return (
    <div className="mode-toggle">
      <button
        className={`mode-button mode-button--fought ${mode === MODES.FOUGHT ? 'active' : ''}`}
        onClick={() => handleModeChange(MODES.FOUGHT)}
        aria-label="Switch to Fought mode"
        aria-pressed={mode === MODES.FOUGHT}
      >
        <img 
          src={mode === MODES.FOUGHT ? IconGunsActive : IconGuns} 
          alt="" 
          className="mode-button__icon"
        />
        <span className="mode-button__text">FOUGHT</span>
      </button>

      <button
        className={`mode-button mode-button--remembered ${mode === MODES.REMEMBERED ? 'active' : ''}`}
        onClick={() => handleModeChange(MODES.REMEMBERED)}
        aria-label="Switch to Remembered mode"
        aria-pressed={mode === MODES.REMEMBERED}
      >
        <img 
          src={mode === MODES.REMEMBERED ? IconMonumentActive : IconMonument} 
          alt="" 
          className="mode-button__icon"
        />
        <span className="mode-button__text">REMEMBERED</span>
      </button>
    </div>
  );
};

export default ModeToggle;
