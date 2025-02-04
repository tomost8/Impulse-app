import styles from '@/constants/testStyles';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import React from 'react';

// Home Screen Component for rendering the UI
function HomeScreen({ 
  friends, 
  isFriendsLoading,
  activities, 
  isActivitiesLoading 
}: { 
  friends: any[], 
  isFriendsLoading: boolean,
  activities: any[],
  isActivitiesLoading: boolean
}) {
  const validActivities = activities.filter((activity: any) => activity.status !== 'expired');

  return (
    <ScrollView>
      <View style={styles.section}>
        <Text style={styles.text}>Quote of the Day</Text>
        <Text style={styles.text}>The quote goes here using normal text</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>Daily Goals</Text>
        {validActivities.length === 0 ? (
          <TouchableOpacity style={styles.button} onPress={() => router.push('/home/activityAdd')}>
            <Text style={styles.text}>Add Activity</Text>
          </TouchableOpacity>
        ) : (
          validActivities.map((activity: any) => (
            <TouchableOpacity style={styles.button} key={activity.id} onPress={() => console.log("clicked on", activity)}>
              <Text style={styles.text}>{activity.category}, {activity.status}</Text>
            </TouchableOpacity>
          ))
        )}
        <TouchableOpacity style={styles.button} onPress={() => router.push('/home/activityView')}>
          <Text style={styles.text}>View All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/account/settings/notifications')}>
          <Text style={styles.text}>Notifications</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>Weekly Leaderboard</Text>
        {friends.map((friend: any) => (
          <Text key={friend.friend.id} style={styles.text}>{friend.friend.username}, {friend.friend.point.weekly_points}</Text>
        ))}
        <TouchableOpacity style={styles.button} onPress={() => router.push('/home/leaderboards')}>
          <Text style={styles.text}>View All</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default HomeScreen; 