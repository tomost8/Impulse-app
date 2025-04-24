import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";


interface LeaderboardPodiumProps {
  podiumData: any[];
}

const LeaderboardPodium: React.FC<LeaderboardPodiumProps> = ({ podiumData }) => {
  // Ensure users are sorted correctly (2nd, 1st, 3rd for correct layout)
  const sortedPodium = [
    podiumData[1],
    podiumData[0],
    podiumData[2],
  ];

  return (
    <View style={styles.container}>
      <View style={styles.podiumRow}>
        {sortedPodium.map((user, index) => (
          <View key={index} style={[styles.podiumColumn, getPodiumStyle(getOriginalPosition(index))]}>
            {/* Profile Image, Username, and Points only shown if user exists */}
            {user && (
              <>
                <Image source={user.profile_picture} style={styles.profileImage} />
                <Text style={styles.username}>{user.username}</Text>
                <Text style={styles.points}>{user.point.weekly_points} Pts</Text>
              </>
            )}

            {/* Podium Block always shown */}
            <View style={[styles.podiumBlock, getBlockStyle(getOriginalPosition(index))]}>
              <Text style={styles.podiumNumber}>{getOriginalPosition(index)}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

// ✅ Function to adjust the column positioning
const getPodiumStyle = (position: number) => {
  switch (position) {
    case 1:
      return { marginTop: 0, zIndex: 3 }; // Center, highest
    case 2:
      return { marginTop: 20, zIndex: 2 }; // Left, lower than 1st
    case 3:
      return { marginTop: 40, zIndex: 1 }; // Right, lowest
    default:
      return {};
  }
};

// ✅ Function to adjust the block heights
const getBlockStyle = (position: number) => {
  switch (position) {
    case 1:
      return { height: 100, backgroundColor: "#DE728D" }; // Highest
    case 2:
      return { height: 80, backgroundColor: "#C35A74" }; // Middle
    case 3:
      return { height: 65, backgroundColor: "#9F4A5F" }; // Lowest
    default:
      return {};
  }
};

// Convert the display index back to the original position
const getOriginalPosition = (displayIndex: number): number => {
  switch (displayIndex) {
    case 0: return 2; // First display position shows 2nd place
    case 1: return 1; // Middle display position shows 1st place
    case 2: return 3; // Last display position shows 3rd place
    default: return displayIndex + 1;
  }
};

// ✅ Styles
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 0,
  },
  podiumRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  podiumColumn: {
    alignItems: "center",
    justifyContent: "center",
    width: 100,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
  },
  username: {
    fontSize: 14,
    fontWeight: "600",
    color: "#242020",
    textAlign: "center",
    marginBottom: 5,
  },
  points: {
    fontSize: 12,
    fontWeight: "500",
    color: "#5C5C5C",
    textAlign: "center",
    marginBottom: 10,
  },
  podiumBlock: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  podiumNumber: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
  },
});

export default LeaderboardPodium;
