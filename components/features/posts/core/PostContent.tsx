import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PostImage, { PostImageRef } from './PostImage';

interface PostContentProps {
  imageUrls?: string[];
  caption?: string;
  isSinglePost?: boolean;
  mainImageIndex?: number;
  onImageSwap?: () => void;
  isSwapping?: boolean;
  isStoryMode?: boolean;
  onNext?: () => void;
  onPrev?: () => void;
  username?: string;
  imageRef?: React.RefObject<PostImageRef | null>;
}

const PostContent: React.FC<PostContentProps> = ({ 
  imageUrls, 
  caption, 
  isSinglePost = false, 
  mainImageIndex = 0,
  onImageSwap,
  isSwapping = false,
  isStoryMode = false,
  onNext,
  onPrev,
  username,
  imageRef,
}) => {

  const hasCaption = caption && caption.trim().length > 0;

  const handleNavigationPress = () => {
    if (isStoryMode) {
      // For stories, you might want to implement left/right tap logic here
      onNext?.();
    } else {
      onNext?.();
    }
  };

  if (!imageUrls || imageUrls.length === 0) return null;

  return (
    <View style={[styles.container, !hasCaption && styles.containerNoCaption]}>
      <PostImage
        ref={imageRef}
        imageUrls={imageUrls}
        mainImageIndex={mainImageIndex}
        isSinglePost={isSinglePost}
        onImageSwap={onImageSwap}
        isSwapping={isSwapping}
        username={username}
        onPress={handleNavigationPress}
      />

      {hasCaption && (
        <Text style={styles.caption}>{caption}</Text>
      )}
    </View>
  );
};

PostContent.displayName = 'PostContent';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    gap: 8,
  },
  containerNoCaption: {
    gap: 0,
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