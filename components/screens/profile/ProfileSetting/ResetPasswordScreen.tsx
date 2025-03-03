import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";

const StatusBar = () => (
  <View style={styles.statusBar}>
    <Text style={styles.statusBarText}>9:41</Text>
  </View>
);

const ResetPasswordForm = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = () => {
    // Handle password reset logic here
  };

  return (
    <View style={styles.formContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.label} nativeID="newPasswordLabel">
          New Password
        </Text>
        <TextInput
          style={styles.input}
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
          accessibilityLabel="New Password"
          accessibilityLabelledBy="newPasswordLabel"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label} nativeID="confirmPasswordLabel">
          Confirm Password
        </Text>
        <TextInput
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          accessibilityLabel="Confirm Password"
          accessibilityLabelledBy="confirmPasswordLabel"
        />
      </View>
      <TouchableOpacity
        style={styles.resetButton}
        onPress={handleResetPassword}
        accessibilityRole="button"
        accessibilityLabel="Reset Password"
      >
        <Text style={styles.resetButtonText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

const ResetPasswordScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar />
      <View style={styles.header}>
        <Image
          accessibilityLabel="Back arrow"
          resizeMode="contain"
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/c2f000e441ac63165285093b6e5c46e86b7fd5483f93672296675ba110ebebaf?placeholderIfAbsent=true&apiKey=4e9058eda6d64cec83059909564d7572",
          }}
          style={styles.backArrow}
        />
        <Text style={styles.headerTitle}>Reset Password</Text>
      </View>
      <ResetPasswordForm />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    borderRadius: 30,
    maxWidth: 480,
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: 11,
    paddingHorizontal: 16,
  },
  statusBar: {
    alignItems: "center",
    paddingTop: 5,
  },
  statusBarText: {
    color: "#242020",
    fontFamily: "Lato, sans-serif",
    fontSize: 17,
    lineHeight: 20,
    letterSpacing: -0.41,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 35,
    marginBottom: 10,
  },
  backArrow: {
    width: 24,
    height: 24,
    marginRight: 21,
  },
  headerTitle: {
    fontFamily: "Poppins, sans-serif",
    fontSize: 24,
    fontWeight: "600",
    color: "#242020",
  },
  formContainer: {
    borderRadius: 30,
    paddingVertical: 20,
    fontFamily: "Open Sans, sans-serif",
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    color: "#A4ACBC",
    marginBottom: 5,
    fontWeight: "400",
  },
  input: {
    borderRadius: 30,
    borderColor: "#E1E1E1",
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 14,
    color: "#242020",
  },
  resetButton: {
    borderRadius: 30,
    backgroundColor: "#DE728D",
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 20,
  },
  resetButtonText: {
    fontFamily: "Inter, sans-serif",
    fontSize: 18,
    color: "#FFF",
    fontWeight: "500",
  },
});

export default ResetPasswordScreen;
