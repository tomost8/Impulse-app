import styles from '@/constants/testStyles';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

import React, { useState, useEffect, useRef } from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// figuring out data retrieval
import { useGetFriendsLeaderboard } from '@/hooks/api/useFriends';
import { useGetActivities } from '@/hooks/api/useActivites';

// Main component
const HomeScreen = (props: any) => {
  console.log("HomeScreen rendered");

  const { userId, authToken } = props; 
  const friendsRef= useRef<any[] | null>(null);
  const hasFetchedFriends = useRef(false);
  const activitiesRef = useRef<any[] | null>(null);
  const hasFetchedActivities = useRef(false);

  // Fetch data
  const { friends, fetched: friendsFetched } = useGetFriendsLeaderboard(userId, 'POINTS_WEEKLY', !hasFetchedFriends.current);
  const { activities, fetched: activitiesFetched } = useGetActivities(userId, authToken, !hasFetchedActivities.current);

  useEffect(() => {
    if (friendsFetched) {
      friendsRef.current = friends;
      hasFetchedFriends.current = true;
      console.log("friendsRef", friendsRef.current);
    }
    if (activitiesFetched) {
      activitiesRef.current = activities;
      hasFetchedActivities.current = true;
      console.log("activitiesRef", activitiesRef.current);
    }
  }, [friendsFetched, activitiesFetched]); 

  return <HomeComponent friends={friends} activities={activities}/>;
};

export default AuthWrapper(HomeScreen);

// Home Screen Component for rendering the UI
function HomeComponent({ friends, activities }: { friends: any[], activities: any[]}) {
  return (
    <ScrollView>
      <View style={styles.section}>
        <Text style={styles.text}>Quote of the Day</Text>
        <Text style={styles.text}>The quote goes here using normal text</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>Daily Goals</Text>
        {activities.length === 0 ? (
          <TouchableOpacity style={styles.button} onPress={() => router.push('/home/activityAdd')}>
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