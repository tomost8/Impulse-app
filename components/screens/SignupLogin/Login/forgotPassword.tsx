import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  SafeAreaView,
} from 'react-native';
import { s } from 'react-native-size-matters';
import { router } from 'expo-router';

interface ForgotPasswordProps {
  isVisible: boolean;
  onClose: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ isVisible, onClose }) => {
  const [email, setEmail] = useState('');

  const handleSendInstructions = () => {
    // Handle sending reset instructions here
    onClose();
    router.push('/'); // Navigate back to GetStarted
  };

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.container} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <TouchableOpacity 
          activeOpacity={1} 
          style={styles.popup}
          onPress={e => e.stopPropagation()}
        >
          <Text style={styles.title}>Reset Password</Text>

          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor="#979797"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TouchableOpacity 
            style={styles.sendButton}
            onPress={handleSendInstructions}
          >
            <Text style={styles.sendButtonText}>Send Instructions</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: s(24),
    alignItems: 'center',
  },
  title: {
    fontSize: s(24),
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#DE728D',
    marginBottom: s(32),
  },
  input: {
    width: '100%',
    height: s(48),
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: s(100),
    paddingHorizontal: s(20),
    marginBottom: s(24),
    fontSize: s(14),
    fontFamily: 'Open Sans',
  },
  sendButton: {
    width: '100%',
    height: s(48),
    backgroundColor: '#DE728D',
    borderRadius: s(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    fontSize: s(14),
    fontFamily: 'Open Sans',
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default ForgotPassword;
