import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.noyd.battleofbrooklyn',
  appName: 'Battle of Brooklyn',
  webDir: 'build',
  server: {
    androidScheme: 'http',
    cleartext: true, // Allow HTTP connections (needed for TouchDesigner connection)
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystorePassword: undefined,
      keystoreAlias: undefined,
      keystoreAliasPassword: undefined,
      releaseType: 'APK'
    }
  }
};

export default config;
