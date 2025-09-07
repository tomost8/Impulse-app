import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, PanResponder, Animated, Platform, StatusBar, Dimensions } from 'react-native';

interface PostContentProps {
  imageUrls?: string[];
  caption?: string;
  isSinglePost?: boolean;
}

const CORNER_THRESHOLD = 100; // Distance from corner to trigger snap
const SMALL_IMAGE_SIZE = { width: 118, height: 160 }; // ~1/5 of main image
const PADDING = 10;

const PostContent: React.FC<PostContentProps> = ({ imageUrls, caption, isSinglePost = false }) => {
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [position] = useState(new Animated.ValueXY({ x: PADDING, y: PADDING }));
  const [corner, setCorner] = useState<'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'>('topLeft');

  const hasCaption = caption && caption.trim().length > 0;

  const handleImageSwap = () => {
    // Toggle mainImageIndex between 0 and 1 to swap images
    setMainImageIndex(prev => prev === 0 ? 1 : 0);
  };

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

  if (!imageUrls || imageUrls.length === 0) return null;

  return (
    <View style={[styles.container, !hasCaption && styles.containerNoCaption]}>
      {/* Main Image Container */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUrls[mainImageIndex] }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Small Image - Only show for double camera posts */}
        {!isSinglePost && imageUrls.length > 1 && (
          <Animated.View
            style={[
              styles.smallImageContainer,
              { transform: position.getTranslateTransform() }
            ]}
            {...pan.panHandlers}
          >
            <TouchableOpacity onPress={handleImageSwap}>
              <Image
                source={{ uri: imageUrls[mainImageIndex === 0 ? 1 : 0] }}
                style={styles.smallImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>

      {hasCaption && (
        <Text style={styles.caption}>{caption}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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

