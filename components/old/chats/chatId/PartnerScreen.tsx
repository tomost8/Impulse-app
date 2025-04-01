import styles from "@/utils/testStyles";
import { View, Text, TouchableOpacity, Image } from 'react-native';

export default function PartnerScreenOld({
    user,
    isUserLoading,
  }: {
    user: any;
    isUserLoading: boolean;
  }) {
    if (isUserLoading) {
      return <Text>Loading...</Text>;
    }
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
            Partner Insights
        </Text>
        <Image source={{ uri: user.profile_picture }} style={styles.smallImage} />
        <Text style={styles.text}>
            First Name: {user.first_name}
        </Text>
        <Text style={styles.text}>
            Username: {user.username}
        </Text>
        <Text style={styles.todoText}>
            Todo: Daily Goals + Joined communities + Nudge
        </Text>
        {/*
        <Text style={styles.text}>
            Points: {user.point.points}
        </Text>
        */}
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