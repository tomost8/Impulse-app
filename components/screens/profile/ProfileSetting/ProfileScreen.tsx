import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { router } from 'expo-router';
import { getLabelByCategory } from '@/utils/goals';

interface ProfileScreenProps {  
  user: any;
  isUserLoading: boolean;
}


const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, isUserLoading }) => {
  if (isUserLoading) {
    return <Text>Loading...</Text>;
  }
  //console.log("ProfileScreen", user);
  
  const infoItems = [
    { label: "Email", value: user.email || "N/A" },
    { label: "First Name", value: user.firstName || "N/A" },
    { label: "Last Name", value: user.lastName || "N/A" },
    { label: "Username", value: user.username || "N/A" },
    { label: "Age", value: user.age ? user.age.toString() : "N/A" },
    { label: "Gender", value: user.gender || "N/A" },
    { label: "Timezone", value: user.timezone || "N/A" },
    { label: "Bio", value: user.bio || "No bio available." },
  ];

  const goals = [
    { type: "Primary Goal", points: 100, description: getLabelByCategory(user.primary_goal) || "N/A" },
    { type: "Secondary Goal", points: 75, description: getLabelByCategory(user.secondary_goal) || "None Selected" },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={styles.time} accessibilityLabel="Current time">
          9:41
        </Text>
        <View style={styles.titleContainer}>
          <Image
            accessibilityLabel="Back arrow"
            resizeMode="contain"
            source={{
              uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/31eebec48547bd70e44e8a8ccfa9bfe0fd316b1230a3ef5f0a72f4aa55749a9e?placeholderIfAbsent=true&apiKey=ea4b1df1a7464c4cadfa7bc5641e7e40",
            }}
            style={styles.backArrow}
          />
          <Text style={styles.title}>Profile</Text>
        </View>
      </View>
      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
          <Image
            accessibilityLabel="User profile picture"
            resizeMode="contain"
            source={{
              uri: user.profile_picture,
            }}
            style={styles.avatar}
          />
        </View>
        <View style={styles.personalInfoContainer}>
          <Text style={styles.sectionTitle}>Personal Profile</Text>
          {infoItems.map((item, index) => (
            <View key={index} style={styles.infoItem}>
              <Text style={styles.label}>{item.label}</Text>
              <Text style={styles.value}>{item.value}</Text>
            </View>
          ))}
        </View>
        <View style={styles.goalSettingContainer}>
          <Text style={styles.sectionTitle}>Goal Setting</Text>
          {goals.map((goal, index) => (
            <View key={index} style={styles.goalItem}>
              <View style={styles.goalHeader}>
                <Text style={styles.goalType}>{goal.type}</Text>
                <Text style={styles.points}>{goal.points} points</Text>
              </View>
              <Text style={styles.description}>{goal.description}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity
          style={styles.editProfileButton}
          onPress={() => router.push('/account/settings/profile/editProfile')}
          accessibilityLabel="Edit Profile"
          accessibilityRole="button"
        >
          <Text style={styles.editProfileButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  contentContainer: {
    borderRadius: 30,
    alignItems: "stretch",
  },
  header: {
    width: "100%",
    paddingHorizontal: 37,
    paddingTop: 11,
    paddingBottom: 32,
  },
  time: {
    fontFamily: "SF Pro Text, sans-serif",
    fontSize: 17,
    color: "#242020",
    fontWeight: "600",
    textAlign: "center",
    letterSpacing: -0.41,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  backArrow: {
    width: 7,
    height: 14,
    marginRight: 13,
  },
  title: {
    fontFamily: "Poppins, sans-serif",
    fontSize: 16,
    color: "#242020",
    fontWeight: "600",
  },
  profileContainer: {
    borderRadius: 30,
    padding: 20,
    marginTop: 11,
  },
  avatarContainer: {
    borderRadius: 91,
    minHeight: 130,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
  },
  personalInfoContainer: {
    marginBottom: 40,
  },
  sectionTitle: {
    color: "#242020",
    fontFamily: "Poppins, sans-serif",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 23,
  },
  infoItem: {
    marginBottom: 23,
  },
  label: {
    color: "#A4ACBC",
    fontFamily: "Open Sans, sans-serif",
    fontSize: 16,
    fontWeight: "400",
  },
  value: {
    color: "#242020",
    fontFamily: "Open Sans, sans-serif",
    fontSize: 16,
    fontWeight: "400",
    marginTop: 4,
  },
  goalSettingContainer: {
    marginBottom: 40,
  },
  goalItem: {
    marginBottom: 20,
  },
  goalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  goalType: {
    color: "#A4ACBC",
    fontFamily: "Open Sans, sans-serif",
    fontSize: 16,
    fontWeight: "400",
  },
  points: {
    color: "#DE728D",
    fontFamily: "Open Sans, sans-serif",
    fontSize: 14,
    fontWeight: "400",
  },
  description: {
    color: "#242020",
    fontFamily: "Open Sans, sans-serif",
    fontSize: 16,
    fontWeight: "400",
  },
  editProfileButton: {
    backgroundColor: "#DE728D",
    borderRadius: 30,
    minHeight: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  editProfileButtonText: {
    color: "#FFFFFF",
    fontFamily: "Poppins, sans-serif",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default ProfileScreen;
