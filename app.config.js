export default ({ config }) => {
  //console.log('Current ENV:', process.env); 
  return {
    ...config,
    extra: {
      ...config.extra,
      apiEnv: process.env.API_ENVIROMENT || 'aws',
      apiUrl: process.env.API_ENVIROMENT === 'local' 
        ? (process.env.API_LOCAL_URL || 'http://localhost:3000/graphql')
        : (process.env.API_AWS_URL || 'http://18.191.234.29:3000/graphql'),
    },
    plugins: [
      "expo-build-properties"
    ],
  };
}; 