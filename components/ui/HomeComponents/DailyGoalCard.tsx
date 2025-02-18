import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SvgXml } from "react-native-svg"; // For SVG icons

// Placeholder Sun Icon (Replace dynamically later)
const PlaceholderIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 4V2M12 22V20M4.22 4.22L3 3M21 21L19.78 19.78M2 12H4M20 12H22M4.22 19.78L3 21M21 3L19.78 4.22M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z" stroke="#D77A7A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

// Props for reusability
type DailyGoalCardProps = {
  icon?: string; // SVG XML string (default: Placeholder)
  title: string;
  timeRange: string;
  status: string;
  description: string;
};

const DailyGoalCard: React.FC<DailyGoalCardProps> = ({
  icon = PlaceholderIcon,
  title,
  timeRange,
  status,
  description,
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

      {/* Status */}
      <Text style={styles.status}>{status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center", // ✅ Ensures icon is higher
    flexDirection: "row", // ✅ Ensures elements stay in a row
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
    position: "relative", // Ensures the icon will move properly within the container
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
