import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

interface HeaderProps {
  username?: string;
  timeAgo?: string;
  profileImage?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  username = "Username",
  timeAgo = "18 minutes ago",
  profileImage
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Image 
          source={require("@/assets/icons/backArrow.png")}
          style={styles.backIcon}
        />
      </TouchableOpacity>

      <View style={styles.userInfo}>
        <View style={styles.profileImageContainer}>
          <Image 
            source={profileImage ? { uri: profileImage } : require("@/assets/images/andrew.png")}
            style={styles.profileImage}
          />
        </View>
        
        <View style={styles.textContainer}>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.timeAgo}>{timeAgo}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F8F8F8',
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1',
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileImageContainer: {
    marginRight: 12,
  },
  profileImage: {
    width: 29,
    height: 29,
    borderRadius: 14.5,
  },
  textContainer: {
    flex: 1,
  },
  username: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    color: '#000000',
    fontWeight: '600',
  },
  timeAgo: {
    fontSize: 10,
    fontFamily: 'Open Sans',
    color: '#979797',
    fontWeight: '400',
  },
});

export default Header;
