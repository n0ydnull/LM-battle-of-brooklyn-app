import React from 'react';
import './App.css';
import { AppProvider } from './context/AppContext';
import ModeToggle from './components/ModeToggle';
import MapView from './components/MapView';
import ZoomInstruction from './components/ZoomInstruction';

function App() {
  return (
    <AppProvider>
      <div className="App">
        <MapView />
        <ZoomInstruction />
        <ModeToggle />
      </div>
    </AppProvider>
  );
}

export default App;