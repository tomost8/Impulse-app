import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

function RewardItem({ title, points, isRedeemable }) {
  return (
    <View style={styles.container} accessibilityRole="article">
      <View style={styles.content}>
        <Text
          style={styles.title}
          accessibilityRole="heading"
          accessibilityLevel={2}
        >
          {title}
        </Text>
        <Text style={styles.points}>{points}</Text>
      </View>
      <TouchableOpacity
        style={[
          styles.redeemButton,
          !isRedeemable && styles.redeemButtonDisabled,
        ]}
        disabled={!isRedeemable}
        accessibilityRole="button"
        accessibilityLabel={`Redeem ${title}`}
        accessibilityState={{ disabled: !isRedeemable }}
        accessibilityHint={
          isRedeemable
            ? "Tap to redeem this reward"
            : "This reward is not currently redeemable"
        }
      >
        <Text style={styles.redeemButtonText}>Redeem</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    minHeight: 140,
    justifyContent: "center",
    marginBottom: 20,
    backgroundColor: "#F5F5F5",
    padding: 15,
  },
  content: {
    minHeight: 54,
  },
  title: {
    color: "rgba(36, 32, 32, 1)",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Open Sans, sans-serif",
  },
  points: {
    color: "rgba(0, 0, 0, 1)",
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "Open Sans, sans-serif",
    marginTop: 10,
  },
  redeemButton: {
    alignSelf: "center",
    borderRadius: 30,
    marginTop: 15,
    minHeight: 44,
    width: "100%",
    backgroundColor: "rgba(222, 114, 141, 1)",
    justifyContent: "center",
    alignItems: "center",
  },
  redeemButtonDisabled: {
    backgroundColor: "rgba(222, 114, 141, 0.5)",
  },
  redeemButtonText: {
    fontFamily: "Poppins, sans-serif",
    fontSize: 15,
    color: "rgba(255, 255, 255, 1)",
    fontWeight: "600",
  },
});

export default RewardItem;
