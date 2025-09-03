import Constants from 'expo-constants';

// Get the API configuration from Expo constants
const getApiConfig = () => {
  const extra = Constants.expoConfig?.extra;
  
  if (!extra?.API_ENV || !extra?.API_LOCAL_URL || !extra?.API_AWS_URL) {
    throw new Error('API_ENV, API_LOCAL_URL, and API_AWS_URL must be configured in app.json extra section');
  }
  
  if (extra.API_ENV === 'aws') {
    return {
      API_ENV: 'aws',
      BASE_URL: extra.API_AWS_URL
    };
  } else if (extra.API_ENV === 'local') {
    return {
      API_ENV: 'local',
      BASE_URL: extra.API_LOCAL_URL
    };
  }
  
  throw new Error(`Invalid API_ENV value: ${extra.API_ENV}. Must be 'local' or 'aws'`);
};

export const API_CONFIG = getApiConfig(); 