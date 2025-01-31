import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useGetUser, useGetPoints } from '@/hooks/api/useUsers';
import styles from '@/constants/testStyles';
import useUserInfo from '@/hooks/useUserInfo';

export default function PartnerScreen() {
  const { userId } = useUserInfo();
  const { user, isLoading: userLoading, error: userError } = useGetUser(Number(userId));
  const { points, isLoading: pointsLoading, error: pointsError } = useGetPoints(Number(userId));
  if (userLoading || pointsLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="white" />
      </View>
    );
  }

  if (userError || pointsError) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{userError || pointsError}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
          Partner Insights
      </Text>
      <Text style={styles.text}>
          Profile Picture: {user.profile_picture}
      </Text>
      <Text style={styles.text}>
          First Name: {user.first_name}
      </Text>
      <Text style={styles.text}>
          Username: {user.username}
      </Text>
      <Text style={styles.todoText}>
          Todo: Daily Goals + Joined communities + Nudge
      </Text>
      <Text style={styles.text}>
          Points: {points.points}
      </Text>
      <Text style={styles.text}>
          Bio: {user.bio}
      </Text>
      <Text style={styles.text}>
          Gender: {user.gender}
      </Text>
      <Text style={styles.text}>
          Timezone: {user.timezone}
      </Text>
      <Text style={styles.text}>
          Primary Goal: {user.primary_goal}
      </Text>
      <Text style={styles.text}>
          Secondary Goal: {user.secondary_goal}
      </Text>
    </View>
  );
}
