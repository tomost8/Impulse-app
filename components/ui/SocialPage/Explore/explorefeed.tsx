import React from 'react';
import { View, StyleSheet } from 'react-native';
import CommunityCard from './communitycard';

interface ExploreFeedProps {
  onJoinCommunity?: (communityId: string) => void;
}

const ExploreFeed: React.FC<ExploreFeedProps> = ({ onJoinCommunity }) => {
  // Sample data - replace with real data later
  const sampleCommunities = Array(6).fill({
    name: "Hiking Adventures",
    memberCount: 25,
  });

  return (
    <View style={styles.container}>
      <View style={styles.cardGrid}>
        {sampleCommunities.map((community, index) => (
          <CommunityCard
            key={index}
            name={community.name}
            memberCount={community.memberCount}
            onJoin={() => onJoinCommunity?.(index.toString())}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 350,
    alignSelf: 'center',
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 16,
    paddingVertical: 16,
  },
});

export default ExploreFeed;
