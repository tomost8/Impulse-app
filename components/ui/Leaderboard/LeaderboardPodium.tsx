import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

// Define Props
interface PodiumUser {
  position: number; // 1, 2, or 3
  name: string;
  points: number;
  profileImage: string;
}

interface LeaderboardPodiumProps {
  podiumData: PodiumUser[]; // Array of top 3 users
}

// ✅ Leaderboard Podium Component
const LeaderboardPodium: React.FC<LeaderboardPodiumProps> = ({ podiumData }) => {
  return (
    <View style={styles.container}>
      <View style={styles.podiumRow}>
        {podiumData.map((user) => (
          <View key={user.position} style={[styles.podiumBlock, getPodiumStyle(user.position)]}>
            <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
            <Text style={styles.username}>{user.name}</Text>
            <Text style={styles.points}>{user.points} Pts</Text>
            <Text style={[styles.podiumNumber, getNumberOffset(user.position)]}>{user.position}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

// ✅ Function to adjust the podium block styles dynamically
const getPodiumStyle = (position: number) => {
  switch (position) {
    case 1:
      return {
        width: 120,
        height: 120,
        backgroundColor: "#DE728D",
        marginTop: 0, // Highest podium
        zIndex: 3, // Ensures it stays on top
      };
    case 2:
      return {
        width: 113,
        height: 87.5,
        backgroundColor: "#C35A74",
        marginTop: 32.5, // Lower than 1st place
        zIndex: 2,
      };
    case 3:
      return {
        width: 110.8,
        height: 64.91,
        backgroundColor: "#9F4A5F",
        marginTop: 55.09, // Lowest podium
        zIndex: 1,
      };
    default:
      return {};
  }
};

// ✅ Function to adjust number positioning
const getNumberOffset = (position: number) => {
  switch (position) {
    case 1:
      return { marginTop: -30 }; // Moves the number slightly down
    case 2:
      return { marginTop: -10 }; // Adjusts position based on podium height
    case 3:
      return { marginTop: 0 }; // Moves the number down for shortest podium
    default:
      return {};
  }
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30, // ✅ Adds space between podium and leaderboard list
  },

  podiumRow: {
    flexDirection: "row",
    alignItems: "flex-end", // ✅ Ensures all podium blocks start at the same baseline
    justifyContent: "center",
  },

  podiumBlock: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingVertical: 10,
  },

  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
  },

  username: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  points: {
    fontSize: 12,
    fontWeight: "500",
    color: "#FFFFFF",
  },

  podiumNumber: {
    fontSize: 32,
    fontWeight: "700",
    fontFamily: "Open Sans",
    color: "#FFFFFF",
    textAlign: "center",
  },
});

export default LeaderboardPodium;
