import React from "react";
import { View, StyleSheet } from "react-native";
import LeaderboardListItem from "./LeaderboardListItem";

interface LeaderboardListProps {
  users: any[];
}

const LeaderboardList: React.FC<LeaderboardListProps> = ({ users }) => {
  return (
    <View style={styles.container}>
      {users.map((user, index) => (
        <LeaderboardListItem
          key={index}
          rank={index + 4} // Adding 4 because we're starting from 4th place
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
    width: 302, // Matches Figma specifications
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
