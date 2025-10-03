import React, { useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Keyboard, Switch, StatusBar } from "react-native";
import { s } from "react-native-size-matters";
import { router } from "expo-router";
import Header from "@/components/ui/common/headers/Header";
import { ReminderItem, PreferencesUpdatedPopup } from '@/components/features/account';
import InfoPopup from "@/components/features/account/settings/InfoPopup";
import { Feather, Ionicons } from "@expo/vector-icons";

export const infoPopups = {
  morning: {
    title: "AM Scheduling Reminder",
    message:
      "A daily reminder from Impulse to fill out your activities for the day to stay on track to accomplish your goals. The message changes everyday!",
  },
  afternoon: {
    title: "Afternoon Motivation",
    message:
      "This notification is a fun daily message that serves as a reminder to complete your daily scheduled activities. The message  changes everyday!",
  },
  goal: {
    title: "Activities Reminder",
    message:
      "This notification reminds you to complete your activity. You can customize when it will be sent out before each activity.",
  },
  nudge: {
    title: "Nudge Notification",
    message:
      "This is your custom notification to send to your accountability partners as extra motivation.",
  },
};

interface NotificationsScreenProps {
  onSave: (input: any) => void;
}

function NotificationsScreen({ onSave }: NotificationsScreenProps): JSX.Element {
  const [reminders, setReminders] = useState({
    morning: { enabled: false, time: '9:00 AM' },
    afternoon: { enabled: false, time: '2:00 PM' },
    daily: { enabled: false, time: 'Start Time' },
  });
  const [nudgeMessage, setNudgeMessage] = useState("");
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [activeInfo, setActiveInfo] = useState<keyof typeof infoPopups | null>(null);
  const [showUpdatedPopup, setShowUpdatedPopup] = useState(false);

  // Generate time options
  const morningOptions = Array.from({ length: 21 }, (_, i) => {
    const hour = Math.floor(i / 4) + 6;
    const minute = (i % 4) * 15;
    return `${hour}:${minute.toString().padStart(2, '0')} ${hour < 12 ? 'AM' : 'PM'}`;
  });

  const afternoonOptions = Array.from({ length: 21 }, (_, i) => {
    const hour = Math.floor(i / 4) + 12;
    const minute = (i % 4) * 15;
    return `${hour > 12 ? hour - 12 : hour}:${minute.toString().padStart(2, '0')} PM`;
  });

  const dailyOptions = [
    '30 min before',
    '15 min before',
    'Start Time',
    '15 mins after start',
    '30 mins after start',
    '45 mins after start',
  ];

  const handleSave = () => {
    // Save logic here
    /*
    const input = {
      type: 'REMINDER',
      title: 'title',
      schedule_type: 'ONCE',
      schedule_time: new Date(Date.now() + 30 * 1000).toISOString(), // ISO 8601 format, e.g., 2025-01-20T23:31:00.000Z
      content: "content test",
    }
    console.log(input);
    onSave(input);
    */
    setShowUpdatedPopup(true);
  };

  return (
    <View style={styles.container}>
      <Header 
        title="Reminders and Notifications"
        onBackPress={() => router.back()}
      />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          style={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.remindersContainer}>
            <ReminderItem
              title="Morning Scheduling Reminder"
              isEnabled={reminders.morning.enabled}
              onToggle={() => setReminders({
                ...reminders,
                morning: { ...reminders.morning, enabled: !reminders.morning.enabled }
              })}
              options={morningOptions}
              selectedTime={reminders.morning.time}
              onTimeSelect={(time) => setReminders({
                ...reminders,
                morning: { ...reminders.morning, time }
              })}
              onInfoPress={() => setActiveInfo("morning")}
            />
            <ReminderItem
              title="Afternoon Motivation"
              isEnabled={reminders.afternoon.enabled}
              onToggle={() => setReminders({
                ...reminders,
                afternoon: { ...reminders.afternoon, enabled: !reminders.afternoon.enabled }
              })}
              options={afternoonOptions}
              selectedTime={reminders.afternoon.time}
              onTimeSelect={(time) => setReminders({
                ...reminders,
                afternoon: { ...reminders.afternoon, time }
              })}
              onInfoPress={() => setActiveInfo("afternoon")}
            />
            <ReminderItem
              title="Goal Reminder"
              isEnabled={reminders.daily.enabled}
              onToggle={() => setReminders({
                ...reminders,
                daily: { ...reminders.daily, enabled: !reminders.daily.enabled }
              })}
              options={dailyOptions}
              selectedTime={reminders.daily.time}
              onTimeSelect={(time) => setReminders({
                ...reminders,
                daily: { ...reminders.daily, time }
              })}
              onInfoPress={() => setActiveInfo("goal")}
            />
            <View style={styles.nudgeSection}>
              <View style={styles.reminderHeader}>
                <View style={styles.titleContainer}>
                  <Text style={styles.reminderTitle}>Nudge Message</Text>
                  <TouchableOpacity 
                    style={styles.infoButton}
                    onPress={() => setActiveInfo("nudge")}
                  >
                  <Feather name="info" size={20} color="#C35A74" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={nudgeMessage}
                  onChangeText={(text) => setNudgeMessage(text.slice(0, 30))}
                  placeholder="Enter here"
                  placeholderTextColor="#A4ACBC"
                  maxLength={30}
                  returnKeyType="done"
                  onSubmitEditing={() => Keyboard.dismiss()}
                  onFocus={() => setKeyboardVisible(true)}
                  onBlur={() => setKeyboardVisible(false)}
                />
                <Text style={styles.charCount}>{nudgeMessage.length}/30</Text>
              </View>
            </View>
          </View>
        </ScrollView>
        {!keyboardVisible && (
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        )}
      </KeyboardAvoidingView>
      {activeInfo && (
        <InfoPopup
          visible={!!activeInfo}
          onClose={() => setActiveInfo(null)}
          title={infoPopups[activeInfo].title}
          message={infoPopups[activeInfo].message}
        />
      )}
      <PreferencesUpdatedPopup
        isVisible={showUpdatedPopup}
        onClose={() => setShowUpdatedPopup(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerBackground: {
    backgroundColor: '#E0EDFD',
    paddingTop: Platform.OS === 'android' ? 10 : 0,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 16,
  },
  backButton: {
    marginRight: s(12),
    paddingLeft: 4, 
  },
  backIcon: {
    width: 12,
    height: 16,
    tintColor: '#242020',
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#242020',
  },
  content: {
    flex: 1,
    paddingHorizontal: s(20),
    paddingTop: s(20),
  },
  remindersContainer: {
    gap: s(25),
  },
  nudgeSection: {
    gap: s(12),
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 30,
    paddingVertical: s(12),
    paddingHorizontal: s(16),
  },
  input: {
    fontSize: s(12),
    fontFamily: 'Open Sans',
    color: '#242020',
  },
  charCount: {
    fontSize: s(12),
    fontFamily: 'Open Sans',
    color: '#A4ACBC',
    textAlign: 'right',
    marginTop: s(12),
  },
  saveButton: {
    backgroundColor: '#DE728D',
    marginHorizontal: s(20),
    marginVertical: s(20),
    marginBottom: 35, 
    padding: s(13),
    borderRadius: s(100),
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: s(16),
    fontFamily: 'Poppins',
    fontWeight: '600',
  },
  keyboardView: {
    flex: 1,
  },
  reminderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reminderTitle: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#242020',
  },
  infoIcon: {
    width: s(20),
    height: s(20),
    resizeMode: "contain",
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoButton: {
    marginLeft: s(12),
  },
});

export default NotificationsScreen;
