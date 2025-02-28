import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

const ProfileScreen = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Image
            source={{
              uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/31eebec48547bd70e44e8a8ccfa9bfe0fd316b1230a3ef5f0a72f4aa55749a9e",
            }}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Profile</Text>
      </View>

      <Image
        source={{
          uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/7a484ad07fd3f7b3d88c6c6e383c508994952b67cf2f4df0dc68858e68ec9480",
        }}
        style={styles.profileImage}
        accessibilityLabel="Profile picture"
      />

      <Text style={styles.sectionTitle}>Personal Profile</Text>

      <ProfileField label="Email" value="Johndoe@gmail.com" />
      <ProfileField label="First Name" value="Devon" />
      <ProfileField label="Last Name" value="Lane" />
      <ProfileField label="Username" value="devonlane21" />

      <View style={styles.row}>
        <ProfileField label="Age" value="21" style={styles.halfWidth} />
        <ProfileDropdown label="Gender" value="Male" style={styles.halfWidth} />
      </View>

      <ProfileDropdown label="Timezone" value="EST +5" />

      <ProfileField
        label="Bio"
        value="Tell others about yourself (Max 250 characters)"
        multiline
      />

      <Text style={styles.sectionTitle}>Goal Setting</Text>

      <View style={styles.goalContainer}>
        <View style={styles.goalHeader}>
          <Text style={styles.goalLabel}>Primary Goal</Text>
          <Text style={styles.pointsText}>100 points</Text>
        </View>
        <ProfileDropdown label="" value="Select one" />
      </View>

      <View style={styles.goalContainer}>
        <View style={styles.goalHeader}>
          <Text style={styles.goalLabel}>Secondary Goal</Text>
          <Text style={styles.pointsText}>75 points</Text>
        </View>
        <ProfileDropdown label="" value="Select one" />
      </View>

      <TouchableOpacity
        style={styles.editButton}
        accessibilityRole="button"
        accessibilityLabel="Edit Profile"
      >
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const ProfileField = ({ label, value, multiline, style }) => {
  return (
    <View style={[styles.fieldContainer, style]}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={[styles.fieldInput, multiline && styles.multilineInput]}
        value={value}
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
        editable={false}
        accessibilityLabel={`${label}: ${value}`}
      />
    </View>
  );
};

const ProfileDropdown = ({ label, value, style }) => {
  return (
    <View style={[styles.fieldContainer, style]}>
      {label && <Text style={styles.fieldLabel}>{label}</Text>}
      <TouchableOpacity
        style={styles.dropdown}
        accessibilityRole="button"
        accessibilityLabel={`Select ${label}: ${value}`}
      >
        <Text style={styles.dropdownText}>{value}</Text>
        <Image
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/1ab7928ee58d5e6eaacc9a47d497d2cb82fe4bd8bac2a9e4f266afd4199bba17",
          }}
          style={styles.dropdownIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  contentContainer: {
    borderRadius: 30,
    maxWidth: 480,
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
  backIcon: {
    width: 24,
    height: 24,
    marginRight: 13,
  },
  headerText: {
    fontFamily: "Poppins",
    fontSize: 16,
    fontWeight: "600",
    color: "#242020",
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    alignSelf: "center",
    marginBottom: 40,
  },
  sectionTitle: {
    fontFamily: "Poppins",
    fontSize: 16,
    fontWeight: "600",
    color: "#242020",
    marginBottom: 23,
    marginTop: 40,
  },
  fieldContainer: {
    marginBottom: 23,
  },
  fieldLabel: {
    fontFamily: "Open Sans",
    fontSize: 16,
    color: "#A4ACBC",
    marginBottom: 8,
  },
  fieldInput: {
    borderWidth: 1,
    borderColor: "rgba(225, 225, 225, 1)",
    borderRadius: 30,
    padding: 14,
    fontFamily: "Open Sans",
    fontSize: 16,
    color: "#000000",
  },
  multilineInput: {
    height: 190,
    textAlignVertical: "top",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfWidth: {
    width: "48%",
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(225, 225, 225, 1)",
    borderRadius: 30,
    padding: 14,
  },
  dropdownText: {
    fontFamily: "Open Sans",
    fontSize: 16,
    color: "#000000",
  },
  dropdownIcon: {
    width: 16,
    height: 16,
  },
  goalContainer: {
    marginBottom: 20,
  },
  goalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  goalLabel: {
    fontFamily: "Open Sans",
    fontSize: 16,
    color: "#A4ACBC",
  },
  pointsText: {
    fontFamily: "Open Sans",
    fontSize: 14,
    color: "#DE728D",
  },
  editButton: {
    backgroundColor: "#DE728D",
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 40,
  },
  editButtonText: {
    fontFamily: "Poppins",
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});

export default ProfileScreen;
