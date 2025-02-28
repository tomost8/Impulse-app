import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import DurationPicker from './pickers/DurationPicker';
import TimePicker from './pickers/TimePicker';

type ActivityDetailsProps = {
  formData: {
    startTime: string;
    duration: { hours: number; minutes: number };
    description: string;
  };
  onFormDataChange: (field: string, value: string | { hours: number; minutes: number }) => void;
  onDescriptionFocus?: () => void;
};

const ActivityDetailsSection: React.FC<ActivityDetailsProps> = ({
  formData,
  onFormDataChange,
  onDescriptionFocus,
}) => {
  return (
    <View style={styles.detailsContainer}>
      {/* Start Time Input */}
      <View>
        <Text style={styles.label}>Start Time (optional)</Text>
        <View style={styles.inputContainer}>
          <TimePicker
            initialTime={formData.startTime}
            setTime={(time) => onFormDataChange('startTime', time)}
          />
        </View>
      </View>

      {/* Activity Duration Input */}
      <View style={{ marginTop: 10 }}>
        <Text style={styles.label}>Activity Duration (optional)</Text>
        <View style={[styles.inputContainer, { paddingHorizontal: 10 }]}>
          <DurationPicker
            hours={formData.duration.hours}
            minutes={formData.duration.minutes}
            setDuration={(hours, minutes) => 
              onFormDataChange('duration', { hours, minutes })
            }
          />
        </View>
      </View>

      {/* Description Input */}
      <View style={{ marginTop: 10 }}>
        <Text style={styles.label}>Description (optional)</Text>
        <View style={[styles.inputContainer, { height: 98, alignItems: "flex-start", paddingVertical: 10 }]}>
          <TextInput
            style={[styles.input, { height: '100%', textAlignVertical: 'top' }]}
            placeholder="Choose"
            value={formData.description}
            onChangeText={(value) => onFormDataChange('description', value)}
            placeholderTextColor="#A4ACBC"
            multiline
            onFocus={onDescriptionFocus}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    marginTop: 10,
  },
  label: {
    fontSize: 13,
    fontWeight: "400",
    color: "#000",
    fontFamily: "Open Sans",
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E1E1E1",
    borderRadius: 30,
    height: 40,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    marginBottom: 5,
  },
  input: {
    flex: 1,
    fontSize: 12.98,
    fontFamily: "Open Sans",
    color: "#A4ACBC",
  },
});

export default ActivityDetailsSection; 