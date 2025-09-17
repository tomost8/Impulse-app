import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated, ActivityIndicator } from 'react-native';
import { captureRef } from 'react-native-view-shot';

interface PostImageProps {
  imageUrls?: string[];
  mainImageIndex?: number;
  isSinglePost?: boolean;
  onImageSwap?: () => void;
  isSwapping?: boolean;
  username?: string;
  onPress?: () => void;
}

export interface PostImageRef {
  captureImage: () => Promise<string>;
}

const SMALL_IMAGE_SIZE = { width: 118, height: 160 };
const PADDING = 10;

const PostImage = forwardRef<PostImageRef, PostImageProps>(({ 
  imageUrls, 
  mainImageIndex = 0,
  isSinglePost = false,
  onImageSwap,
  isSwapping = false,
  username,
  onPress,
}, ref) => {
  const [position] = useState(new Animated.ValueXY({ x: PADDING, y: PADDING }));
  const [imageLoading, setImageLoading] = useState(true);
  const [smallImageLoading, setSmallImageLoading] = useState(true);
  const [alternateImagePreloaded, setAlternateImagePreloaded] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const imageContainerRef = React.useRef<View>(null);

  useImperativeHandle(ref, () => ({
    captureImage: async () => {
      if (!imageContainerRef.current) {
        throw new Error('Image container ref not available');
      }
      try {
        // Show watermark during capture
        setIsCapturing(true);
        
        // Wait for watermark to render
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const uri = await captureRef(imageContainerRef.current, {
          format: 'jpg',
          quality: 0.8,
        });
        
        // Hide watermark after capture
        setIsCapturing(false);
        
        return uri;
      } catch (error) {
        console.error('Error capturing view:', error);
        setIsCapturing(false);
        throw error;
      }
    },
  }));

  // Smooth crossfade animation when mainImageIndex changes
  // React.useEffect(() => {
  //   Animated.timing(foregroundOpacity, {
  //     toValue: mainImageIndex === 1 ? 1 : 0,
  //     duration: 200,
  //     useNativeDriver: true,
  //   }).start();
  // }, [mainImageIndex, foregroundOpacity]);

  // Reset preload state when main image changes
  React.useEffect(() => {
    setAlternateImagePreloaded(false);
  }, [mainImageIndex]);

  // Smart preloading: preload alternate image when user touches small image
  const handleSmallImageTouchStart = () => {
    if (!alternateImagePreloaded && imageUrls && imageUrls.length > 1) {
      const alternateImageUrl = imageUrls[mainImageIndex === 0 ? 1 : 0];
      
      // Preload the alternate image
      Image.prefetch(alternateImageUrl)
        .then(() => {
          setAlternateImagePreloaded(true);
        })
        .catch((error) => {
          console.log('Failed to preload alternate image:', error);
        });
    }
  };

  if (!imageUrls || imageUrls.length === 0) return null;

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
    >
      <View ref={imageContainerRef} style={styles.imageContainer}>
        {/* Main Image */}
        <Image
          source={{ uri: imageUrls[mainImageIndex] }}
          style={[styles.image, isCapturing && styles.imageNoCorners]}
          resizeMode="cover"
          onLoadStart={() => setImageLoading(true)}
          onLoadEnd={() => setImageLoading(false)}
          onError={() => setImageLoading(false)}
        />

        {/* Loading indicator for main image */}
        {(imageLoading || isSwapping) && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="small" color="#DE728D" />
          </View>
        )}

        {/* Small Image - Only show for double camera posts */}
        {!isSinglePost && imageUrls.length > 1 && (
          <Animated.View
            style={[
              styles.smallImageContainer,
              { transform: position.getTranslateTransform() }
            ]}
          >
            <TouchableOpacity 
              onPress={onImageSwap} 
              onPressIn={handleSmallImageTouchStart}
              disabled={isSwapping}
            >
              <Image
                source={{ uri: imageUrls[mainImageIndex === 0 ? 1 : 0] }}
                style={[styles.smallImage, isCapturing && styles.smallImageNoCorners]}
                resizeMode="cover"
                onLoadStart={() => setSmallImageLoading(true)}
                onLoadEnd={() => setSmallImageLoading(false)}
                onError={() => setSmallImageLoading(false)}
              />
              
              {/* Loading indicator for small image */}
              {smallImageLoading && (
                <View style={styles.smallLoadingOverlay}>
                  <ActivityIndicator size="small" color="#DE728D" />
                </View>
              )}

            </TouchableOpacity>
          </Animated.View>
        )}

        {/* Watermark Text - Only visible during capture */}
        {isCapturing && (
          <View style={styles.watermarkContainer}>
            <Text style={styles.watermarkText}>Impulse/{username}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
});

PostImage.displayName = 'PostImage';

const styles = StyleSheet.create({
  imageContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 3/4, // Standard photo aspect ratio
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  foregroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  foregroundLoadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  smallLoadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(240, 240, 240, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  smallImageContainer: {
    position: 'absolute',
    width: SMALL_IMAGE_SIZE.width,
    height: SMALL_IMAGE_SIZE.height,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#000000',
    overflow: 'hidden',
  },
  smallImage: {
    width: SMALL_IMAGE_SIZE.width,
    height: SMALL_IMAGE_SIZE.height,
    borderRadius: 5,
  },
  watermarkContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  watermarkText: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
  },
  imageNoCorners: {
    borderRadius: 0,
  },
  smallImageNoCorners: {
    borderRadius: 0,
  },
});

export default PostImage;
