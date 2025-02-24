import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const exploreIcon = require("@/assets/icons/explore.png"); // Importing the explore icon

const FeedScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Feed</Text>
        <TouchableOpacity>
          <Image source={exploreIcon} style={styles.exploreIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#242020",
    fontFamily: "Poppins",
  },
  exploreIcon: {
    width: 23,
    height: 23,
  },
});

export default FeedScreen;

