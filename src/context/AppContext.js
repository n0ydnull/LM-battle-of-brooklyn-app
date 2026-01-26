import React, { createContext, useContext, useState, useEffect } from 'react';
import { MODES } from '../utils/constants';
import { useTouchDesigner } from '../hooks/useTouchDesigner';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [mode, setMode] = useState(MODES.FOUGHT);
  const [selectedLocation, setSelectedLocation] = useState(null);
  
  const td = useTouchDesigner();

  // Register video end callback for TouchDesigner
  useEffect(() => {
    window.tdVideoEndCallback = () => {
      console.log('[App] Video ended via TD - closing modal');
      clearSelection();
    };
    
    return () => {
      delete window.tdVideoEndCallback;
    };
  }, []);

  const switchMode = (newMode) => {
    console.log('[App] Switching mode:', mode, '→', newMode);
    setMode(newMode);
    setSelectedLocation(null);
    // REMOVED: td.changeMode(newMode) - this function doesn't exist!
    // Mode is passed to TD when selectLocation is called
    if (td.isPlaying) {
      td.stop();
    }
  };

  const selectLocation = (location) => {
    console.log('[App] Selecting location:', location.name);
    setSelectedLocation(location);
    // Mode is passed here - no need for separate changeMode call
    td.selectLocation(location, mode);
  };

  const clearSelection = () => {
    console.log('[App] Clearing selection');
    setSelectedLocation(null);
    if (td.isPlaying) {
      td.stop();
    }
  };

  const value = {
    mode,
    setMode: switchMode,
    selectedLocation,
    selectLocation,
    clearSelection,
    td,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;