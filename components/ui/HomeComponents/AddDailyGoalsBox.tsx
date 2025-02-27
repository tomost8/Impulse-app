import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

// Importing the new "add-goal.png" icon from the assets folder
const addGoalIcon = require("@/assets/icons/add-goal.png");

const AddDailyGoalsBox: React.FC = () => {
  const handlePress = () => {
    console.log("Add Daily Goal button clicked");
    // Navigate or trigger action here
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image source={addGoalIcon} style={styles.icon} />
      <Text style={styles.text}>Add Daily Goal</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 335,
    height:75,
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#CAD3DF",
    backgroundColor: "#F9FBFE",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10, // Space between icon and text
    paddingHorizontal: 25,
    alignSelf: "flex-start", // ✅ Ensures alignment with other elements
    marginLeft: 15, // ✅ Adjust this to fine-tune the position
  },
  icon: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
  text: {
    fontSize: 14,
    fontFamily: "Open Sans",
    fontWeight: "600",
    color: "#CAD3DF",
  },
});

export default AddDailyGoalsBox;
