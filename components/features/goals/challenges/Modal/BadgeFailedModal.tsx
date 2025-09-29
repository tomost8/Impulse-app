import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

interface BadgeAchievementModalProps {
  isVisible: boolean;
  onClose: () => void;
  badgeDate: string;  // e.g. "18-Oct-2024"
  badgeLevel: string;
}

const BadgeEarnedModal: React.FC<BadgeAchievementModalProps> = ({
  isVisible,
  onClose,
  badgeLevel,
  badgeDate,
}) => {

  const badge_level = badgeLevel.charAt(0).toUpperCase() + badgeLevel.slice(1).toLowerCase()
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close-outline" size={16} color="#363538" style={styles.closeIcon} />
          </TouchableOpacity>

          {/* Date */}
          <Text style={styles.date}>{badgeDate}</Text>

          {/* Title */}
          <Text style={styles.title}>Try again next time!</Text>

          {/* Message */}
          <Text style={styles.message}>Unfortunately, you did not earn a completion badge this time. Don’t be discouraged and try again!</Text>
        </View>
      </View>
    </Modal>
  );
};

export default BadgeEarnedModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 5,
  },
  closeButton: {
    position: "absolute",
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#7E869E40',
    right: 15,
    top: 15,
    zIndex: 1,
  },
  closeIcon: {
    padding: 4
  },
  date: {
    fontSize: 12,
    fontFamily: "Lato",
    color: "#5E6676",
    marginTop: 24,
    marginBottom: 8,
    fontWeight: "900",
  },
  title: {
    marginBottom: 10,
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Lato',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '900',
    letterSpacing: -0.08,
  },
  message: {
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Lato',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    marginBottom: 12,
  },
});
