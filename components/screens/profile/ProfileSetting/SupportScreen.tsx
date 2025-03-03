import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import { AccessibilityInfo } from "react-native";

const SupportScreen = () => {
  const handleBackPress = () => {
    AccessibilityInfo.announceForAccessibility("Navigating back");
  };

  const handleDeleteAccountPress = () => {
    Linking.openURL('https://share.hsforms.com/1w35t-H25T2CMEpiTciIoyAscwc9');
    AccessibilityInfo.announceForAccessibility("Opening account deletion form");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header} accessibilityRole="header">
        <Text style={styles.time} accessibilityLabel="Current time">
          9:41
        </Text>
      </View>
      <View style={styles.content}>
        <TouchableOpacity
          onPress={handleBackPress}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          accessibilityHint="Navigates to the previous screen"
        >
          <Image
            accessibilityLabel="Back arrow"
            resizeMode="contain"
            source={{
              uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/1cf6bb94afb5d6115325e0467b1703e045f5e803b4808c857c76e41ac22db75f?placeholderIfAbsent=true&apiKey=4e9058eda6d64cec83059909564d7572",
            }}
            style={styles.backArrow}
          />
        </TouchableOpacity>
        <Text
          style={styles.title}
          accessibilityRole="header"
          //accessibilityLevel={1}
        >
          Support
        </Text>
      </View>
      <View
        style={styles.emailSection}
        //accessibilityRole="region"
        accessibilityLabel="Email Support"
      >
        <View style={styles.emailContainer}>
          <Text style={styles.label}>Email Us At</Text>
          <Text style={styles.email} accessibilityRole="link">
            support@findyourimpulse.com
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.deleteAccountButton}
        onPress={handleDeleteAccountPress}
        accessibilityRole="button"
        accessibilityLabel="Account Deletion Form"
        accessibilityHint="Opens the form to delete your account"
      >
        <Text style={styles.buttonText}>Account Deletion Form</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    borderRadius: 30,
    maxWidth: 480,
    width: "100%",
    alignItems: "stretch",
    backgroundColor: "#FFFFFF",
  },
  header: {
    paddingTop: 11,
  },
  time: {
    color: "#242020",
    textAlign: "center",
    fontFamily: "Lato, sans-serif",
    fontSize: 17,
    fontWeight: "600",
    lineHeight: 20,
    letterSpacing: -0.41,
    marginLeft: 38,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 35,
    paddingHorizontal: 16,
    gap: 21,
  },
  backArrow: {
    width: 7,
    aspectRatio: 0.5,
    tintColor: "#242020",
  },
  title: {
    flex: 1,
    fontFamily: "Poppins, sans-serif",
    fontSize: 16,
    color: "#242020",
    fontWeight: "600",
  },
  emailSection: {
    borderRadius: 30,
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 23,
  },
  emailContainer: {
    alignItems: "flex-start",
  },
  label: {
    color: "rgba(164, 172, 188, 1)",
    fontFamily: "Open Sans, sans-serif",
    fontSize: 16,
    fontWeight: "400",
  },
  email: {
    color: "#242020",
    fontFamily: "Open Sans, sans-serif",
    fontSize: 16,
    fontWeight: "400",
  },
  deleteAccountButton: {
    borderRadius: 30,
    backgroundColor: "#DE728D",
    marginTop: "auto",
    marginBottom: 20,
    marginHorizontal: 20,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Poppins, sans-serif",
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "600",
  },
});

export default SupportScreen;
