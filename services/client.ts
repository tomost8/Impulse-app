import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { API_CONFIG } from '@/config/apiConfig';

console.log('=== APOLLO CLIENT SETUP ===');
console.log('API_CONFIG in client.ts:', API_CONFIG);
console.log('Using BASE_URL:', API_CONFIG.BASE_URL);

// Temporarily hardcode the URL to test
const apiUrl = "http://18.191.234.29:3000/graphql";
console.log('Hardcoded URL for testing:', apiUrl);

const httpLink = createHttpLink({
  uri: apiUrl,
});

console.log('Created httpLink with URI:', apiUrl);

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

console.log('Apollo client created successfully');
console.log('=== END APOLLO CLIENT SETUP ===');