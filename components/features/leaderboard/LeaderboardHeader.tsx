import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, Platform} from "react-native";
import LeaderboardSelector from "./LeaderboardSelector"; // ✅ Import selector
import { StatusBar } from "react-native";

// Import the back arrow icon
const backArrow = require("@/assets/icons/backArrow.png");

type LeaderboardPeriod = 'POINTS_WEEKLY' | 'POINTS_MONTHLY' | 'POINTS_ALL';

interface LeaderboardHeaderProps {
  onBackPress: () => void;
  selectedPeriod: LeaderboardPeriod;
  setSelectedPeriod: (period: LeaderboardPeriod) => void;
}

const LeaderboardHeader: React.FC<LeaderboardHeaderProps> = ({ onBackPress, selectedPeriod, setSelectedPeriod }) => {
  return (
    <View>
      <View style={styles.headerBackground}>
        <SafeAreaView>
          <View style={styles.headerContent}>
            <View style={styles.leftContainer}>
              <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
                <Image source={backArrow} style={styles.backIcon} />
                <Text style={styles.title}>Leaderboard</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.selectorContainer}>
              <LeaderboardSelector selectedPeriod={selectedPeriod} setSelectedPeriod={setSelectedPeriod} />
            </View>
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerBackground: {
    backgroundColor: '#E0EDFD',
    paddingTop: Platform.OS === 'android' ? 10 : 0,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 2,
    paddingBottom: 10,
    justifyContent: 'space-between',
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1, // ✅ Ensures it occupies only required space
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14, // Adds touchable area
  },
  backIcon: {
    width: 10,
    height: 17,
    tintColor: "#242020",
    marginRight: 12, // Space between icon and title
  },
  title: {
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: "600",
    color: "#242020",
  },
  selectorContainer: {
    alignItems: "flex-end", // ✅ Aligns to the right
    justifyContent: "center",
    marginTop: -5,
    marginRight: -10,
  },
});

export default LeaderboardHeader;
