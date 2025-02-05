import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { API_CONFIG } from '@/config/apiConfig';

const apiUrl = API_CONFIG.BASE_URL;

const httpLink = createHttpLink({
  uri: apiUrl,
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});