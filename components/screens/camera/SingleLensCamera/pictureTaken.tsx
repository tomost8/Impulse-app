import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';

const PictureTaken = () => {
  const [showSelectGoal, setShowSelectGoal] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleRetake = () => {
    // Handle retake photo
    router.back();
  };

  const handleSelectGoal = () => {
    setShowSelectGoal(true);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleBack}
          >
            <Image 
              source={require("@/assets/icons/backWhite.png")}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.retakeButton}
            onPress={handleRetake}
          >
            <Image 
              source={require("@/assets/icons/retake.png")}
              style={styles.retakeIcon}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Image Preview */}
      <View style={styles.imageContainer}>
        <Image
          source={require("@/assets/images/testPost.png")}
          style={styles.previewImage}
          resizeMode="contain"
        />
      </View>

      {/* Bottom Button */}
      <TouchableOpacity 
        style={styles.selectButton}
        onPress={handleSelectGoal}
      >
        <Text style={styles.selectButtonText}>Select Daily Goal</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    width: 11,
    height: 15,
    tintColor: '#FFFFFF',
  },
  retakeButton: {
    padding: 8,
  },
  retakeIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * 1.33, // 4:3 aspect ratio
  },
  selectButton: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 34,
    paddingVertical: 14,
    borderRadius: 100,
    alignItems: 'center',
  },
  selectButtonText: {
    color: '#000000',
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontWeight: '600',
  },
});

export default PictureTaken;
