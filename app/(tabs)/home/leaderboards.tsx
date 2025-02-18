import styles from '@/constants/testStyles';
import { View, Text, TouchableOpacity } from 'react-native';
import MyComponent from '@/components/TwoTab';

import React, { useState, useEffect, useRef } from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL Hooks
import { useGetUsersLeaderboard } from '@/hooks/graphql/users/queries';
import { useGetFriendsLeaderboard } from '@/hooks/graphql/friends/queries';
// Components
import LeaderboardScreen from '@/components/screens/LeaderboardScreen';
// Debug
import { debugRenders } from '@/constants/debug';

function _LeaderboardsScreen({
  users,
  isUsersLoading,
  friends,
  isFriendsLoading,
  // Tab Status
  scopeView,
  onFriendsPress,
  onGlobalPress,
  activeView,
  setActiveView,
}: {
  users: any;
  isUsersLoading: boolean;
  friends: any;
  isFriendsLoading: boolean;
  // Tab Status
  scopeView: 'friends' | 'global';
  onFriendsPress: () => void;
  onGlobalPress: () => void;
  activeView: 'weekly' | 'monthly' | 'all';
  setActiveView: (view: 'weekly' | 'monthly' | 'all') => void;
}) {
  if (isUsersLoading || isFriendsLoading) {
    return <Text>Loading...</Text>;
  }
  return (
    <View style={styles.container}>
      {/* Button for leaderboard view: weekly, monthly, or all */}
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setActiveView('weekly')} style={styles.button}>
          <Text style={styles.button}>Weekly</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveView('monthly')} style={styles.button}>
          <Text style={styles.button}>Monthly</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveView('all')} style={styles.button}>
          <Text style={styles.button}>All</Text>
        </TouchableOpacity>
      </View>

      {/* Button for scope view: friends or global */}
      <MyComponent onLeftPress={onFriendsPress} onRightPress={onGlobalPress} value={scopeView} />
      
      {scopeView === 'friends' && (
        <View style={styles.section}>
          {/* Display friends leaderboard */}
          {friends && friends.length > 0 ? (
            friends.map((friend: any) => (
              <View key={`friend_${friend.id}`} >
                <Text style={styles.text}>
                  {friend.friend.username}, 
                  {activeView === 'weekly' ? friend.friend.point.weekly_points : activeView === 'monthly' ? friend.friend.point.monthly_points : friend.friend.point.points}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.text}>No friends found</Text>
          )}
        </View>
      )}

      {scopeView === 'global' && (
        <View style={styles.section}>
          {/* Display users from the leaderboard */}
          {users && users.length > 0 ? (
            users.map((user: any) => (
              <View key={`user_${user.id}`} >
                <Text style={styles.text}>
                  {user.username}, 
                  {activeView === 'weekly' ? user.point.weekly_points : activeView === 'monthly' ? user.point.monthly_points : user.point.points}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.text}>No users found</Text>
          )}
        </View>
      )}
    </View>
  );
}

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

  /*return LeaderboardsScreen({
    users: usersRef.current,
    isUsersLoading: !hasFetchedUsers.current,
    friends: friendsRef.current,
    isFriendsLoading: !hasFetchedFriends.current,
    // Tab Status
    scopeView: scopeView,
    onFriendsPress: onFriendsPress,
    onGlobalPress: onGlobalPress,
    activeView: activeView,
    setActiveView: setActiveView,
  });*/
  return LeaderboardScreen({
    users: usersRef.current,
    isUsersLoading: !hasFetchedUsers.current,
    friends: friendsRef.current,
    isFriendsLoading: !hasFetchedFriends.current,
  });
}

export default AuthWrapper(LeaderboardsPage);