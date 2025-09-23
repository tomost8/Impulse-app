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

interface InfoPopupProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

const InfoPopup = ({ visible, onClose, title, message }: InfoPopupProps) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <Image 
            source={require("@/assets/icons/infoWbackground.png")}
            style={styles.icon}
          />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity 
            style={styles.button}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>Ok</Text>
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
    backgroundColor: 'white',
    borderRadius: 30,
    padding: s(20),
    alignItems: 'center',
    width: '85%',
  },
  icon: {
    width: s(60),
    height: s(60),
    marginBottom: s(16),
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#242020',
    marginBottom: s(12),
  },
  message: {
    fontSize: 15,
    fontFamily: 'Open Sans',
    color: '#242020',
    textAlign: 'center',
    lineHeight: s(20),
    marginBottom: s(20),
  },
  button: {
    backgroundColor: '#DE728D',
    borderRadius: 100,
    paddingVertical: s(13),
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '600',
  },
});

export default InfoPopup; 