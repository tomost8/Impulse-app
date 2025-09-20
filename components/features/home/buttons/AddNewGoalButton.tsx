import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

interface AddNewGoalButtonProps {
  onPress: () => void; // Function to handle button press
}

const AddNewGoalButton: React.FC<AddNewGoalButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>Add New Daily Goal</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    backgroundColor: "#DE728D", // Figma background color
    borderRadius: 30, // Rounded edges as per Figma
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch", // Stretch to fit container width
    paddingHorizontal: 60, // Ensures padding around text
    marginHorizontal: 10, // Adds spacing on sides
    marginBottom: 5, // Matches Figma spacing at the bottom
  },
  buttonText: {
    fontSize: 18, // Matches Figma font size
    fontFamily: "Poppins", // Figma-specified font
    fontWeight: "600", // Semi-bold
    color: "#FFFFFF", // White text
  },
});

export default AddNewGoalButton;
