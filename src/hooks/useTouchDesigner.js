// src/hooks/useTouchDesigner.js
// FIXED: Memoized config to prevent infinite re-renders

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { getTDConfig } from '../config/touchdesigner';

const VERBOSE_LOGGING = false;

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
  // FIXED: Memoize config so it doesn't change on every render
  const config = useMemo(() => getTDConfig(), []);
  const TD_HTTP_URL = useMemo(() => config.httpUrl, [config.httpUrl]);
  const TD_WS_URL = useMemo(() => config.wsUrl, [config.wsUrl]);

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
      console.log('[TD WS] Received:', message.type);

      switch (message.type) {
        case 'connected':
          setIsConnected(true);
          setError(null);
          break;

        case 'video_end':
          console.log('[TD] Video ended');
          setIsPlaying(false);
          setIsReady(false);
          setIsPaused(false);
          
          if (window.tdVideoEndCallback) {
            window.tdVideoEndCallback();
          }
          break;

        case 'playback_started':
          console.log('[TD] Playback started');
          setIsPlaying(true);
          setIsPaused(false);
          break;

        case 'playback_paused':
          console.log('[TD] Playback paused');
          setIsPlaying(false);
          setIsPaused(true);
          break;

        case 'playback_stopped':
          console.log('[TD] Playback stopped');
          setIsPlaying(false);
          setIsPaused(false);
          setIsReady(false);
          break;

        case 'error':
          log.error(message.data.message || 'Unknown error');
          setError(message.data.message || 'Unknown error');
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
        console.log('[TD] WebSocket connected');
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

    console.log('[TD] Resetting state for new location');
    setIsPlaying(false);
    setIsPaused(false);
    setIsReady(false);
    setIsLoading(true);
    setError(null);

    const result = await sendCommand('select_location', {
      trigger: location.touchDesignerTrigger,
      name: location.name,
      mode: mode ?? location?.mode ?? null,
      locationId: location.id
    });

    if (result.status === 'success') {
      console.log('[TD] Location loaded successfully');
      setIsReady(true);
      setIsLoading(false);
    } else {
      console.log('[TD] Location load failed:', result.message);
      setError(result.message);
      setIsLoading(false);
      setIsReady(false);
    }

    return result;
  }, [sendCommand]);

  const play = useCallback(async () => {
    console.log('[TD] Play command');
    const result = await sendCommand('play');
    return result;
  }, [sendCommand]);

  const pause = useCallback(async () => {
    console.log('[TD] Pause command');
    const result = await sendCommand('pause');
    return result;
  }, [sendCommand]);

  const stop = useCallback(async () => {
    console.log('[TD] Stop command');
    const result = await sendCommand('stop');
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