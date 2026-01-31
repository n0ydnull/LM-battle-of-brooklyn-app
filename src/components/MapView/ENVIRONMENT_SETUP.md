# Environment Configuration Guide

## Setup

Your React app now supports multiple environment configurations for different build targets.

## Files Created

1. `.env.emulator` - Android emulator configuration
2. `.env.production` - Physical tablet configuration
3. Updated `package.json` with build scripts

## Environment Variables

### .env.emulator
- REACT_APP_ENV=emulator
- REACT_APP_TD_HOST=10.0.2.2 (special IP for Android emulator to reach localhost)
- REACT_APP_TD_PORT=9980
- REACT_APP_DEBUG=true (verbose logging)

### .env.production
- REACT_APP_ENV=production
- REACT_APP_TD_HOST=192.168.1.100 (update to your actual network IP)
- REACT_APP_TD_PORT=9980
- REACT_APP_DEBUG=false (minimal logging)

## Build Commands

### Development (Emulator Testing)
```
npm run start:emulator
```
Starts dev server using emulator config and connects to TouchDesigner via 10.0.2.2

### Build for Emulator
```
npm run build:emulator
```
Creates build optimized for testing on Android emulator

### Build for Production (Physical Tablet)
```
npm run build:production
```
Creates production APK using your network IP

## How It Works

1. `env-cmd` loads the specified .env file
2. React-scripts picks up REACT_APP_* variables
3. `touchdesigner.js` reads these via `process.env.REACT_APP_TD_HOST` and `process.env.REACT_APP_TD_PORT`
4. Your app connects to the correct TouchDesigner instance

## Important Notes

- Update `REACT_APP_TD_HOST` in `.env.production` to your actual network IP
- Android emulator uses `10.0.2.2` to reach the host machine (don't change this)
- After changing .env files, rebuild the app
- These files are already in .gitignore (don't commit them if they contain sensitive info)

## Using Environment Variables in Code

In your React code:
```javascript
const debug = process.env.REACT_APP_DEBUG === 'true';
const environment = process.env.REACT_APP_ENV;

if (debug) {
  console.log('Running in', environment, 'mode');
}
```

## Building APK for Tablet

1. Update network IP in `.env.production`
2. Run: `npm run build:production`
3. Run: `npx cap build android --release`
4. APK will be ready for deployment to physical tablet
