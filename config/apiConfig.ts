import Constants from 'expo-constants';
//these are defined in app.config.js, which takes values from .env

console.log('=== API CONFIG DEBUG ===');
console.log('Full expoConfig:', Constants.expoConfig);
console.log('expoConfig.extra:', Constants.expoConfig?.extra);
console.log('API_ENV from config:', Constants.expoConfig?.extra?.apiEnv);
console.log('API_URL from config:', Constants.expoConfig?.extra?.apiUrl);
console.log('Process env API_ENVIROMENT:', process.env.API_ENVIROMENT);
console.log('Process env API_AWS_URL:', process.env.API_AWS_URL);
console.log('Process env API_LOCAL_URL:', process.env.API_LOCAL_URL);

export const API_CONFIG = {
  API_ENV: Constants.expoConfig?.extra?.apiEnv,
  BASE_URL: Constants.expoConfig?.extra?.apiUrl || "",
};

console.log('Final API_CONFIG:', API_CONFIG);
console.log('=== END API CONFIG DEBUG ==='); 