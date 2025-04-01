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
  const { fetching, user, activities, timezone} = useUserData();
  const [renderCounter, setRenderCounter] = useState(0);

  /* friends leaderboard */
  const leaderboardRef = useRef<any | null>(null);
  const hasFetchedFriends = useRef(false);
  const { friends, fetched: hasNewLeaderboardData } = useGetFriendsLeaderboard(userId as number, 'POINTS_WEEKLY', !hasFetchedFriends.current && !fetching); 

  useEffect(() => {
    if (!hasNewLeaderboardData) {
      return;
    }
    if (hasNewLeaderboardData) {
      // Combined leaderboard with friends and user
      const combinedLeaderboard = friends.map((item: any) => ({
        id: item.friend.id,
        username: item.friend.username,
        profile_picture: item.friend.profile_picture,
        point: item.friend.point
      }));
      if (user) {
        combinedLeaderboard.push({
          id: user.id,
          username: user.username,
          profile_picture: user.profile_picture,
          point: user.point
        });
      }
      // Sort by weekly points in descending order
      combinedLeaderboard.sort((a: any, b: any) => b.point.weekly_points - a.point.weekly_points);
      leaderboardRef.current = combinedLeaderboard;
      hasFetchedFriends.current = true;
    } 
    if (hasFetchedFriends.current) {
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewLeaderboardData]);

  const loadingData = !hasFetchedFriends.current || fetching;
  if (debugRenders && !loadingData) {
    console.log("Rendering HomePage. Counter: ", renderCounter,
      "\nActivities:", activities,
      "\nLeaderboard:", leaderboardRef.current,
      "\nTimezone:", timezone,
    );
  }

  return <HomeScreen  
    isLoading={loadingData}
    name={user?.first_name}
    activities={activities}
    friendsLeaderboard={leaderboardRef.current}
  />;
};

export default AuthWrapper(HomePage);