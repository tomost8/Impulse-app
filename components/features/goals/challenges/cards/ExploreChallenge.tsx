import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { getIconByCategory, getLabelByCategory } from '@/utils/goals';
import ChallengeLockedModal from '../Modal/ChallengeLockedModal';
import { router } from 'expo-router';

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
    status?: string;
    userChallengeId?: number;
    isJoined: boolean;
    isLocked: boolean;
  };
}

const ExploreChallenge: React.FC<ExploreChallengeProps> = ({
  challengeItem,
}) => {

  const [showModalPopup, setshowModalPopup] = useState(false);
  
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

  const handlePress = () => {
    if (!challengeItem.isLocked && !challengeItem.isJoined) {
      router.push({
        pathname: '/home/challenges/joinChallenge',
        params: { challenge: JSON.stringify(challengeItem) }
      });
    } else if (challengeItem.isJoined) {
        router.push(`/home/challenges/${challengeItem.userChallengeId}`);
    } else {
      setshowModalPopup(true);
    }
  };


  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.challengeCard}>
        <View style={styles.iconContainer}>
          {categoryIcon && (
            <Image source={categoryIcon as ImageSourcePropType} style={styles.icon} />
          )}
        </View>

        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Text style={styles.challengeTitle}>{formatTitle(challengeItem.challenge.title)}</Text>

            <Text style={styles.status}>
              {(challengeItem.status === "ACTIVE" || challengeItem.status === "COMPLETED")
                ? challengeItem.status.charAt(0).toUpperCase() + challengeItem.status.slice(1).toLowerCase()
                : ""}
            </Text>
          </View>
          <Text style={styles.challengeMeta}>
            {getLabelByCategory(challengeItem.challenge.category)}  •  Max: {maxPoints} points
          </Text>
        </View>

        {!challengeItem.isJoined && challengeItem.isLocked && (
          <Feather name="lock" size={24} color="#FE6D73" />
        )}

        {/*
        {!challengeItem.isJoined && !challengeItem.isLocked && (
          <Feather name="unlock" size={24} color="#FE6D73" />
        )}
        */}

        <ChallengeLockedModal
          isVisible={showModalPopup}
          onClose={() => setshowModalPopup(false)}
        />

      </View>
    </TouchableOpacity>
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
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#242020",
    marginBottom: 4,
  },
  challengeMeta: {
    fontSize: 12,
    color: "#5E6676",
  },
  rightCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E1E1E1',
    marginLeft: 12,
  },
  status: {
    fontSize: 12,
    fontWeight: "700",
    color: "#DE728D",
    fontFamily: "Poppins",
    lineHeight: 18,
    marginLeft: 8,
  },
});

export default ExploreChallenge;
