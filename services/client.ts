import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
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

// Add error handling link
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
    // Don't throw the error, just log it
    // This prevents crashes in production
  }
});

console.log('Created httpLink with URI:', apiUrl);

export const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
  },
});

console.log('Apollo client created successfully');
console.log('=== END APOLLO CLIENT SETUP ===');