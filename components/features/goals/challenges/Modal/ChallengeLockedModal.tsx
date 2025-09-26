import React from 'react';
import { Modal, View, Text, StyleSheet, Pressable, Image, } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

interface ChallengeLockedModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const ChallengeLockedModal: React.FC<ChallengeLockedModalProps> = ({
  isVisible, 
  onClose 
}) => {
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.container}>
          {/* Warning icon */}
          <View style={styles.iconCircle1}>
            <View style={styles.iconCircle2}>
              <Ionicons name="warning-outline" size={24} color="#DE728D" />
            </View>
          </View>

          {/* Title */}
          <Text style={styles.title}>Challenge Locked</Text>

          {/* Message */}
          <Text style={styles.message}>
            You must achieve a minimum of a silver badge in the previous
            challenge level to unlock this.
          </Text>

          {/* Button */}
          <Pressable style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Okay</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    width: '100%',
    maxWidth: 360,
  },
  iconCircle1: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#FE6D730D',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconCircle2: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FE6D7319',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 28,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
    color: '#242020',
  },
  message: {
    fontSize: 16,
    color: '#5E6676',
    textAlign: 'center',
    fontFamily: 'Lato',
    fontWeight: '400',
    marginBottom: 24,
    lineHeight: 26,
  },
  button: {
    backgroundColor: '#DE728D',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 48,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ChallengeLockedModal;