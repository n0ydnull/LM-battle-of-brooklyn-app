import React from 'react';
import './App.css';
import { AppProvider } from './context/AppContext';
import ModeToggle from './components/ModeToggle';
import MapView from './components/MapView';

function App() {
  return (
    <AppProvider>
      <div className="App">
        <MapView />
        <ModeToggle />
      </div>
    </AppProvider>
  );
}

export default App;