import { useState, useEffect, useRef } from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useGetFriendsLeaderboard } from '@/hooks/graphql/friends/queries';
// Components
import HomeScreen from '@/components/screens/tabs/HomeScreen';
// Debug
import { debugRenders } from '@/utils/debug';
// Services
import { useUserInfo } from '@/services/UserContext';
import { useUserData } from '@/services/UserPreferencesContext';

const HomePage = () => {
  const { userId, authToken } = useUserInfo();
  const { fetching, user, activities, friends, timezone} = useUserData();
  const [renderCounter, setRenderCounter] = useState(0);

  /* friends but for friends leaderboard 
  const friendsRef = useRef<any | null>(null);
  const hasFetchedFriends = useRef(false);
  const { friends, fetched: hasNewFriendsData } = useGetFriendsLeaderboard(userId as number, 'POINTS_WEEKLY', !hasFetchedFriends.current); // backend needs to be only accepted friends

  useEffect(() => {
    if (!hasNewFriendsData) {
      return;
    }
    if (hasNewFriendsData) {
      friendsRef.current = friends;
      hasFetchedFriends.current = true;
    } 
    if (hasFetchedFriends.current) {
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewFriendsData]); 

  const loadingData = !hasFetchedFriends.current;
  */

  if (debugRenders && !fetching) {
    console.log("Rendering HomePage. Counter: ", renderCounter,
      "\nFriends:", friends,
      "\nActivities:", activities,
      "\nTimezone:", timezone,
    );
  }

  return <HomeScreen  
    isLoading={fetching}
    name={user?.first_name}
    friends={friends} 
    activities={activities}
  />;
};

export default AuthWrapper(HomePage);