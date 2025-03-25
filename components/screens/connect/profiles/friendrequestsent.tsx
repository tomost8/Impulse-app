import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image,
  StyleSheet, 
  Modal 
} from 'react-native';

interface FriendRequestSentPopupProps {
  isVisible: boolean;
  onClose: () => void;
}

const FriendRequestSentPopup: React.FC<FriendRequestSentPopupProps> = ({
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
          <Image 
            source={require("@/assets/icons/confirmationfull.png")}
            style={styles.confirmationIcon}
          />
          <Text style={styles.title}>Friend Request Sent</Text>
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
    width: '75%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  confirmationIcon: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#000000',
    marginBottom: 24,
  },
  okayButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#DE728D',
    borderRadius: 100,
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

export default FriendRequestSentPopup;
