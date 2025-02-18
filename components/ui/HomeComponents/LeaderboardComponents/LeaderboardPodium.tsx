import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface PodiumProps {
  position: number; // 1, 2, or 3
}

const LeaderboardPodium: React.FC<PodiumProps> = ({ position }) => {
    return (
      <View style={[styles.podiumBlock, getPodiumStyle(position)]}>
        <Text style={[styles.podiumNumber, getNumberOffset(position)]}>{position}</Text>
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
    width: 120,
    height: 130,
    backgroundColor: "#DE728D", // Darker shade for the center block
  },

  secondPlace: {
    width: 113,
    height: 97.5,
    backgroundColor: "#C35A74", // Lighter shade for left block
  },

  thirdPlace: {
    width: 110.8,
    height: 84.91,
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
