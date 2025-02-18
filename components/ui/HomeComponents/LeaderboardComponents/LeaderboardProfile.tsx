import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

// Define props for the leaderboard profile
interface LeaderboardProfileProps {
  name: string;
  points: string;
  imageUrl: any; // Using "any" to allow local images with require()
  rank: number; // ✅ Add rank prop
}

const LeaderboardProfile: React.FC<LeaderboardProfileProps> = ({
    name,
    points,
    imageUrl,
    rank,
  }) => {
    return (
      <View style={[styles.profileContainer, getProfileOffset(rank)]}>
        <Image source={imageUrl} style={styles.profileImage} />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.points}>{points} Pts</Text>
      </View>
    );
  };

  const getProfileOffset = (rank: number) => {
    switch (rank) {
      case 1:
        return { top: -10 }; // Higher placement for 1st place
      case 2:
        return { top: 25 }; // Second place slightly lower
      case 3:
        return { top: 50 }; // Third place lower
      default:
        return { top: 0 }; // For lower ranks
    }
  };

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: "column",
    alignItems: "center", // ✅ Fix: Ensures text and image are properly centered
    justifyContent: "center", // ✅ Fix: Helps align text with the podium spot
    alignSelf: "center", // ✅ Fix: Makes sure each profile is directly above its podium spot
    marginBottom: -10, // ✅ Adjusts positioning to avoid excessive space above the podium
  },
  profileImage: {
    width: 66.2,
    height: 66.2,
    borderRadius: 33, // ✅ Ensures the image is a perfect circle
  },
  name: {
    fontSize: 16,
    fontWeight: "700", // ✅ Matches Figma bold text
    fontFamily: "Open Sans",
    color: "#242020", // ✅ Dark color for contrast
    textAlign: "center",
    marginTop: 8, // ✅ Adds spacing between the image and name
  },
  points: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Open Sans",
    color: "#5C5C5C", // ✅ Matches the gray color in Figma
    textAlign: "center",
    lineHeight: 19.6,
    letterSpacing: 0.184,
    marginTop: 2, // ✅ Adds slight spacing between the name and points
    marginBottom: 5,
  },
});

export default LeaderboardProfile;
