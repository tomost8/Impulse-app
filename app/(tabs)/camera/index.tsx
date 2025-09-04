import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useRef, useEffect, useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions, Platform } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { CameraHeaderContext } from './_layout';
import { Ionicons } from '@expo/vector-icons';

import { useDataProvider } from '@/contexts/DataProviderContext';
import { FlipType, SaveFormat, ImageManipulator } from 'expo-image-manipulator';

// Get screen dimensions
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function CameraScreen() {
  const { id, category } = useLocalSearchParams();
  const { fetching, user } = useDataProvider();
  const context = useContext(CameraHeaderContext);
  if (!context) return null;

  // Update header context when activity/category changes
  useEffect(() => {
    context.setPictureTaken(false);
    context.setCategory(category as string);
  }, [category, id]);

  // Camera permissions
  const [permission, requestPermission] = useCameraPermissions();
  if (!permission) {
    return <View />;
  }
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionMessage}>Impulse would like permission to use your camera to take photos.</Text>
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={styles.permissionButtonText}>Grant permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Camera initially set to back (environment) camera
  const cameraRef = useRef<CameraView>(null);
  const [facing, setFacing] = useState<CameraType>('back');
  const [isCameraReady, setIsCameraReady] = useState(true);
  const [isSwitchingCamera, setIsSwitchingCamera] = useState(false);

  // Camera ready callback
  const handleCameraReady = () => {
    setIsCameraReady(true);
    setIsSwitchingCamera(false);
  };

  // Toggle between front and back camera
  function toggleCameraFacing() {
    if (isSwitchingCamera) {
      return;
    }
    setIsSwitchingCamera(true);
    setIsCameraReady(false);
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  // Handle camera switching state
  useEffect(() => {
    if (isSwitchingCamera) {
      // Wait 1 second to let camera settle
      const timer = setTimeout(() => {
        setIsSwitchingCamera(false);
        setIsCameraReady(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [facing, isSwitchingCamera]);

  // Main camera function: taking pictures
  async function takePicture() {
    if (!isCameraReady || isSwitchingCamera) {
      return;
    }

    const isDoubleCamera = !fetching && user?.is_double_cam;
    if (cameraRef.current) {
      try {
        // Take first picture
        const firstPhoto = await cameraRef.current.takePictureAsync({
          quality: 1,
          exif: true,
          skipProcessing: true
        });
        if (!firstPhoto) return;

        // Process first picture (and flip horizontally if selfie)
        const imageContext = ImageManipulator.manipulate(firstPhoto.uri);
        if (facing === 'front') {
          imageContext.flip(FlipType.Horizontal);
        }
        const renderedImage = await imageContext.renderAsync();
        const processedFirstPhoto = await renderedImage.saveAsync({
          compress: 1,
          format: SaveFormat.JPEG,
          base64: false
        });
        if (!processedFirstPhoto) return;

        if (!isDoubleCamera) {
          // Single camera
          const frontPhoto = facing === 'front' ? processedFirstPhoto.uri : null;
          const backPhoto = facing === 'back' ? processedFirstPhoto.uri : null;
          
          router.push({
            pathname: '/camera/displayPicture',
            params: {
              frontPhoto,
              backPhoto,
              id: id,
              category: category,
            }
          });
        } else {
          // Double camera
          const firstCameraDirection = facing;
          const secondCameraDirection = firstCameraDirection === 'front' ? 'back' : 'front';
          // Switch camera and wait for it to be ready
          setIsSwitchingCamera(true);
          setFacing(secondCameraDirection);
          await new Promise(resolve => {
            const checkReady = () => {
              if (isCameraReady) {
                setTimeout(() => {
                  resolve(true);
                }, 500);
              } else {
                setTimeout(checkReady, 100);
              }
            };
            checkReady();
          });

          // Take second picture
          const secondPhoto = await cameraRef.current.takePictureAsync({
            quality: 1,
            exif: true,
            skipProcessing: true
          });
          if (!secondPhoto) return;

          // Process second picture (and flip horizontally if selfie)
          const imageContext = ImageManipulator.manipulate(secondPhoto.uri);
          if (secondCameraDirection === 'front') {
            imageContext.flip(FlipType.Horizontal);
          }
          const renderedImage = await imageContext.renderAsync();
          const processedSecondPhoto = await renderedImage.saveAsync({
            compress: 1,
            format: SaveFormat.JPEG,
            base64: false
          });
          if (!processedSecondPhoto) return;

          const firstPhotoIsFront = firstCameraDirection === 'front';
          const frontPhoto = firstPhotoIsFront ? processedFirstPhoto.uri : processedSecondPhoto.uri;
          const backPhoto = firstPhotoIsFront ? processedSecondPhoto.uri : processedFirstPhoto.uri;

          // Switch camera back to original direction and wait for it to be ready
          setIsSwitchingCamera(true);
          setFacing(firstCameraDirection);
          await new Promise(resolve => {
            const checkReady = () => {
              if (isCameraReady) {
                setTimeout(() => {
                  resolve(true);
                }, 500);
              } else {
                setTimeout(checkReady, 100);
              }
            };
            checkReady();
          });

          router.push({
            pathname: '/camera/displayPicture',
            params: {
              frontPhoto,
              backPhoto,
              id: id,
              category: category,
            }
          });
        }
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  }

  return (
    <View style={styles.container}>
      {/* Camera View */}
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
        flash={context.flash ? 'on' : 'off'}
        onCameraReady={handleCameraReady}
      >
        {/* Loading overlay when switching cameras */}
        {isSwitchingCamera && (
          <View style={styles.switchingOverlay}>
            <View style={styles.switchingContainer}>
              <Text style={styles.switchingText}>Switching camera...</Text>
            </View>
          </View>
        )}
      </CameraView>
      
      {/* Bottom Controls */}
      <View style={styles.controlsContainer}>
        <View style={styles.emptySpace} />
        {/* Capture Button */}
        <TouchableOpacity
          style={[styles.captureButton, (!isCameraReady || isSwitchingCamera) && styles.captureButtonDisabled]}
          onPress={takePicture}
          disabled={!isCameraReady || isSwitchingCamera}
        >
          <View style={styles.captureButtonInner} />
        </TouchableOpacity>
        {/* Flip Camera Button */}
        <TouchableOpacity
          style={[styles.flipButton, isSwitchingCamera && styles.flipButtonDisabled]}
          onPress={toggleCameraFacing}
          disabled={isSwitchingCamera}
        >
          <Ionicons name="camera-reverse" size={24} color={isSwitchingCamera ? "#666" : "white"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  permissionMessage: {
    textAlign: 'center',
    paddingBottom: 10,
    color: '#fff',
  },
  permissionButton: {
    backgroundColor: '#DE728D',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  permissionButtonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  camera: {
    flex: 1,
    width: screenWidth,
    height: screenHeight - 100, // Leave space for the bottom control area
  },
  switchingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  switchingContainer: {
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
  },
  switchingText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingBottom: 40,
    paddingTop: 20,
    backgroundColor: 'transparent',
  },
  emptySpace: {
    width: 44,
    height: 44,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#000',
  },
  captureButtonDisabled: {
    opacity: 0.5,
  },
  flipButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flipButtonDisabled: {
    opacity: 0.5,
  },
});
