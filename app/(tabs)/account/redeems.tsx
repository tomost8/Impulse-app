import { useState, useEffect, useRef } from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useGetUser } from '@/hooks/graphql/users/queries';
import { useGetRewards } from '@/hooks/graphql/rewards/queries';
import { useCreateRedeem } from '@/hooks/graphql/rewards/mutations';
// Components
import RedeemsScreen from '@/components/screens/RedeemsScreen';
// Debug
import { debugRenders } from '@/constants/debug';

const RedeemsPage = (props: any) => {
  const { userId, authToken } = props;
  const [renderCounter, setRenderCounter] = useState(0);

  // Queries for Loading State
  const userRef = useRef<any | null>(null);
  const hasFetchedUser = useRef(false);
  const { user, fetched: hasNewUserData, refetch: refetchUser } = useGetUser(userId as number, !hasFetchedUser.current);

  const rewardsRef = useRef<any[] | null>(null);
  const hasFetchedRewards = useRef(false);
  const { rewards, fetched: hasNewRewardsData } = useGetRewards(!hasFetchedRewards.current);

  useEffect(() => {
    if (!hasNewUserData && !hasNewRewardsData) {
      return;
    }
    if (hasNewUserData) {
      userRef.current = user;
      hasFetchedUser.current = true;
    }
    if (hasNewRewardsData) {
      rewardsRef.current = rewards;
      hasFetchedRewards.current = true;
    }
    if (hasFetchedUser.current && hasFetchedRewards.current) {
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewUserData, hasNewRewardsData]); 

  // Mutations
  const { createRedeem } = useCreateRedeem();
  const [isCreatingRedeem, setIsCreatingRedeem] = useState(false);
  const handleCreateRedeem = async (rewardId: number) => {
    setIsCreatingRedeem(true);
    try {
      const input = {
        user_id: userRef.current?.id,
        reward_id: rewardId
      }
      const response = await createRedeem(input);
      if (response.success) {
        //console.log("response success", response.redeem);
        const newUserData = await refetchUser(); 
        userRef.current = newUserData.data.user.user;
        setRenderCounter(prev => prev + 1);
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
  const loading = !hasFetchedUser.current || !hasFetchedRewards.current || isCreatingRedeem;
  if (debugRenders && !loading) {
    console.log("Rendering RedeemsPage\n",
      "User:", userRef.current, "\n",
      "Rewards:", rewardsRef.current, "\n",
      "Render Counter:", renderCounter, "\n",
    );
  }

  return (
    <RedeemsScreen 
      user={userRef.current} 
      isUserLoading={!hasFetchedUser.current}
      rewards={rewardsRef.current}
      isRewardsLoading={!hasFetchedRewards.current}
      handleCreateRedeem={handleCreateRedeem}
      isCreatingRedeem={isCreatingRedeem}
    />
  );
}

export default AuthWrapper(RedeemsPage);
