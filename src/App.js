import React from 'react';
import './App.css';
import { AppProvider } from './context/AppContext';
import ModeToggle from './components/ModeToggle';

function App() {
  return (
    <AppProvider>
      <div className="App">
        <ModeToggle />
        {/* MapView will be added next */}
      </div>
    </AppProvider>
  );
}

export default App;