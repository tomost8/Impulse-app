import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

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
      <View style={styles.userInfo}>
        <View style={styles.profileContainer}>
          <Image 
            source={profileImage ? { uri: profileImage } : require("@/assets/images/andrew.png")}
            style={styles.profilePicture}
          />
        </View>
        <Text style={styles.username}>{username}</Text>
      </View>
      <Text style={styles.timeAgo}>{timeAgo}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profileContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePicture: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  username: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    color: '#000000',
    fontWeight: '600',
  },
  timeAgo: {
    fontSize: 12,
    fontFamily: 'Open Sans',
    color: '#979797',
  },
});

export default Header;
