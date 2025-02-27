import { useState, useEffect, useRef } from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useGetFriendsLeaderboard } from '@/hooks/graphql/friends/queries';
import { useGetActivitiesByDate } from '@/hooks/graphql/activities/queries';
// Components
import HomeDesign from '@/components/screens/HomeDesign';
import HomeScreenOld from '@/components/screens/old/home/HomeScreen';
// Debug
import { pageDisplay, debugRenders } from '@/constants/debug';

// Services
import { useUserInfo } from '@/services/UserContext';
import { useUserPreferences } from '@/services/UserPreferencesContext';

const HomePage = () => {
  const { userId, authToken } = useUserInfo();
  const { timezone, cameraClickable } = useUserPreferences();
  const [renderCounter, setRenderCounter] = useState(0);

  const friendsRef = useRef<any | null>(null);
  const hasFetchedFriends = useRef(false);
  const { friends, fetched: hasNewFriendsData } = useGetFriendsLeaderboard(userId as number, 'POINTS_WEEKLY', !hasFetchedFriends.current); // backend needs to be only accepted friends
  
  const activitiesRef = useRef<any[] | null>(null);
  const hasFetchedActivities = useRef(false);
  const currentDate = useRef(new Date().toISOString().split('T')[0]).current;
  const { activities, fetched: hasNewActivitiesData } = useGetActivitiesByDate(userId as number, currentDate, authToken as string, !hasFetchedActivities.current);

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
      "Render Counter:", renderCounter, "\n",
      "Timezone:", timezone, "\n",
      "Camera Clickable:", cameraClickable
    );
  }

  if (pageDisplay) {
    return <HomeDesign
      friends={friendsRef.current || []} 
      isFriendsLoading={!hasFetchedFriends.current}
      activities={activitiesRef.current || []}
      isActivitiesLoading={!hasFetchedActivities.current}
    />;
  } else {
    return <HomeScreenOld
      friends={friendsRef.current || []} 
      isFriendsLoading={!hasFetchedFriends.current}
      activities={activitiesRef.current || []}
      isActivitiesLoading={!hasFetchedActivities.current}
    />;
  }
};

export default AuthWrapper(HomePage);