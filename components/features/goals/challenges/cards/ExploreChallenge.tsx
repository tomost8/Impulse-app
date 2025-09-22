import React from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native';
import { getIconByCategory, getLabelByCategory } from '@/utils/goals';

interface ExploreChallengeProps {
  challengeItem: {
    challenge: {
      id: number;
      title: string;
      description: string;
      category: string;
      length: string;
      points_bronze: number;
      points_silver: number;
      points_gold: number;
      points_diamond: number;
    };
    shortDescription?: string;
    isJoined: boolean;
    isLocked: boolean;
  };
  isJoiningChallenge: boolean;
  onJoinChallenge: (challengeId: number, challengeTitle: string) => void;
}

const ExploreChallenge: React.FC<ExploreChallengeProps> = ({
  challengeItem,
  isJoiningChallenge,
  onJoinChallenge
}) => {
  const handleJoinChallenge = () => {
    onJoinChallenge(challengeItem.challenge.id, challengeItem.challenge.title);
  };

  const maxPoints = Math.max(
    challengeItem.challenge.points_bronze,
    challengeItem.challenge.points_silver,
    challengeItem.challenge.points_gold,
    challengeItem.challenge.points_diamond
  );

  const categoryIcon = getIconByCategory(challengeItem.challenge.category);

  // Extract day count and format title as "X Day Challenge"
  const formatTitle = (title: string) => {
    // Match patterns like "7 Day Food Challenge", "14 Day Working Out Challenge", etc.
    // This will match any text between "Day" and "Challenge"
    const match = title.match(/(\d+)\s+Day\s+.+?\s+Challenge/);
    if (match) {
      return `${match[1]} Day Challenge`;
    }
    // Fallback to original title if pattern doesn't match
    return title;
  };

  return (
    <View style={styles.challengeCard}>
      <View style={styles.iconContainer}>
        {categoryIcon && (
          <Image source={categoryIcon as ImageSourcePropType} style={styles.icon} />
        )}
      </View>
      
      <View style={styles.content}>
        <Text style={styles.challengeTitle}>{formatTitle(challengeItem.challenge.title)}</Text>
        <Text style={styles.challengeMeta}>
          {getLabelByCategory(challengeItem.challenge.category)} • Max: {maxPoints} points
        </Text>
      </View>
      
      <View style={styles.rightCircle} />
    </View>
  );
};

const styles = StyleSheet.create({
  challengeCard: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E1E1E1",
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  icon: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  content: {
    flex: 1,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#242020",
    marginBottom: 4,
  },
  challengeMeta: {
    fontSize: 12,
    color: "#666666",
  },
  rightCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E1E1E1',
    marginLeft: 12,
  },
});

export default ExploreChallenge;
