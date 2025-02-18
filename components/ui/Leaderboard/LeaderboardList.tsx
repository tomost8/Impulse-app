import React from "react";
import { View, StyleSheet } from "react-native";
import LeaderboardRow from "./LeaderboardRow";

// Importing Andrew's profile image as a placeholder
const placeholderImage = require("@/assets/images/andrew.png");

// Mock leaderboard data (Top 10 users)
const leaderboardData = [
  { rank: 4, name: "Rodrigo", points: "800", imageUrl: placeholderImage },
  { rank: 5, name: "Rodrigo", points: "800", imageUrl: placeholderImage },
  { rank: 6, name: "Rodrigo", points: "800", imageUrl: placeholderImage },
  { rank: 7, name: "Rodrigo", points: "800", imageUrl: placeholderImage },
  { rank: 8, name: "Rodrigo", points: "800", imageUrl: placeholderImage },
  { rank: 9, name: "Rodrigo", points: "800", imageUrl: placeholderImage },
  { rank: 10, name: "Rodrigo", points: "800", imageUrl: placeholderImage },
];

const LeaderboardList: React.FC = () => {
  return (
    <View style={styles.container}>
      {leaderboardData.map((user) => (
        <LeaderboardRow
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
    width: "100%",
    paddingTop: 5, // Spacing at the top
    paddingBottom: 32, // Prevents bottom cut-off
    paddingHorizontal: 20, // Matches Figma spacing
    marginTop: 10, // Helps connect visually to the podium
  },
});

export default LeaderboardList;
