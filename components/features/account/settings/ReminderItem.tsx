import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import { s, vs } from "react-native-size-matters";

interface ReminderItemProps {
  title: string;
  isEnabled: boolean;
  onToggle: () => void;
  options: string[];
  selectedTime: string;
  onTimeSelect: (time: string) => void;
  onInfoPress: () => void;
}

function ReminderItem({ 
  title, 
  isEnabled, 
  onToggle,
  options,
  selectedTime,
  onTimeSelect,
  onInfoPress 
}: ReminderItemProps) {
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
            <Feather name="info" size={20} color="#C35A74" />
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

const styles = StyleSheet.create({
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
    width: s(20),
    height: s(20),
    resizeMode: "contain",
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
    color: '#A4ACBC',
  },
  arrowIcon: {
    width: s(14),
    height: s(14),
    tintColor: '#5E6676',
  },
  toggleIcon: {
    width: s(51),
    height: s(31),
    resizeMode: "contain",
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
    height: vs(300),
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
});

export default ReminderItem;
