// Theme colors based on design
export const COLORS = {
  background: '#E8E1CF', // Cream/beige background
  fought: {
    primary: '#5C3838', // Maroon/burgundy
    text: '#5C3838',
  },
  remembered: {
    primary: '#003855', // Dark navy blue
    text: '#003855',
  },
};

// App modes
export const MODES = {
  FOUGHT: 'fought',
  REMEMBERED: 'remembered',
};

// Tablet specifications (Samsung Galaxy Tab S8 Ultra 14.6")
export const DEVICE = {
  width: 2960,
  height: 1848,
  aspectRatio: 2960 / 1848, // ~1.6017 (16:10 aspect ratio)
};

// TouchDesigner communication settings
export const TOUCHDESIGNER = {
  host: 'localhost', // Update with actual TouchDesigner host
  port: 8080, // Update with actual port
  protocol: 'ws', // WebSocket
};