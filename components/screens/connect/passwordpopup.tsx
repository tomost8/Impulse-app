import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Modal 
} from 'react-native';

interface PasswordPopupProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (password: string) => void;
}

const PasswordPopup = ({ visible, onClose, onSubmit }: PasswordPopupProps) => {
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = () => {
    // Reset error message
    setErrorMessage('');
    
    // This is where backend validation would happen
    // For now, just pass the password to parent component
    onSubmit(password);
  };

  // Function to show error (will be called from parent when password is incorrect)
  const showError = () => {
    setErrorMessage('Error: Password is incorrect');
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <Text style={styles.title}>Enter Password</Text>

          {/* Error Message */}
          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}

          <TextInput
            style={styles.input}
            placeholder="Enter Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={false}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.backButton]} 
              onPress={onClose}
            >
              <Text style={[styles.buttonText, styles.backButtonText]}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.leaveButton]}
              onPress={handleSubmit}
            >
              <Text style={[styles.buttonText, styles.leaveButtonText]}>Leave</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    width: '90%',
    maxWidth: 340,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#242020',
    marginBottom: 16,
  },
  errorText: {
    color: '#DE728D',
    fontSize: 12,
    fontFamily: 'Open Sans',
    fontStyle: 'italic',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 24,
    paddingHorizontal: 16,
    fontSize: 14,
    fontFamily: 'Open Sans',
    color: '#242020',
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  button: {
    flex: 1,
    height: 48,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DE728D',
  },
  leaveButton: {
    backgroundColor: '#DE728D',
  },
  buttonText: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontWeight: '600',
  },
  backButtonText: {
    color: '#DE728D',
  },
  leaveButtonText: {
    color: '#FFFFFF',
  },
});

export default PasswordPopup;
