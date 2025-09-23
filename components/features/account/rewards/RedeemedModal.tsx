import React from "react";
import { View, Text, TouchableOpacity, Image, Modal, StyleSheet } from "react-native";

interface RedeemedModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const RedeemedModal: React.FC<RedeemedModalProps> = ({ isVisible, onClose }) => {
  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Image 
            source={require("@/assets/icons/confirmationfull.png")}
            style={styles.icon}
          />
          <Text style={styles.title}>Reward Redeemed</Text>
          <Text style={styles.message}>
            Check your email for a message from rewards@findyourimpulse.com in the next 24 hours for next steps!
          </Text>
          <TouchableOpacity style={styles.okayButton} onPress={onClose}>
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
    width: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 24,
    alignItems: 'center',
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Open Sans',
    fontWeight: '700',
    color: '#242020',
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    fontFamily: 'Open Sans',
    color: '#5E6676',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 24,
  },
  okayButton: {
    width: '50%',
    height: 45,
    backgroundColor: '#DE728D',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  okayButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: 'Poppins',
    fontWeight: '600',
  },
});

export default RedeemedModal;
