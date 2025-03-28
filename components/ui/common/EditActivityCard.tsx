import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, Keyboard, ScrollView, Modal, TextInput, Platform } from "react-native";
import { getLabelByCategory, getIconByCategory } from "@/utils/goals";
import ActivityDetailsSection from './ActivityDetailsSection';
import DateTimePicker from '@react-native-community/datetimepicker';

// Importing assets
const editIcon = require("@/assets/icons/editDailyGoal.png");
const defaultIcon = require("@/assets/icons/riseshine.png");

interface EditActivityCardProps {
  category: string;
  isSelected: boolean; // Effectively the same as isExpanded
  onSelect: () => void;
  formData: {
    startTime: string;
    duration: { hours: number; minutes: number };
    description: string;
  };
  onFormDataChange: (field: string, value: string | { hours: number; minutes: number }) => void;
  onSave: () => void;
  scrollViewRef: React.RefObject<ScrollView>;
}

// Reuse PickerModal component
const PickerModal = ({ visible, onClose, onSelect, items, selectedValue, title }) => {
  const [tempSelected, setTempSelected] = useState(selectedValue);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
    >
      <TouchableOpacity 
        style={styles.modalOverlay} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{title}</Text>
          <ScrollView>
            {items.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.modalItem,
                  tempSelected === item && styles.selectedItem
                ]}
                onPress={() => {
                  setTempSelected(item);
                  onSelect(item);
                }}
              >
                <Text style={[
                  styles.modalItemText,
                  tempSelected === item && styles.selectedItemText
                ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity 
            style={styles.confirmButton}
            onPress={onClose}
          >
            <Text style={styles.confirmButtonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

// Reuse TimeInput component
const TimeInput = ({ 
  value, 
  placeholder, 
  onPress, 
  type, 
  onChangeText, 
  width = '100%' 
}) => {
  if (type === 'description') {
    return (
      <TextInput
        style={[styles.inputContainer, { width, height: 100, textAlignVertical: 'top' }]}
        placeholder={placeholder}
        placeholderTextColor="#979797"
        value={value}
        onChangeText={onChangeText}
        multiline
        returnKeyType="done"
        onSubmitEditing={() => Keyboard.dismiss()}
        blurOnSubmit={true}
      />
    );
  }

  return (
    <TouchableOpacity 
      style={[styles.inputContainer, { width }]}
      onPress={onPress}
    >
      <Text style={value ? styles.inputText : styles.placeholderText}>
        {value || placeholder}
      </Text>
    </TouchableOpacity>
  );
};

const EditActivityCard: React.FC<EditActivityCardProps> = ({
  category,
  isSelected,
  onSelect,
  formData,
  onFormDataChange,
  onSave,
  scrollViewRef,
}) => {
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showHoursPicker, setShowHoursPicker] = useState(false);
  const [showMinsPicker, setShowMinsPicker] = useState(false);

  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  const handleSubmitEditing = () => {
    Keyboard.dismiss();
  };

  const handleDescriptionFocus = () => {
    setTimeout(() => {
      scrollViewRef?.current?.scrollTo({
        y: 300,
        animated: true,
      });
    }, 50);
  };

  const handleTimeChange = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      setShowTimePicker(false);
    }
    if (selectedDate) {
      onFormDataChange('startTime', selectedDate.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }));
    }
  };

  const handleHoursChange = (hours) => {
    setShowHoursPicker(false);
    onFormDataChange('duration', { 
      ...formData.duration, 
      hours 
    });
  };

  const handleMinutesChange = (minutes) => {
    setShowMinsPicker(false);
    onFormDataChange('duration', { 
      ...formData.duration, 
      minutes 
    });
  };

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, []);

  const renderCollapsedCard = () => (
    <TouchableOpacity onPress={onSelect} 
      style={styles.header}
    >
      <View style={styles.iconContainer}>
        <Image source={getIconByCategory(category) || defaultIcon} style={styles.icon} />
      </View>
      <Text style={styles.title}>{getLabelByCategory(category)}</Text>
      {/* Edit Button */}
      <TouchableOpacity onPress={onSelect} style={styles.editButton}>
        <Image source={editIcon} style={styles.editIcon} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderTimePicker = () => {
    if (Platform.OS === 'ios') {
      return (
        <Modal
          visible={showTimePicker}
          transparent={true}
          animationType="slide"
        >
          <TouchableOpacity 
            style={styles.modalOverlay} 
            activeOpacity={1}
            onPress={() => setShowTimePicker(false)}
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Time</Text>
              <DateTimePicker
                value={new Date()}
                mode="time"
                is24Hour={false}
                display="spinner"
                onChange={handleTimeChange}
                style={{ width: '100%' }}
                textColor="#242020"
              />
              <TouchableOpacity 
                style={styles.confirmButton}
                onPress={() => setShowTimePicker(false)}
              >
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      );
    }
    
    return showTimePicker && (
      <DateTimePicker
        value={new Date()}
        mode="time"
        is24Hour={false}
        display="spinner"
        onChange={handleTimeChange}
      />
    );
  };

  const renderExpandedCard = () => (
    <>
      {renderCollapsedCard()}
      <View style={styles.detailsContainer}>
        <View style={styles.inputSection}>
          <Text style={styles.label}>Start Time (optional)</Text>
          <TimeInput
            value={formData?.startTime}
            placeholder="Choose"
            onPress={() => setShowTimePicker(true)}
          />
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.label}>Activity Duration (optional)</Text>
          <View style={styles.durationContainer}>
            <TimeInput
              value={formData?.duration?.hours ? `${formData.duration.hours} hrs` : "0 hrs"}
              placeholder="0 hrs"
              onPress={() => setShowHoursPicker(true)}
              width="48%"
            />
            <TimeInput
              value={formData?.duration?.minutes ? `${formData.duration.minutes} mins` : "0 mins"}
              placeholder="0 mins"
              onPress={() => setShowMinsPicker(true)}
              width="48%"
            />
          </View>
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.label}>Description (optional)</Text>
          <TimeInput
            type="description"
            value={formData?.description}
            placeholder="Enter description"
            onChangeText={(text) => onFormDataChange('description', text)}
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={onSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>

      {renderTimePicker()}

      <PickerModal
        visible={showHoursPicker}
        onClose={() => setShowHoursPicker(false)}
        onSelect={handleHoursChange}
        items={Array.from({ length: 10 }, (_, i) => i + 1)}
        selectedValue={formData?.duration?.hours}
        title="Select Hours"
      />

      <PickerModal
        visible={showMinsPicker}
        onClose={() => setShowMinsPicker(false)}
        onSelect={handleMinutesChange}
        items={Array.from({ length: 60 }, (_, i) => i)}
        selectedValue={formData?.duration?.minutes}
        title="Select Minutes"
      />
    </>
  );

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {isSelected ? renderExpandedCard() : renderCollapsedCard()}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E1E1E1",
    padding: 10,
    marginBottom: 10,
    //marginBottom: 200, // Add extra space at bottom to ensure visibility above keyboard
    width: '90%',
    alignSelf: 'center',
    zIndex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
  },
  icon: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#242020",
    fontFamily: "Open Sans",
    marginLeft: 8,
  },
  detailsContainer: {
    gap: 8,
  },
  inputSection: {
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: "400",
    color: "#000",
    fontFamily: "Open Sans",
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E1E1E1",
    borderRadius: 12,
    height: 35,
    paddingHorizontal: 15,
    justifyContent: "space-between",
    backgroundColor: "#FFF",
  },
  descriptionInput: {
    height: 80,
    alignItems: "flex-start",
    paddingVertical: 8,
    paddingTop: 8,
    textAlignVertical: 'top',
    fontSize: 12,
    fontFamily: "Open Sans",
    borderRadius: 12,
  },
  placeholder: {
    flex: 1,
    fontSize: 12,
    fontFamily: "Open Sans",
    color: "#A4ACBC",
  },
  inputDropdownIcon: {
    width: 14,
    height: 14,
  },
  saveButton: {
    backgroundColor: "#FFF",
    borderRadius: 100,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#DE728D",
  },
  saveButtonText: {
    color: "#DE728D",
    fontSize: 14,
    fontFamily: "Poppins",
    fontWeight: "600",
    textAlign: "center",
  },
  editButton: {
    position: "absolute",
    top: 14,
    right: 14,
  },
  editIcon: {
    width: 22,
    height: 22,
    resizeMode: "contain",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(36, 32, 32, 0.80)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 24,
    paddingBottom: 32,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#242020',
    textAlign: 'center',
    marginBottom: 24,
  },
  modalItem: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1',
  },
  selectedItem: {
    backgroundColor: '#F5F5F5',
  },
  modalItemText: {
    fontSize: 16,
    fontFamily: 'Open Sans',
    color: '#242020',
  },
  selectedItemText: {
    color: '#DE728D',
    fontWeight: '600',
  },
  durationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputText: {
    color: '#242020',
    fontSize: 14,
  },
  placeholderText: {
    color: '#979797',
    fontSize: 14,
  },
  confirmButton: {
    backgroundColor: '#DE728D',
    borderRadius: 100,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
    marginTop: 24,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontWeight: '600',
  },
});

export default EditActivityCard;
