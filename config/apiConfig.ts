import Constants from 'expo-constants';

export const API_CONFIG = {
  API_ENV: Constants.expoConfig?.extra?.apiEnv,
  BASE_URL: Constants.expoConfig?.extra?.apiUrl || "http://18.191.234.29:3000/graphql",
}; 