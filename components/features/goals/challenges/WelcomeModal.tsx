import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image } from 'react-native';

interface WelcomeModalProps {
  visible: boolean;
  onClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ 
  visible, 
  onClose 
}) => {
  const handleGetStarted = () => {
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.content}>
            <Image 
              source={require("@/assets/icons/infoWbackground.png")}
              style={styles.icon}
            />
            <Text style={styles.title}>Welcome to Challenges</Text>
            <Text style={styles.subtitle}>You can compete in various challenges across the 6 categories with your friends and earn achievement badges based on your completion level!</Text>
            
            <TouchableOpacity 
              style={styles.addButton}
              onPress={handleGetStarted}
            >
              <Text style={styles.addButtonText}>Let's Get Started</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    maxWidth: 332,
    width: '100%',
    borderRadius: 33,
  },
  content: {
    padding: 24,
    alignItems: 'center',
  },
  icon: {
    width: 68,
    height: 68,
    marginBottom: 16,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Lato',
    fontWeight: '700',
    fontSize: 22,
    color: '#242020',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 22,
    color: '#5E6676',
    marginBottom: 24,
  },
  addButton: {
    backgroundColor: '#DE728D',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    marginBottom: 12,
    maxWidth: 240,
    width: '100%',
    alignItems: 'center',
  },
  addButtonText: {
    textAlign: 'center',
    fontFamily: 'Lato',
    fontWeight: '600',
    fontSize: 16,
    color: '#FFFFFF',
  },
});

export default WelcomeModal;
