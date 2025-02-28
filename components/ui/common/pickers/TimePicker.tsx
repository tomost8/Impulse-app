import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Platform, StyleSheet, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface TimePickerProps {
  initialTime?: string; // either "HH:MM" or empty string
  setTime: (time: string) => void;
  placeholder?: string;
}

const TimePicker: React.FC<TimePickerProps> = ({ initialTime, setTime, placeholder = 'Choose' }) => {
  const [visible, setVisible] = useState(false);
  
  // Initialize displayTime based on initialTime
  const [displayTime, setDisplayTime] = useState(initialTime || '');
  
  // Initialize pickerTime to current time, or convert initialTime if provided
  const [pickerTime, setPickerTime] = useState(() => {
    const now = new Date();
    if (!initialTime) return now;
    
    const [hours, minutes] = initialTime.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  });

  const onChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setPickerTime(selectedDate);
    }
  };

  const handleConfirm = () => {
    // Format the time for display (24-hour format)
    const hours = String(pickerTime.getHours()).padStart(2, '0');
    const minutes = String(pickerTime.getMinutes()).padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    
    setDisplayTime(timeString);
    setTime(timeString);
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
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#242020',
    fontWeight: '600',
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