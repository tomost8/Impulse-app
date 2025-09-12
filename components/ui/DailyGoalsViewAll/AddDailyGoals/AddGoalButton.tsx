import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface AddGoalButtonProps {
  onPress: () => void;
}

const AddGoalButton: React.FC<AddGoalButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>Confirm</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#DE728D',
    borderRadius: 50,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 28,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontWeight: '600',
  },
});

export default AddGoalButton;
