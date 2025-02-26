import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";

const ProfileScreen: React.FC = () => {
  const infoItems = [
    { label: "Email", value: "Johndoe@gmail.com" },
    { label: "First Name", value: "Devon" },
    { label: "Last Name", value: "Lane" },
    { label: "Username", value: "devonlane21" },
    { label: "Age", value: "21" },
    { label: "Gender", value: "Male" },
    { label: "Timezone", value: "Chicago / USA" },
    {
      label: "Bio",
      value:
        "Hey! I'm Nancy, 27, and I want to work on making good daily habits for myself. Extra Waking up early to workout, working on personal projects, reading, and the like. I look forward to getting better together!",
    },
  ];

  const goals = [
    { type: "Primary Goal", points: 100, description: "Working Out" },
    { type: "Secondary Goal", points: 75, description: "None selected" },
  ];

  const handleEditProfile = () => {};

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
              uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/7a484ad07fd3f7b3d88c6c6e383c508994952b67cf2f4df0dc68858e68ec9480?placeholderIfAbsent=true&apiKey=ea4b1df1a7464c4cadfa7bc5641e7e40",
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
          onPress={handleEditProfile}
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
