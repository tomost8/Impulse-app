import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

interface PostContentProps {
  imageUrls?: string[];
  caption?: string;
}

// Scale down the dimensions from the full post view
const SMALL_IMAGE_SIZE = { width: 65, height: 86 }; // Half the size of full post view
const PADDING = 7; // Half the padding of full post view

const PostContent: React.FC<PostContentProps> = ({ imageUrls, caption }) => {
  const hasCaption = caption && caption.trim().length > 0;
  
  if (!imageUrls || imageUrls.length < 2) return null; // Fix This

  return (
    <View style={[
      styles.container,
      !hasCaption && styles.containerNoCaption
    ]}>
      {/* Main Background Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUrls[0] }}
          style={styles.image}
        />

        {/* Small Overlay Image */}
        <View style={styles.smallImageContainer}>
          <Image
            source={{ uri: imageUrls[1] }}
            style={styles.smallImage}
          />
        </View>
      </View>

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
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: "100%",
    height: 239,
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
});

export default PostContent;