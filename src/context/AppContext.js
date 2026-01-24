import React, { createContext, useContext, useState } from 'react';
import { MODES } from '../utils/constants';
import { useTouchDesigner } from '../hooks/useTouchDesigner';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [mode, setMode] = useState(MODES.FOUGHT);
  const [selectedLocation, setSelectedLocation] = useState(null);
  
  const td = useTouchDesigner();

  const switchMode = (newMode) => {
    setMode(newMode);
    setSelectedLocation(null);
    td.changeMode(newMode);
    td.stop();
  };

  const selectLocation = (location) => {
    console.log('[App] Selecting location:', location.name);
    setSelectedLocation(location);
    td.selectLocation(location, mode);
  };

  const clearSelection = () => {
    setSelectedLocation(null);
    td.stop();
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