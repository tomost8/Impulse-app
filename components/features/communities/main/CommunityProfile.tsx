import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { DEFAULT_COMMUNITY_THUMBNAIL } from '@/utils/userOptions';

interface CommunityProfileProps {
  name: string;
  memberCount: number;
  thumbnail: string;
  communityId: string;
  isAdmin: boolean;
  isMember: boolean;
  onJoinCommunity: () => void;
  isJoining: boolean;
}

const CommunityProfile: React.FC<CommunityProfileProps> = ({
  name = "Community Name",
  memberCount = 25,
  thumbnail,
  communityId,
  isAdmin,
  isMember,
  onJoinCommunity,
  isJoining
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleEdit = () => {
    router.push(`/community/${communityId}/editCommunity`);
  };

  const handleJoinPress = () => {
    onJoinCommunity();
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={thumbnail ? { uri: thumbnail } : { uri: DEFAULT_COMMUNITY_THUMBNAIL }}
          style={styles.coverImage}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
        {isLoading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="small" color="#DE728D" />
          </View>
        )}
      </View>
      
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
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 109,
  },
  coverImage: {
    width: '100%',
    height: 109,
    alignSelf: 'stretch',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(245, 245, 245, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
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

export default CommunityProfile;
