import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

// Sample data for communities
const communities = [
  {
    id: '1',
    name: 'Community Name',
    image: require('@/assets/images/community.png'),
  },
  {
    id: '2',
    name: 'Community Name',
    image: require('@/assets/images/community.png'),
  },
  {
    id: '3',
    name: 'Community Name',
    image: require('@/assets/images/community.png'),
  },
  {
    id: '4',
    name: 'Community Name',
    image: require('@/assets/images/community.png'),
  },
  {
    id: '5',
    name: 'Community Name',
    image: require('@/assets/images/community.png'),
  },
];

interface CommunityListProps {
  onCommunityPress?: (communityId: string) => void;
}

const CommunityList: React.FC<CommunityListProps> = ({ onCommunityPress }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {communities.map((community) => (
        <TouchableOpacity
          key={community.id}
          style={styles.communityItem}
          onPress={() => onCommunityPress?.(community.id)}
        >
          <Image
            source={community.image}
            style={styles.communityImage}
          />
          <Text style={styles.communityName}>{community.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    gap: 15,
  },
  communityItem: {
    alignItems: 'center',
    width: 70,
  },
  communityImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 5,
  },
  communityName: {
    fontSize: 10,
    color: '#242020',
    fontFamily: 'Poppins',
    textAlign: 'center',
    width: '100%',
  },
});

export default CommunityList;
