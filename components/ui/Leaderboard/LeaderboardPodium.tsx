import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

// Define Props
interface PodiumUser {
  position: number;
  name: string;
  points: number;
  profileImage: any;
}

interface LeaderboardPodiumProps {
  podiumData: PodiumUser[];
}

const LeaderboardPodium: React.FC<LeaderboardPodiumProps> = ({ podiumData }) => {
  // Ensure users are sorted correctly (2nd, 1st, 3rd for correct layout)
  const sortedPodium = [
    podiumData.find(user => user.position === 2),
    podiumData.find(user => user.position === 1),
    podiumData.find(user => user.position === 3),
  ];

  return (
    <View style={styles.container}>
      <View style={styles.podiumRow}>
        {sortedPodium.map((user, index) =>
          user ? (
            <View key={user.position} style={[styles.podiumColumn, getPodiumStyle(user.position)]}>
              {/* Profile Image */}
              <Image source={user.profileImage} style={styles.profileImage} />

              {/* Username */}
              <Text style={styles.username}>{user.name}</Text>

              {/* Points */}
              <Text style={styles.points}>{user.points} Pts</Text>

              {/* Podium Block */}
              <View style={[styles.podiumBlock, getBlockStyle(user.position)]}>
                <Text style={styles.podiumNumber}>{user.position}</Text>
              </View>
            </View>
          ) : null
        )}
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
