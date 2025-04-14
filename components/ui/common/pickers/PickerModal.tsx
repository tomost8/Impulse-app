import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface PickerOption {
  label: string;
  value: string;
}

interface PickerModalProps {
  visible: boolean;
  onClose: () => void;
  // Array of options displayed: each option has label (what user sees) and value (stored in selectedValue)
  options: PickerOption[];
  selectedValue: string;
  onValueSelected: (value: string) => void; 
  // Optional title to show at the top of the modal
  title?: string;
  // Optional text to show as first item (but cannot be selected)
  placeholder?: string;
}

const PickerModal: React.FC<PickerModalProps> = ({
  visible,
  onClose,
  onValueSelected,
  selectedValue,
  options,
  title,
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
            <Text style={styles.modalTitle}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.modalDoneButton}>Done</Text>
            </TouchableOpacity>
          </View>
          <Picker
            selectedValue={selectedValue}
            onValueChange={handleValueSelected}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            {placeholder && (
              <Picker.Item 
                label={placeholder} 
                value="-1" 
                enabled={false}
                color="#999999"
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalBackground: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1',
  },
  modalTitle: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#242020',
  },
  modalDoneButton: {
    fontSize: 16,
    fontFamily: 'Open Sans',
    color: '#DE728D',
    fontWeight: '600',
  },
  picker: {
    height: 200,
  },
  pickerItem: {
    color: '#242020',
    fontSize: 20,
    fontFamily: 'Open Sans',
  },
});

export default PickerModal; 