import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, PanResponder, Animated } from 'react-native';

interface PostContentProps {
  imageUrls?: string[];
  caption?: string;
}

const CORNER_THRESHOLD = 100; // Distance from corner to trigger snap
const SMALL_IMAGE_SIZE = { width: 118, height: 160 }; // ~1/5 of main image
const PADDING = 10;

const PostContent: React.FC<PostContentProps> = ({ imageUrls, caption }) => {
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [position] = useState(new Animated.ValueXY({ x: PADDING, y: PADDING }));
  const [corner, setCorner] = useState<'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'>('topLeft');

  const hasCaption = caption && caption.trim().length > 0;

  const pan = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      position.setValue({ x: gesture.moveX, y: gesture.moveY });
    },
    onPanResponderRelease: (_, gesture) => {
      const { moveX, moveY } = gesture;
      const screenWidth = styles.image.width;
      const screenHeight = styles.image.height;
      
      // Determine closest corner
      const isRight = moveX > screenWidth / 2;
      const isBottom = moveY > screenHeight / 2;
      
      const newCorner = `${isBottom ? 'bottom' : 'top'}${isRight ? 'Right' : 'Left'}` as typeof corner;
      setCorner(newCorner);

      // Calculate target position for the chosen corner
      const targetX = isRight ? screenWidth - SMALL_IMAGE_SIZE.width - PADDING : PADDING;
      const targetY = isBottom ? screenHeight - SMALL_IMAGE_SIZE.height - PADDING : PADDING;

      Animated.spring(position, {
        toValue: { x: targetX, y: targetY },
        useNativeDriver: false,
      }).start();
    },
  });

  const handleImageSwap = () => {
    setMainImageIndex(prev => prev === 0 ? 1 : 0);
  };

  if (!imageUrls || imageUrls.length < 2) return null;

  return (
    <View style={[styles.container, !hasCaption && styles.containerNoCaption]}>
      {/* Main Background Image */}
      <Image
        source={{ uri: imageUrls[mainImageIndex] }}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Draggable Small Image */}
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

      {hasCaption && (
        <Text style={styles.caption}>{caption}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  containerNoCaption: {
    gap: 0,
  },
  image: {
    width: "100%",
    height: 472,
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
  caption: {
    fontSize: 12,
    fontFamily: "Lato",
    color: "#5E6676",
    lineHeight: 17,
    paddingLeft: 13,
    paddingBottom: 10,
  },
});

export default PostContent;

