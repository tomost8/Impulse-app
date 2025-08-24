import { gql, useQuery } from '@apollo/client';
import { debugQueries } from '@/debug/utils';

// Query - Get Rewards
export const GET_REWARDS = gql`
  query {
    getRewards {
      success
      rewards {
        id
        title
        description
        required_points
      }
      errors { field message }
    }
  }
`;

export function useGetRewards(shouldFetch: boolean = true) {
  const { data, loading, error } = useQuery(GET_REWARDS, {
    skip: !shouldFetch,
    onError: (error) => {
      console.error('GraphQL Error:', error);
    }
  });
  const fetched = shouldFetch && !loading;
  if (debugQueries && fetched) {
    console.log("useGetRewards data", data, error ? 'error:' + error : '');
  }
  return {
    rewards: data?.getRewards.rewards || [],
    fetched: fetched,
    error: error?.message || null
  };
} 