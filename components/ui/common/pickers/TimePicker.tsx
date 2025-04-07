import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Platform, StyleSheet, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';

interface TimePickerProps {
  initialTime?: string; // either "HH:MM AM" or "HH:MM PM" or empty string
  placeholder?: string;
  setTime: (time: string) => void; // For setting the backend time in 24-hour format
}

const TimePicker: React.FC<TimePickerProps> = ({ initialTime, setTime, placeholder = 'Choose' }) => {
  const [visible, setVisible] = useState(false);
  
  // Initialize displayTime based on initialTime
  const [displayTime, setDisplayTime] = useState(initialTime || '');
  
  // Initialize pickerTime to current time, or convert initialTime if provided
  const [pickerTime, setPickerTime] = useState(() => {
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
      <TouchableOpacity onPress={() => {
        setVisible(true);
      }} style={styles.button}>
        <Text style={styles.buttonText}>
          {displayTime || placeholder}
        </Text>
        <MaterialIcons name="arrow-drop-down" size={24} color="#666" />
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setVisible(false)}
        >
          <TouchableOpacity 
            activeOpacity={1} 
            onPress={e => e.stopPropagation()} 
            style={styles.modalContent}
          >
            <DateTimePicker
              testID="dateTimePicker"
              value={pickerTime}
              mode="time"
              is24Hour={false}
              display="spinner"
              onChange={onChange}
              themeVariant="light"
              textColor="#000000"
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]} 
                onPress={() => setVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.confirmButton]} 
                onPress={handleConfirm}
              >
                <Text style={styles.modalButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    minHeight: 45,
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  confirmButton: {
    backgroundColor: '#007AFF',
  },
  modalButtonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TimePicker; 