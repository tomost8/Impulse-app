import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface PodiumProps {
  position: number; // 1, 2, or 3
}

const LeaderboardPodium: React.FC<PodiumProps> = ({ position }) => {
  const podiumStyles = {
    1: styles.firstPlace,
    2: styles.secondPlace,
    3: styles.thirdPlace,
  };

  return (
    <View style={styles.container}>
      <View style={[styles.podiumBlock, podiumStyles[position]]}>
        <Text style={styles.podiumNumber}>{position}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 100, // ✅ Adds space between podium and navigation bar
  },

  podiumRow: {
    flexDirection: "row",
    alignItems: "flex-end", // ✅ Ensures all podium blocks start at the same baseline
    justifyContent: "center",


  },
  podiumBlock: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  
  },

  firstPlace: {
    width: 122.42,
    height: 130,
    backgroundColor: "#DE728D", // Darker shade for the center block
  },

  secondPlace: {
    width: 115.47,
    height: 97.5,
    backgroundColor: "#C35A74", // Lighter shade for left block
  },

  thirdPlace: {
    width: 114.8,
    height: 74.91,
    backgroundColor: "#9F4A5F", // Same as second place but smaller
    marginLeft: -1, // ✅ Removes tiny gap between first & second place
  },

  podiumNumber: {
    fontSize: 40,
    fontWeight: "700",
    fontFamily: "Open Sans",
    color: "#FFFFFF",
    textAlign: "center",
  },
});

export default LeaderboardPodium;
