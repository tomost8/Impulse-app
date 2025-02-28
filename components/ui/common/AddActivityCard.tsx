import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { getLabelByCategory, getIconByCategory } from "@/utils/goals";
import ActivityDetailsSection from './ActivityDetailsSection';

// Importing assets
import { SvgXml } from "react-native-svg"; // For rendering the checkmark SVG
const checkmarkSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="12" fill="#4CAF50"/>
  <path d="M6 12L10 16L18 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>`;
const goalSelectedIcon = require("@/assets/icons/goalselected.png");
const dropdownIcon = require("@/assets/icons/arrow-down.png");
const defaultIcon = require("@/assets/icons/riseshine.png");

type AddActivityCardProps = {
  category: string;
  isSelected: boolean;
  onSelect: () => void;
  isExpanded: boolean;
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
  onSelect,
  isExpanded,
  onCheckIconPress,
  formData,
  onFormDataChange,
}) => {
  const renderCollapsedCard = () => (
    <TouchableOpacity onPress={onSelect}
      style={[styles.container, isSelected && styles.selectedContainer]}
    >
      <View style={styles.iconContainer}>
        <Image source={getIconByCategory(category) || defaultIcon} style={styles.icon} />
      </View>
      <Text style={styles.title}>{getLabelByCategory(category)}</Text>
      {isSelected ? (
        <TouchableOpacity onPress={onCheckIconPress}>
          <View style={[styles.circle, styles.circleSelected]}>
            <SvgXml xml={checkmarkSvg} width={18} height={18} />
          </View>
        </TouchableOpacity>
      ) : (
        <View style={styles.circle}>
          {/* Render an empty view or any other placeholder if not selected */}
        </View>
      )}
    </TouchableOpacity>
  );

  const renderExpandedCard = () => (
    <View style={[styles2.container, isSelected ? styles.selectedContainer : null]}>
      <TouchableOpacity onPress={onSelect} style={styles.header}>
        <View style={styles2.iconContainer}>
          <Image source={getIconByCategory(category) || defaultIcon} style={styles2.icon} />
        </View>
        <Text style={styles2.title}>{getLabelByCategory(category)}</Text>
        <Image
          source={dropdownIcon}
          style={[styles.dropdownIcon, { transform: [{ rotate: isSelected ? "180deg" : "0deg" }] }]}
        />
        {isSelected && (
          <TouchableOpacity onPress={onCheckIconPress}>
            <Image source={goalSelectedIcon} style={styles.checkmark} />
          </TouchableOpacity>
        )}
      </TouchableOpacity>

      {isSelected && (
        <ActivityDetailsSection
          formData={formData}
          onFormDataChange={onFormDataChange}
        />
      )}
    </View>
  );

  return (
    <View>
      {isExpanded ? renderExpandedCard() : renderCollapsedCard()}
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
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
  dropdownIcon: {
    width: 15,
    height: 15,
    marginRight: 10,
  },
  checkmark: {
    width: 25,
    height: 25,
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
});

export default AddActivityCard; 