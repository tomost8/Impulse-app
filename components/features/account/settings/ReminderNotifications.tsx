import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Switch,
  StatusBar,
} from "react-native";
import { s } from "react-native-size-matters";
import { router } from "expo-router";
import Header from "@/components/ui/common/headers/Header";
import Info2 from './info2';
import Info3 from './info3';
import Info4 from './info4';
import Info1 from './info1';
import PreferencesUpdatedPopup from './PreferencesUpdatedPopup';
import ReminderItem from './ReminderItem';


interface ReminderNotificationsProps {
  onSave: (input: any) => void;
}

function ReminderNotifications({ onSave }: ReminderNotificationsProps): JSX.Element {
  const [reminders, setReminders] = useState({
    morning: { enabled: false, time: '9:00 AM' },
    afternoon: { enabled: false, time: '2:00 PM' },
    daily: { enabled: false, time: 'Start Time' },
  });
  const [nudgeMessage, setNudgeMessage] = useState("");
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [showInfo2, setShowInfo2] = useState(false);
  const [showInfo3, setShowInfo3] = useState(false);
  const [showInfo4, setShowInfo4] = useState(false);
  const [showInfo1, setShowInfo1] = useState(false);
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
              title="Scheduling Reminder"
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
              onInfoPress={() => setShowInfo1(true)}
            />
            <ReminderItem
              title="Midday Motivation"
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
              onInfoPress={() => setShowInfo2(true)}
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
              onInfoPress={() => setShowInfo3(true)}
            />
            <View style={styles.nudgeSection}>
              <View style={styles.reminderHeader}>
                <View style={styles.titleContainer}>
                  <Text style={styles.reminderTitle}>Nudge Message</Text>
                  <TouchableOpacity 
                    style={styles.infoButton}
                    onPress={() => setShowInfo4(true)}
                  >
                    <Image 
                      source={require("@/assets/icons/info.png")}
                      style={styles.infoIcon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={nudgeMessage}
                  onChangeText={(text) => setNudgeMessage(text.slice(0, 30))}
                  placeholder="Enter custom message"
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
      <Info1 visible={showInfo1} onClose={() => setShowInfo1(false)} />
      <Info2 visible={showInfo2} onClose={() => setShowInfo2(false)} />
      <Info3 visible={showInfo3} onClose={() => setShowInfo3(false)} />
      <Info4 visible={showInfo4} onClose={() => setShowInfo4(false)} />
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
    width: s(19),
    height: s(19),
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoButton: {
    marginLeft: s(12),
  },
});

export default ReminderNotifications;
