import React, { useEffect } from 'react';
import './App.css';
import { AppProvider } from './context/AppContext';
import ModeToggle from './components/ModeToggle';
import MapView from './components/MapView';
import ZoomInstruction from './components/ZoomInstruction';
import BrandingFooter from './components/BrandingFooter';
import LoadingModal from './components/LoadingModal';

function App() {
  // ADD THIS TO CHECK ACTUAL VIEWPORT
  useEffect(() => {
    console.log('=== VIEWPORT INFO ===');
    console.log('CSS Viewport:', window.innerWidth, 'x', window.innerHeight);
    console.log('Physical Resolution:', window.screen.width, 'x', window.screen.height);
    console.log('Device Pixel Ratio:', window.devicePixelRatio);
    console.log('====================');
  }, []);

  return (
    <AppProvider>
      <div className="App">
        <MapView />
        <ZoomInstruction />
        <BrandingFooter />
        <ModeToggle />
        <LoadingModal />
      </div>
    </AppProvider>
  );
}

export default App;