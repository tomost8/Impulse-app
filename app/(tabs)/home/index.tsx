import HomeDesign from '@/components/screens/HomeDesign';
import HomeScreen from '@/components/screens/HomeScreen';

import { useState, useEffect, useRef } from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useGetFriendsLeaderboard } from '@/hooks/graphql/friends/queries';
import { useGetActivitiesByDate } from '@/hooks/graphql/activities/queries';
// Components

// Debug
import { debugRenders } from '@/constants/debug';

const HomePage = (props: any) => {
  const { userId, authToken } = props;
  const [renderCounter, setRenderCounter] = useState(0);

  const friendsRef = useRef<any | null>(null);
  const hasFetchedFriends = useRef(false);
  const { friends, fetched: hasNewFriendsData } = useGetFriendsLeaderboard(userId, 'POINTS_WEEKLY', !hasFetchedFriends.current); // backend needs to be only accepted friends
  
  const activitiesRef = useRef<any[] | null>(null);
  const hasFetchedActivities = useRef(false);
  const currentDate = useRef(new Date().toISOString().split('T')[0]).current;
  const { activities, fetched: hasNewActivitiesData } = useGetActivitiesByDate(userId, currentDate, authToken, !hasFetchedActivities.current);
  //console.log("activities", activities);

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
  
  return <HomeScreen
    friends={friendsRef.current || []} 
    isFriendsLoading={!hasFetchedFriends.current}
    activities={activitiesRef.current || []}
    isActivitiesLoading={!hasFetchedActivities.current}
  />;
};

export default AuthWrapper(HomePage);