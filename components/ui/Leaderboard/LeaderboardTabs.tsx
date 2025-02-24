import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface LeaderboardTabsProps {
  activeTab: "Friends" | "All Users";
  setActiveTab: (tab: "Friends" | "All Users") => void;
}

const LeaderboardTabs: React.FC<LeaderboardTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.tab, activeTab === "Friends" && styles.activeTab]}
        onPress={() => setActiveTab("Friends")}
      >
        <Text style={[styles.tabText, activeTab === "Friends" && styles.activeTabText]}>
          Friends
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, activeTab === "All Users" && styles.activeTab]}
        onPress={() => setActiveTab("All Users")}
      >
        <Text style={[styles.tabText, activeTab === "All Users" && styles.activeTabText]}>
          All Users
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "rgba(222, 114, 141, 0.25)", // Light pink background from Figma
    borderRadius: 15,
    height: 48,
    alignItems: "center",
    padding: 5,
    marginHorizontal: 20, // Spacing around the component
    marginTop: 12,
  },
  tab: {
    flex: 1,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  activeTab: {
    backgroundColor: "#DE728D", // Active tab color from Figma
  },
  tabText: {
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Open Sans",
    color: "#242020",
    opacity: 0.7,
  },
  activeTabText: {
    color: "#FFFFFF",
    opacity: 1,
  },
});

export default LeaderboardTabs;
