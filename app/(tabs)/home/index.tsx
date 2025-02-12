import HomeDesign from '../../../components/screens/HomeDesign';

import { useState, useEffect, useRef } from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useGetFriendsLeaderboard } from '@/hooks/graphql/friends/queries';
import { useGetActivities } from '@/hooks/graphql/activities/queries';
// Components

// Debug
import { debugRenders } from '@/constants/debug';

const HomePage = ({ userId, authToken }: { userId: string; authToken: string }) => {
  const [renderCounter, setRenderCounter] = useState(0);

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
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewFriendsData, hasNewActivitiesData]); 

  const loading = !hasFetchedFriends.current || !hasFetchedActivities.current;
  if (debugRenders && !loading) {
    console.log("Rendering HomePage.\n",
      "Friends:", friendsRef.current, "\n",
      "Activities:", activitiesRef.current, "\n",
      "Render Counter:", renderCounter
    );
  }
  
  return <HomeDesign
    friends={friendsRef.current || []} 
    isFriendsLoading={!hasFetchedFriends.current}
    activities={activitiesRef.current || []}
    isActivitiesLoading={!hasFetchedActivities.current}
  />;
};

export default AuthWrapper(HomePage);