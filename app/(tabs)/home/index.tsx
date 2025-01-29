import styles from '@/constants/testStyles';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useGetFriendsLeaderboard } from '@/hooks/api/useFriends';
import useUserInfo from '@/hooks/useUserInfo';


export default function HomeScreen() {
  const { userId } = useUserInfo();
  
  const { friends, isLoading, error } = useGetFriendsLeaderboard(userId as number, 'POINTS_WEEKLY');
  if (userId !== null) {
    console.log('Friends data:', friends);
  }

  return (
    <ScrollView >
      <View style={styles.section}>
        <Text style={styles.text}>Quote of the Day</Text>
        <Text style={styles.text}>The quote goes here using normal text</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>Daily Goals</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.push('home/activityAdd')}>
          <Text style={styles.text}>Add Activity</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push('home/activityView')}>
          <Text style={styles.text}>View All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push('account/settings/notifications')}>
          <Text style={styles.text}>Notifications</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>Weekly Leaderboard</Text>
        {friends.map((friend: any) => (
          <Text key={friend.friend.id} style={styles.text}>{friend.friend.username}, {friend.friend.point.weekly_points}</Text>
        ))}
        <TouchableOpacity style={styles.button} onPress={() => router.push('home/leaderboards')}>
          <Text style={styles.text}>View All</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}