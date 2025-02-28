import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface TimePickerProps {
  initialTime?: string;
  onTimeSelected: (time: string) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ initialTime, onTimeSelected }) => {
  const [show, setShow] = useState(false);
  const initialSelectedTime = initialTime ? (() => {
    const today = new Date();
    const [hours, minutes] = initialTime.split(':').map(Number);
    today.setHours(hours, minutes, 0, 0);
    return today;
  })() : new Date();
  console.log("initialTime", initialTime, initialSelectedTime);
  const [selectedTime, setSelectedTime] = useState(initialSelectedTime);

  const onChange = (event: any, selectedDate?: Date) => {
    if (event.type === 'set' && selectedDate) {  // iOS "set" button pressed
      setSelectedTime(selectedDate);
      const hours = String(selectedDate.getHours());
      const minutes = String(selectedDate.getMinutes());
      const hoursInt = parseInt(hours);
      const period = hoursInt >= 12 ? 'PM' : 'AM';
      const formattedHours = String(hoursInt % 12 || 12).padStart(2, '0');
      const formattedMinutes = minutes.padStart(2, '0');
      const timeSelected = `${formattedHours}:${formattedMinutes} ${period}`;
      console.log("timeSelected", timeSelected);
      onTimeSelected(timeSelected);
      setShow(false);
    } else if (event.type === 'dismissed') {  // iOS "cancel" button pressed
      setShow(false);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setShow(true)} style={styles.button}>
        <Text style={styles.buttonText}>
          {selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={selectedTime}
          mode="time"
          is24Hour={false}
          display="spinner"
          onChange={onChange}
        />
      )}
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
});

export default TimePicker; 