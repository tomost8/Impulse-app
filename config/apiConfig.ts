import Constants from 'expo-constants';
//these are defined in app.config.js, which takes values from .env

//console.log('expoConfig:', Constants.expoConfig?.extra);

export const API_CONFIG = {
  NODE_ENV: Constants.expoConfig?.extra?.nodeEnv,
  BASE_URL: Constants.expoConfig?.extra?.apiUrl || "",
  API_KEY: Constants.expoConfig?.extra?.apiKey || "",
}; 

//console.log('API_CONFIG:', API_CONFIG);