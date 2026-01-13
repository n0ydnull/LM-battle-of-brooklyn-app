// Location data for Battle of Brooklyn interactive map
// Coordinates are percentages (0-100) relative to the map container
// This allows for responsive scaling

export const locations = {
  fought: [
    {
      id: 'wallabout-bay',
      name: 'Wallabout Bay',
      x: 65, // Percentage from left
      y: 28, // Percentage from top
      touchDesignerTrigger: 'fought_wallabout_bay',
      description: '',
    },
    {
      id: 'pebble-beach',
      name: 'Pebble Beach',
      x: 60,
      y: 31,
      touchDesignerTrigger: 'fought_pebble_beach',
      description: '',
    },
    {
      id: 'prison-ship-martyrs-monument',
      name: 'Prison Ship Martyrs Monument',
      x: 65,
      y: 36,
      touchDesignerTrigger: 'fought_prison_ship_monument',
      description: '',
    },
    {
      id: 'thayer-st-s',
      name: 'Thayer St S',
      x: 58,
      y: 38,
      touchDesignerTrigger: 'fought_thayer_st',
      description: '',
    },
    {
      id: 'howards-5th-historic-marker',
      name: "Howard's 5th Historic Marker",
      x: 85,
      y: 41,
      touchDesignerTrigger: 'fought_howards_marker',
      description: '',
    },
    {
      id: 'old-stone-house-brooklyn',
      name: 'Old Stone House of Brooklyn',
      x: 62,
      y: 45,
      touchDesignerTrigger: 'fought_old_stone_house',
      description: '',
    },
    {
      id: 'battle-pass-historic-marker',
      name: 'Battle Pass Historic Marker',
      x: 68,
      y: 48,
      touchDesignerTrigger: 'fought_battle_pass',
      description: '',
    },
    {
      id: 'melody-lanes',
      name: 'Melody Lanes',
      x: 54,
      y: 55,
      touchDesignerTrigger: 'fought_melody_lanes',
      description: '',
    },
  ],
  remembered: [
    {
      id: 'prison-ship-martyrs-monument-mem',
      name: 'Prison Ship Martyrs Monument',
      x: 62,
      y: 36,
      touchDesignerTrigger: 'remembered_prison_ship_monument',
      description: '',
    },
    {
      id: 'old-stone-house-brooklyn-mem',
      name: 'Old Stone House of Brooklyn',
      x: 64,
      y: 45,
      touchDesignerTrigger: 'remembered_old_stone_house',
      description: '',
    },
    {
      id: 'brooklyn-museum',
      name: 'Brooklyn Museum',
      x: 67,
      y: 47,
      touchDesignerTrigger: 'remembered_brooklyn_museum',
      description: '',
    },
    {
      id: 'dongan-oak-monument',
      name: 'Dongan Oak Monument',
      x: 65,
      y: 49,
      touchDesignerTrigger: 'remembered_dongan_oak',
      description: '',
    },
    {
      id: 'maryland-monument',
      name: 'Maryland Monument',
      x: 65,
      y: 52,
      touchDesignerTrigger: 'remembered_maryland_monument',
      description: '',
    },
    {
      id: 'altar-liberty-minerva',
      name: 'Altar to Liberty - Minerva Statue',
      x: 58,
      y: 54,
      touchDesignerTrigger: 'remembered_minerva_statue',
      description: '',
    },
    {
      id: 'verrazzano-narrows-bridge',
      name: 'Verrazzano Narrows Bridge',
      x: 38,
      y: 76,
      touchDesignerTrigger: 'remembered_verrazzano_bridge',
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
