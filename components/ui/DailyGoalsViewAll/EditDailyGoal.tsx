import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, TextInput, Keyboard, ScrollView } from "react-native";

// Importing assets
const foodIcon = require("@/assets/icons/food.png");
const dropdownIcon = require("@/assets/icons/arrow-down.png");

interface EditDailyGoalProps {
  title: string;
  icon: any;
  onSave: () => void;
  scrollViewRef: React.RefObject<ScrollView>;
}

const EditDailyGoal: React.FC<EditDailyGoalProps> = ({
  title,
  icon,
  onSave,
  scrollViewRef,
}) => {
  const [description, setDescription] = useState('');
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  const handleSubmitEditing = () => {
    Keyboard.dismiss();
  };

  // Add this function to scroll to the input when focused
  const handleDescriptionFocus = () => {
    setTimeout(() => {
      scrollViewRef?.current?.scrollTo({
        y: 300, // Increased value to ensure description box is fully visible
        animated: true,
      });
    }, 50); // Reduced delay for faster response
  };

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.iconContainer}>
            <Image source={icon} style={styles.icon} />
          </View>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.detailsContainer}>
        {/* Start Time Input */}
        <View style={styles.inputSection}>
          <Text style={styles.label}>Start Time (optional)</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.placeholder}>Choose</Text>
            <Image source={dropdownIcon} style={styles.inputDropdownIcon} />
          </View>
        </View>

        {/* Activity Duration Input */}
        <View style={styles.inputSection}>
          <Text style={styles.label}>Activity Duration (optional)</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.placeholder}>Choose</Text>
            <Image source={dropdownIcon} style={styles.inputDropdownIcon} />
          </View>
        </View>

        {/* Description Input */}
        <View style={styles.inputSection}>
          <Text style={styles.label}>Description (optional)</Text>
          <TextInput
            style={[styles.inputContainer, styles.descriptionInput]}
            placeholder="Type description..."
            placeholderTextColor="#A4ACBC"
            multiline={true}
            value={description}
            onChangeText={setDescription}
            returnKeyType="done"
            onSubmitEditing={handleSubmitEditing}
            blurOnSubmit={true}
            onFocus={handleDescriptionFocus}
          />
        </View>

        {/* Save Changes Button */}
        <TouchableOpacity style={styles.saveButton} onPress={onSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E1E1E1",
    padding: 10,
    marginBottom: 200, // Add extra space at bottom to ensure visibility above keyboard
    width: '90%',
    alignSelf: 'center',
    zIndex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
  },
  icon: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#242020",
    fontFamily: "Open Sans",
    marginLeft: 8,
  },
  detailsContainer: {
    gap: 8,
  },
  inputSection: {
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: "400",
    color: "#000",
    fontFamily: "Open Sans",
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E1E1E1",
    borderRadius: 12,
    height: 35,
    paddingHorizontal: 15,
    justifyContent: "space-between",
    backgroundColor: "#FFF",
  },
  descriptionInput: {
    height: 80,
    alignItems: "flex-start",
    paddingVertical: 8,
    paddingTop: 8,
    textAlignVertical: 'top',
    fontSize: 12,
    fontFamily: "Open Sans",
    borderRadius: 12,
  },
  placeholder: {
    flex: 1,
    fontSize: 12,
    fontFamily: "Open Sans",
    color: "#A4ACBC",
  },
  inputDropdownIcon: {
    width: 14,
    height: 14,
  },
  saveButton: {
    backgroundColor: "#FFF",
    borderRadius: 100,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#DE728D",
  },
  saveButtonText: {
    color: "#DE728D",
    fontSize: 14,
    fontFamily: "Poppins",
    fontWeight: "600",
    textAlign: "center",
  },
});

export default EditDailyGoal;
