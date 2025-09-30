import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Modal, SafeAreaView } from 'react-native';
import { s } from 'react-native-size-matters';
import auth from '@react-native-firebase/auth';

interface ForgotPasswordModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ isVisible, onClose }) => {
  const [email, setEmail] = useState('');
  const [errorText, setErrorText] = useState('');
  const [sending, setSending] = useState(false);

  const handleSendInstructions = async () => {
    if (!email) {
      setErrorText('Please enter your email address');
      return;
    }
    setSending(true);
    setErrorText('');
    try {
      await auth().sendPasswordResetEmail(email);
      console.log('Reset email sent successfully');
      onClose();
    } catch (error: any) {
      setErrorText(error.message || 'Failed to send reset email');
    } finally {
      setSending(false);
    }
  };

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Reset Password</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              placeholderTextColor="#979797"
              value={email}
            onChangeText={(text) => {
              setEmail(text);
              setErrorText(''); // Clear error when user types
            }}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            {errorText && (
              <Text style={styles.errorText}>{errorText}</Text>
            )}
          </View>

          {/* Send Button */}
          <TouchableOpacity 
            style={[styles.sendButton, sending && styles.disabledButton]}
            onPress={handleSendInstructions}
            disabled={sending}
          >
            <Text style={styles.sendButtonText}>
              {sending ? 'Sending...' : 'Send Instructions'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
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
  /* Input Section */
  inputContainer: {
    width: '100%',
    marginBottom: s(12),
    //borderColor: 'blue',
    //borderWidth: 1,
  },
  input: {
    width: '100%',
    height: s(48),
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: s(100),
    paddingHorizontal: s(20),
    marginBottom: s(4),
    fontSize: s(14),
    fontFamily: 'Open Sans',
  },
  errorText: {
    color: '#DE728D',
    fontSize: s(12),
    fontFamily: 'Open Sans',
    marginBottom: s(8),
    textAlign: 'center',
    lineHeight: s(16),
  },
  /* Send Button */
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
  disabledButton: {
    backgroundColor: '#cccccc',
  },
});

export default ForgotPasswordModal;
