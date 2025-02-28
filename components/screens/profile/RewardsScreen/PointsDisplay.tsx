import React from "react";
import { View, Text, StyleSheet } from "react-native";

function PointsDisplay({ points, maxPoints }) {
  return (
    <View
      style={styles.container}
      accessibilityRole="region"
      accessibilityLabel="Rewards Points Summary"
    >
      <View style={styles.pointsCircle}>
        <Text
          style={styles.pointsValue}
          accessibilityLabel={`${points.toLocaleString()} Rewards Points`}
        >
          {points.toLocaleString()}
        </Text>
        <Text style={styles.pointsLabel}>Rewards Points</Text>
      </View>
      <Text
        style={styles.pointsProgress}
        accessibilityLabel={`${points.toLocaleString()} out of ${maxPoints.toLocaleString()} points`}
      >
        {points.toLocaleString()} / {maxPoints.toLocaleString()} pts
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: 226,
    maxWidth: "100%",
    alignSelf: "center",
  },
  pointsCircle: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 62,
    borderRadius: 113,
    backgroundColor: "rgba(222, 114, 141, 0.1)",
  },
  pointsValue: {
    fontSize: 55,
    fontFamily: "Open Sans, sans-serif",
    fontWeight: "700",
    color: "rgba(222, 114, 141, 1)",
  },
  pointsLabel: {
    fontSize: 14,
    fontFamily: "Poppins, sans-serif",
    fontWeight: "500",
    color: "rgba(222, 114, 141, 1)",
    marginTop: 5,
  },
  pointsProgress: {
    color: "rgba(143, 143, 143, 1)",
    fontSize: 10,
    fontFamily: "Open Sans, sans-serif",
    fontWeight: "400",
    marginTop: 12,
  },
});

export default PointsDisplay;
