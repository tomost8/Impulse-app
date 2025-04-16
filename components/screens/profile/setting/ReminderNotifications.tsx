import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Switch,
  StatusBar,
} from "react-native";
import { s } from "react-native-size-matters";
import { router } from "expo-router";
import Info2 from '@/components/screens/profile/setting/info2';
import Info3 from '@/components/screens/profile/setting/info3';
import Info4 from '@/components/screens/profile/setting/info4';
import Info1 from '@/components/screens/profile/setting/info1';
import PreferencesUpdatedPopup from './PreferencesUpdatedPopup';

function ReminderItem({ 
  title, 
  isEnabled, 
  onToggle,
  options,
  selectedTime,
  onTimeSelect,
  onInfoPress 
}: { 
  title: string;
  isEnabled: boolean;
  onToggle: () => void;
  options: string[];
  selectedTime: string;
  onTimeSelect: (time: string) => void;
  onInfoPress: () => void;
}) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <View style={styles.reminderItem}>
      <View style={styles.reminderHeader}>
        <View style={styles.titleContainer}>
          <Text style={styles.reminderTitle}>{title}</Text>
          <TouchableOpacity 
            style={styles.infoButton}
            onPress={onInfoPress}
          >
            <Image 
              source={require("@/assets/icons/info.png")}
              style={styles.infoIcon}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={onToggle}>
          <Image
            source={isEnabled ? 
              require("@/assets/icons/toggleOn.png") : 
              require("@/assets/icons/toggleOff.png")
            }
            style={styles.toggleIcon}
          />
        </TouchableOpacity>
      </View>
      {isEnabled && (
        <TouchableOpacity 
          style={styles.dropdownButton}
          onPress={() => setShowDropdown(true)}
        >
          <Text style={styles.dropdownText}>{selectedTime}</Text>
          <Image 
            source={require("@/assets/icons/arrow-down.png")}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
      )}
      <Modal
        visible={showDropdown}
        transparent={true}
        animationType="slide"
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          onPress={() => setShowDropdown(false)}
        >
          <View style={styles.modalContent}>
            <ScrollView>
              {options.map((time) => (
                <TouchableOpacity
                  key={time}
                  style={styles.timeOption}
                  onPress={() => {
                    onTimeSelect(time);
                    setShowDropdown(false);
                  }}
                >
                  <Text style={styles.timeOptionText}>{time}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

function ReminderNotifications(): JSX.Element {
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
    setShowUpdatedPopup(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBackground}>
        <SafeAreaView>
          <View style={styles.headerContent}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Image 
                source={require("@/assets/icons/backArrow.png")}
                style={styles.backIcon}
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Reminders and Notifications</Text>
          </View>
        </SafeAreaView>
      </View>
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
      <Info2 visible={showInfo2} onClose={() => setShowInfo2(false)} />
      <Info3 visible={showInfo3} onClose={() => setShowInfo3(false)} />
      <Info4 visible={showInfo4} onClose={() => setShowInfo4(false)} />
      <Info1 
        visible={showInfo1}
        onClose={() => setShowInfo1(false)}
      />
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
    marginRight: 12,
  },
  backIcon: {
    width: 10,
    height: 15,
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
  reminderItem: {
    gap: s(12),
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
  reminderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: s(100),
    paddingVertical: s(12),
    paddingHorizontal: s(16),
    flex: 1,
    marginRight: s(12),
  },
  dropdownText: {
    fontSize: s(12),
    fontFamily: 'Open Sans',
    color: '#242020',
  },
  arrowIcon: {
    width: s(14),
    height: s(14),
    tintColor: '#5E6676',
  },
  toggleIcon: {
    width: s(51),
    height: s(31),
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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoButton: {
    marginLeft: s(12),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: s(20),
    borderTopRightRadius: s(20),
    maxHeight: '50%',
    padding: s(20),
  },
  timeOption: {
    paddingVertical: s(12),
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1',
  },
  timeOptionText: {
    fontSize: s(16),
    fontFamily: 'Open Sans',
    color: '#242020',
  },
  keyboardView: {
    flex: 1,
  },
});

export default ReminderNotifications;
