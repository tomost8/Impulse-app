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

interface CompleteActivitiesProps {
  visible: boolean;
  onClose: () => void;
}

const pageContent = [
  {
    description: 'Click on the camera or your daily goals.',
    image: require("@/assets/images/walkthrough2a.png"),
  },
  {
    description: 'Snap a picture with your camera.',
    image: require("@/assets/images/walkthrough2b.png"),
  },
  {
    description: 'Click "Select Daily Goal" to use the picture for a goal.',
    image: require("@/assets/images/walkthrough2c.png"),
  },
  {
    description: 'Select the goal that you want to track with your photo.',
    image: require("@/assets/images/walkthrough2d.png"),
  },
  {
    description: 'Click "Send" to save or Post to your Social Feeds.',
    image: require("@/assets/images/walkthrough2e.png"),
  },
];

const CompleteActivities = ({ visible, onClose }: CompleteActivitiesProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

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
            <Text style={styles.title}>Complete an Activity</Text>
            <TouchableOpacity onPress={onClose}>
              <Image
                source={require("@/assets/icons/close.png")}
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
                source={require("@/assets/icons/Back.png")}
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
                source={require("@/assets/icons/Forward.png")}
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

// Use same styles as AddActivities
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

export default CompleteActivities;



