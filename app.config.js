export default ({ config }) => {
  //console.log('Current ENV:', process.env); 
  return {
    ...config,
    extra: {
      apiEnv: process.env.API_ENVIROMENT,
      apiKey: process.env.API_KEY,
      apiUrl: process.env.API_ENVIROMENT === 'development' ? process.env.API_DEV_URL : process.env.API_PROD_URL,
    },
  };
}; 