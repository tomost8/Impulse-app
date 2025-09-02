import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
} from 'react-native';
import { s } from "react-native-size-matters";

interface CustomNotificationsProps {
  visible: boolean;
  onClose: () => void;
}

const pageContent = [
  {
    description: 'Navigate to your Account page and click on "Settings"',
    image: require("@/assets/images/walkthrough/walkthrough4a.png"),
  },
  {
    description: 'Click on "Reminders and Notifications"',
    image: require("@/assets/images/walkthrough/walkthrough4b.png"),
  },
  {
    description: 'Customize the time, activity, and message of your notifications.',
    image: require("@/assets/images/walkthrough/walkthrough4c.png"),
  },
  {
    description: 'Click "Save" to save your settings',
    image: require("@/assets/images/walkthrough/walkthrough4d.png"),
  },
];

const CustomNotifications = ({ visible, onClose }: CustomNotificationsProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.popup}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Custom Notifications</Text>
            <TouchableOpacity onPress={onClose}>
              <Image
                source={require("@/assets/icons/walkthrough/close.png")}
                style={styles.closeIcon}
              />
            </TouchableOpacity>
          </View>

          {/* Description */}
          <Text style={styles.description}>
            {pageContent[currentPage - 1].description}
          </Text>

          {/* Screenshot Section */}
          <View style={styles.screenshotContainer}>
            <TouchableOpacity 
              style={styles.navigationButton}
              onPress={handlePrevious}
              disabled={currentPage === 1}
            >
              <Image
                source={require("@/assets/icons/walkthrough/Back.png")}
                style={[
                  styles.navigationIcon,
                  currentPage === 1 && styles.disabledIcon
                ]}
              />
            </TouchableOpacity>

            <Image
              source={pageContent[currentPage - 1].image}
              style={styles.screenshot}
              resizeMode="contain"
            />

            <TouchableOpacity 
              style={styles.navigationButton}
              onPress={handleNext}
              disabled={currentPage === totalPages}
            >
              <Image
                source={require("@/assets/icons/walkthrough/Forward.png")}
                style={[
                  styles.navigationIcon,
                  currentPage === totalPages && styles.disabledIcon
                ]}
              />
            </TouchableOpacity>
          </View>

          {/* Progress Dots */}
          <View style={styles.progressContainer}>
            {[...Array(totalPages)].map((_, index) => (
              <View
                key={index}
                style={[
                  styles.progressDot,
                  currentPage === index + 1 && styles.activeDot
                ]}
              />
            ))}
          </View>

          {/* Got It Button */}
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Got it</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// Use same styles as other popups
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#242020',
    marginLeft: 6,
  },
  closeIcon: {
    width: 24,
    height: 24,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    color: '#242020',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  screenshotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  navigationButton: {
    padding: 12,
    width: 48,
    alignItems: 'center',
  },
  navigationIcon: {
    width: 24,
    height: 24,
    tintColor: '#979797',
  },
  screenshot: {
    width: Dimensions.get('window').width * 0.45,
    height: Dimensions.get('window').width * 0.8,
  },
  progressContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
    alignSelf: 'center',
    paddingRight: 12,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E1E1E1',
  },
  activeDot: {
    backgroundColor: '#DE728D',
  },
  button: {
    width: '100%',
    height: 48,
    backgroundColor: '#DE728D',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '700',
    lineHeight: 22,
  },
  disabledIcon: {
    opacity: 0.3,
  },
});

export default CustomNotifications;
