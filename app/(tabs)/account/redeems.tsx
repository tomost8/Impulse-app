import { useState, useEffect, useRef } from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useGetUser } from '@/hooks/graphql/useUsers';
import { useCreateRedeem, useGetRewards } from '@/hooks/graphql/useRewards';
// Components
import RedeemsScreen from '@/components/screens/RedeemsScreen';

const RedeemsPage = (props: any) => {
  const { userId, authToken } = props;
  const [renderCounter, setRenderCounter] = useState(0);

  const userRef = useRef<any | null>(null);
  const hasFetchedUser = useRef(false);
  const { user, fetched: hasNewUserData, refetch: refetchUser } = useGetUser(userId as number);

  const rewardsRef = useRef<any[] | null>(null);
  const hasFetchedRewards = useRef(false);
  const { rewards, fetched: hasNewRewardsData } = useGetRewards();

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

  const { redeem } = useCreateRedeem();

  const handleRedeemComplete = async (rewardId: number) => {
    console.log("handleRedeemComplete called");
    try {
      const response = await redeem(userRef.current?.id, rewardId);
      console.log("response", response);
      if (response.success) {
        const newUserData = await refetchUser();
        userRef.current = newUserData.data.user.user;
        setRenderCounter(prev => prev + 1);
      }
    } catch (error) {
      console.error("Error redeeming reward:", error);
    }
  }

  console.log("Rendering RedeemsPage. Counter:", renderCounter, "\n",
    "User:", userRef.current, "\n",
    "Rewards:", rewardsRef.current
  );

  return (
    <RedeemsScreen 
      user={userRef.current} 
      isUserLoading={!hasFetchedUser.current}
      rewards={rewardsRef.current}
      isRewardsLoading={!hasFetchedRewards.current}
      onRedeemComplete={handleRedeemComplete}
    />
  );
}

export default AuthWrapper(RedeemsPage);
