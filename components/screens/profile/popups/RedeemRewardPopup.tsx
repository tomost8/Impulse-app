import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

const RedeemRewardScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [paymentOption, setPaymentOption] = useState("");

  const handleSubmit = () => {
    // Handle form submission
  };

  const handleCancel = () => {
    // Handle cancellation
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text
            style={styles.title}
            accessibilityRole="header"
            accessibilityLevel={1}
          >
            Redeem Reward
          </Text>
          <Text style={styles.subtitle}>
            Fill out all the information below and we will be in contact via
            email!
          </Text>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter here"
              placeholderTextColor="rgba(164, 172, 188, 1)"
              value={email}
              onChangeText={setEmail}
              accessibilityLabel="Email input"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Payment Option</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Enter here"
                placeholderTextColor="rgba(164, 172, 188, 1)"
                value={paymentOption}
                onChangeText={setPaymentOption}
                accessibilityLabel="Payment Option input"
              />
              <Image
                source={{
                  uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/67cee5b0d7a23e68cc7270e631b72485f8b806b1c381fdc9ab88932f479b45f9?placeholderIfAbsent=true&apiKey=4e9058eda6d64cec83059909564d7572",
                }}
                style={styles.dropdownIcon}
                accessibilityLabel="Dropdown icon"
              />
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancel}
            accessibilityRole="button"
            accessibilityLabel="Cancel"
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            accessibilityRole="button"
            accessibilityLabel="Submit"
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    borderRadius: 30,
    maxWidth: 328,
    padding: 32,
    fontFamily: "Open Sans, sans-serif",
    alignSelf: "center",
  },
  header: {
    alignItems: "center",
    width: "100%",
  },
  title: {
    color: "#242020",
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
  },
  subtitle: {
    color: "rgba(94, 102, 118, 1)",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 26,
    marginTop: 12,
    textAlign: "center",
  },
  formContainer: {
    marginTop: 30,
    width: "100%",
  },
  inputContainer: {
    marginBottom: 20,
    width: "100%",
  },
  label: {
    color: "rgba(36, 32, 32, 1)",
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 30,
    borderColor: "rgba(225, 225, 225, 1)",
    borderWidth: 1,
    minHeight: 50,
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    color: "rgba(164, 172, 188, 1)",
    fontWeight: "400",
    fontSize: 16,
  },
  dropdownIcon: {
    width: 16,
    height: 16,
    resizeMode: "contain",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    width: "100%",
  },
  cancelButton: {
    borderRadius: 30,
    minHeight: 40,
    width: 137,
    justifyContent: "center",
    alignItems: "center",
  },
  submitButton: {
    borderRadius: 30,
    minHeight: 40,
    width: 137,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(222, 114, 141, 1)",
  },
  cancelButtonText: {
    color: "rgba(222, 114, 141, 1)",
    fontFamily: "Poppins, sans-serif",
    fontSize: 13,
    fontWeight: "600",
  },
  submitButtonText: {
    color: "rgba(255, 255, 255, 1)",
    fontFamily: "Poppins, sans-serif",
    fontSize: 13,
    fontWeight: "600",
  },
});

export default RedeemRewardScreen;
