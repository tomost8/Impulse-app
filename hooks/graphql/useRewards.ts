import { useMutation, useQuery } from '@apollo/client';
import { GET_REWARDS, REDEEM_REWARD } from './constants/rewards';

const debug = false;

export function useGetRewards(shouldFetch: boolean = true) {
  const { data, loading, error } = useQuery(GET_REWARDS, {
    skip: !shouldFetch,
    onError: (error) => {
      console.error('GraphQL Error:', error);
      console.error('GraphQL Error Message:', error.message);
      console.error('GraphQL Network Error:', error.networkError);
      console.error('GraphQL GraphQL Errors:', error.graphQLErrors);
    }
  });
  if (debug) {
    console.log("useGetRewards data", data, 
      "skipped", !shouldFetch, 
      "loading", loading, 
      "error", error,
    );
  }
  return {
    rewards: data?.getRewards.rewards || [],
    fetched: shouldFetch && !loading,
    error: error?.message || null
  };
} 