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
      <View style={[styles.pickerContainer, { width: '48%' }]}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => setHoursVisible(true)}
        >
          <Text style={styles.buttonText}>
            {`${hours} hrs`}
          </Text>
          <Text style={styles.dropdownIcon}>▼</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.pickerContainer, { width: '48%' }]}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => setMinutesVisible(true)}
        >
          <Text style={styles.buttonText}>
            {`${minutes} mins`}
          </Text>
          <Text style={styles.dropdownIcon}>▼</Text>
        </TouchableOpacity>
      </View>

      <PickerModal
        visible={hoursVisible}
        onClose={() => setHoursVisible(false)}
        options={hourOptions}
        onValueSelected={(value) => setDuration(Number(value), minutes)}
        selectedValue={String(hours)}
        placeholder="Select Time"
      />

      <PickerModal
        visible={minutesVisible}
        onClose={() => setMinutesVisible(false)}
        options={minuteOptions}
        onValueSelected={(value) => setDuration(hours, Number(value))}
        selectedValue={String(minutes)}
        placeholder="Select Time"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  pickerContainer: {
    height: 40,
  },
  button: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 8,
    backgroundColor: 'white',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonText: {
    fontSize: 16,
    color: '#374151',
  },
  dropdownIcon: {
    fontSize: 12,
    color: '#374151',
  },
});

export default DurationPicker;
