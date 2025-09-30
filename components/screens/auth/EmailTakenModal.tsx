import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, ActivityIndicator } from 'react-native';
import { s } from 'react-native-size-matters';
import { useSignup } from '@/contexts/SignupContext';

interface EmailTakenModalProps {
  visible: boolean;
  onClose: () => void;
  handleCreateAccount: (formData: any, newEmail?: string) => Promise<boolean>;
}

export default function EmailTakenModal({
  visible,
  onClose,
  handleCreateAccount,
}: EmailTakenModalProps) {
  const { signupData, updateSignupData } = useSignup();
  const currentEmail = signupData.email;
  const [newEmail, setNewEmail] = useState(currentEmail);
  const [isValidating, setIsValidating] = useState(false);
  const [errorText, setErrorText] = useState('');

  // Update newEmail when currentEmail changes
  useEffect(() => {
    setNewEmail(currentEmail);
    setErrorText(''); // Clear any existing errors
  }, [currentEmail]);

  const handleEmailChange = (email: string) => {
    setNewEmail(email);
    if (errorText) {
      setErrorText('');
    }
  };

  const isEmailValid = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleFinish = async () => {
    if (!newEmail.trim()) {
      setErrorText('Please enter an email address');
      return;
    }
    if (!isEmailValid(newEmail)) {
      setErrorText('Please enter a valid email address');
      return;
    }
    if (newEmail.toLowerCase() === currentEmail.toLowerCase()) {
      setErrorText('Please enter a different email address');
      return;
    }

    setIsValidating(true);
    try {
      updateSignupData({ email: newEmail });
      const success = await handleCreateAccount(signupData, newEmail);
      if (success) {
        onClose();
      } else {
        setErrorText('Please enter a different email address');
      }
    } finally {
      setIsValidating(false);
    }
  };

  const handleBack = () => {
    setNewEmail(currentEmail); // Reset to original email
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={handleBack}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Email Already Registered</Text>
            <Text style={styles.subtitle}>
              The email you entered is already registered. 
              Please enter a new email address.
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>New Email Address</Text>
            <TextInput
              style={[
                styles.emailInput,
                errorText && styles.emailInputError
              ]}
              value={newEmail}
              onChangeText={handleEmailChange}
              placeholder="Enter new email address"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isValidating}
            />
            {errorText && (
              <Text style={styles.errorMessage}>{errorText}</Text>
            )}
          </View>

          <View style={styles.buttonContainer}>
            {/* Back Button */}
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBack}
              disabled={isValidating}
            >
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>

                    {/* Finish Button */}
                    <TouchableOpacity
                      style={[
                        styles.finishButton,
                        isValidating && styles.finishButtonDisabled
                      ]}
                      onPress={handleFinish}
                      disabled={isValidating}
                    >
                      <Text style={styles.finishButtonText}>Finish</Text>
                    </TouchableOpacity>
          </View>
        </View>
        
        {/* Loading Overlay */}
        {isValidating && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#DE728D" />
          </View>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  /* Overlay */
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: s(20),
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: s(12),
  },
  /* Containers */
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: s(24),
    width: '100%',
    maxWidth: s(400),
    elevation: 5,
  },
  textContainer: {
    marginBottom: s(24),
    //borderColor: 'blue',
    //borderWidth: 1,
  },
  inputContainer: {
    marginBottom: s(24),
    //borderColor: 'blue',
    //borderWidth: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: s(16),
    //borderColor: 'blue',
    //borderWidth: 1,
  },
  /* Text Section */
  title: {
    fontSize: s(20),
    fontFamily: 'Poppins',
    fontWeight: '700',
    color: '#242020',
    marginBottom: s(8),
    textAlign: 'center',
  },
  subtitle: {
    fontSize: s(14),
    fontFamily: 'Open Sans',
    color: '#666',
    textAlign: 'center',
    lineHeight: s(20),
  },
  /* Input Section */
  inputLabel: {
    fontSize: s(14),
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#242020',
    marginBottom: s(8),
  },
  emailInput: {
    height: s(48),
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: s(100),
    paddingHorizontal: s(20),
    fontSize: s(14),
    fontFamily: 'Open Sans',
    color: '#242020',
    backgroundColor: '#FFFFFF',
  },
  emailInputError: {
    borderColor: '#DE728D',
  },
  errorMessage: {
    color: '#DE728D',
    fontSize: s(12),
    fontFamily: 'Open Sans',
    marginTop: s(4),
  },
  backButton: {
    flex: 1,
    height: s(48),
    borderWidth: 1,
    borderColor: '#DE728D',
    borderRadius: s(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  /* Buttons */
  backButtonText: {
    fontSize: s(14),
    fontFamily: 'Open Sans',
    fontWeight: '600',
    color: '#DE728D',
  },
  finishButton: {
    flex: 1,
    height: s(48),
    backgroundColor: '#DE728D',
    borderRadius: s(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  finishButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  finishButtonText: {
    fontSize: s(14),
    fontFamily: 'Open Sans',
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
