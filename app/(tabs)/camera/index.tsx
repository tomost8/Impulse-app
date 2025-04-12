import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useRef, useEffect, useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { CameraHeaderContext } from './_layout';
import { useTheme } from 'react-native-paper';
import type { AppTheme } from '../../theme/theme';
import { Ionicons } from '@expo/vector-icons';

// 获取屏幕尺寸
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function CameraScreen() {
  const { id, category } = useLocalSearchParams();
  const context = useContext(CameraHeaderContext);
  const theme = useTheme<AppTheme>();
  
  if (!context) return null;

  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const cameraRef = useRef<CameraView>(null);
  
  // 前置摄像头的预览图片
  const [frontCameraImage, setFrontCameraImage] = useState<string | null>(null);
  
  useEffect(() => {
    context.setPictureTaken(false);
    context.setCategory(category as string);
    
    // 使用 Expo Router 的方式隐藏底部导航栏
    if (router.canGoBack()) {
      router.setParams({ hideTabBar: 'true' });
    }
    
    return () => {
      // 组件卸载时恢复底部导航栏
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

  // 切换前后摄像头
  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  // 拍照
  async function takePicture() {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        
        // 如果是前置摄像头，保存预览图片
        if (facing === 'front') {
          setFrontCameraImage(photo.uri);
        } else {
          // 如果已经有前置摄像头照片，跳转到预览页面
          if (frontCameraImage) {
            router.push({
              pathname: '/camera/displayPicture',
              params: { 
                frontPhoto: frontCameraImage,
                backPhoto: photo.uri,
                id: id,
                category: context?.category,
              }
            });
          } else {
            // 如果没有前置摄像头照片，切换到前置摄像头
            setFacing('front');
          }
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
      >
        {/* 左上角前置摄像头预览 */}
        {frontCameraImage && (
          <View style={styles.frontPreviewContainer}>
            <Image source={{ uri: frontCameraImage }} style={styles.frontPreviewImage} />
          </View>
        )}
      </CameraView>
      
      {/* 底部控制区域 - 移到相机视图外部 */}
      <View style={styles.controlsContainer}>
        {/* 空白区域，保持布局平衡 */}
        <View style={styles.emptySpace} />
        
        {/* 拍照按钮 */}
        <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
          <View style={styles.captureButtonInner} />
        </TouchableOpacity>
        
        {/* 翻转相机按钮 */}
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
    top: 20,
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
