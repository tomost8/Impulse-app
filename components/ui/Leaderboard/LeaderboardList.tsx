import React from "react";
import { View, StyleSheet } from "react-native";
import LeaderboardRow from "./LeaderboardRow";

interface LeaderboardListProps {
  leaderboardData: any[];
}

const LeaderboardList: React.FC<LeaderboardListProps> = ({ leaderboardData }) => {
  return (
    <View style={styles.container}>
      {leaderboardData.map((user, index) => (
        <LeaderboardRow
          key={index}
          rank={index + 4}
          name={user.username}
          points={user.point.weekly_points.toLocaleString()}
          imageUrl={user.profile_picture}
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
