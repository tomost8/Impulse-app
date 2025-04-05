import styles from '@/utils/testStyles';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import MyComponent from '@/components/old/misc/TwoTab';

export default function LeaderboardScreenOld({
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
                <Image source={{ uri: friend.friend.profile_picture }} style={styles.smallImage} />
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
                <Image source={{ uri: user.profile_picture }} style={styles.smallImage} />
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