import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

type AddGoalButtonProps = {
  onPress: () => void;
};

const AddGoalButton: React.FC<AddGoalButtonProps> = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 20, // Adjust to match the spacing from the Figma
  },
  button: {
    width: 350, // Matches the Figma width
    height: 50, // Matches the Figma height
    borderRadius: 30, // Ensures rounded corners
    backgroundColor: "#DE728D", // Matches the Figma background color
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 60, // Ensures padding around text
    marginHorizontal: 10, // Adds spacing on sides
    marginBottom: 15, // Matches Figma spacing at the bottom
  },
  buttonText: {
    fontSize: 18, // Matches the Figma font size
    fontFamily: "Poppins",
    fontWeight: "600",
    color: "#FFFFFF", // White text color
  },
});

export default AddGoalButton;
