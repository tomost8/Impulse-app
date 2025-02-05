import { useMutation, useQuery } from '@apollo/client';
import { GET_REWARDS, REDEEM_REWARD } from './constants/rewards';

const debug = false;

export function useGetRewards(shouldFetch: boolean = true) {
  const { data, loading, error } = useQuery(GET_REWARDS, {
    skip: !shouldFetch,
    onError: (error) => {
      console.error('GraphQL Error:', error);
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

export function useCreateRedeem() {
  const [createRedeemMutation] = useMutation(REDEEM_REWARD);
  const createRedeem = async (user_id: number, reward_id: number) => {
    try {
      const response = await createRedeemMutation({ variables: { 
        input: { user_id, reward_id } 
      } });
      return response.data.createRedeem;
    } catch (error) {
      console.error('Redemption failed:', error);
      throw error;
    }
  };
  return { createRedeem };
}