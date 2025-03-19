import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image,
  StyleSheet, 
  Modal 
} from 'react-native';

interface LeavePopupProps {
  isVisible: boolean;
  onClose: () => void;
  onLeave: () => void;
}

const LeavePopup: React.FC<LeavePopupProps> = ({
  isVisible,
  onClose,
  onLeave,
}) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <Image 
            source={require("@/assets/icons/leave-icon.png")}
            style={styles.leaveIcon}
          />
          <Text style={styles.title}>Are you sure you want to leave?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.backButton]}
              onPress={onClose}
            >
              <Text style={[styles.buttonText, styles.backButtonText]}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.leaveButton]}
              onPress={onLeave}
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
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  leaveIcon: {
    width: 64,
    height: 64,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#000000',
    marginBottom: 24,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
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
    backgroundColor: '#DE728D',
  },
  backButtonText: {
    color: '#FFFFFF',
  },
  leaveButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DE728D',
  },
  leaveButtonText: {
    color: '#DE728D',
  },
});

export default LeavePopup;
