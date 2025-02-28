import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import PickerModal from './PickerModal';

interface DurationPickerProps {
  hours: number;
  minutes: number;
  setDuration: (hours: number, minutes: number) => void;
}

const DurationPicker: React.FC<DurationPickerProps> = ({
  hours,
  minutes,
  setDuration,
}) => {
  const [hoursVisible, setHoursVisible] = useState(false);
  const [minutesVisible, setMinutesVisible] = useState(false);

  const hourOptions = Array.from({ length: 24 }, (_, i) => ({
    label: `${i} hr${i !== 1 ? 's' : ''}`,
    value: String(i),
  }));

  const minuteOptions = Array.from({ length: 60 }, (_, i) => ({
    label: `${i} min${i !== 1 ? 's' : ''}`,
    value: String(i),
  }));

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => setHoursVisible(true)}
        >
          <Text style={styles.buttonText}>
            {hours === -1 ? 'Select hours' : `${hours} hr${hours !== 1 ? 's' : ''}`}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.pickerContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => setMinutesVisible(true)}
        >
          <Text style={styles.buttonText}>
            {minutes === -1 ? 'Select minutes' : `${minutes} min${minutes !== 1 ? 's' : ''}`}
          </Text>
        </TouchableOpacity>
      </View>

      <PickerModal
        visible={hoursVisible}
        onClose={() => setHoursVisible(false)}
        options={hourOptions}
        onValueSelected={(value) => setDuration(Number(value), minutes)}
        selectedValue={String(hours)}
        placeholder="Select hours"
      />

      <PickerModal
        visible={minutesVisible}
        onClose={() => setMinutesVisible(false)}
        options={minuteOptions}
        onValueSelected={(value) => setDuration(hours, Number(value))}
        selectedValue={String(minutes)}
        placeholder="Select minutes"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerContainer: {
    flex: 1,
    marginHorizontal: 5,
    height: 40,
  },
  button: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    padding: 10,
    backgroundColor: 'white',
  },
  buttonText: {
    fontSize: 14,
    color: 'black',
  },
});

export default DurationPicker;
