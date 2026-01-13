Battle of Brooklyn Interactive Map

An interactive historical map application for the Center for Brooklyn History, showcasing sites where the Battle of Brooklyn was fought and where it is remembered today.
Overview
This application is designed for a Samsung Galaxy Tab S8+ (14.6") tablet interface that controls a projection wall display via TouchDesigner. Users can explore historical battle sites and memorial locations through an interactive Brooklyn map.
Features

Dual Mode Display: Toggle between "Fought" (battle sites) and "Remembered" (memorial sites)
Interactive Brooklyn Map: Zoomable map (mouse wheel) with location markers
Projection Wall Integration: Designed to trigger TouchDesigner content on a separate display
Responsive Design: Scales from development viewport to tablet resolution (3544×2362px)
Historical Context: Explore 8+ battle locations and 7+ memorial sites across Brooklyn

Tech Stack

React 19.2.3
Lucide React 0.562.0 (icons)
React Testing Library (testing)
Custom Fonts: Bebas Neue Pro

Project Structure
src/
├── App.js                      # Main application component
├── App.css                     # Global styles
├── components/
│   ├── MapView/               # Brooklyn map display with zoom
│   │   ├── MapView.jsx
│   │   ├── MapView.css
│   │   └── index.js
│   └── ModeToggle/            # Fought/Remembered toggle buttons
│       ├── ModeToggle.jsx
│       ├── ModeToggle.css
│       └── index.js
├── context/
│   └── AppContext.js          # Global state management
├── utils/
│   ├── constants.js           # App constants (modes, colors, device specs)
│   └── locations.js           # Historical location data
└── assets/
    ├── index.js               # Asset exports
    └── images/
        ├── backgrounds/       # Mode-specific background textures
        ├── map/              # Brooklyn map SVG
        ├── icons/            # UI icons
        └── markers/          # Location marker pins
Getting Started
Prerequisites

Node.js (v16 or higher)
npm or yarn

Installation
bash# Clone the repository
git clone [repository-url]

# Navigate to project directory
cd battleofbrooklyn-app

# Install dependencies
npm install

# Start development server
npm start
The app will open at http://localhost:3000
Development
Available Scripts
npm start
Runs the app in development mode. The page will reload when you make changes.
npm test
Launches the test runner in interactive watch mode.
npm run build
Builds the app for production to the build folder. Optimized and minified.
Device Specifications
Target Device: Samsung Galaxy Tab S9+ 14.6"

Resolution: 3544 × 2362 pixels
Aspect Ratio: 1.5:1
High DPI display

Development Viewport: Standard desktop browsers (1920×1080, 1440×900)
Responsive Design
The application uses clamp() CSS functions for fluid scaling:

Minimum size for small screens (200px+ buttons)
Preferred size using viewport units (vw/vh)
Maximum size for tablet (exact Figma specifications)

Example:
csswidth: clamp(180px, 15.2vw, 539px);
Features Implementation Status
✅ Completed

 Mode toggle buttons (Fought/Remembered)
 Background texture switching
 Brooklyn map display
 Map zoom functionality (1x-2x)
 Responsive button scaling
 Proper map positioning

🚧 In Progress

 Location markers (clickable pins)
 Zoom instruction UI
 Branding footer

📋 Planned

 TouchDesigner integration
 Projection wall communication
 Location detail panels
 Accessibility improvements

Location Data
The app includes historical data for:
Fought Mode (8 locations):

Wallabout Bay
Pebble Beach
Prison Ship Martyrs Monument
Thayer St S
Howard's 5th Historic Marker
Old Stone House of Brooklyn
Battle Pass Historic Marker
Melody Lanes

Remembered Mode (7 locations):

Prison Ship Martyrs Monument
Old Stone House of Brooklyn
Brooklyn Museum
Dongan Oak Monument
Maryland Monument
Altar to Liberty - Minerva Statue
Verrazzano Narrows Bridge

Design System
Colors

Background: #E8E1CF (cream/beige)
Fought Mode: #6B3529 (burgundy/brown)
Remembered Mode: #00263A (dark navy)
Text: #FFFBE4 (off-white)

Typography

Display Font: Bebas Neue Pro
Weight: 700 (Bold)
Letter Spacing: 0.15em

Button Specifications

Width: 15.2vw (180-539px)
Height: 8.1vh (64-191px)
Border: 3px solid
Icon: 127.82×99.33px (tablet)

TouchDesigner Integration
The app is designed to communicate with TouchDesigner via WebSocket:

Protocol: WebSocket (ws)
Host: localhost (configurable)
Port: 8080 (configurable)

Each location has a touchDesignerTrigger field for projection wall content.
Browser Support

Chrome (recommended)
Firefox
Safari
Edge

Contributing
When making changes:

Follow the existing component structure
Use responsive units (clamp, vw, vh)
Test on both development viewport and tablet resolution
Update location data in utils/locations.js

Acknowledgments

Center for Brooklyn History - Historical content and design
Battle of Brooklyn - Revolutionary War history (August 27, 1776)

License
TBD
Contact
Cristian Gonzalez