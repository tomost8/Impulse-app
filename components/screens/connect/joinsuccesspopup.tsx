import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  StyleSheet, 
  Modal 
} from 'react-native';

interface JoinSuccessPopupProps {
  isVisible: boolean;
  onClose: () => void;
}

const JoinSuccessPopup: React.FC<JoinSuccessPopupProps> = ({
  isVisible,
  onClose,
}) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <View style={styles.iconContainer}>
            <Image 
              source={require("@/assets/images/group.png")}
              style={styles.icon}
            />
          </View>
          
          <Text style={styles.title}>
            Successfully Joined Group
          </Text>

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
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F1F9F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  icon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    tintColor: '#7AC17A',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 24,
  },
  okayButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#DE728D',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  okayButtonText: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default JoinSuccessPopup;
