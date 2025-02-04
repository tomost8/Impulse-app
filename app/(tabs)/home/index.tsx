import styles from '@/constants/testStyles';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// figuring out data retrieval
import { useGetFriendsLeaderboard } from '@/hooks/api/useFriends';
import { useGetActivities } from '@/hooks/api/useActivites';
import { useQuery } from '@apollo/client';
import { GET_ACTIVITIES } from '@/services/api/activities';
import { GET_FRIENDS_SORTING } from '@/services/api/friends';

// Main component
const HomeScreen = (props: any) => {
  console.log("HomeScreen rendered"); // Log every render

  const { userId, authToken } = props; 
  const { friends, activities } = HomeData({ userId, authToken });

  return <HomeComponent friends={friends} activities={activities}/>;
};

// Optional: If you want to track mounting and unmounting
useEffect(() => {
  console.log("HomeScreen mounted");

  return () => {
    console.log("HomeScreen unmounted");
  };
}, []); // This will run only on mount and unmount

export default AuthWrapper(HomeScreen);

function HomeData({ userId, authToken }: { userId: number, authToken: string }) {
  const { activities } = useGetActivities(userId, authToken);
  const { friends } = useGetFriendsLeaderboard(userId, 'POINTS_WEEKLY');
  return { friends, activities };
}

// New HomeComponent to render the UI
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