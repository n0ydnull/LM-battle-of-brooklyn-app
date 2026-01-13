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

// Tablet specifications (Samsung Galaxy Tab S9+ 14.6")
export const DEVICE = {
  width: 3544,
  height: 2362.96,
  aspectRatio: 3544 / 2362.96,
};

// TouchDesigner communication settings
export const TOUCHDESIGNER = {
  host: 'localhost', // Update with actual TouchDesigner host
  port: 8080, // Update with actual port
  protocol: 'ws', // WebSocket
};
