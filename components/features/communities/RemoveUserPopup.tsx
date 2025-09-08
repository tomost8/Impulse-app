import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  StyleSheet, 
  Modal 
} from 'react-native';

interface RemoveUserPopupProps {
  isVisible: boolean;
  onClose: () => void;
  onRemove: () => void;
}

const RemoveUserPopup: React.FC<RemoveUserPopupProps> = ({
  isVisible,
  onClose,
  onRemove,
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
            source={require("@/assets/icons/remove.png")}
            style={styles.icon}
          />
          
          <Text style={styles.title}>
            Are you sure you want to remove this user?
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.backButton]}
              onPress={onClose}
            >
              <Text style={[styles.buttonText, styles.backButtonText]}>Back</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.button, styles.removeButton]}
              onPress={onRemove}
            >
              <Text style={[styles.buttonText, styles.removeButtonText]}>Remove</Text>
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
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  icon: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
    tintColor: '#DE728D',
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  button: {
    flex: 1,
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#DE728D',
  },
  removeButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DE728D',
  },
  buttonText: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontWeight: '600',
  },
  backButtonText: {
    color: '#FFFFFF',
  },
  removeButtonText: {
    color: '#DE728D',
  },
});

export default RemoveUserPopup;
