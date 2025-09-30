import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ProfilePictureWithLoading from "@/components/ui/common/ProfilePictureWithLoading";

interface LeaderboardRowProps {
  rank: number;
  name: string;
  points: string;
  imageUrl: any; // Local image (require)
}

const LeaderboardRow: React.FC<LeaderboardRowProps> = ({ rank, name, points, imageUrl }) => {
  return (
    <View style={styles.container}>
      {/* Rank Number */}
      <Text style={styles.rank}>{rank}</Text>

      {/* Profile Image */}
      <ProfilePictureWithLoading 
        source={{uri: imageUrl}} 
        size={40}
        style={styles.profileImage} 
      />

      {/* Name */}
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
      </View>

      {/* Points Badge */}
      <View style={styles.pointsContainer}>
        <Text style={styles.points}>{points}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginBottom: 5, // Space between rows
  },

  rank: {
    fontSize: 16,
    fontWeight: "700",
    color: "#9F4A5F", // Darker pink for rank numbers
    width: 33, // Fixed width for consistent alignment
    textAlign: "center",
  },

  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20, // Circular image
    marginLeft: 5, // Adjust spacing
  },

  textContainer: {
    flex: 1, // Allows text to grow
    marginLeft: 12, // Spacing between image and text
  },

  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333", // Dark text for name
  },

  pointsContainer: {
    backgroundColor: "#DE728D", // Pink background for points
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },

  points: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFF", // White text inside the pink badge
  },
});

export default LeaderboardRow;
