import * as React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

const RewardRedeemedModal = ({ onClose }) => {
  return (
    <View
      style={styles.modalContainer}
      accessibilityRole="dialog"
      accessibilityLabel="Reward Redeemed Modal"
    >
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText} accessibilityRole="header">
            Reward Redeemed
          </Text>
        </View>
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>
            Check your email for a message from rewards@findyourimpulse.com in
            the next 24 hours for next steps!
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.okayButton}
        onPress={onClose}
        accessibilityRole="button"
        accessibilityLabel="Close modal"
      >
        <Text style={styles.okayButtonText}>Okay</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    borderRadius: 30,
    display: "flex",
    maxWidth: 328,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
  },
  contentContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "stretch",
    fontFamily: "Open Sans, sans-serif",
    textAlign: "center",
  },
  headerContainer: {
    marginBottom: 10,
  },
  headerText: {
    color: "#242020",
    fontSize: 22,
    fontWeight: "700",
  },
  messageContainer: {
    marginBottom: 20,
  },
  messageText: {
    color: "rgba(94, 102, 118, 1)",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 26,
  },
  okayButton: {
    alignSelf: "center",
    borderRadius: 30,
    marginTop: 7,
    minHeight: 40,
    width: 125,
    maxWidth: "100%",
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
  },
  okayButtonText: {
    fontFamily: "Poppins, sans-serif",
    fontSize: 13,
    color: "rgba(255, 255, 255, 1)",
    fontWeight: "600",
  },
});

export default RewardRedeemedModal;
