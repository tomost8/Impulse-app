import React, { useState, useRef, useEffect, useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions, } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { router, useLocalSearchParams, useFocusEffect } from 'expo-router';
import * as Device from "expo-device";
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
  
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [facing, setFacing] = useState<CameraType>('back');
  const [isCameraReady, setIsCameraReady] = useState(true);
  const [isSwitchingCamera, setIsSwitchingCamera] = useState(false);

  // Update header context whenever screen is focused (navigated to)
  useFocusEffect(
    React.useCallback(() => {
      context.setPictureTaken(false);
      if (id && category) {
        // Navigated from activity cards
        context.setId(Number(id));
        context.setCategory(category as string);
      } else {
        // Navigated from camera button
        context.setId(0);
        context.setCategory('');
      }
    }, [id, category, context])
  );

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

  // Early returns (must be after all hooks)
  if (!context) return null;
  if (!permission) {
    return <View />;
  }
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionMessage}>Impulse would like camera permission to take photos for your daily goals.</Text>
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={styles.permissionButtonText}>Grant permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Camera ready callback
  const handleCameraReady = () => {
    setIsCameraReady(true);
    setIsSwitchingCamera(false);
  };

  // Toggle between front and back camera
  function toggleCameraFacing() {
    if (isSwitchingCamera) return;
    setIsSwitchingCamera(true);
    setIsCameraReady(false);
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  // Helper: wait until camera is ready (no forced delay)
  function waitForCameraReady() {
    return new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        if (isCameraReady) {
          clearInterval(interval);
          resolve();
        }
      }, 50);
    });
  }

  // Detect emulator/simulator
  function isRunningOnEmulator() {
    if (Device.osName === "iOS" && Device.modelName?.includes("Simulator")) {
      return true;
    }
    if (Device.osName === "Android") {
      return Device.supportedCpuArchitectures?.some((arch) =>
        arch.includes("x86")
      );
    }
    return false;
  }

  // Capture photo with fallback for emulator
  async function capturePhoto(): Promise<{ uri: string } | null> {
    const runningOnEmulator = isRunningOnEmulator();

    if (runningOnEmulator || !cameraRef.current) {
      return { uri: "https://picsum.photos/800/1200" }; // placeholder
    }

    return await cameraRef.current.takePictureAsync({
      quality: 1,
      exif: true,
      skipProcessing: true,
    });
  }

  // Process photo helper
  async function processPhoto(uri: string, shouldFlip: boolean) {
    // Skip manipulation for placeholder URIs
    if (uri.startsWith("http")) return uri;

    const imageContext = ImageManipulator.manipulate(uri);
    if (shouldFlip) imageContext.flip(FlipType.Horizontal);

    const rendered = await imageContext.renderAsync();
    const processed = await rendered.saveAsync({
      compress: 1,
      format: SaveFormat.JPEG,
      base64: false,
    });
    return processed?.uri ?? null;
  }

  // --- Main camera function ---
  async function takePicture() {
    if (!isCameraReady || isSwitchingCamera) return;
    const isDoubleCamera = !fetching && user?.is_double_cam;

    try {
      // First photo
      const firstPhoto = await capturePhoto();
      if (!firstPhoto) return;
      const firstProcessedUri = await processPhoto(
        firstPhoto.uri,
        facing === "front"
      );
      if (!firstProcessedUri) return;

      if (!isDoubleCamera) {
        // Single camera flow
        router.push({
          pathname: "/camera/displayPicture",
          params: {
            frontPhoto: facing === "front" ? firstProcessedUri : null,
            backPhoto: facing === "back" ? firstProcessedUri : null,
            id,
            category,
          },
        });
        return;
      }

      // --- Double camera flow ---
      const firstCameraDirection = facing;
      const secondCameraDirection =
        firstCameraDirection === "front" ? "back" : "front";

      // Switch to second camera
      setIsSwitchingCamera(true);
      setFacing(secondCameraDirection);
      await waitForCameraReady();

      const secondPhoto = await capturePhoto();
      if (!secondPhoto) return;
      const secondProcessedUri = await processPhoto(
        secondPhoto.uri,
        secondCameraDirection === "front"
      );
      if (!secondProcessedUri) return;

      const firstPhotoIsFront = firstCameraDirection === "front";
      const frontPhoto = firstPhotoIsFront
        ? firstProcessedUri
        : secondProcessedUri;
      const backPhoto = firstPhotoIsFront
        ? secondProcessedUri
        : firstProcessedUri;

      // Switch back (fire-and-forget, no blocking)
      setIsSwitchingCamera(true);
      setFacing(firstCameraDirection);
      waitForCameraReady();

      router.push({
        pathname: "/camera/displayPicture",
        params: { frontPhoto, backPhoto, id, category },
      });
    } catch (error) {
      console.error("Error taking picture:", error);
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
