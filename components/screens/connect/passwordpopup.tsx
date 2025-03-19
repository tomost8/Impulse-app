import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput,
  Image,
  StyleSheet, 
  Modal 
} from 'react-native';

interface PasswordPopupProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (password: string) => void;
}

const PasswordPopup: React.FC<PasswordPopupProps> = ({
  isVisible,
  onClose,
  onSubmit,
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    onSubmit(password);
    setPassword('');
  };

  const handleBack = () => {
    setPassword('');
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <Text style={styles.title}>Enter Password</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter Password"
              placeholderTextColor="#979797"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity 
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeButton}
            >
              <Image 
                source={require("@/assets/icons/hide.png")}
                style={[
                  styles.eyeIcon,
                  showPassword && { opacity: 0.5 }
                ]}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.backButton]}
              onPress={handleBack}
            >
              <Text style={[styles.buttonText, styles.backButtonText]}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.leaveButton]}
              onPress={handleSubmit}
            >
              <Text style={[styles.buttonText, styles.leaveButtonText]}>Submit</Text>
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
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#000000',
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 100,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 14,
    fontFamily: 'Open Sans',
    color: '#000000',
  },
  eyeButton: {
    padding: 8,
  },
  eyeIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: '#979797',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  button: {
    flex: 1,
    height: 48,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontWeight: '600',
  },
  backButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DE728D',
  },
  backButtonText: {
    color: '#DE728D',
  },
  leaveButton: {
    backgroundColor: '#DE728D',
  },
  leaveButtonText: {
    color: '#FFFFFF',
  },
});

export default PasswordPopup;
