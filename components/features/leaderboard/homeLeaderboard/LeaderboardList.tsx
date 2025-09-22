import React from "react";
import { View, StyleSheet } from "react-native";
import LeaderboardListItem from "./LeaderboardListItem";

interface LeaderboardListProps {
  users: any[];
}

const LeaderboardList: React.FC<LeaderboardListProps> = ({ users }) => {
  // Calculate dynamic height based on number of users
  // Each item is about 58px tall (48px + 10px margin)
  // Add padding top (5px) and bottom (32px)
  // Add extra height to ensure content fits within rounded container
  const dynamicHeight = users.length > 0 
    ? users.length * 58 + 58 // (itemHeight * numUsers) + (paddingTop + paddingBottom + extra space)
    : 0; // No height if no users

  return (
    <View style={[styles.container, { height: dynamicHeight }]}>
      {users.map((user, index) => (
        <LeaderboardListItem
          key={index}
          rank={index + 4} // Adding 4 because we're starting from 4th place
          name={user.username}
          points={(user.point?.weekly_points || 0).toLocaleString()}
          imageUrl={user.profile_picture}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 302, // Matches Figma specifications
    // height is now set dynamically
    backgroundColor: "#FDE9EE", // Light pink background from Figma
    borderRadius: 32, // Matches Figma
    borderTopLeftRadius: 0,  // Ensure sharp top-left corner
    borderTopRightRadius: 0, // Ensure sharp top-right corner
    borderBottomLeftRadius: 32, // Ensure rounded bottom-left corner
    borderBottomRightRadius: 32, // Ensure rounded bottom-right corner
    paddingTop: 0, // No top padding to eliminate gap
    paddingBottom: 32, // Ensures spacing at the bottom
    paddingHorizontal: 22, // Matches Figma
    marginTop: 0, // Removed spacing to connect directly to podium
  },
});

export default LeaderboardList;
