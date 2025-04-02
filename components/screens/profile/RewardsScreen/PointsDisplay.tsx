import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { s } from "react-native-size-matters";

interface PointsDisplayProps {
  points: number;
}

function PointsDisplay({ points }: PointsDisplayProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.pointsValue}>
        {points.toLocaleString()}
      </Text>
      <Text style={styles.pointsLabel}>Rewards Points</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'rgba(222, 114, 141, 0.1)',
    borderRadius: s(10),
    padding: s(30),
    marginHorizontal: s(20),
  },
  pointsValue: {
    fontSize: s(52),
    fontFamily: 'Open Sans',
    fontWeight: '700',
    color: '#DE728D',
  },
  pointsLabel: {
    fontSize: s(14),
    fontFamily: 'Poppins',
    fontWeight: '500',
    color: '#DE728D',
    marginTop: s(4),
  },
});

export default PointsDisplay;
