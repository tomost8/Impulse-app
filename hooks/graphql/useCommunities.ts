import { useQuery } from '@apollo/client';
import { GET_COMMUNITIES, GET_COMMUNITY, GET_USER_COMMUNITIES } from './constants/communities';

export function getUserCommunities(userId: number, shouldFetch: boolean = true) {
  const { data, loading, error } = useQuery(GET_USER_COMMUNITIES, {
    variables: { userId },
    skip: !shouldFetch,
    onError: (error) => {
      console.error('GraphQL Error:', error);
      console.error('GraphQL Error Message:', error.message);
      console.error('GraphQL Network Error:', error.networkError);
      console.error('GraphQL GraphQL Errors:', error.graphQLErrors);
    }
  });
  //console.log(data);
  return {
    communityMembers: data?.getUserCommunities.community_members || [],
    isLoading: loading,
    error: error?.message || null
  };
} 

export function getCommunities(shouldFetch: boolean = true) {
  const { data, loading, error } = useQuery(GET_COMMUNITIES, {
    skip: !shouldFetch,
    onError: (error) => {
      console.error('GraphQL Error:', error);
      console.error('GraphQL Error Message:', error.message);
      console.error('GraphQL Network Error:', error.networkError);
      console.error('GraphQL GraphQL Errors:', error.graphQLErrors);
    }
  });
  //console.log(data);

  return {
    communities: data?.getAllCommunities.communities || [],
    isLoading: loading,
    error: error?.message || null
  };
} 

export function getCommunity(id: number, shouldFetch: boolean = true) {
  const { data, loading, error } = useQuery(GET_COMMUNITY, {
    variables: { id },
    skip: !shouldFetch,
    onError: (error) => {
      console.error('GraphQL Error:', error);
      console.error('GraphQL Error Message:', error.message);
      console.error('GraphQL Network Error:', error.networkError);
      console.error('GraphQL GraphQL Errors:', error.graphQLErrors);
    }
  });

  return {
    community: data?.getCommunity.community || [],
    isLoading: loading,
    error: error?.message || null
  };
} 