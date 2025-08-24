import React, { useState, useEffect, useRef } from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL Hooks
import { useGetUsersLeaderboard } from '@/hooks/graphql/users/queries';
import { useGetFriendsLeaderboard } from '@/hooks/graphql/friends/queries';
// Components
import LeaderboardScreen from '@/components/screens/home/LeaderboardScreen';
// Debug
import { debugRenders } from '@/debug/utils';
import { useDataProvider } from '@/contexts/DataProviderContext';


const LeaderboardsPage = () => {
  const { fetching, user } = useDataProvider();
  const [selectedPeriod, setSelectedPeriod] = useState<'POINTS_WEEKLY' | 'POINTS_MONTHLY' | 'POINTS_ALL'>('POINTS_WEEKLY');
  const [renderCounter, setRenderCounter] = useState(0);

  // Queries for Loading State
  const allLeaderboardRef = useRef<any | null>(null);
  const hasFetchedAllLeaderboard = useRef(false);
  const { users: allLeaderboard, fetched: hasNewAllLeaderboardData } = useGetUsersLeaderboard(selectedPeriod, !hasFetchedAllLeaderboard.current);

  const friendsLeaderboardRef = useRef<any | null>(null);
  const hasFetchedFriendsLeaderboard = useRef(false);
  const { friends: friendsLeaderboard, fetched: hasNewFriendsLeaderboardData } = useGetFriendsLeaderboard(user?.id as number, selectedPeriod, !hasFetchedFriendsLeaderboard.current && !fetching);

  useEffect(() => {
    if (!hasNewAllLeaderboardData && !hasNewFriendsLeaderboardData) {
      return;
    }
    if (hasNewAllLeaderboardData) {
      allLeaderboardRef.current = allLeaderboard;
      hasFetchedAllLeaderboard.current = true;
    }
    if (hasNewFriendsLeaderboardData) {
      // Combined leaderboard with friends and user
      const combinedLeaderboard = friendsLeaderboard.map((item: any) => ({
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
      friendsLeaderboardRef.current = combinedLeaderboard;
      hasFetchedFriendsLeaderboard.current = true;
    }
    if (hasFetchedAllLeaderboard.current && hasFetchedFriendsLeaderboard.current) {
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewAllLeaderboardData, hasNewFriendsLeaderboardData]);

  // Debug
  const loading = !hasFetchedAllLeaderboard.current || !hasFetchedFriendsLeaderboard.current;
  if (debugRenders && !loading) {
    console.log('Rendering LeaderboardsPage\n',
      'All Users Leaderboard:', allLeaderboardRef.current, '\n',
      'Friends Leaderboard:', friendsLeaderboardRef.current, '\n',
      'Selected Period:', selectedPeriod, '\n',
      'Render Counter:', renderCounter, '\n',
    );
  }

  return <LeaderboardScreen
    isLoading={loading}
    allLeaderboard={allLeaderboardRef.current}
    friendsLeaderboard={friendsLeaderboardRef.current}
    selectedPeriod={selectedPeriod}
    setSelectedPeriod={setSelectedPeriod}
  />;
}

export default AuthWrapper(LeaderboardsPage);