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

// New function to create a redeem
export function useCreateRedeem() {
  const [createRedeem, { data, loading, error }] = useMutation(REDEEM_REWARD, {
    onCompleted: (data) => {
      console.log('Redemption successful:', data);
    },
    onError: (error) => {
      console.error('Redemption failed:', error);
    }
  });

  const redeem = async (user_id: number, reward_id: number) => {
    return createRedeem({ variables: { input: { user_id, reward_id } } })
      .then(response => response.data.createRedeem)
      .catch(err => { throw err });
  };

  return { redeem, data, loading, error };
}