import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface PickerOption {
  label: string;
  value: string;
}

interface PickerModalProps {
  // Controls whether the modal is shown or hidden
  visible: boolean;
  // Function to call when the modal should close (triggered by Done button or background press)
  onClose: () => void;
  // Array of options displayed: each option has label (what user sees) and value (what is stored in selectedValue)
  options: PickerOption[];
  // Function that handles a new value being selected: the value is passed as a string
  onValueSelected: (value: string) => void; 
  // The currently selected value: should match one of the values in options
  selectedValue: string;
  // Optional text to show as first item (but cannot be selected) "Select an option..."
  placeholder?: string;
}

const PickerModal: React.FC<PickerModalProps> = ({
  visible,
  onClose,
  onValueSelected,
  selectedValue,
  options,
  placeholder,
}) => {
  // Handler to intercept placeholder selection and default to first option
  const handleValueSelected = (value: string) => {
    if (value === '-1' && options.length > 0) {
      onValueSelected(options[0].value);
    } else {
      onValueSelected(value);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.modalOverlay}>
        <TouchableOpacity 
          style={styles.modalBackground}
          onPress={onClose}
        />
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.doneButton}>Done</Text>
            </TouchableOpacity>
          </View>
          <Picker
            selectedValue={selectedValue}
            onValueChange={handleValueSelected}
            itemStyle={styles.pickerItem}
          >
            {placeholder && (
              <Picker.Item 
                label={placeholder} 
                value="-1" 
                enabled={false}  // Make placeholder non-selectable
                color="#999999"  // Grey out the placeholder text
              />
            )}
            {options.map((option) => (
              <Picker.Item 
                key={option.value} 
                label={option.label} 
                value={option.value} 
              />
            ))}
          </Picker>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackground: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    paddingBottom: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  doneButton: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
    padding: 8,
  },
  pickerItem: {
    color: '#000000',
    fontSize: 16,
  },
});

export default PickerModal; 