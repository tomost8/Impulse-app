import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
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
          style={styles.inputContainer} 
          onPress={() => setHoursVisible(true)}
        >
          <Text style={styles.inputText}>
            {`${hours} hr${hours !== 1 ? 's' : ''}`}
          </Text>
          <Image 
            source={require('@/assets/icons/arrow-down-grey.png')}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={[styles.pickerContainer, { width: '48%' }]}>
        <TouchableOpacity 
          style={styles.inputContainer} 
          onPress={() => setMinutesVisible(true)}
        >
          <Text style={styles.inputText}>
            {`${minutes} min${minutes !== 1 ? 's' : ''}`}
          </Text>
          <Image 
            source={require('@/assets/icons/arrow-down-grey.png')}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
      </View>

      <PickerModal
        visible={hoursVisible}
        onClose={() => setHoursVisible(false)}
        options={hourOptions}
        onValueSelected={(value) => setDuration(Number(value), minutes)}
        selectedValue={String(hours)}
        title="Select Hours"
        placeholder="Select Hours"
      />

      <PickerModal
        visible={minutesVisible}
        onClose={() => setMinutesVisible(false)}
        options={minuteOptions}
        onValueSelected={(value) => setDuration(hours, Number(value))}
        selectedValue={String(minutes)}
        title="Select Minutes"
        placeholder="Select Minutes"
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
  inputContainer: {
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
  inputText: {
    fontSize: 16,
    color: '#374151',
  },
  arrowIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});

export default DurationPicker;
