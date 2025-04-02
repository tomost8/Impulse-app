import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { s } from "react-native-size-matters";

interface RemoveFriendPopupProps {
  visible: boolean;
  onClose: () => void;
  onRemove: () => void;
}

const RemoveFriendPopup = ({ visible, onClose, onRemove }: RemoveFriendPopupProps) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <Image 
            source={require("@/assets/icons/removeUser.png")}
            style={styles.icon}
          />
          <Text style={styles.title}>Are you sure you want to remove this friend?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.backButton]}
              onPress={onClose}
            >
              <Text style={[styles.buttonText, styles.backButtonText]}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.removeButton]}
              onPress={() => {
                onRemove();
                onClose();
              }}
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
    backgroundColor: 'white',
    borderRadius: 30,
    padding: s(20),
    alignItems: 'center',
    width: '85%',
  },
  icon: {
    width: s(80),
    height: s(80),
    marginBottom: s(16),
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#242020',
    textAlign: 'center',
    marginBottom: s(20),
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: s(12),
    width: '100%',
  },
  button: {
    flex: 1,
    borderRadius: 100,
    paddingVertical: s(10),
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#DE728D',
  },
  removeButton: {
    borderWidth: 1,
    borderColor: '#DE728D',
  },
  buttonText: {
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '600',
  },
  backButtonText: {
    color: '#FFFFFF',
  },
  removeButtonText: {
    color: '#DE728D',
  },
});

export default RemoveFriendPopup;
