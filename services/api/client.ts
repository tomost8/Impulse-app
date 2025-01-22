import Constants from 'expo-constants';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

// Debug logs to see what values we're getting
console.log('Full Expo Config:', Constants.expoConfig?.extra);
console.log('API URL from Expo Config:', Constants.expoConfig?.extra?.apiUrl);

const apiUrl = Constants.expoConfig?.extra?.apiUrl;
if (!apiUrl) {
  console.error('API URL is not defined in app.config.js!');
}

const httpLink = createHttpLink({
  uri: apiUrl,
  /*
  headers: {
    'Authorization': `Bearer ${API_KEY}`
  }*/
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});