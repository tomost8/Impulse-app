import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ProfilePictureWithLoading from "@/components/ui/common/ProfilePictureWithLoading";

interface LeaderboardListItemProps {
  rank: number;
  name: string;
  points: string;
  imageUrl: any; // Expecting a local image using require()
}

const LeaderboardListItem: React.FC<LeaderboardListItemProps> = ({ rank, name, points, imageUrl }) => {
  return (
    <View style={styles.container}>
      {/* Rank Number */}
      <Text style={styles.rank}>{rank}</Text>

      {/* Profile Image */}
      <ProfilePictureWithLoading 
        source={{uri: imageUrl}} 
        size={48}
        style={styles.profileImage} 
      />

      {/* Name and Points */}
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.points}>{points} Pts</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FCEAEC", // Light pink background
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: "100%",
  },
  rank: {
    fontSize: 24, // Matches Figma size
    fontWeight: "600",
    fontFamily: "Open Sans",
    color: "#9F4A5F", // Darker pink color
    width: 33, // To align numbers properly
    textAlign: "center",
  },
  profileImage: {
    width: 51, // Matches the Figma ellipse width
    height: 51, // Matches the Figma ellipse height
    borderRadius: 25.5, // Makes the image circular
    marginLeft: 10, // Spacing between rank and profile picture
  },
  textContainer: {
    marginLeft: 16, // Space between profile image and text
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Open Sans",
    color: "#000000", // Black for name text
    marginBottom: 3,
  },
  points: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Open Sans",
    color: "#5C5C5C", // Gray color for points
  },
});

export default LeaderboardListItem;
