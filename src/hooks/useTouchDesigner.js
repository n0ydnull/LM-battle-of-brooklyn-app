// HTTP-based TouchDesigner Hook (using Web Server DAT)
// src/hooks/useTouchDesigner.js

import { useState, useEffect, useRef, useCallback } from 'react';

const TD_CONFIG = {
  host: 'localhost',
  port: 9980,  // Default Web Server DAT port
  protocol: 'http'
};

export const useTouchDesigner = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [playbackState, setPlaybackState] = useState('stopped');
  const [error, setError] = useState(null);
  
  const statusPollInterval = useRef(null);
  const isPolling = useRef(false);

  // Build HTTP URL
  const getBaseUrl = () => {
    const { protocol, host, port } = TD_CONFIG;
    return `${protocol}://${host}:${port}`;
  };

  // Send HTTP POST request to TouchDesigner
  const sendMessage = useCallback(async (type, data = {}) => {
    try {
      const url = getBaseUrl();
      console.log('[React] Sending:', type);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          data,
          timestamp: Date.now()
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('[React] Response:', result.type || result.status);
      
      // Update state based on response
      if (result.type) {
        handleStateUpdate(result.type, result.data);
      }
      
      return result;
      
    } catch (err) {
      console.error('[React] Request error:', err.message);
      setError(err.message);
      setIsConnected(false);
      return null;
    }
  }, []);

  // Handle state updates from TD responses
  const handleStateUpdate = useCallback((type, data) => {
    switch (type) {
      case 'ready':
        setPlaybackState('ready');
        setError(null);
        break;
      case 'loading':
        setPlaybackState('loading');
        break;
      case 'playing':
        setPlaybackState('playing');
        setError(null);
        break;
      case 'paused':
        setPlaybackState('paused');
        break;
      case 'stopped':
        setPlaybackState('stopped');
        break;
      case 'status':
        if (data && data.playbackState) {
          setPlaybackState(data.playbackState);
        }
        break;
      default:
        break;
    }
  }, []);

  // Check connection by sending handshake
  const checkConnection = useCallback(async () => {
    try {
      const result = await sendMessage('handshake', {
        client: 'battle-of-brooklyn-kiosk',
        version: '1.0'
      });
      
      if (result && result.status === 'success') {
        setIsConnected(true);
        setError(null);
        return true;
      } else {
        setIsConnected(false);
        return false;
      }
    } catch (err) {
      setIsConnected(false);
      return false;
    }
  }, [sendMessage]);

  // Poll status from TouchDesigner
  const pollStatus = useCallback(async () => {
    if (!isPolling.current) return;
    
    try {
      await sendMessage('get_status');
    } catch (err) {
      // Polling error - will try again next interval
    }
  }, [sendMessage]);

  // Start status polling (every 2 seconds)
  const startPolling = useCallback(() => {
    if (statusPollInterval.current) return;
    
    isPolling.current = true;
    statusPollInterval.current = setInterval(() => {
      pollStatus();
    }, 2000);
  }, [pollStatus]);

  // Stop status polling
  const stopPolling = useCallback(() => {
    isPolling.current = false;
    if (statusPollInterval.current) {
      clearInterval(statusPollInterval.current);
      statusPollInterval.current = null;
    }
  }, []);

  // API methods
  const selectLocation = useCallback(async (location, mode) => {
    console.log('[React] Select location:', location.name);
    setPlaybackState('loading');
    
    const result = await sendMessage('select_location', {
      locationId: location.id,
      trigger: location.touchDesignerTrigger,
      mode,
      name: location.name,
    });
    
    return result !== null;
  }, [sendMessage]);

  const play = useCallback(async () => {
    console.log('[React] Play');
    return await sendMessage('play');
  }, [sendMessage]);

  const pause = useCallback(async () => {
    console.log('[React] Pause');
    return await sendMessage('pause');
  }, [sendMessage]);

  const stop = useCallback(async () => {
    console.log('[React] Stop');
    return await sendMessage('stop');
  }, [sendMessage]);

  const changeMode = useCallback(async (mode) => {
    console.log('[React] Change mode:', mode);
    return await sendMessage('change_mode', { mode });
  }, [sendMessage]);

  // Initialize on mount
  useEffect(() => {
    console.log('[React] Initializing HTTP connection...');
    
    // Check connection
    checkConnection().then((connected) => {
      if (connected) {
        console.log('[React] Connected to TouchDesigner Web Server');
        startPolling();
      } else {
        console.warn('[React] Failed to connect to TouchDesigner');
      }
    });

    return () => {
      stopPolling();
    };
  }, [checkConnection, startPolling, stopPolling]);

  return {
    isConnected,
    playbackState,
    isLoading: playbackState === 'loading',
    isPlaying: playbackState === 'playing',
    isPaused: playbackState === 'paused',
    isReady: playbackState === 'ready',
    error,
    selectLocation,
    play,
    pause,
    stop,
    changeMode,
    checkConnection,
  };
};

export default useTouchDesigner;