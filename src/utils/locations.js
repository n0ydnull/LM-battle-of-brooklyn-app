// Location data for Battle of Brooklyn interactive map
// Coordinates are percentages (0-100) relative to the map container
// This allows for responsive scaling

export const locations = {
  fought: [
    {
      id: 'wallabout-bay',
      name: 'Wallabout Bay',
      x: 46.5, // Percentage from left
      y: 17, // Percentage from top
      touchDesignerTrigger: 'fought_wallabout_bay',
      description: '',
    },
    {
      id: 'pebble-beach',
      name: 'Pebble Beach',
      x: 43.8,
      y: 20,
      touchDesignerTrigger: 'fought_pebble_beach',
      description: '',
    },
    {
      id: 'prison-ship-martyrs-monument',
      name: 'Prison Ship Martyrs Monument',
      x: 48,
      y: 26.5,
      touchDesignerTrigger: 'fought_prison_ship_monument',
      description: '',
    },
    {
      id: 'trader-joes',
      name: 'Trader Joe\'s ',
      x: 43.1,
      y: 29.5,
      touchDesignerTrigger: 'trader_joes',
      description: '',
    },

    {
      id: 'howards-inn',
      name: "Howard's Inn",
      x: 60.5,
      y: 32.8,
      touchDesignerTrigger: 'howards-inn',
      description: '',
    },
    {
      id: 'old-stone-house-brooklyn',
      name: 'Old Stone House of Brooklyn',
      x: 46,
      y: 38,
      touchDesignerTrigger: 'old-stone-house-brooklyn',
      description: '',
    },
    {
      id: 'battle-pass',
      name: 'Battle Pass',
      x: 47.6,
      y: 42,
      touchDesignerTrigger: 'battle_pass',
      description: '',
    },
    {
      id: 'melody-lanes',
      name: 'Melody Lanes',
      x: 41.2,
      y: 50,
      touchDesignerTrigger: 'melody_lanes',
      description: '',
    },
  ],
  remembered: [
    {
      id: 'prison-ship-martyrs-monument',
      name: 'Prison Ship Martyrs Monument',
      x: 48,
      y: 26.5,
      touchDesignerTrigger: 'prison-ship-martyrs-monument',
      description: '',
    },
    {
      id: 'old-stone-house-brooklyn',
      name: 'Old Stone House of Brooklyn',
      x: 46.5,
      y: 37,
      touchDesignerTrigger: 'old-stone-house-brooklyn',
      description: '',
    },
    {
      id: 'brooklyn-museum',
      name: 'Brooklyn Museum',
      x: 49.5,
      y: 39.8,
      touchDesignerTrigger: 'brooklyn_museum',
      description: '',
    },
    {
      id: 'dongan-oak-monument',
      name: 'Dongan Oak Monument',
      x: 49.2,
      y: 42.6,
      touchDesignerTrigger: 'dongan-oak-monument',
      description: '',
    },
    {
      id: 'maryland-monument',
      name: 'Maryland Monument',
      x: 48.4,
      y: 45.8,
      touchDesignerTrigger: 'remembered_maryland_monument',
      description: '',
    },
    {
      id: 'altar-liberty-minerva',
      name: 'Altar to Liberty - Minerva Statue',
      x: 45.5,
      y: 48,
      touchDesignerTrigger: 'altar-liberty-minerva',
      description: '',
    },
    {
      id: 'verrazzano-narrows-bridge',
      name: 'Verrazzano Narrows Bridge',
      x: 34.1,
      y: 75.5,
      touchDesignerTrigger: 'verrazzano-narrows-bridge',
      description: '',
    },
  ],
};

// Helper function to get locations by mode
export const getLocationsByMode = (mode) => {
  return locations[mode] || [];
};

// Helper function to find a location by ID
export const getLocationById = (id, mode) => {
  return locations[mode]?.find(location => location.id === id);
};
