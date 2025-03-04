import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import { useUserData } from "@/services/UserPreferencesContext";
import { convertUtcToLocal } from "@/utils/timezoneProcessing";
import { getLabelByCategory, getIconByCategory } from "@/utils/goals";
// Props for reusability
type DailyGoalCardProps = {
  icon?: any; // Updated to accept an image source
  category: string;
  scheduledDatetime: string;
  duration: number;
  status: string;
  description: string;
};

const DailyGoalCard: React.FC<DailyGoalCardProps> = ({
  category,
  scheduledDatetime,
  duration,
  status,
  description,
}) => {
  const defaultIcon = require("@/assets/icons/riseshine.png");
  const { timezone, loading } = useUserData();
  return (
    <View style={styles.container}>
      {/* Icon */}
      <View style={styles.iconContainer}>
        <Image source={getIconByCategory(category) || defaultIcon} style={styles.icon} /> {/* ✅ Replaced SVG with Image */}
      </View>

      {/* Text Content */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{getLabelByCategory(category)}</Text>
        {duration && !loading && (
          <Text style={styles.time}>
            {`${convertUtcToLocal(scheduledDatetime, timezone)} to ${convertUtcToLocal(scheduledDatetime, timezone, duration)}`}
          </Text>
        )}
        {description && (
          <Text style={styles.description}>{description}</Text>
        )}
      </View>

      {/* Status */}
      <Text style={styles.status}>{status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center", // ✅ Ensures icon is higher
    backgroundColor: "#F4F9FF",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginTop: 12, // ✅ Adds spacing from "Daily Goals"
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    width: "102%",
  },
  iconContainer: {
    alignSelf: "flex-start", // ✅ Moves icon to the **top-left** position
    width: 48,  // ✅ Matches the background circle
    height: 48, // ✅ Matches the background circle
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24, // ✅ Ensures a perfect circle
    overflow: "hidden", // ✅ Prevents any overflow issues
  },
  icon: {
    width: 48,  // ✅ Adjusted width to fit properly
    height: 48, // ✅ Adjusted height to fit properly
    resizeMode: "contain", // ✅ Ensures no background is visible
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
    flexDirection: "column", // ✅ Stacks title & time correctly
    justifyContent: "center",
    minWidth: 160, // ✅ Ensures enough space for "Rise and Shine"
    maxWidth: "75%", // ⬆️ Allows slightly more width for longer titles
    flexShrink: 1, // ⬆️ Prevents unnecessary line breaks
    flexWrap: "wrap", // ✅ Ensures text adjusts properly when needed
    alignItems: "flex-start",

  },
  title: {
    fontSize: 14, // ✅ Matches Figma
    fontWeight: "600", // ✅ Semi-bold
    color: "#242020", // ✅ Matches Figma
    fontFamily: "Open Sans", // ✅ Use correct font
    lineHeight: 19, // ✅ Matches Figma
    maxWidth: "100%", // ✅ Ensures space for the full text
    textAlign: "left",
    paddingLeft: 12, 
  },
  time: {
    fontSize: 12, // ✅ Matches Figma
    fontWeight: "400", // ✅ Regular font weight
    color: "#242020", // ✅ Matches Figma
    fontFamily: "Open Sans", // ✅ Use correct font
    lineHeight: 16, // ✅ Matches Figma
    marginTop: 3, // Adds slight spacing below title
    flexShrink: 1, // ✅ Prevents text from breaking into two lines
    textAlign: "left",
    paddingLeft: 12, 
  },
  description: {
    fontSize: 14, // ✅ Matches Figma
    fontWeight: "400", // ✅ Regular font weight
    color: "#A4ACBC", // ✅ Matches Figma
    fontFamily: "Open Sans", // ✅ Use correct font
    lineHeight: 19, // ✅ Matches Figma
    marginTop: 3, // ⬆️ Ensures correct spacing from time text
    flexGrow: 1, // ✅ Ensures the text stretches without shrinking
    textAlign: "left",
    width: "110%",
    paddingLeft: 12, 

  },
  status: {
    fontSize: 14, // ✅ Matches Figma
    fontWeight: "500", // ✅ Medium weight (not bold)
    color: "#DE728D", // ✅ Correct pink shade
    fontFamily: "Poppins", // ✅ Matches Figma
    textAlign: "right", // ✅ Aligns to the right
    lineHeight: 21, // ✅ Ensures correct spacing
    position: "absolute", // ⬆️ Ensures it does not affect other layout elements
    top: 14, // ⬆️ Moves it up to align with the title text
    right: 14, // ⬆️ Aligns it to the right with proper padding

  },
});

export default DailyGoalCard;
