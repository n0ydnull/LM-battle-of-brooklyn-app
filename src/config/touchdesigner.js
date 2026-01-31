// src/config/touchdesigner.js

/**
 * TouchDesigner Connection Configuration
 * PRODUCTION VERSION - Minimal logging
 */

// Enable verbose logging (set to false for production)
const VERBOSE_LOGGING = true;

const log = {
  info: (msg) => {
    if (VERBOSE_LOGGING) console.log(`[TD Config] ${msg}`);
  },
  error: (msg) => {
    console.error(`[TD Config] ERROR: ${msg}`);
  }
};

export const getTDConfig = () => {
  // Check localStorage for user settings
  const saved = localStorage.getItem('td_config');
  
  if (saved) {
    try {
      const config = JSON.parse(saved);
      log.info('Using saved config');
      
      return {
        host: config.host,
        port: config.port || '9980',
        httpUrl: `http://${config.host}:${config.port || '9980'}`,
        wsUrl: `ws://${config.host}:${config.port || '9980'}`
      };
    } catch (error) {
      log.error('Error parsing saved config');
    }
  }

  // Use environment variables
  const host = process.env.REACT_APP_TD_HOST || 'localhost';
  const port = process.env.REACT_APP_TD_PORT || '9980';

  log.info(`Using env config: ${host}:${port}`);

  return {
    host,
    port,
    httpUrl: `http://${host}:${port}`,
    wsUrl: `ws://${host}:${port}`
  };
};

export const TD_CONFIG = getTDConfig();

export const updateTDConfig = (host, port) => {
  const config = { host, port };
  localStorage.setItem('td_config', JSON.stringify(config));
  log.info('Config updated');
  return getTDConfig();
};

export const clearTDConfig = () => {
  localStorage.removeItem('td_config');
  log.info('Config cleared');
};