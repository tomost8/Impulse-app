import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

// Import the edit button and the new icon image
const editIcon = require("@/assets/icons/editDailyGoal.png");
const riseShineIcon = require("@/assets/icons/riseshine.png"); // ✅ Updated icon to PNG

// Props for reusability
type DailyGoalCardProps = {
  title: string;
  timeRange: string;
  description: string;
  onEditPress: () => void;
};

const DailyGoals: React.FC<DailyGoalCardProps> = ({
    title,
    timeRange,
    description,
    onEditPress,
  }) => {
    return (
      <View style={styles.container}>
        {/* Icon */}
        <View style={styles.iconContainer}>
          <Image source={riseShineIcon} style={styles.icon} /> {/* ✅ PNG icon used */}
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
  },
  icon: {
    width: 50, // ✅ Adjusted size for PNG icon
    height: 50,
    resizeMode: "contain",
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

