import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev';
import { API_CONFIG } from '@/config/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Load Apollo Client error messages for better debugging
if (__DEV__) {
  loadDevMessages();
  loadErrorMessages();
}

// Suppress specific Apollo Client deprecation warnings that are internal bugs
const originalWarn = console.warn;
console.warn = (...args) => {
  const message = args.join(' ');
  // Filter out the canonizeResults deprecation warnings that are internal Apollo Client bugs
  if (message.includes('canonizeResults') && message.includes('cache.diff')) {
    return; // Suppress this specific warning
  }
  originalWarn.apply(console, args);
};

console.log('=== APOLLO CLIENT SETUP ===');
console.log('API_CONFIG in client.ts:', API_CONFIG);
//console.log('Using BASE_URL:', API_CONFIG.BASE_URL);

const httpLink = createHttpLink({
  uri: API_CONFIG.BASE_URL,
});

// Auth link to automatically include token in requests
const authLink = setContext(async (_, { headers }) => {
  // Get the current auth token from AsyncStorage
  let authToken: string | null = null;
  
  try {
    authToken = await AsyncStorage.getItem('authToken');
  } catch (error) {
    console.log('Could not get token from AsyncStorage:', error);
  }

  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      ...(authToken && { Authorization: `Bearer ${authToken}` }),
    }
  };
});

// Add error handling link
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
      
      // Check if it's an authentication error (fallback for edge cases)
      if (message === 'Invalid token' || message.includes('token')) {
        console.log('🔐 Token expired in request, attempting fallback refresh...');
        
        // Try to refresh the token by calling Firebase
        import('@react-native-firebase/auth').then(async ({ getAuth, getIdToken }) => {
          try {
            const currentUser = getAuth().currentUser;
            if (currentUser) {
              const newToken = await getIdToken(currentUser, true);
              if (newToken) {
                console.log('🔐 Token refreshed via fallback, retrying request...');
                
                // Update the token in AsyncStorage
                await AsyncStorage.setItem('authToken', newToken);
                
                // Retry the operation with the new token
                const oldHeaders = operation.getContext().headers;
                operation.setContext({
                  headers: {
                    ...oldHeaders,
                    Authorization: `Bearer ${newToken}`,
                  },
                });
                
                // Retry the failed operation
                return forward(operation);
              }
            }
          } catch (error) {
            console.error('Failed to refresh token via fallback:', error);
          }
        });
      }
    });
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
    // Don't automatically clear auth on network errors
    console.log('🔐 Apollo - Network error occurred, but keeping auth state intact');
  }
});

export const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache({
    // Explicitly disable all deprecated cache options?
  }),
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