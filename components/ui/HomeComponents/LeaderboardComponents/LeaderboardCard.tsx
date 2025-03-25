import React from "react";
import { View, StyleSheet } from "react-native";
import LeaderboardProfile from "./LeaderboardProfile";
import LeaderboardPodium from "./LeaderboardPodium";

interface LeaderboardCardProps {
  users: any[];
}

const LeaderboardCard: React.FC<LeaderboardCardProps> = ({ users }) => {
  // Calculate remaining users (after top 3)
  const remainingUsers = users.slice(3);
  
  // Calculate dynamic height based on number of remaining users
  // Base height (260) - some space if there are no remaining users
  const dynamicHeight = remainingUsers.length > 0 
    ? 260  // Full height with users
    : 200; // Reduced height when no additional users

  return (
    <View style={[styles.container, { height: dynamicHeight }]}>
      <View style={styles.topProfiles}>
        {/* Second Place */}
        {users[1] && (
          <LeaderboardProfile
            name={users[1].username}
            points={users[1].point.weekly_points.toLocaleString()}
            imageUrl={users[1].profile_picture}
            rank={2}
          />
        )}
        {/* First Place */}
        {users[0] && (
          <LeaderboardProfile
            name={users[0].username}
            points={users[0].point.weekly_points.toLocaleString()}
            imageUrl={users[0].profile_picture}
            rank={1}
          />
        )}
        {/* Third Place */}
        {users[2] && (
          <LeaderboardProfile
            name={users[2].username}
            points={users[2].point.weekly_points.toLocaleString()}
            imageUrl={users[2].profile_picture}
            rank={3}
          />
        )}
      </View>

      <View style={styles.podiumContainer}>
        <LeaderboardPodium position={2} />
        <LeaderboardPodium position={1} />
        <LeaderboardPodium position={3} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 348,
    // height is now set dynamically
    backgroundColor: "#FFFFFF",
    borderRadius: 32,
    paddingTop: 28,
    paddingLeft: 3.2,
    paddingRight: 3.2,
    alignItems: "center",
  },
  
  topProfiles: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
  },

  podiumContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
});

export default LeaderboardCard;
