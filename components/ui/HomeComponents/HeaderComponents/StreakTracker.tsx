import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

// Importing icons
import StreakFire from "@/assets/icons/streakFireNew.png";
import StreakFiller from "@/assets/icons/streakFiller.png";

// Define the days of the week and streak completion status
const days = [
  { label: "S", completed: true },
  { label: "M", completed: true },
  { label: "T", completed: true },
  { label: "W", completed: false },
  { label: "TH", completed: false },
  { label: "F", completed: false },
  { label: "S", completed: false },
];

const StreakTracker: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Day Labels */}
      <View style={styles.dayRow}>
        {days.map((day, index) => (
          <Text key={index} style={styles.dayLabel}>
            {day.label}
          </Text>
        ))}
      </View>

      {/* Streak Icons */}
      <View style={styles.iconRow}>
        {days.map((day, index) => (
          <Image
            key={index}
            source={day.completed ? StreakFire : StreakFiller}
            style={styles.icon}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 350,
    height: 49,
    backgroundColor: "#FFFFFF",
    borderRadius: 40,
    paddingHorizontal: 45,
    paddingVertical: 5,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: 6,
    zIndex: 1, // Ensures it stays below StreakBadge
  },
  dayRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "113%", 
    marginBottom: 3, 
    paddingHorizontal: 10,
    marginRight: -40,
  },
  dayLabel: {
    fontSize: 7.728,
    fontWeight: "500",
    color: "#9EB0C7",
    textAlign: "center",
    width: 28.98, // ✅ Ensures proper alignment with icons
    paddingHorizontal: 5,
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "113%",
    paddingHorizontal: 10, // ✅ Ensures spacing matches Figma
    marginRight: -40, 
  },
  icon: {
    width: 28.98,
    height: 28.98,
    resizeMode: "contain",
    marginLeft: 3,
  },
});

export default StreakTracker;
