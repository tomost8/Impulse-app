import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';

interface HeaderProps {
  name: string;
  memberCount: number;
  thumbnail: string;
  communityId: string;
  isAdmin: boolean;
  isMember: boolean;
  onJoinCommunity: () => void;
  isJoining: boolean;
}

const Header: React.FC<HeaderProps> = ({
  name = "Community Name",
  memberCount = 25,
  thumbnail,
  communityId,
  isAdmin,
  isMember,
  onJoinCommunity,
  isJoining
}) => {
  const handleEdit = () => {
    router.push(`/community/${communityId}/editCommunity`);
  };

  const handleJoinPress = () => {
    onJoinCommunity();
  };

  return (
    <View style={styles.container}>
      <Image
        source={thumbnail ? { uri: thumbnail } : require("@/assets/images/communityprofile.png")}
        style={styles.coverImage}
      />
      
      <View style={styles.contentContainer}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>{name}</Text>
          <View style={styles.actionButtons}>
            {!isMember && !isAdmin && (
              <TouchableOpacity 
                style={[styles.joinButton, isJoining && styles.joinButtonDisabled]}
                onPress={handleJoinPress}
                disabled={isJoining}
                activeOpacity={0.8}
              >
                <Text style={styles.joinButtonText}>
                  {isJoining ? 'Joining...' : 'Join Community'}
                </Text>
              </TouchableOpacity>
            )}
            {isAdmin && (
              <TouchableOpacity onPress={handleEdit}>
                <Image 
                  source={require("@/assets/icons/edit.png")}
                  style={styles.editIcon}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        
        <Text style={styles.memberCount}>{memberCount} members</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  coverImage: {
    width: '100%',
    height: 109,
    alignSelf: 'stretch',
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#000000',
  },
  editIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: '#DE728D',
  },
  memberCount: {
    fontSize: 12,
    fontFamily: 'Open Sans',
    color: '#979797',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  joinButton: {
    backgroundColor: '#DE728D',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 10,
  },
  joinButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '600',
  },
  joinButtonDisabled: {
    backgroundColor: '#E0E0E0',
    opacity: 0.7,
  },
});

export default Header;
