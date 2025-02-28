import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from "react-native";
import DurationPicker from '@/components/ui/common/pickers/DurationPicker';
import TimePicker from '@/components/ui/common/pickers/TimePicker';
// Importing assets
const goalSelectedIcon = require("@/assets/icons/goalselected.png");
const dropdownIcon = require("@/assets/icons/arrow-down.png");

interface ExpandedGoalDetailsProps {
  title: string;
  isSelected: boolean;
  icon: any;
  onSelect: () => void;
  onCheckIconPress: () => void;
  isExpanded: boolean;
  formData: {
    startTime: string;
    duration: { hours: number; minutes: number };
    description: string;
  };
  onFormDataChange: (field: string, value: string | { hours: number; minutes: number }) => void;
}

const ExpandedGoalDetails: React.FC<ExpandedGoalDetailsProps> = ({
    title,
    icon,
    isSelected,
    onSelect,
    onCheckIconPress,
    isExpanded,
    formData,
    onFormDataChange,
  }) => {
    return (
        <View style={[styles.container, isSelected ? styles.selectedContainer : null]}>
        {/* Header Section - Clickable */}

        <TouchableOpacity
          style={styles.header}
          onPress={() => {
            onSelect();
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
            <View style={styles.iconContainer}>
              <Image source={icon} style={styles.icon} />
            </View>
            <Text style={styles.title}>{title}</Text>
          </View>
          {/* Dropdown Icon with Rotation */}
          <Image
            source={dropdownIcon}
            style={[styles.dropdownIcon, { transform: [{ rotate: isSelected ? "180deg" : "0deg" }] }]}
          />

          {/* Check Icon for Selected State */}
          {isSelected && (
            <TouchableOpacity onPress={() => {
              onCheckIconPress();
            }}>
              <Image source={goalSelectedIcon} style={styles.checkmark} />
            </TouchableOpacity>
          )}
        </TouchableOpacity>
  
        {/* Details Section - Only show if isExpanded */}
        {isExpanded && isSelected && (
          <View style={styles.detailsContainer}>
            {/* Start Time Input */}
            <View>
              <Text style={styles.label}>Start Time (optional)</Text>
              <View style={styles.inputContainer}>
                <TimePicker
                  initialTime={formData.startTime}
                  setTime={(time) => onFormDataChange('startTime', time)}
                />
              </View>
            </View>
  
            {/* Activity Duration Input */}
            <View style={{ marginTop: 10 }}>
              <Text style={styles.label}>Activity Duration (optional)</Text>
              <View style={[styles.inputContainer, { paddingHorizontal: 10 }]}>
                <DurationPicker
                  hours={formData.duration.hours}
                  minutes={formData.duration.minutes}
                  setDuration={(hours, minutes) => 
                    onFormDataChange('duration', { hours, minutes })
                  }
                />
              </View>
            </View>
  
            {/* Description Input */}
            <View style={{ marginTop: 10 }}>
              <Text style={styles.label}>Description (optional)</Text>
              <View style={[styles.inputContainer, { height: 98, alignItems: "flex-start", paddingVertical: 10 }]}>
                <TextInput
                  style={[styles.input, { height: '100%', textAlignVertical: 'top' }]}
                  placeholder="Choose"
                  value={formData.description}
                  onChangeText={(value) => onFormDataChange('description', value)}
                  placeholderTextColor="#A4ACBC"
                  multiline
                />
              </View>
            </View>
          </View>
        )}
      </View>
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
    },
    selectedContainer: {
      borderColor: "#DE728D",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    iconContainer: {
      width: 50,
      height: 50,
    },
    icon: {
      width: "100%",
      height: "100%",
      resizeMode: "contain",
    },
    title: {
      flex: 1,
      fontSize: 16,
      fontWeight: "600",
      color: "#242020",
      fontFamily: "Open Sans",
      marginLeft: 10,
    },
    dropdownIcon: {
      width: 15,
      height: 15,
      marginRight: 10,
    },
    checkmark: {
      width: 25,
      height: 25,
    },
    detailsContainer: {
      marginTop: 10,
    },
    label: {
      fontSize: 13,
      fontWeight: "400",
      color: "#000",
      fontFamily: "Open Sans",
      marginBottom: 10,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#E1E1E1",
      borderRadius: 30,
      height: 40,
      paddingHorizontal: 20,
      justifyContent: "space-between",
      marginBottom: 5,
    },
    input: {
      flex: 1,
      fontSize: 12.98,
      fontFamily: "Open Sans",
      color: "#A4ACBC",
    },
    inputDropdownIcon: {
      width: 16,
      height: 16,
    },
  });
  
  export default ExpandedGoalDetails;