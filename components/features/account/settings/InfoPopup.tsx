import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { s } from "react-native-size-matters";
import { Feather } from '@expo/vector-icons';

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
          <View style={styles.iconCircle1}>
            <View style={styles.iconCircle2}>
              <Feather name="info" size={24} color="#C35A74" />
            </View>
          </View>
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
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: s(20),
    alignItems: 'center',
    width: '100%',
  },
  iconCircle1: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#C35A740D',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconCircle2: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#C35A741A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontFamily: 'Poppins',
    fontWeight: '700',
    color: '#242020',
    marginBottom: s(20),
  },
  message: {
    fontSize: 16,
    fontFamily: 'Open Sans',
    color: '#646C7C',
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: s(20),
    marginBottom: s(32),
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