import React from 'react';
import './App.css';
import { AppProvider } from './context/AppContext';
import ModeToggle from './components/ModeToggle';
import MapView from './components/MapView';
import ZoomInstruction from './components/ZoomInstruction';
import BrandingFooter from './components/BrandingFooter';
import LoadingModal from './components/LoadingModal';

function App() {
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