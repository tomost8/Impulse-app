import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  AccessibilityInfo,
} from "react-native";

const ReminderNotifications: React.FC = () => {
  const [nudgeMessage, setNudgeMessage] = useState("");

  const handleNudgeChange = (text: string) => {
    setNudgeMessage(text.slice(0, 30));
  };

  const handleSave = () => {
    AccessibilityInfo.announceForAccessibility("Settings saved successfully");
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header} accessibilityRole="header">
        <Text style={styles.time} accessibilityLabel="Current time: 9:41">
          9:41
        </Text>
      </View>
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Image
            source={{
              uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/31eebec48547bd70e44e8a8ccfa9bfe0fd316b1230a3ef5f0a72f4aa55749a9e?placeholderIfAbsent=true&apiKey=4e9058eda6d64cec83059909564d7572",
            }}
            style={styles.backIcon}
            accessibilityLabel="Back button"
          />
          <Text
            style={styles.title}
            accessibilityRole="header"
            accessibilityLevel={1}
          >
            Reminder and Notifications
          </Text>
        </View>
        <View style={styles.reminderSection}>
          <ReminderItem title="Morning Scheduling Reminder" time="9:00 AM" />
          <ReminderItem title="Afternoon Motivation" time="9:00 AM" />
          <ReminderItem title="Activity Reminder" time="9:00 AM" />
        </View>
        <View style={styles.nudgeSection}>
          <Text
            style={styles.sectionTitle}
            accessibilityRole="header"
            accessibilityLevel={2}
          >
            Nudge Message
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter here"
              value={nudgeMessage}
              onChangeText={handleNudgeChange}
              maxLength={30}
              accessibilityLabel="Nudge message input"
              accessibilityHint="Enter a custom nudge message, maximum 30 characters"
            />
            <Text style={styles.charCount}>{nudgeMessage.length}/30</Text>
          </View>
        </View>
        <View style={styles.previewSection}>
          <Image
            source={{
              uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/f8d7cf409a6a87b8c0225daa5fcf966e36f578029b24fe47234fa6f984133f5f?placeholderIfAbsent=true&apiKey=4e9058eda6d64cec83059909564d7572",
            }}
            style={styles.avatar}
            accessibilityLabel="User avatar"
          />
          <View style={styles.previewContent}>
            <View style={styles.previewHeader}>
              <Text style={styles.previewName}>Gabe Deng</Text>
              <Text style={styles.previewTime}>now</Text>
            </View>
            <Text style={styles.previewMessage}>
              Nudge: {nudgeMessage || "custom message.........."}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          accessibilityRole="button"
          accessibilityLabel="Save settings"
          accessibilityHint="Saves all reminder and notification settings"
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const ReminderItem: React.FC<{ title: string; time: string }> = ({
  title,
  time,
}) => (
  <View style={styles.reminderItem}>
    <Text style={styles.reminderTitle}>{title}</Text>
    <View style={styles.reminderTimeContainer}>
      <Text style={styles.reminderTime}>{time}</Text>
      <Image
        source={{
          uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/1ab7928ee58d5e6eaacc9a47d497d2cb82fe4bd8bac2a9e4f266afd4199bba17?placeholderIfAbsent=true&apiKey=4e9058eda6d64cec83059909564d7572",
        }}
        style={styles.reminderIcon}
        accessibilityLabel="Reminder icon"
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  contentContainer: {
    borderRadius: 30,
    overflow: "hidden",
  },
  header: {
    width: "100%",
    paddingHorizontal: 37,
    paddingTop: 11,
    paddingBottom: 15,
  },
  time: {
    fontFamily: "SF Pro Text",
    fontSize: 17,
    color: "#242020",
    fontWeight: "600",
    textAlign: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  title: {
    fontFamily: "Poppins",
    fontSize: 18,
    color: "#242020",
    fontWeight: "600",
  },
  reminderSection: {
    marginBottom: 25,
  },
  reminderItem: {
    borderWidth: 1,
    borderColor: "rgba(225, 225, 225, 1)",
    borderRadius: 30,
    padding: 15,
    marginBottom: 15,
  },
  reminderTitle: {
    fontFamily: "Poppins",
    fontSize: 16,
    color: "#242020",
    fontWeight: "600",
    marginBottom: 10,
  },
  reminderTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reminderTime: {
    fontFamily: "Open Sans",
    fontSize: 14,
    color: "rgba(164, 172, 188, 1)",
  },
  reminderIcon: {
    width: 16,
    height: 16,
  },
  nudgeSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontFamily: "Poppins",
    fontSize: 16,
    color: "#242020",
    fontWeight: "600",
    marginBottom: 10,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "rgba(225, 225, 225, 1)",
    borderRadius: 30,
    padding: 15,
  },
  input: {
    fontFamily: "Open Sans",
    fontSize: 14,
    color: "#242020",
  },
  charCount: {
    fontFamily: "Open Sans",
    fontSize: 12,
    color: "#A4ACBC",
    textAlign: "right",
    marginTop: 5,
  },
  previewSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    marginRight: 10,
  },
  previewContent: {
    flex: 1,
  },
  previewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  previewName: {
    fontFamily: "Open Sans",
    fontSize: 15,
    color: "#242020",
    fontWeight: "700",
  },
  previewTime: {
    fontFamily: "Lato",
    fontSize: 12,
    color: "rgba(94, 102, 118, 1)",
  },
  previewMessage: {
    fontFamily: "Open Sans",
    fontSize: 13,
    color: "#242020",
  },
  saveButton: {
    backgroundColor: "#007AFF",
    borderRadius: 30,
    padding: 15,
    alignItems: "center",
  },
  saveButtonText: {
    fontFamily: "Poppins",
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "600",
  },
});

export default ReminderNotifications;
