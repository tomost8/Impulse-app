import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from "react-native";
import { SvgXml } from "react-native-svg"; // For rendering the checkmark SVG
import { getLabelByCategory, getIconByCategory } from "@/utils/goals";

import DurationPicker from '@/components/ui/common/pickers/DurationPicker';
import TimePicker from '@/components/ui/common/pickers/TimePicker';
// Importing assets
const goalSelectedIcon = require("@/assets/icons/goalselected.png");
const dropdownIcon = require("@/assets/icons/arrow-down.png");
// Green checkmark icon for selected state
const checkmarkSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="12" fill="#4CAF50"/>
  <path d="M6 12L10 16L18 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>`;

// Props for AddActivityCard
type AddActivityCardProps = {
  category: string;
  isSelected: boolean;
  isExpanded: boolean;
  onSelect: () => void;
  onCheckIconPress: () => void;
  formData: {
    startTime: string;
    duration: { hours: number; minutes: number };
    description: string;
  };
  onFormDataChange: (field: string, value: string | { hours: number; minutes: number }) => void;
};

const AddActivityCard: React.FC<AddActivityCardProps> = ({
  category,
  isSelected,
  isExpanded,
  onSelect,
  onCheckIconPress,
  formData,
  onFormDataChange,
}) => {
  const defaultIcon = require("@/assets/icons/riseshine.png");
  return (
    <View>
      {isExpanded ? (
        <View style={[styles2.container, isSelected ? styles2.selectedContainer : null]}>
        {/* Header Section - Clickable */}

        <TouchableOpacity
          style={styles2.header}
          onPress={() => {
            onSelect();
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
            <View style={styles2.iconContainer}>
              <Image source={getIconByCategory(category) || defaultIcon} style={styles2.icon} />
            </View>
            <Text style={styles2.title}>{getLabelByCategory(category)}</Text>
          </View>
          {/* Dropdown Icon with Rotation */}
          <Image
            source={dropdownIcon}
            style={[styles2.dropdownIcon, { transform: [{ rotate: isSelected ? "180deg" : "0deg" }] }]}
          />

          {/* Check Icon for Selected State */}
          {isSelected && (
            <TouchableOpacity onPress={() => {
              onCheckIconPress();
            }}>
              <Image source={goalSelectedIcon} style={styles2.checkmark} />
            </TouchableOpacity>
          )}
        </TouchableOpacity>
  
        {/* Details Section - Only show if isExpanded */}
        {isExpanded && isSelected && (
          <View style={styles2.detailsContainer}>
            {/* Start Time Input */}
            <View>
              <Text style={styles2.label}>Start Time (optional)</Text>
              <View style={styles2.inputContainer}>
                <TimePicker
                  initialTime={formData.startTime}
                  setTime={(time) => onFormDataChange('startTime', time)}
                />
              </View>
            </View>
  
            {/* Activity Duration Input */}
            <View style={{ marginTop: 10 }}>
              <Text style={styles2.label}>Activity Duration (optional)</Text>
              <View style={[styles2.inputContainer, { paddingHorizontal: 10 }]}>
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
              <Text style={styles2.label}>Description (optional)</Text>
              <View style={[styles2.inputContainer, { height: 98, alignItems: "flex-start", paddingVertical: 10 }]}>
                <TextInput
                  style={[styles2.input, { height: '100%', textAlignVertical: 'top' }]}
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
      ) : (
        <TouchableOpacity
          onPress={onSelect} // Toggle expansion on press
          style={[styles.container, isSelected && styles.selectedContainer]}
        >
          {/* Icon */}
          <View style={styles.iconContainer}>
            <Image source={getIconByCategory(category) || defaultIcon} style={styles.icon} />
          </View>

          {/* Title */}
          <Text style={styles.title}>{getLabelByCategory(category)}</Text>

          {/* Selection Circle */}
          <TouchableOpacity onPress={isSelected ? onCheckIconPress : undefined}>
            <View style={[styles.circle, isSelected && styles.circleSelected]}>
              {isSelected && <SvgXml xml={checkmarkSvg} width={18} height={18} />}
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: "#E1E1E1",
    justifyContent: "space-between",
    width: "100%",
  },
  selectedContainer: {
    borderColor: "#DE728D", // Highlight selected item
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  title: {
    fontSize: 16,
    fontFamily: "Open Sans",
    fontWeight: "600",
    color: "#242020",
    flex: 1,
    marginLeft: 10,
  },
  circle: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    borderWidth: 1,
    borderColor: "#E1E1E1",
    alignItems: "center",
    justifyContent: "center",
  },
  circleSelected: {
    backgroundColor: "#4CAF50", // Green background
    borderColor: "#4CAF50",
  },
});

const styles2 = StyleSheet.create({
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

export default AddActivityCard; 