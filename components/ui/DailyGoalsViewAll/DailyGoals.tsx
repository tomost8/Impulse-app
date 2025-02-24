import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg"; // For SVG icons

// Import the edit button icon
const editIcon = require("@/assets/icons/editDailyGoal.png");

// Placeholder Sun Icon (Replace dynamically later)
const PlaceholderIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 4V2M12 22V20M4.22 4.22L3 3M21 21L19.78 19.78M2 12H4M20 12H22M4.22 19.78L3 21M21 3L19.78 4.22M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z" stroke="#D77A7A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

// Props for reusability
type DailyGoalCardProps = {
  icon?: string; // SVG XML string (default: Placeholder)
  title: string;
  timeRange: string;
  description: string;
  onEditPress: () => void;
};

const DailyGoals: React.FC<DailyGoalCardProps> = ({
  icon = PlaceholderIcon,
  title,
  timeRange,
  description,
  onEditPress,
}) => {
  return (
    <View style={styles.container}>
      {/* Icon */}
      <View style={styles.iconContainer}>
        <View style={styles.iconBackground}>
          <SvgXml xml={icon} width={30} height={30} />
        </View>
      </View>

      {/* Text Content */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.time}>{timeRange}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      {/* Edit Button */}
      <TouchableOpacity onPress={onEditPress} style={styles.editButton}>
        <Image source={editIcon} style={styles.editIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginTop: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    width: "100%",
    marginBottom: 5,
  },
  iconContainer: {
    alignSelf: "flex-start",
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    overflow: "hidden",
    position: "relative",
  },
  iconBackground: {
    backgroundColor: "rgba(222, 114, 189, 0.2)",
    borderRadius: 24,
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    minWidth: 160,
    maxWidth: "75%",
    flexShrink: 1,
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#242020",
    fontFamily: "Poppins",
    lineHeight: 19,
    maxWidth: "100%",
    textAlign: "left",
    paddingLeft: 12,
  },
  time: {
    fontSize: 12,
    fontWeight: "400",
    color: "#242020",
    fontFamily: "Poppins",
    lineHeight: 16,
    marginTop: 3,
    flexShrink: 1,
    textAlign: "left",
    paddingLeft: 12,
  },
  description: {
    fontSize: 14,
    fontWeight: "400",
    color: "#A4ACBC",
    fontFamily: "Poppins",
    lineHeight: 19,
    marginTop: 3,
    flexGrow: 1,
    textAlign: "left",
    width: "110%",
    paddingLeft: 12,
  },
  editButton: {
    position: "absolute",
    top: 14,
    right: 14,
  },
  editIcon: {
    width: 22,
    height: 22,
    resizeMode: "contain",
  },
});

export default DailyGoals;

