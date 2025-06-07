import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, PanResponder, Animated, Platform } from 'react-native';

interface PostContentProps {
  imageUrls?: string[];
  caption?: string;
  isSinglePost?: boolean;
}

// Scale down the dimensions from the full post view
const SMALL_IMAGE_SIZE = { width: 65, height: 86 }; // Half the size of full post view
const PADDING = 7; // Half the padding of full post view

const PostContent: React.FC<PostContentProps> = ({ imageUrls, caption, isSinglePost = false }) => {
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [position] = useState(new Animated.ValueXY({ x: PADDING, y: PADDING }));
  const hasCaption = caption && caption.trim().length > 0;

  // Basic validation - ensure we have at least one image
  if (!imageUrls || imageUrls.length === 0) return null;

  return (
    <View style={[
      styles.container,
      !hasCaption && styles.containerNoCaption
    ]}>
      {/* Main Image Container */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUrls[0] }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Small Image - Only show for double camera posts */}
        {!isSinglePost && imageUrls.length > 1 && (
          <View style={styles.smallImageContainer}>
            <TouchableOpacity onPress={() => setMainImageIndex(prev => prev === 0 ? 1 : 0)}>
              <Image
                source={{ uri: imageUrls[1] }}
                style={styles.smallImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>
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
    //paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    gap: 8,
  },
  containerNoCaption: {
    gap: 0,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 3/4,  // Maintain consistent aspect ratio
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  smallImageContainer: {
    position: 'absolute',
    top: PADDING,
    left: PADDING,
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
  },
  headerExtension: {
    width: '100%',
    paddingTop: Platform.OS === 'android' ? 10 : 0,
  },
});

export default PostContent;