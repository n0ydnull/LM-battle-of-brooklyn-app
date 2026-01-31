// Location data for Battle of Brooklyn interactive map
// Coordinates are percentages (0-100) relative to the map container
// Updated to match current video basenames (single underscores)

export const locations = {
  fought: [
    {
      id: 'wallabout-bay',
      name: 'WALLABOUT BAY',
      x: 47,
      y: 17.3,
      touchDesignerTrigger: 'Fought_Wallabout_Bay',
      description: '',
    },
    {
      id: 'pebble-beach',
      name: 'PEBBLE BEACH',
      x: 44.2,
      y: 20.3,
      touchDesignerTrigger: 'Fought_Pebble_Beach',
      description: '',
    },
    {
      id: 'trader-joes',
      name: "ATLANTIC AVENUE",
      x: 44.1,
      y: 29.5,
      touchDesignerTrigger: 'Fought_Trader_Joes',
      description: '',
    },
    {
      id: 'howards-inn-historic-marker',
      name: "HOWARD'S INN HISTORIC MARKER",
      x: 67.0,
      y: 33,
      touchDesignerTrigger: 'Fought_Howars_Inn',
      description: '',
    },
    {
      id: 'washinton-park',
      name: 'WASHINGTON PARK',
      x: 45.3,
      y: 37.8,
      touchDesignerTrigger: 'Fought_Washington_Park',
      description: '',
    },
    {
      id: 'battle-pass-historic-marker',
      name: 'BATTLE PASS HISTORIC MARKER',
      x: 51,
      y: 41.6,
      touchDesignerTrigger: 'Fought_Battle_Pass',
      description: '',
    },
    {
      id: 'melody-lanes',
      name: 'MELODY LANES',
      x: 40.2,
      y: 50.3,
      touchDesignerTrigger: 'Fought_Melody_Lane',
      description: '',
    },
    {
      id: 'battle-hill',
      name: 'BATTLE HILL',
      x: 42.6, 
      y: 47.2, 
      touchDesignerTrigger: 'Fought_Battle_Hill',
      description: '',
    },
    {
      id: 'denyse-wharf',
      name: 'DENYSE WHARF',
      x: 36, 
      y: 80.8,
      touchDesignerTrigger: 'Fought_Denyse_Wharf',
      description: '',
    },
  ],
  
  remembered: [
    {
      id: 'prison-ship-martyrs-monument-mem',
      name: 'PRISON SHIP MARTYRS MONUMENT',
      x: 50,
      y: 25.5,
      touchDesignerTrigger: 'Remembered_Prison_Ship_Monument',
      description: '',
    },
    {
      id: 'old-stone-house-brooklyn-mem',
      name: 'OLD STONE HOUSE OF BROOKLYN',
      x: 48,
      y: 36.3,
      touchDesignerTrigger: 'Remembered_Old_Stone_House',
      description: '',
    },
    {
      id: 'brooklyn-museum',
      name: 'BROOKLYN MUSEUM',
      x: 50.5,
      y: 39.4,
      touchDesignerTrigger: 'Remembered_Brooklyn_Museum',
      description: '',
    },
    {
      id: 'dongan-oak-monument',
      name: 'DONGAN OAK MONUMENT',
      x: 50.7,
      y: 42.6,
      touchDesignerTrigger: 'Remembered_Dongan_Oak',
      description: '',
    },
    {
      id: 'maryland-monument',
      name: 'MARYLAND MONUMENT',
      x: 50.5,
      y: 45.8,
      touchDesignerTrigger: 'Remembered_Maryland_Monument',
      description: '',
    },
    {
      id: 'altar-to-liberty-minerva-statue',
      name: 'ALTAR TO LIBERTY - MINERVA STATUE',
      x: 46.3,
      y: 48.4,
      touchDesignerTrigger: 'Remembered_Altar_to_Liberty',
      description: '',
    },
    {
      id: 'verrazzano-narrows-bridge',
      name: 'VERRAZZANO-NARROWS BRIDGE',
      x: 31.6,
      y: 75.6,
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