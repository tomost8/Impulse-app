import { useState, useEffect, useRef } from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useGetUser } from '@/hooks/graphql/useUsers';
import { useGetRewards } from '@/hooks/graphql/useRewards';
// Components
import RedeemsScreen from '@/components/screens/RedeemsScreen';

const RedeemsPage = (props: any) => {
  const { userId, authToken } = props;
  const [isLoading, setIsLoading] = useState(true);

  const userRef = useRef<any[] | null>(null);
  const hasFetchedUser = useRef(false);
  const { user, fetched: hasNewUserData } = useGetUser(userId as number);

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
      console.log("setting userRef to", userRef.current);
    }
    if (hasNewRewardsData) {
      rewardsRef.current = rewards;
      hasFetchedRewards.current = true;
      console.log("setting rewardsRef to", rewardsRef.current);
    }
    if (hasFetchedUser.current && hasFetchedRewards.current) {
      console.log("setting isLoading from", isLoading, "to false");
      setIsLoading(false);
    }
  }, [hasNewUserData, hasNewRewardsData]); 

  console.log("Rendering RedeemsPage.\n",
    "User:", userRef.current, "\n",
    "Rewards:", rewardsRef.current
  );

  return (
    <RedeemsScreen 
      user={userRef.current} 
      isUserLoading={!hasFetchedUser.current}
      rewards={rewardsRef.current}
      isRewardsLoading={!hasFetchedRewards.current}
    />
  );
}

export default AuthWrapper(RedeemsPage);
