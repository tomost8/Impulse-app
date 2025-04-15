import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface PostContentProps {
  imageUrls?: string[];
  caption?: string;
}

const PostContent: React.FC<PostContentProps> = ({ imageUrls, caption }) => {
  const hasCaption = caption && caption.trim().length > 0;
  
  return (
    <View style={[
      styles.container,
      !hasCaption && styles.containerNoCaption
    ]}>
      {imageUrls?.map((imageUrl, index) => (
        <Image
          key={index}
          source={typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl}
          style={styles.image}
          resizeMode="cover"
        />
      ))}
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
    height: 472, // Adjusted height to match Figma specs
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
