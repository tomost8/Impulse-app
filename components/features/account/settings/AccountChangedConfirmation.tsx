import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  Modal, 
  StyleSheet 
} from 'react-native';

interface AccountChangedConfirmationProps {
  visible: boolean;
  onClose: () => void;
}

const AccountChangedConfirmation = ({ visible, onClose }: AccountChangedConfirmationProps) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <Image
            source={require("@/assets/icons/confirmationfull.png")}
            style={styles.icon}
          />
          <Text style={styles.title}>Account Changed</Text>
          <Text style={styles.message}>
          You are now an Impulse community leader and can create your own community and manage it.
          </Text>
          <TouchableOpacity 
            style={styles.button}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>Okay</Text>
          </TouchableOpacity>
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
    width: '75%',
    maxWidth: 340,
    alignItems: 'center',
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#242020',
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    color: '#242020',
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    width: '50%',
    height: 48,
    backgroundColor: '#DE728D',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontWeight: '600',
  },
});

export default AccountChangedConfirmation;
