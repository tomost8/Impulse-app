import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PostHeader from './PostHeader';
import PostImage from './PostImage';
import PostFooter from './PostFooter';
import { PostImageRef } from './PostImage';

interface FullPostCardProps {
  isStory?: boolean;
  post?: {
    username?: string;
    //timeAgo?: string; // Not used currently but can be passed in if needed
    profileImage?: string;
    caption?: string;
    images?: string[];
    liked?: boolean;
    likeCount?: number;
    commentCount?: number;
    category?: string;
  };
  mainImageIndex?: number;
  onChangeMainImageIndex: (index: number) => void;
  onLike?: () => void;
  onUnlike?: () => void;
  formattedDate?: string | null;
  formattedTime?: string | null;
  onNext?: () => void;
  onPrev?: () => void;
}

const FullPostCard: React.FC<FullPostCardProps> = ({ isStory, post = {}, onLike, onUnlike, mainImageIndex, onChangeMainImageIndex, formattedDate, formattedTime, onNext, onPrev }) => {
  const [isSwapping, setIsSwapping] = useState(false);
  const [isStoryMode, setIsStoryMode] = useState(isStory || false);
  const styles = useStyles(isStoryMode);
  const imageRef = useRef<PostImageRef>(null);

  const handleImageSwap = async () => {
    if (post.images && post.images.length > 1 && !isSwapping) {
      setIsSwapping(true);
      // Small delay to prevent spam clicking
      await new Promise(resolve => setTimeout(resolve, 100));
      onChangeMainImageIndex(mainImageIndex === 0 ? 1 : 0);
      setIsSwapping(false);
    }
  };

  const handleNavigationPress = () => {
    if (isStoryMode) {
      // For stories, you might want to implement left/right tap logic here
      onNext?.();
    } else {
      onNext?.();
    }
  };

  const shouldShowCaption = post.caption && post.caption.trim().length > 0 && !isStoryMode;

  return (
    <View style={styles.container}>
      <PostHeader 
        isStoryMode={isStoryMode}
        formattedDate={formattedDate}
        formattedTime={formattedTime}
        category={post.category}
        username={post.username}
        profileImage={post.profileImage}
        hasImages={post.images && post.images.length > 0}
        imageRef={imageRef}
      />

      {post.images && post.images.length > 0 && (
        <View style={[styles.contentContainer, !shouldShowCaption && styles.contentContainerNoCaption]}>
          <PostImage
            ref={imageRef}
            imageUrls={post.images}
            mainImageIndex={mainImageIndex}
            onImageSwap={handleImageSwap}
            isSwapping={isSwapping}
            username={post.username}
            onPress={handleNavigationPress}
          />

          {shouldShowCaption && (
            <Text style={styles.caption}>{post.caption}</Text>
          )}
        </View>
      )}

      {!isStoryMode && (
        <PostFooter
          liked={post.liked}
          likeCount={post.likeCount}
          commentCount={post.commentCount}
          category={post.category}
          onLike={onLike}
          onUnlike={onUnlike}
        />
      )}
    </View>
  );
};
const useStyles = (isStoryMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isStoryMode ? "#000000" : "#FFFFFF",
    },
    contentContainer: {
      flex: 1,
      paddingTop: 0,
      gap: 8,
    },
    contentContainerNoCaption: {
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

export default FullPostCard;
