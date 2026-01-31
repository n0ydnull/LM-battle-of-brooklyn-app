// src/hooks/useTouchDesigner.js

import { useState, useEffect, useCallback, useRef } from 'react';
import { getTDConfig } from '../config/touchdesigner';

// Enable verbose logging (set to false for production)
const VERBOSE_LOGGING = true;

const log = {
  info: (msg) => {
    if (VERBOSE_LOGGING) console.log(`[TD] ${msg}`);
  },
  ws: (msg) => {
    if (VERBOSE_LOGGING) console.log(`[TD WS] ${msg}`);
  },
  error: (msg) => {
    console.error(`[TD] ERROR: ${msg}`);
  }
};

export const useTouchDesigner = () => {
  const config = getTDConfig();
  const TD_HTTP_URL = config.httpUrl;
  const TD_WS_URL = config.wsUrl;

  log.info(`URLs: ${TD_HTTP_URL}, ${TD_WS_URL}`);

  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [error, setError] = useState(null);
  
  const wsRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);

  const handleWebSocketMessage = useCallback((event) => {
    try {
      const message = JSON.parse(event.data);
      log.ws(`Received: ${message.type}`);

      switch (message.type) {
        case 'connected':
          setIsConnected(true);
          setError(null);
          break;

        case 'video_end':
          log.info('Video ended');
          setIsPlaying(false);
          setIsReady(false);
          setIsPaused(false);
          
          if (window.tdVideoEndCallback) {
            window.tdVideoEndCallback();
          }
          break;

        case 'playback_started':
          log.info('Playback started');
          // FIXED: When playback starts, we're ready and no longer loading
          setIsPlaying(true);
          setIsPaused(false);
          setIsReady(true);
          setIsLoading(false);
          break;

        case 'playback_paused':
          log.info('Playback paused');
          setIsPlaying(false);
          setIsPaused(true);
          break;

        case 'playback_stopped':
          log.info('Playback stopped');
          setIsPlaying(false);
          setIsPaused(false);
          setIsReady(false);
          break;

        case 'error':
          log.error(message.data.message || 'Unknown error');
          setError(message.data.message || 'Unknown error');
          setIsLoading(false);
          break;

        default:
          log.ws(`Unknown message type: ${message.type}`);
      }
    } catch (err) {
      log.error(`Parse error: ${err.message}`);
    }
  }, []);

  const connectWebSocket = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    try {
      log.ws('Connecting...');
      const ws = new WebSocket(TD_WS_URL);

      ws.onopen = () => {
        console.log('[TD] Connected'); // Always show connection
        setIsConnected(true);
        setError(null);
      };

      ws.onmessage = handleWebSocketMessage;

      ws.onerror = () => {
        log.error(`Connection failed: ${config.host}:${config.port}`);
        setError(`Cannot connect to ${config.host}:${config.port}`);
        setIsConnected(false);
      };

      ws.onclose = () => {
        log.ws('Disconnected');
        setIsConnected(false);
        wsRef.current = null;

        // Auto-reconnect
        reconnectTimeoutRef.current = setTimeout(() => {
          log.ws('Reconnecting...');
          connectWebSocket();
        }, 3000);
      };

      wsRef.current = ws;

    } catch (err) {
      log.error(`WebSocket error: ${err.message}`);
      setError(err.message);
      setIsConnected(false);
    }
  }, [TD_WS_URL, config.host, config.port, handleWebSocketMessage]);

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [connectWebSocket]);

  const sendCommand = useCallback(async (type, data = {}) => {
    try {
      log.info(`Command: ${type}`);
      
      const response = await fetch(TD_HTTP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, data })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.status === 'error') {
        throw new Error(result.message || 'Unknown error');
      }

      return result;

    } catch (err) {
      log.error(`${type} failed: ${err.message}`);
      setError(err.message);
      return { status: 'error', message: err.message };
    }
  }, [TD_HTTP_URL]);

  const selectLocation = useCallback(async (location, mode) => {
    log.info(`Selecting: ${location?.name}`);

    if (!location?.touchDesignerTrigger) {
      const msg = 'Invalid location: missing touchDesignerTrigger';
      setError(msg);
      return { status: 'error', message: msg };
    }

    // Set loading immediately
    setIsLoading(true);
    setIsReady(false);
    setIsPlaying(false);
    setIsPaused(false);
    setError(null);

    const result = await sendCommand('select_location', {
      trigger: location.touchDesignerTrigger,
      name: location.name,
      mode: mode ?? location?.mode ?? null,
      locationId: location.id
    });

    if (result.status === 'success') {
      // DON'T set isReady or turn off isLoading here
      // TouchDesigner will auto-play after loading and send 'playback_started' via WebSocket
      // The WebSocket message handler will update isPlaying, isReady, and turn off isLoading
      log.info('Video load initiated, waiting for TD to start playback...');
    } else {
      setError(result.message);
      setIsLoading(false);
      setIsReady(false);
    }

    return result;
  }, [sendCommand]);


  const play = useCallback(async () => {
    const result = await sendCommand('play');
    if (result.status === 'success') {
      // States will be updated by WebSocket message
      log.info('Play command sent');
    }
    return result;
  }, [sendCommand]);

  const pause = useCallback(async () => {
    const result = await sendCommand('pause');
    if (result.status === 'success') {
      // States will be updated by WebSocket message
      log.info('Pause command sent');
    }
    return result;
  }, [sendCommand]);

  const stop = useCallback(async () => {
    const result = await sendCommand('stop');
    if (result.status === 'success') {
      // States will be updated by WebSocket message
      log.info('Stop command sent');
    }
    return result;
  }, [sendCommand]);

  return {
    isConnected,
    isLoading,
    isReady,
    isPlaying,
    isPaused,
    error,
    config,
    selectLocation,
    play,
    pause,
    stop
  };
};

export default useTouchDesigner;