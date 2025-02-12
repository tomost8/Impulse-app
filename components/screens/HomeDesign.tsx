import React from "react";
import { View, StyleSheet } from "react-native";
import UserOverview from "../ui/HomeOrganisms/UserOverview";
import QuoteCard from "../ui/HomeOrganisms/QuoteCard";
import DailyGoals from "../ui/HomeOrganisms/DailyGoals";
import Leaderboard from "../ui/HomeOrganisms/Leaderboard";
import BottomNav from "../ui/HomeOrganisms/BottomNav";

// Define props for HomeDesign
type HomeDesignProps = {
  friends: any[];
  isFriendsLoading: boolean;
  activities: any[];
  isActivitiesLoading: boolean;
  //navigation: any; // Add navigation prop here
};

const HomeDesign: React.FC<HomeDesignProps> = ({ friends, isFriendsLoading, activities, isActivitiesLoading}) => {
  return (
    <View style={styles.container}>
      <UserOverview />
      <QuoteCard />
      <DailyGoals activities={activities} isLoading={isActivitiesLoading} />
      <Leaderboard friends={friends} isLoading={isFriendsLoading} />
      {/* Pass the navigation prop to BottomNav */}
      {/* <BottomNav navigation={navigation} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
});

export default HomeDesign;
