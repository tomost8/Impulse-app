export default ({ config }) => {
  return {
    ...config,
    extra: {
      nodeEnv: process.env.NODE_ENV,
      apiKey: process.env.API_KEY,
      apiUrl: process.env.NODE_ENV === 'development' ? process.env.API_DEV_URL : process.env.API_PROD_URL,
    },
  };
}; 