import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { router } from 'expo-router';

const CameraOpen = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Top Bar */}
      <SafeAreaView style={styles.topBar}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Image
            source={require("@/assets/icons/backWhite.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.flashButton}>
          <Image
            source={require("@/assets/icons/flashOff.png")}
            style={styles.flashIcon}
          />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Camera Preview / Test Image */}
      <View style={styles.previewContainer}>
        <Image
          source={require("@/assets/images/testPost.png")}
          style={styles.preview}
          resizeMode="cover"
        />
      </View>

      {/* Bottom Bar */}
      <SafeAreaView style={styles.bottomBar}>
        <TouchableOpacity style={styles.bottomButton}>
          <Image
            source={require("@/assets/icons/uploadPicture.png")}
            style={styles.uploadIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.captureButton}>
          <Image
            source={require("@/assets/icons/takePicture.png")}
            style={styles.captureIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomButton}>
          <Image
            source={require("@/assets/icons/cameraFlip.png")}
            style={styles.flipIcon}
          />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  topBar: {
    height: 75,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#000',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  backButton: {
    padding: 10,
  },
  backIcon: {
    width: 7,
    height: 14,
    tintColor: '#FFF',
  },
  flashButton: {
    padding: 10,
  },
  flashIcon: {
    width: 23,
    height: 23,
  },
  previewContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  preview: {
    flex: 1,
    width: '100%',
  },
  bottomBar: {
    height: 120,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  bottomButton: {
    padding: 10,
  },
  uploadIcon: {
    width: 26,
    height: 26,
  },
  captureIcon: {
    width: 80,
    height: 80,
  },
  flipIcon: {
    width: 26,
    height: 26,
  },
});

export default CameraOpen;
