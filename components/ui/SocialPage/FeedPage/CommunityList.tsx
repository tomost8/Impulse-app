import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

interface CommunityListProps {
  communities: any[];
}

const CommunityList: React.FC<CommunityListProps> = ({ communities }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {communities?.map((community) => (
        <TouchableOpacity
          key={community.id}
          style={styles.communityItem}
          onPress={() => console.log('Community pressed:', community.id)}
        >
          <Image
            source={community.thumbnail}
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
    marginBottom: 8,
  },
  communityName: {
    fontSize: 8,
    color: '#242020',
    fontFamily: 'Poppins',
    textAlign: 'center',
    width: '100%',
  },
});

export default CommunityList;
