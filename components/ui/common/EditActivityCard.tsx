import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, Keyboard, ScrollView } from "react-native";
import { getLabelByCategory, getIconByCategory } from "@/utils/goals";
import ActivityDetailsSection from './ActivityDetailsSection';

// Importing assets
const defaultIcon = require("@/assets/icons/riseshine.png");


interface EditActivityCardProps {
  category: string;
  isSelected: boolean; // Effectively the same as isExpanded
  onSelect: () => void;
  formData: {
    startTime: string;
    duration: { hours: number; minutes: number };
    description: string;
  };
  onFormDataChange: (field: string, value: string | { hours: number; minutes: number }) => void;
  onSave: () => void;
  scrollViewRef: React.RefObject<ScrollView>;
}

const EditActivityCard: React.FC<EditActivityCardProps> = ({
  category,
  isSelected,
  onSelect,
  formData,
  onFormDataChange,
  onSave,
  scrollViewRef,
}) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  const handleSubmitEditing = () => {
    Keyboard.dismiss();
  };

  const handleDescriptionFocus = () => {
    setTimeout(() => {
      scrollViewRef?.current?.scrollTo({
        y: 300,
        animated: true,
      });
    }, 50);
  };

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, []);

  const renderCollapsedCard = () => (
    <TouchableOpacity onPress={onSelect} 
      style={styles.header}
    >
      <View style={styles.iconContainer}>
        <Image source={getIconByCategory(category) || defaultIcon} style={styles.icon} />
      </View>
      <Text style={styles.title}>{getLabelByCategory(category)}</Text>
    </TouchableOpacity>
  );

  const renderExpandedCard = () => (
    <>
      {renderCollapsedCard()}
      <View style={styles.detailsContainer}>
        <ActivityDetailsSection
          formData={formData}
          onFormDataChange={onFormDataChange}
          onDescriptionFocus={handleDescriptionFocus}
        />
        
        <TouchableOpacity style={styles.saveButton} onPress={onSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {isSelected ? renderExpandedCard() : renderCollapsedCard()}
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
    marginBottom: 10,
    //marginBottom: 200, // Add extra space at bottom to ensure visibility above keyboard
    width: '90%',
    alignSelf: 'center',
    zIndex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
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

export default EditActivityCard;
