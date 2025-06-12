export default ({ config }) => {
  //console.log('Current ENV:', process.env); 
  return {
    ...config,
    extra: {
      ...config.extra,
      apiEnv: process.env.API_ENVIROMENT,
      apiUrl: process.env.API_ENVIROMENT === 'local' ? process.env.API_LOCAL_URL : process.env.API_AWS_URL,
    },
    plugins: [
      "expo-build-properties"
    ],
  };
}; 