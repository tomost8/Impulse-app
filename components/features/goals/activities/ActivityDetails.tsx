import React from 'react';
import { View, Text, StyleSheet, TextInput, Keyboard } from 'react-native';
import DurationPicker from '../../../ui/common/pickers/DurationPicker';
import TimePicker from '../../../ui/common/pickers/TimePicker';

interface ActivityDetailsProps {
  formData: {
    startTime: string;
    duration: { hours: number; minutes: number };
    description: string;
  };
  onFormDataChange: (field: string, value: string | { hours: number; minutes: number }) => void;
  extraStyles?: any;
}

const ActivityDetails: React.FC<ActivityDetailsProps> = ({
  formData,
  onFormDataChange,
  extraStyles,
}) => {
  const combinedStyles = {
    ...styles,
    inputSection: [styles.inputSection, extraStyles?.inputSection],
    label: [styles.label, extraStyles?.label],
    inputContainer: [styles.inputContainer, extraStyles?.inputContainer],
  };

  return (
    <View>
      <View style={combinedStyles.inputSection}>
        <Text style={combinedStyles.label}>Start Time (optional)</Text>
        <TimePicker
          initialTime={formData?.startTime}
          setTime={(time) => onFormDataChange('startTime', time)}
        />
      </View>

      <View style={combinedStyles.inputSection}>
        <Text style={combinedStyles.label}>Activity Duration (optional)</Text>
        <DurationPicker
          hours={formData?.duration?.hours || 0}
          minutes={formData?.duration?.minutes || 0}
          setDuration={(hours, minutes) => {
            onFormDataChange('duration', { hours, minutes });
          }}
        />
      </View>

      <View style={combinedStyles.inputSection}>
        <Text style={combinedStyles.label}>Description (optional)</Text>
        <TextInput
          style={[combinedStyles.inputContainer, { height: 100, textAlignVertical: 'top' }]}
          placeholder="Enter description"
          placeholderTextColor="#979797"
          value={formData?.description}
          onChangeText={(text) => onFormDataChange('description', text)}
          multiline
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
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

export default ActivityDetails; 