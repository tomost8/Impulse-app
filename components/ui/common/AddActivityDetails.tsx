import React from 'react';
import { View, Text, StyleSheet, TextInput, Keyboard } from 'react-native';
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
    <View style={styles.formContainer}>
      {/* Start Time */}
      <View style={styles.inputSection}>
        <Text style={styles.label}>Start Time (optional)</Text>
        <TimePicker
          initialTime={formData?.startTime}
          setTime={(time) => onFormDataChange('startTime', time)}
        />
      </View>

      {/* Duration */}
      <View style={styles.inputSection}>
        <Text style={styles.label}>Activity Duration (optional)</Text>
        <DurationPicker
          hours={formData?.duration?.hours || 0}
          minutes={formData?.duration?.minutes || 0}
          setDuration={(hours, minutes) => {
            onFormDataChange('duration', { hours, minutes });
          }}
        />
      </View>

      {/* Description */}
      <View style={styles.inputSection}>
        <Text style={styles.label}>Description (optional)</Text>
        <TextInput
          style={[styles.inputContainer, { width: '100%', height: 100, textAlignVertical: 'top' }]}
          placeholder="Enter description"
          placeholderTextColor="#979797"
          value={formData?.description}
          onChangeText={(text) => onFormDataChange('description', text)}
          multiline
          returnKeyType="done"
          onFocus={onDescriptionFocus}
          onSubmitEditing={() => {
            Keyboard.dismiss();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 16,
  },
  inputSection: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    color: '#242020',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E1E1E1',
  },
});

export default ActivityDetailsSection; 