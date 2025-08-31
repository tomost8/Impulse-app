import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useRef, useEffect, useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions, Platform } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { CameraHeaderContext } from './_layout';
import { useTheme } from 'react-native-paper';
import type { AppTheme } from '../../theme/theme';
import { Ionicons } from '@expo/vector-icons';

import { useDataProvider } from '@/contexts/DataProviderContext';
import { FlipType, SaveFormat, ImageManipulator } from 'expo-image-manipulator';

// 获取屏幕尺寸 (Get screen dimensions)
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function CameraScreen() {
  const { id, category } = useLocalSearchParams();
  const { fetching, user } = useDataProvider();
  const context = useContext(CameraHeaderContext);
  if (!context) return null;

  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const cameraRef = useRef<CameraView>(null);
  const [isCameraReady, setIsCameraReady] = useState(true);

  // 前置摄像头的预览图片 (Front camera preview image)
  //const [frontCameraImage, setFrontCameraImage] = useState<string | null>(null);
  //const [backCameraImage, setBackCameraImage] = useState<string | null>(null);
  
  useEffect(() => {
    context.setPictureTaken(false);
    context.setCategory(category as string);
  }, [category, id]);

  // Camera permissions
  if (!permission) {
    return <View />;
  }
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Impulse would like permission to use your camera to take photos.</Text>
        <TouchableOpacity 
          style={styles.permissionButton} 
          onPress={requestPermission}
        >
          <Text style={styles.permissionButtonText}>Grant permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function toggleCameraFacing() {
    console.log('Switching camera from', facing, 'to', (facing === 'back' ? 'front (selfie)' : 'back (environment)'));
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  async function takePicture() {
    const isDoubleCamera = !fetching && user?.is_double_cam;
    if (cameraRef.current) {
      try {
        // Take first photo
        const firstPhoto = await cameraRef.current.takePictureAsync({
          quality: 1,
          exif: true,
          skipProcessing: false
        });
        if (!firstPhoto) return;

        // Process first photo (and flip if selfie camera)
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
        console.log('processedFirstPhoto', processedFirstPhoto);

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
          setIsCameraReady(false);
          setFacing(secondCameraDirection);
          // Wait for camera to be ready after switching
          await new Promise(resolve => {
            const checkReady = () => {
              if (isCameraReady) {
                setTimeout(() => {
                  console.log('Camera switched and ready');
                  resolve(true);
                }, 500);
              } else {
                setTimeout(checkReady, 100);
              }
            };
            checkReady();
          });

          // Take second photo
          const secondPhoto = await cameraRef.current.takePictureAsync({
            quality: 1,
            exif: true,
            skipProcessing: false
          });
          if (!secondPhoto) return;

          // Process second photo (and flip if selfie camera)
          const imageContext = ImageManipulator.manipulate(secondPhoto.uri);
          if (facing === 'front') {
            imageContext.flip(FlipType.Horizontal);
          }
          const renderedImage = await imageContext.renderAsync();
          const processedSecondPhoto = await renderedImage.saveAsync({
            compress: 1,
            format: SaveFormat.JPEG,
            base64: false
          });
          if (!processedSecondPhoto) return;
          console.log('processedSecondPhoto', processedSecondPhoto);

          const firstPhotoIsFront = firstCameraDirection === 'front';
          const frontPhoto = firstPhotoIsFront ? processedFirstPhoto.uri : processedSecondPhoto.uri;
          const backPhoto = firstPhotoIsFront ? processedSecondPhoto.uri : processedFirstPhoto.uri;

          setIsCameraReady(false);
          setFacing(firstCameraDirection);
          // Switch back and ensure camera is ready
          await new Promise(resolve => {
            const checkReady = () => {
              if (isCameraReady) {
                setTimeout(() => {
                  console.log('Camera switched and ready');
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
      <CameraView 
        ref={cameraRef} 
        style={styles.camera} 
        facing={facing} 
        flash={context.flash ? 'on' : 'off'}
        onCameraReady={() => setIsCameraReady(true)}
      >
        {/* 左上角前置摄像头预览 (Front camera preview in top-left corner) */}
        {/*
        {frontCameraImage && (
          <View style={styles.frontPreviewContainer}>
            <Image source={{ uri: frontCameraImage }} style={styles.frontPreviewImage} />
          </View>
        )}
        */}
      </CameraView>
      
      {/* Bottom Control Area */}
      <View style={styles.controlsContainer}>
        <View style={styles.emptySpace} />
        {/* Camera Button */}
        <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
          <View style={styles.captureButtonInner} />
        </TouchableOpacity>
        {/* Flip Button */}
        <TouchableOpacity style={styles.flipButton} onPress={toggleCameraFacing}>
          <Ionicons name="camera-reverse" size={24} color="white" />
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
  message: {
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
    flex: 1, // 相机视图占据大部分空间
    width: screenWidth,
    height: screenHeight - 100, // 为底部控制区域留出空间
  },
  frontPreviewContainer: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 120 : 20, // Increased Android offset to 120
    left: 20,
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
    overflow: 'hidden',
    zIndex: 10,
  },
  frontPreviewImage: {
    width: '100%',
    height: '100%',
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
  flipButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
