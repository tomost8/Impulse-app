import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  Image 
} from 'react-native';

interface PreferencesUpdatedPopupProps {
  isVisible: boolean;
  onClose: () => void;
}

const PreferencesUpdatedPopup: React.FC<PreferencesUpdatedPopupProps> = ({ 
  isVisible, 
  onClose 
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.iconContainer}>
            <Image
              source={require("@/assets/icons/confirmationfull.png")}
              style={styles.checkIcon}
            />
          </View>
          
          <Text style={styles.title}>Preferences Updated</Text>

          <TouchableOpacity 
            style={styles.okayButton}
            onPress={onClose}
          >
            <Text style={styles.okayButtonText}>Okay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    width: '80%',
    maxWidth: 335,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkIcon: {
    width: 75,
    height: 75,
    tintColor: '#6FCF97',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#242020',
    marginBottom: 24,
    textAlign: 'center',
  },
  okayButton: {
    backgroundColor: '#DE728D',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 100,
    minWidth: 120,
  },
  okayButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default PreferencesUpdatedPopup;
