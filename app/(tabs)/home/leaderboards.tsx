import React, { useState, useEffect, useRef } from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL Hooks
import { useGetUsersLeaderboard } from '@/hooks/graphql/users/queries';
import { useGetFriendsLeaderboard } from '@/hooks/graphql/friends/queries';
// Components
import LeaderboardScreen from '@/components/screens/LeaderboardScreen';
import LeaderboardScreenOld from '@/components/old/home/LeaderboardScreen';
// Debug
import { pageDisplay, debugRenders } from '@/utils/debug';


const LeaderboardsPage = (props: any) => {
  const { userId, authToken } = props;
  const [renderCounter, setRenderCounter] = useState(0);

  // Tab Status: Have to figure out how to separate these to components
  const [scopeView, setScopeView] = useState<'friends' | 'global'>('friends');
  const onFriendsPress = () => { setScopeView('friends');};
  const onGlobalPress = () => { setScopeView('global');};
  const [activeView, setActiveView] = useState<'weekly' | 'monthly' | 'all'>('weekly');

  // Queries for Loading State
  const usersRef = useRef<any | null>(null);
  const hasFetchedUsers = useRef(false);
  const { users, fetched: hasNewUserData } = useGetUsersLeaderboard(activeView === 'weekly' ? 'POINTS_WEEKLY' : activeView === 'monthly' ? 'POINTS_MONTHLY' : 'POINTS_ALL', !hasFetchedUsers.current);

  const friendsRef = useRef<any | null>(null);
  const hasFetchedFriends = useRef(false);
  const { friends, fetched: hasNewFriendsData } = useGetFriendsLeaderboard(userId as number, activeView === 'weekly' ? 'POINTS_WEEKLY' : activeView === 'monthly' ? 'POINTS_MONTHLY' : 'POINTS_ALL', !hasFetchedFriends.current);

  useEffect(() => {
    if (!hasNewUserData && !hasNewFriendsData) {
      return;
    }
    if (hasNewUserData) {
      usersRef.current = users;
      hasFetchedUsers.current = true;
    }
    if (hasNewFriendsData) {
      friendsRef.current = friends;
      hasFetchedFriends.current = true;
    }
    if (hasFetchedUsers.current && hasFetchedFriends.current) {
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewUserData, hasNewFriendsData]);

  // Debug
  const loading = !hasFetchedUsers.current || !hasFetchedFriends.current;
  if (debugRenders && !loading) {
    console.log('Rendering LeaderboardsPage\n',
      'Users:', usersRef.current, '\n',
      'Friends:', friendsRef.current, '\n',
      'Render Counter:', renderCounter, '\n',
    );
  }

  if (pageDisplay) {
    return <LeaderboardScreen
      users={usersRef.current}
      isUsersLoading={!hasFetchedUsers.current}
      friends={friendsRef.current}
      isFriendsLoading={!hasFetchedFriends.current}
      // Tab Status
      scopeView={scopeView}
      onFriendsPress={onFriendsPress}
      onGlobalPress={onGlobalPress}
      activeView={activeView}
      setActiveView={setActiveView}
    />;
  } else {
    return <LeaderboardScreenOld
      users={usersRef.current}
      isUsersLoading={!hasFetchedUsers.current}
      friends={friendsRef.current}
      isFriendsLoading={!hasFetchedFriends.current}
      // Tab Status
      scopeView={scopeView}
      onFriendsPress={onFriendsPress}
      onGlobalPress={onGlobalPress}
      activeView={activeView}
      setActiveView={setActiveView}
    />;
  }
}

export default AuthWrapper(LeaderboardsPage);