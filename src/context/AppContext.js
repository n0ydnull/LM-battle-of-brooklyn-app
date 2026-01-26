import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { MODES } from '../utils/constants';
import { useTouchDesigner } from '../hooks/useTouchDesigner';

const AppContext = createContext();

const CLIP_DURATION_MS = 55_000;
const TICK_MS = 100;

export const AppProvider = ({ children }) => {
  const [mode, setMode] = useState(MODES.FOUGHT);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Modal timer (web-app controlled)
  const [elapsedMs, setElapsedMs] = useState(0);
  const elapsedRef = useRef(0);
  const startRef = useRef(null);
  const intervalRef = useRef(null);

  const td = useTouchDesigner();

  const stopModalTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    startRef.current = null;
  }, []);

  const resetModalTimer = useCallback(() => {
    elapsedRef.current = 0;
    setElapsedMs(0);
    startRef.current = null;
  }, []);

  const pauseModalTimer = useCallback(() => {
    if (!intervalRef.current) return;

    const now = performance.now();
    if (startRef.current != null) {
      const next = Math.min(CLIP_DURATION_MS, elapsedRef.current + (now - startRef.current));
      elapsedRef.current = next;
      setElapsedMs(next);
    }

    stopModalTimer();
  }, [stopModalTimer]);

  const startModalTimer = useCallback(() => {
    if (intervalRef.current) return;

    startRef.current = performance.now();

    intervalRef.current = setInterval(() => {
      const now = performance.now();
      const segmentMs = now - (startRef.current ?? now);
      const next = Math.min(CLIP_DURATION_MS, elapsedRef.current + segmentMs);

      elapsedRef.current = next;
      setElapsedMs(next);
      startRef.current = now;

      if (next >= CLIP_DURATION_MS) {
        // Time reached: close modal
        stopModalTimer();
        console.log('[App] Timer reached 55s - closing modal');

        // Stop TD playback if needed
        if (td?.isPlaying) td.stop();

        setSelectedLocation(null);
      }
    }, TICK_MS);
  }, [stopModalTimer, td]);

  // Register video end callback for TouchDesigner (still supported)
  useEffect(() => {
    window.tdVideoEndCallback = () => {
      console.log('[App] Video ended via TD - closing modal');
      clearSelection();
    };

    return () => {
      delete window.tdVideoEndCallback;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearSelection = useCallback(() => {
    console.log('[App] Clearing selection');
    setSelectedLocation(null);

    stopModalTimer();
    resetModalTimer();

    if (td.isPlaying) {
      td.stop();
    }
  }, [resetModalTimer, stopModalTimer, td]);

  const switchMode = useCallback((newMode) => {
    console.log('[App] Switching mode:', mode, '→', newMode);
    setMode(newMode);

    // Close modal + stop playback + reset timer
    setSelectedLocation(null);
    stopModalTimer();
    resetModalTimer();

    // REMOVED: td.changeMode(newMode) - this function doesn't exist!
    // Mode is passed to TD when selectLocation is called
    if (td.isPlaying) {
      td.stop();
    }
  }, [mode, resetModalTimer, stopModalTimer, td]);

  const selectLocation = useCallback((location) => {
    console.log('[App] Selecting location:', location.name);
    setSelectedLocation(location);

    // Start timer as soon as modal appears
    stopModalTimer();
    resetModalTimer();
    startModalTimer();

    // Mode is passed here - no need for separate changeMode call
    td.selectLocation(location, mode);
  }, [mode, resetModalTimer, startModalTimer, stopModalTimer, td]);

  // Pause/resume timer based on TD playback state WHILE modal is open
  useEffect(() => {
    if (!selectedLocation) {
      // Modal closed: cleanup timer
      stopModalTimer();
      resetModalTimer();
      return;
    }

    // Tie timer to user play/pause actions
    if (td?.isPaused) {
      pauseModalTimer();
    } else if (td?.isPlaying) {
      startModalTimer();
    }
    // If TD is "loading" (neither playing nor paused), timer continues
    // because we started it on selectLocation (per your requirement).
  }, [
    selectedLocation,
    td?.isPaused,
    td?.isPlaying,
    pauseModalTimer,
    startModalTimer,
    stopModalTimer,
    resetModalTimer,
  ]);

  const remainingMs = Math.max(0, CLIP_DURATION_MS - elapsedMs);

  const value = {
    mode,
    setMode: switchMode,
    selectedLocation,
    selectLocation,
    clearSelection,
    td,

    // expose timer data (optional, useful for UI if you want)
    elapsedMs,
    remainingMs,
    clipDurationMs: CLIP_DURATION_MS,
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
