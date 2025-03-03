import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";

const FeedbackScreen = () => {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    console.log("Feedback submitted:", feedback);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.innerContainer}>
        <View style={styles.header}>
          <Text style={styles.timeText} accessibilityRole="text">
            9:41
          </Text>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText} accessibilityRole="header">
              Give Feedback
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.heading} accessibilityRole="header">
            We want to hear from you!
          </Text>
          <Text style={styles.description} accessibilityRole="text">
            We value your input more than anything. Tell us what's working,
            what's not, or what you'd love to see next! Who knows? Your
            suggestion might just become our next feature!{"\n\n"}
            As a thank you for leaving feedback you will be entered in a raffle
            for various gift card prizes. Reward selection is in the form below!
          </Text>
          <Text style={styles.formTitle} accessibilityRole="header">
            Feedback Form
          </Text>
          <TextInput
            style={styles.input}
            multiline
            numberOfLines={4}
            onChangeText={setFeedback}
            value={feedback}
            placeholder="Enter your feedback here"
            accessibilityLabel="Feedback input"
            accessibilityHint="Enter your feedback about the app"
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          accessibilityRole="button"
          accessibilityLabel="Submit Feedback"
          accessibilityHint="Submits your feedback"
        >
          <Text style={styles.buttonText}>Submit Feedback</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  contentContainer: {
    flexGrow: 1,
  },
  innerContainer: {
    borderRadius: 30,
    maxWidth: 480,
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    fontFamily: "Poppins, sans-serif",
    fontSize: 16,
    color: "#242020",
    fontWeight: "600",
    padding: 20,
  },
  header: {
    paddingTop: 11,
  },
  timeText: {
    textAlign: "center",
    fontFamily: "Lato, sans-serif",
    fontSize: 17,
    lineHeight: 20,
    letterSpacing: -0.41,
    marginLeft: 38,
  },
  titleContainer: {
    marginTop: 35,
    alignItems: "center",
  },
  titleText: {
    fontSize: 24,
    fontWeight: "600",
  },
  content: {
    borderRadius: 30,
    paddingVertical: 42,
  },
  heading: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  description: {
    fontFamily: "Open Sans, sans-serif",
    marginTop: 29,
    marginHorizontal: 10,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    minHeight: 100,
    textAlignVertical: "top",
  },
  button: {
    borderRadius: 30,
    backgroundColor: "#DE728D",
    marginTop: 30,
    paddingVertical: 13,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default FeedbackScreen;
