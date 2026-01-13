import React, { createContext, useContext, useState } from 'react';
import { MODES } from '../utils/constants';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [mode, setMode] = useState(MODES.FOUGHT);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const switchMode = (newMode) => {
    setMode(newMode);
    setSelectedLocation(null); // Clear selection when switching modes
  };

  const selectLocation = (location) => {
    setSelectedLocation(location);
    setIsLoading(true);
    
    // Simulate loading for projection wall
    // In real implementation, this would trigger TouchDesigner
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const clearSelection = () => {
    setSelectedLocation(null);
    setIsLoading(false);
  };

  const value = {
    mode,
    setMode: switchMode,
    selectedLocation,
    selectLocation,
    clearSelection,
    isLoading,
    setIsLoading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to use the app context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
