// Location data for Battle of Brooklyn interactive map
// Coordinates are percentages (0-100) relative to the map container
// Updated to match current video basenames (single underscores)

export const locations = {
  fought: [
    {
      id: 'wallabout-bay',
      name: 'WALLABOUT BAY',
      x: 46.5,
      y: 17,
      touchDesignerTrigger: 'Fought_Wallabout_Bay',
      description: '',
    },
    {
      id: 'pebble-beach',
      name: 'PEBBLE BEACH',
      x: 44.3,
      y: 20.5,
      touchDesignerTrigger: 'Fought_Pebble_Beach',
      description: '',
    },
    {
      id: 'trader-joes',
      name: "TRADER JOE'S",
      x: 43.4,
      y: 29.1,
      touchDesignerTrigger: 'Fought_Trader_Joes',
      description: '',
    },
    {
      id: 'howards-inn-historic-marker',
      name: "HOWARD'S INN HISTORIC MARKER",
      x: 62.6,
      y: 33,
      touchDesignerTrigger: 'Fought_Howars_Inn',
      description: '',
    },
    {
      id: 'old-stone-house-brooklyn',
      name: 'OLD STONE HOUSE OF BROOKLYN',
      x: 46.8,
      y: 38.4,
      touchDesignerTrigger: 'Fought_Washington_Park',
      description: '',
    },
    {
      id: 'battle-pass-historic-marker',
      name: 'BATTLE PASS HISTORIC MARKER',
      x: 50,
      y: 41.6,
      touchDesignerTrigger: 'Fought_Battle_Pass',
      description: '',
    },
    {
      id: 'melody-lanes',
      name: 'MELODY LANES',
      x: 41.2,
      y: 50,
      touchDesignerTrigger: 'Fought_Melody_Lane',
      description: '',
    },
    {
      id: 'battle-hill',
      name: 'BATTLE HILL',
      x: 0, // TODO: Get coordinates from Figma
      y: 0, // TODO: Get coordinates from Figma
      touchDesignerTrigger: 'Fought_Battle_Hill',
      description: '',
    },
    {
      id: 'denyse-wharf',
      name: 'DENYSE WHARF',
      x: 0, // TODO: Get coordinates from Figma
      y: 0, // TODO: Get coordinates from Figma
      touchDesignerTrigger: 'Fought_Denyse_Wharf',
      description: '',
    },
  ],
  
  remembered: [
    {
      id: 'prison-ship-martyrs-monument-mem',
      name: 'PRISON SHIP MARTYRS MONUMENT',
      x: 49.7,
      y: 25,
      touchDesignerTrigger: 'Remembered_Prison_Ship_Monument',
      description: '',
    },
    {
      id: 'old-stone-house-brooklyn-mem',
      name: 'OLD STONE HOUSE OF BROOKLYN',
      x: 46.5,
      y: 37,
      touchDesignerTrigger: 'Remembered_Old_Stone_House',
      description: '',
    },
    {
      id: 'brooklyn-museum',
      name: 'BROOKLYN MUSEUM',
      x: 50,
      y: 39.8,
      touchDesignerTrigger: 'Remembered_Brooklyn_Museum',
      description: '',
    },
    {
      id: 'dongan-oak-monument',
      name: 'DONGAN OAK MONUMENT',
      x: 49.2,
      y: 42.6,
      touchDesignerTrigger: 'Remembered_Dongan_Oak',
      description: '',
    },
    {
      id: 'maryland-monument',
      name: 'MARYLAND MONUMENT',
      x: 48.4,
      y: 45.8,
      touchDesignerTrigger: 'Remembered_Maryland_Monument',
      description: '',
    },
    {
      id: 'altar-to-liberty-minerva-statue',
      name: 'ALTAR TO LIBERTY - MINERVA STATUE',
      x: 45.5,
      y: 48,
      touchDesignerTrigger: 'Remembered_Altar_to_Liberty',
      description: '',
    },
    {
      id: 'verrazzano-narrows-bridge',
      name: 'VERRAZZANO-NARROWS BRIDGE',
      x: 34.1,
      y: 75.5,
      touchDesignerTrigger: 'Remembered_Verrazano_Bridge',
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