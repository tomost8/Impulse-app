import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { s } from "react-native-size-matters";

interface FriendRequestAcceptedProps {
  isVisible: boolean;
  onClose: () => void;
}

const FriendRequestAccepted: React.FC<FriendRequestAcceptedProps> = ({
  isVisible,
  onClose,
}) => {
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Image
            source={require("@/assets/icons/confirmationfull.png")}
            style={styles.icon}
          />
          <Text style={styles.title}>Friend Request Accepted!</Text>
          <Text style={styles.description}>
            You are now friends! You can now chat with each other and see each other's activities.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>Got it!</Text>
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
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: s(20),
    width: '85%',
    alignItems: 'center',
  },
  icon: {
    width: s(60),
    height: s(60),
    marginBottom: s(16),
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#242020',
    textAlign: 'center',
    marginBottom: s(12),
  },
  description: {
    fontSize: 16,
    fontFamily: 'Open Sans',
    color: '#242020',
    textAlign: 'center',
    marginBottom: s(24),
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#DE728D',
    borderRadius: 100,
    paddingVertical: s(13),
    paddingHorizontal: s(30),
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Poppins',
    fontWeight: '600',
  },
});

export default FriendRequestAccepted;



