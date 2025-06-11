import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useRef, useEffect, useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions, Platform } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { CameraHeaderContext } from './_layout';
import { useTheme } from 'react-native-paper';
import type { AppTheme } from '../../theme/theme';
import { Ionicons } from '@expo/vector-icons';

import { useUserData } from '@/services/UserPreferencesContext';
import { FlipType, SaveFormat, useImageManipulator, manipulateAsync } from 'expo-image-manipulator';

// 获取屏幕尺寸 (Get screen dimensions)
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function CameraScreen() {
  const { id, category } = useLocalSearchParams();
  const context = useContext(CameraHeaderContext);
  const theme = useTheme<AppTheme>();
  
  if (!context) return null;

  const { fetching, user } = useUserData();



  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const cameraRef = useRef<CameraView>(null);
  
  // 前置摄像头的预览图片 (Front camera preview image)
  const [frontCameraImage, setFrontCameraImage] = useState<string | null>(null);
  const [backCameraImage, setBackCameraImage] = useState<string | null>(null);
  const [isCameraReady, setIsCameraReady] = useState(true);
  
  
  useEffect(() => {
    context.setPictureTaken(false);
    context.setCategory(category as string);
    
    // 使用 Expo Router 的方式隐藏底部导航栏 (Hide bottom navigation bar using Expo Router)
    if (router.canGoBack()) {
      router.setParams({ hideTabBar: 'true' });
    }
    
    return () => {
      // 组件卸载时恢复底部导航栏 (Restore bottom navigation bar when component unmounts)
      if (router.canGoBack()) {
        router.setParams({ hideTabBar: 'false' });
      }
    };
  }, [category]);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>我们需要您的相机权限</Text>
        <TouchableOpacity 
          style={styles.permissionButton} 
          onPress={requestPermission}
        >
          <Text style={styles.permissionButtonText}>授予权限</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // 切换前后摄像头 (Toggle between front and back camera)
  function toggleCameraFacing() {
    console.log('Switching camera from', facing, 'to', (facing === 'back' ? 'front' : 'back'));
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  // 拍照 (Take picture: double camera)
  async function takePicture() {
    const is_double_camera = !fetching && user?.is_double_cam;
    if (cameraRef.current) {
      try {
        // Take first photo with better options
        const firstPhoto = await cameraRef.current.takePictureAsync({
          quality: 1,
          exif: true,
          skipProcessing: false // Ensure Android processes the image
        });

        if (!firstPhoto) return;

        // Process first photo with proper orientation
        const processedFirstPhoto = await manipulateAsync(
          firstPhoto.uri,
          [
            // Only flip horizontally for front camera
            ...(facing === 'front' ? [{ flip: FlipType.Horizontal }] : []),
            // Fix Android orientation
            ...(Platform.OS === 'android' ? [{ rotate: 0 }] : [])
          ],
          { 
            compress: 1,
            format: SaveFormat.JPEG,
            base64: false
          }
        );

        if (is_double_camera) {
          const firstCameraFacing = facing;
          const secondCameraFacing = facing === 'front' ? 'back' : 'front';
          setIsCameraReady(false);
          setFacing(secondCameraFacing);
          
          // Wait for camera switch
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

          // Take second photo with same options
          const secondPhoto = await cameraRef.current.takePictureAsync({
            quality: 1,
            exif: true,
            skipProcessing: false
          });

          if (!secondPhoto) return;

          // Process second photo
          const processedSecondPhoto = await manipulateAsync(
            secondPhoto.uri,
            [
              ...(secondCameraFacing === 'front' ? [{ flip: FlipType.Horizontal }] : []),
              ...(Platform.OS === 'android' ? [{ rotate: 0 }] : [])
            ],
            { 
              compress: 1,
              format: SaveFormat.JPEG,
              base64: false
            }
          );

          setIsCameraReady(false);
          setFacing(firstCameraFacing);

          if (!processedFirstPhoto || !processedSecondPhoto) return;
          
          const frontPhoto = firstCameraFacing === 'front' 
            ? processedFirstPhoto.uri 
            : processedSecondPhoto.uri;
          const backPhoto = firstCameraFacing === 'front' 
            ? processedSecondPhoto.uri 
            : processedFirstPhoto.uri;

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
          if (!processedFirstPhoto) return;
          
          const photo = processedFirstPhoto;
          const frontPhoto = facing === 'front' ? photo.uri : null;
          const backPhoto = facing === 'back' ? photo.uri : null;
          
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
        {frontCameraImage && (
          <View style={styles.frontPreviewContainer}>
            <Image source={{ uri: frontCameraImage }} style={styles.frontPreviewImage} />
          </View>
        )}
      </CameraView>
      
      {/* 底部控制区域 - 移到相机视图外部 (Bottom control area - moved outside camera view) */}
      <View style={styles.controlsContainer}>
        {/* 空白区域，保持布局平衡 (Empty space to maintain layout balance) */}
        <View style={styles.emptySpace} />
        
        {/* 拍照按钮 (Capture button) */}
        <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
          <View style={styles.captureButtonInner} />
        </TouchableOpacity>
        
        {/* 翻转相机按钮 (Flip camera button) */}
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
