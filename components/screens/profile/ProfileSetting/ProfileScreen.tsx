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
import { s } from "react-native-size-matters";

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
    { label: "First Name", value: user.first_name || "N/A" },
    { label: "Last Name", value: user.last_name || "N/A" },
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
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
          >
            <Image
              source={require("@/assets/icons/backArrow.png")}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
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
            style={[styles.avatar, { borderWidth: 1, borderColor: 'black' }]}
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
  headerContainer: {
    backgroundColor: '#E0EDFD',
    paddingTop: s(25),
    paddingBottom: s(18),
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: s(16),
  },
  backButton: {
    marginRight: s(8),
  },
  backIcon: {
    width: 10,
    height: 15,
    tintColor: '#242020',
    marginLeft: 5,
    marginRight: 5,
  },
  headerTitle: {
    color: '#242020',
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '600',
  },
  contentContainer: {
    borderRadius: 30,
    alignItems: "stretch",
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
    marginBottom: 35,
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
    marginBottom: 20,
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
    marginBottom: 20,
  },
  editProfileButtonText: {
    color: "#FFFFFF",
    fontFamily: "Poppins, sans-serif",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default ProfileScreen;
