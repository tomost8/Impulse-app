import React, { useState, useEffect, useRef } from 'react';
import AuthWrapper from '@/contexts/AuthWrapper';
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
  const lastFetchedPeriod = useRef<string | undefined>(undefined);
  
  // Allow refetching when period changes or when first loading
  const shouldFetchAllLeaderboard = !hasFetchedAllLeaderboard.current || 
    lastFetchedPeriod.current !== selectedPeriod;
  
  const { users: allLeaderboard, fetched: hasNewAllLeaderboardData } = useGetUsersLeaderboard(selectedPeriod, shouldFetchAllLeaderboard);

  const friendsLeaderboardRef = useRef<any | null>(null);
  const hasFetchedFriendsLeaderboard = useRef(false);
  
  // Allow refetching when period changes or when first loading
  const shouldFetchFriendsLeaderboard = (!hasFetchedFriendsLeaderboard.current && !fetching) || 
    lastFetchedPeriod.current !== selectedPeriod;
  
  const { friends: friendsLeaderboard, fetched: hasNewFriendsLeaderboardData } = useGetFriendsLeaderboard(user?.id as number, selectedPeriod, shouldFetchFriendsLeaderboard);

  // Reset fetch flags when period changes
  useEffect(() => {
    if (lastFetchedPeriod.current !== selectedPeriod) {
      hasFetchedAllLeaderboard.current = false;
      hasFetchedFriendsLeaderboard.current = false;
    }
  }, [selectedPeriod]);

  useEffect(() => {
    if (!hasNewAllLeaderboardData && !hasNewFriendsLeaderboardData) {
      return;
    }
    if (hasNewAllLeaderboardData) {
      allLeaderboardRef.current = allLeaderboard;
      hasFetchedAllLeaderboard.current = true;
      lastFetchedPeriod.current = selectedPeriod;
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
      lastFetchedPeriod.current = selectedPeriod;
    }
    if (hasFetchedAllLeaderboard.current && hasFetchedFriendsLeaderboard.current) {
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewAllLeaderboardData, hasNewFriendsLeaderboardData, selectedPeriod]);

  // Debug
  const loading = !hasFetchedAllLeaderboard.current || !hasFetchedFriendsLeaderboard.current;
  if (debugRenders && !loading) {
    const allLeaderboard = allLeaderboardRef.current || [];
    const friendsLeaderboard = friendsLeaderboardRef.current || [];
    const allCount = allLeaderboard.length;
    const friendsCount = friendsLeaderboard.length;
    
    // Summary line
    const summary = {
      selectedPeriod,
      allCount,
      friendsCount,
      renderCounter
    };
    
    let formattedData = `Rendering LeaderboardsPage: ${JSON.stringify(summary)}\n`;
    
    // Log all users leaderboard
    if (allCount > 0) {
      formattedData += `All Users Leaderboard (${allCount}):\n`;
      allLeaderboard.forEach((user: any, index: number) => {
        const points = user.point || {};
        formattedData += `  ${index + 1}. ${user.username} - Points: ${points.points || 0}, Weekly: ${points.weekly_points || 0}, Monthly: ${points.monthly_points || 0}\n`;
      });
    }
    
    // Log friends leaderboard
    if (friendsCount > 0) {
      formattedData += `Friends Leaderboard (${friendsCount}):\n`;
      friendsLeaderboard.forEach((user: any, index: number) => {
        const points = user.point || {};
        formattedData += `  ${index + 1}. ${user.username} - Points: ${points.points || 0}, Weekly: ${points.weekly_points || 0}, Monthly: ${points.monthly_points || 0}\n`;
      });
    }
    
    console.log(formattedData);
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