import styles from '@/constants/testStyles';
import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useGetUsersLeaderboard } from '@/hooks/api/useUsers';
import { useGetFriendsLeaderboard } from '@/hooks/api/useFriends';
import useUserInfo from '@/hooks/useUserInfo';
import MyComponent from '@/components/Test';


export default function LeaderboardsScreen() {
  const { userId } = useUserInfo();

  const [scopeView, setScopeView] = useState<'friends' | 'global'>('friends');
  const onFriendsPress = () => { setScopeView('friends');};
  const onGlobalPress = () => { setScopeView('global');};

  const [activeView, setActiveView] = useState<'weekly' | 'monthly' | 'all'>('weekly');
  const { users, isLoading, error } = useGetUsersLeaderboard(activeView === 'weekly' ? 'POINTS_WEEKLY' : activeView === 'monthly' ? 'POINTS_MONTHLY' : 'POINTS_ALL');
  const { friends, isLoading: friendsLoading, error: friendsError } = useGetFriendsLeaderboard(userId as number, activeView === 'weekly' ? 'POINTS_WEEKLY' : activeView === 'monthly' ? 'POINTS_MONTHLY' : 'POINTS_ALL');
  if (userId !== null) {
    console.log('Users leaderboard data:', users);
    console.log('Friends leaderboard data:', friends);
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