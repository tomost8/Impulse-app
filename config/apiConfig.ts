import Constants from 'expo-constants';
//these are defined in app.config.js, which takes values from .env

console.log('expoConfig:', Constants.expoConfig?.extra);

export const API_CONFIG = {
  API_ENV: Constants.expoConfig?.extra?.apiEnv,
  BASE_URL: Constants.expoConfig?.extra?.apiUrl || "",
}; 