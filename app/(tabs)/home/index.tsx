import { useState, useEffect, useRef } from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useGetFriendsLeaderboard } from '@/hooks/graphql/useFriends';
import { useGetActivities } from '@/hooks/graphql/useActivites';
// Components
import HomeScreen from '@/components/screens/HomeScreen';

const HomePage = (props: any) => {
  const { userId, authToken } = props;
  const [isLoading, setIsLoading] = useState(true);

  const friendsRef = useRef<any | null>(null);
  const hasFetchedFriends = useRef(false);
  const { friends, fetched: hasNewFriendsData } = useGetFriendsLeaderboard(userId, 'POINTS_WEEKLY', !hasFetchedFriends.current);
  
  const activitiesRef = useRef<any[] | null>(null);
  const hasFetchedActivities = useRef(false);
  const { activities, fetched: hasNewActivitiesData } = useGetActivities(userId, authToken, !hasFetchedActivities.current);

  useEffect(() => {
    if (!hasNewFriendsData && !hasNewActivitiesData) {
      return;
    }
    if (hasNewFriendsData) {
      friendsRef.current = friends;
      hasFetchedFriends.current = true;
    }
    if (hasNewActivitiesData) {
      activitiesRef.current = activities;
      hasFetchedActivities.current = true;
    }
    if (hasFetchedFriends.current && hasFetchedActivities.current) {
      setIsLoading(false);
    }
  }, [hasNewFriendsData, hasNewActivitiesData]); 

  console.log("Rendering HomePage.\n",
    "Friends:", friendsRef.current, "\n",
    "Activities:", activitiesRef.current
  );
  
  return <HomeScreen 
    friends={friendsRef.current || []} 
    isFriendsLoading={!hasFetchedFriends.current}
    activities={activitiesRef.current || []}
    isActivitiesLoading={!hasFetchedActivities.current}
  />;
};

export default AuthWrapper(HomePage);