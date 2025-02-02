import styles from '@/constants/testStyles';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useGetFriendsLeaderboard } from '@/hooks/api/useFriends';
import useUserInfo from '@/hooks/useUserInfo';
import { useGetActivities } from '@/hooks/api/useActivites';


export default function HomeScreen() {
  const { userId, authToken } = useUserInfo();
  const { friends } = useGetFriendsLeaderboard(userId as number, 'POINTS_WEEKLY');
  const { activities } = useGetActivities(userId as number, authToken as string);
  if (userId !== null) {
    console.log('Activities data:', activities, 'Friends data:', friends);
  }

  return (
    <ScrollView >
      <View style={styles.section}>
        <Text style={styles.text}>Quote of the Day</Text>
        <Text style={styles.text}>The quote goes here using normal text</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>Daily Goals</Text>
        {activities.length === 0 ? (
          <TouchableOpacity style={styles.button} onPress={() => router.push('home/activityAdd')}>
            <Text style={styles.text}>Add Activity</Text>
          </TouchableOpacity>
        ) : (
          activities.filter((activity: any) => activity.status !== 'expired').map((activity: any) => (
            //make not clickable if completed (status==='active idk'), should route to camera
            <TouchableOpacity style={styles.button} key={activity.id} onPress={() => console.log("clicked on", activity)}>
              <Text style={styles.text}>{activity.category}, {activity.status}</Text>
            </TouchableOpacity>
          ))
        )}
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