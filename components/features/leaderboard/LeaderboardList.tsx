import React from "react";
import { View, StyleSheet } from "react-native";
import LeaderboardRow from "./LeaderboardRow";

interface LeaderboardListProps {
  leaderboardData: any[];
  selectedPeriod?: 'POINTS_WEEKLY' | 'POINTS_MONTHLY' | 'POINTS_ALL';
}

const LeaderboardList: React.FC<LeaderboardListProps> = ({ leaderboardData, selectedPeriod = 'POINTS_WEEKLY' }) => {
  // Function to get the correct points based on selected period
  const getPointsForPeriod = (user: any) => {
    if (!user?.point) return 0;
    
    switch (selectedPeriod) {
      case 'POINTS_WEEKLY':
        return user.point.weekly_points || 0;
      case 'POINTS_MONTHLY':
        return user.point.monthly_points || 0;
      case 'POINTS_ALL':
        return user.point.points || 0;
      default:
        return user.point.weekly_points || 0;
    }
  };

  return (
    <View style={styles.container}>
      {leaderboardData.map((user, index) => (
        <LeaderboardRow
          key={index}
          rank={index + 4}
          name={user.username}
          points={getPointsForPeriod(user).toLocaleString()}
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
