import React from "react";
import { View, StyleSheet } from "react-native";
import LeaderboardListItem from "./LeaderboardListItem";

// Importing a placeholder image (use Andrew's image for now)
const placeholderImage = require("@/assets/images/andrew.png");

const leaderboardData = [
  { rank: 4, name: "James Kennedy", points: "3,000", imageUrl: placeholderImage },
  { rank: 5, name: "Michael Thomas", points: "3,000", imageUrl: placeholderImage },
  { rank: 6, name: "Jeff James", points: "3,000", imageUrl: placeholderImage },
];

const LeaderboardList: React.FC = () => {
  return (
    <View style={styles.container}>
      {leaderboardData.map((user) => (
        <LeaderboardListItem
          key={user.rank}
          rank={user.rank}
          name={user.name}
          points={user.points}
          imageUrl={user.imageUrl}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 345, // Matches Figma specifications
    height: 230, // Matches Figma specifications
    backgroundColor: "#FDE9EE", // Light pink background from Figma
    borderRadius: 32, // Matches Figma
    borderTopLeftRadius: 0,  // Ensure sharp top-left corner
    borderTopRightRadius: 0, // Ensure sharp top-right corner

    paddingTop: 5, // Adds slight spacing at the top
    paddingBottom: 32, // Ensures spacing at the bottom
    paddingHorizontal: 22, // Matches Figma
    marginTop: 18, // Helps connect it visually to the podium
  },
});

export default LeaderboardList;
