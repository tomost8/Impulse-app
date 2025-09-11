import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, PanResponder, Animated, Platform, StatusBar, Dimensions, ActivityIndicator, GestureResponderEvent } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface PostContentProps {
  imageUrls?: string[];
  caption?: string;
  isSinglePost?: boolean;
  mainImageIndex?: number;
  onImageSwap?: () => void;
  isSwapping?: boolean;
  isStoryVisible?: boolean;
  onNext?: () => void;
  onPrev?: () => void;
}

const CORNER_THRESHOLD = 100; // Distance from corner to trigger snap
const SMALL_IMAGE_SIZE = { width: 118, height: 160 }; // ~1/5 of main image
const PADDING = 10;

const PostContent: React.FC<PostContentProps> = ({ 
  imageUrls, 
  caption, 
  isSinglePost = false, 
  mainImageIndex = 0,
  onImageSwap,
  isSwapping = false,
  isStoryVisible = false,
  onNext,
  onPrev,
}) => {
  const [position] = useState(new Animated.ValueXY({ x: PADDING, y: PADDING }));
  const [corner, setCorner] = useState<'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'>('topLeft');
  const [foregroundOpacity] = useState(new Animated.Value(0));
  const [backgroundImageLoading, setBackgroundImageLoading] = useState(true);
  const [foregroundImageLoading, setForegroundImageLoading] = useState(true);
  const [smallImageLoading, setSmallImageLoading] = useState(true);
  const insets = useSafeAreaInsets();

  const hasCaption = caption && caption.trim().length > 0;

  // Smooth crossfade animation when mainImageIndex changes
  useEffect(() => {
    Animated.timing(foregroundOpacity, {
      toValue: mainImageIndex === 1 ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [mainImageIndex, foregroundOpacity]);

  const pan = PanResponder.create({
    onStartShouldSetPanResponder: () => !isSinglePost,
    onPanResponderMove: (_, gesture) => {
      if (!isSinglePost) {
        position.setValue({ x: gesture.moveX, y: gesture.moveY });
      }
    },
    onPanResponderRelease: (_, gesture) => {
      if (isSinglePost) return;
      
      const { moveX, moveY } = gesture;
      const screenWidth = Dimensions.get('window').width;
      const screenHeight = screenWidth * (4/3); // Using aspect ratio for height
      
      const isRight = moveX > screenWidth / 2;
      const isBottom = moveY > screenHeight / 2;
      
      const newCorner = `${isBottom ? 'bottom' : 'top'}${isRight ? 'Right' : 'Left'}` as typeof corner;
      setCorner(newCorner);

      const targetX = isRight ? screenWidth - SMALL_IMAGE_SIZE.width - PADDING : PADDING;
      const targetY = isBottom ? screenHeight - SMALL_IMAGE_SIZE.height - PADDING : PADDING;

      Animated.spring(position, {
        toValue: { x: targetX, y: targetY },
        useNativeDriver: false,
      }).start();
    },
  });

  const handleNavigationPress = (event: GestureResponderEvent) => {
    const screenWidth = Dimensions.get('window').width;
    const tapPositionX = event.nativeEvent.locationX;

    if (isStoryVisible && tapPositionX < screenWidth / 2) {
      onPrev?.(); // Tap on the left side
    } else {
      onNext?.(); // Tap on the right side
    }
  };

  if (!imageUrls || imageUrls.length === 0) return null;

  return (
    <View style={[styles.container, !hasCaption && styles.containerNoCaption]}>
      {/* Main Image Container */}
      <TouchableOpacity
        activeOpacity={1}
        onPress={handleNavigationPress} // This function handles both next and prev
      >
        <View style={styles.imageContainer}>
          {/* Background image (always rendered) */}
          <Image
            source={{ uri: imageUrls[0] }}
            style={[styles.image, styles.backgroundImage]}
            resizeMode="cover"
            onLoadStart={() => setBackgroundImageLoading(true)}
            onLoadEnd={() => setBackgroundImageLoading(false)}
            onError={() => setBackgroundImageLoading(false)}
          />

          {/* Loading indicator for background image */}
          {backgroundImageLoading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="small" color={isStoryVisible ? "#FFFFFF" : "#DE728D"} />
            </View>
          )}

          {/* Foreground image (overlay) */}
          {imageUrls.length > 1 && (
            <Animated.Image
              source={{ uri: imageUrls[1] }}
              style={[
                styles.image,
                styles.foregroundImage,
                {
                  opacity: foregroundOpacity,
                }
              ]}
              resizeMode="cover"
              onLoadStart={() => setForegroundImageLoading(true)}
              onLoadEnd={() => setForegroundImageLoading(false)}
              onError={() => setForegroundImageLoading(false)}
            />
          )}

          {/* Loading indicator for foreground image */}
          {imageUrls.length > 1 && foregroundImageLoading && (
            <View style={styles.foregroundLoadingOverlay}>
              <ActivityIndicator size="small" color={isStoryVisible ? "#FFFFFF" : "#DE728D"} />
            </View>
          )}
          
          {/* Loading overlay when swapping */}
          {isSwapping && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="small" color="#FFFFFF" />
            </View>
          )}

          {/* Small Image - Only show for double camera posts */}
          {!isSinglePost && imageUrls.length > 1 && (
            <Animated.View
              style={[
                styles.smallImageContainer,
                { transform: position.getTranslateTransform() }
              ]}
              {...pan.panHandlers}
            >
              <TouchableOpacity onPress={onImageSwap} disabled={isSwapping}>
                <Image
                  source={{ uri: imageUrls[mainImageIndex === 0 ? 1 : 0] }}
                  style={styles.smallImage}
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
        </View>
      </TouchableOpacity>

      {hasCaption && (
        <Text style={styles.caption}>{caption}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    gap: 8,
  },
  containerNoCaption: {
    gap: 0,
  },
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
  singleImage: {
    aspectRatio: 3/4,
    width: '100%',
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
  caption: {
    fontSize: 12,
    fontFamily: "Lato",
    color: "#5E6676",
    lineHeight: 17,
    paddingLeft: 13,
    paddingBottom: 10,
  },
  headerExtension: {
    width: '100%',
    paddingTop: Platform.OS === 'android' ? 10 : 0,
  },
});

export default PostContent;

