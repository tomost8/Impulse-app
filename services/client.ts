import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { API_CONFIG } from '@/config/apiConfig';

console.log('=== APOLLO CLIENT SETUP ===');
console.log('API_CONFIG in client.ts:', API_CONFIG);
console.log('Using BASE_URL:', API_CONFIG.BASE_URL);

const httpLink = createHttpLink({
  uri: API_CONFIG.BASE_URL,
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
  }
});

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