import { useMutation, useQuery } from '@apollo/client';
import { GET_REWARDS, REDEEM_REWARD } from '../../services/api/rewards';

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

//deprecated - not actually called anywhere right now
export function useRedeemReward(userId: number, rewardId: number) {
  const [redeemReward, { data, loading, error }] = useMutation(REDEEM_REWARD, {
    variables: { userId, rewardId },
    onError: (error) => {
      console.error('GraphQL Error:', error);
      console.error('GraphQL Error Message:', error.message);
      console.error('GraphQL Network Error:', error.networkError);
      console.error('GraphQL GraphQL Errors:', error.graphQLErrors);
    }
  });
  console.log('Redeem Reward:', data);
  return {
    redeem: data?.redeemReward.redeem || [],
    isLoading: loading,
    error: error?.message || null
  };
}