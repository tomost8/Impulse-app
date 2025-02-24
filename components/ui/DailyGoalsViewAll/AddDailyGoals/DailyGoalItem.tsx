import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg"; // For rendering the checkmark SVG

// Green checkmark icon for selected state
const checkmarkSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="12" fill="#4CAF50"/>
  <path d="M6 12L10 16L18 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>`;

// Props for reusability
type DailyGoalItemProps = {
  icon: any; // Icon image (require from assets)
  title: string;
  isSelected: boolean;
  onSelect: () => void;
};

const DailyGoalItem: React.FC<DailyGoalItemProps> = ({ icon, title, isSelected, onSelect }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          console.log(`🟢 Clicked Goal: ${title}`); // ✅ Debug log
          onSelect();
        }}
        style={[styles.container, isSelected && styles.selectedContainer]}
      >
        {/* Icon */}
        <View style={styles.iconContainer}>
          <Image source={icon} style={styles.icon} />
        </View>
  
        {/* Title */}
        <Text style={styles.title}>{title}</Text>
  
        {/* Selection Circle */}
        <View style={[styles.circle, isSelected && styles.circleSelected]}>
          {isSelected && <SvgXml xml={checkmarkSvg} width={18} height={18} />}
        </View>
      </TouchableOpacity>
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

export default DailyGoalItem;
