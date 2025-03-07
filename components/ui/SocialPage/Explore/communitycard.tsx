import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';

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
  memberCount = 25,
  image,
  onJoin
}) => {
  const handleCardPress = () => {
    router.push(`/community/${id}`);
  };

  const handleJoinPress = (e: any) => {
    e.stopPropagation(); // Prevent card navigation when pressing join
    onJoin?.();
  };

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={handleCardPress}
      activeOpacity={0.7}
    >
      <Image
        source={image ? { uri: image } : require("@/assets/images/communityprofile.png")}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.memberCount}>{memberCount} members</Text>
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
  image: {
    width: '100%',
    height: 180,
    backgroundColor: '#F5F5F5',
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
