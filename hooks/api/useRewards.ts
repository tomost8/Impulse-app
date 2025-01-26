import { useQuery } from '@apollo/client';
import { GET_REWARDS } from '../../services/api/rewards';

export function useGetRewards() {
  const { data, loading, error } = useQuery(GET_REWARDS, {
    onError: (error) => {
      console.error('GraphQL Error:', error);
      console.error('GraphQL Error Message:', error.message);
      console.error('GraphQL Network Error:', error.networkError);
      console.error('GraphQL GraphQL Errors:', error.graphQLErrors);
    }
  });
  //console.log('Rewards:', data);
  return {
    rewards: data?.getRewards.rewards || [],
    isLoading: loading,
    error: error?.message || null
  };
} 