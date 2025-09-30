import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { DEFAULT_COMMUNITY_THUMBNAIL } from '@/utils/userOptions';

interface CommunityCardProps {
  id: string;
  name: string;
  memberCount: number;
  image?: string;
  onJoin?: () => void;
}

const CommunityCard: React.FC<CommunityCardProps> = ({
  id,
  name = "Community Name",
  memberCount,
  image,
  onJoin
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleCardPress = () => {
    router.push(`/community/${id}`);
  };

  const handleJoinPress = (e: any) => {
    e.stopPropagation(); // Prevent card navigation when pressing join
    onJoin?.();
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
  };

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={handleCardPress}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        <Image
          source={image ? { uri: image } : { uri: DEFAULT_COMMUNITY_THUMBNAIL }}
          style={styles.image}
          resizeMode="cover"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
        {isLoading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="small" color="#DE728D" />
          </View>
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.memberCount}>{memberCount} {memberCount === 1 ? 'member' : 'members'}</Text>
        <TouchableOpacity 
          style={styles.joinButton}
          onPress={handleJoinPress}
          activeOpacity={0.8}
        >
          <Text style={styles.joinButtonText}>Join Community</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 165,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DE728D',
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 180,
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: '#F5F5F5',
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
  infoContainer: {
    padding: 12,
    gap: 4,
  },
  name: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontWeight: '600',
    color: '#000000',
  },
  memberCount: {
    fontSize: 12,
    fontFamily: 'Open Sans',
    color: '#979797',
    marginBottom: 4,
  },
  joinButton: {
    backgroundColor: '#DE728D',
    borderRadius: 100,
    paddingVertical: 8,
    alignItems: 'center',
    marginTop: 4,
  },
  joinButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Open Sans',
    fontWeight: '600',
  },
});

export default CommunityCard;
