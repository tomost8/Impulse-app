import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Platform, StyleSheet, Modal, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';

interface TimePickerProps {
  initialTime?: string; // either "HH:MM AM" or "HH:MM PM" or empty string
  setTime: (time: string) => void; // For setting the backend time in 24-hour format
  title?: string;
  placeholder?: string;
}

const TimePicker: React.FC<TimePickerProps> = ({ 
  initialTime, 
  setTime, 
  placeholder = 'Choose', 
  title = 'Select Time'
}) => {
  const [visible, setVisible] = useState(false);
  const [displayTime, setDisplayTime] = useState(initialTime || '');
  const [pickerTime, setPickerTime] = useState(() => {
    // Use current time if no initialTime is provided
    const now = new Date();
    if (!initialTime) return now;
    
    const [timeStr, period] = initialTime.split(' ');
    const [hours, minutes] = timeStr.split(':').map(Number);
    const date = new Date();
    
    // Convert 12-hour to 24-hour format for internal use
    let adjustedHours = hours;
    if (period === 'PM' && hours !== 12) {
      adjustedHours += 12;
    } else if (period === 'AM' && hours === 12) {
      adjustedHours = 0;
    }
    
    date.setHours(adjustedHours, minutes, 0, 0);
    return date;
  });

  const onChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setPickerTime(selectedDate);
    }
  };

  const handleConfirm = () => {
    // Get hours and minutes from pickerTime
    const hours24 = pickerTime.getHours();
    const minutes = String(pickerTime.getMinutes()).padStart(2, '0');
    
    // Create 24-hour format string for setTime
    const time24 = `${String(hours24).padStart(2, '0')}:${minutes}`;
    
    // Format 12-hour time for display
    let hours12 = hours24 % 12;
    hours12 = hours12 === 0 ? 12 : hours12;
    const period = hours24 >= 12 ? 'PM' : 'AM';
    const displayTimeString = `${String(hours12)}:${minutes} ${period}`;
    
    setDisplayTime(displayTimeString);
    setTime(time24);
    setVisible(false);
  };

  return (
    <View>
      <TouchableOpacity 
        onPress={() => setVisible(true)} 
        style={styles.inputContainer}
      >
        <Text style={displayTime ? styles.inputText : styles.placeholderText}>
          {displayTime || placeholder}
        </Text>
        <Image 
          source={require('@/assets/icons/arrow-down-grey.png')}
          style={styles.arrowIcon}
        />
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent={true}
        animationType="slide"
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{title}</Text>
            <DateTimePicker
              testID="dateTimePicker"
              value={pickerTime}
              mode="time"
              is24Hour={false}
              display="spinner"
              onChange={onChange}
              style={{ width: '100%' }}
              textColor="#242020"
            />
            <TouchableOpacity 
              style={styles.confirmButton}
              onPress={handleConfirm}
            >
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 8,
    backgroundColor: 'white',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputText: {
    fontSize: 16,
    color: '#374151',
  },
  placeholderText: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  arrowIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
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

export default TimePicker; 