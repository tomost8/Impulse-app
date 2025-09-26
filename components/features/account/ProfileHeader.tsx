import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

interface ProfileHeaderProps {
  user: {
    profile_picture: string;
    first_name: string;
    last_name: string;
    username: string;
  };
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  return (
    <View style={styles.profileContainer}>
      {/* Crescent Background */}
      <View style={styles.crescentContainer}>
        <View style={styles.crescent} />
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: user.profile_picture }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{user.first_name} {user.last_name}</Text>
        <Text style={styles.profileUsername}>@{user.username}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  /* Profile */
  profileContainer: {
    position: 'relative',
    paddingBottom: 16,
  },
  crescentContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    overflow: 'hidden',
  },
  crescent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 500,
    borderBottomLeftRadius: 800,
    borderBottomRightRadius: 800,
    backgroundColor: '#E0EDFD',
    transform: [
      { scaleX: 1.3 },
      { translateY: -380 },
    ],
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 60,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileName: {
    fontSize: 24,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#242020',
    marginTop: 16,
  },
  profileUsername: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    color: '#979797',
    marginTop: 4,
  },
});

export default ProfileHeader;
