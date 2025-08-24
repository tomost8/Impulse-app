import { useState, useEffect, useRef } from 'react';
import AuthWrapper from '@/contexts/AuthWrapper';
// GraphQL hooks
import { useGetUser } from '@/hooks/graphql/users/queries';
import { useGetRewards } from '@/hooks/graphql/rewards/queries';
import { useCreateRedeem } from '@/hooks/graphql/rewards/mutations';
// Components
import RewardsScreen from '@/components/screens/profile/RewardsScreen/RewardsScreen';
// Debug
import { debugRenders } from '@/debug/utils';
// Services
import { useDataProvider } from '@/contexts/DataProviderContext';

const RedeemsPage = () => {
  const { fetching, user } = useDataProvider();
  const [renderCounter, setRenderCounter] = useState(0);

  // Queries
  const rewardsRef = useRef<any[] | null>(null);
  const hasFetchedRewards = useRef(false);
  const { rewards, fetched: hasNewRewardsData } = useGetRewards(!hasFetchedRewards.current);

  useEffect(() => {
    if (!hasNewRewardsData) {
      return;
    }
    if (hasNewRewardsData) {
      rewardsRef.current = rewards;
      hasFetchedRewards.current = true;
    }
    if (hasFetchedRewards.current) {
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewRewardsData]); 

  // Mutations
  const { createRedeem } = useCreateRedeem();
  const [isCreatingRedeem, setIsCreatingRedeem] = useState(false);
  const handleCreateRedeem = async (rewardId: number) => {
    setIsCreatingRedeem(true);
    try {
      const input = {
        user_id: user.id,
        reward_id: rewardId
      }
      const response = await createRedeem(input);
      if (response.success) {
        console.log("Redeem created successfully", response);
      } else {
        console.log("Error redeeming reward:", response.errors);
      }
    } catch (error) {
      console.error("Error redeeming reward:", error);
    } finally {
      setIsCreatingRedeem(false);
    }
  }

  // Debug
  const loading = fetching || !hasFetchedRewards.current || isCreatingRedeem;
  if (debugRenders && !loading) {
    console.log("Rendering RedeemsPage\n",
      "User Points:", user.point.spending_points, "\n",
      "Rewards:", rewardsRef.current, "\n",
      "Render Counter:", renderCounter, "\n",
    );
  }

  
  return (
    <RewardsScreen 
      loading={loading}
      userPoints={user.point.spending_points}
      rewards={rewardsRef.current}
      handleCreateRedeem={handleCreateRedeem}
    />
  );
}

export default AuthWrapper(RedeemsPage);
