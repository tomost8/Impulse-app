import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import MaterialCommunityIcons from '@expo/vector-icons/build/MaterialCommunityIcons';
import { getLabelByCategory, getIconByCategory } from '@/utils/goals';
import { router } from 'expo-router';

interface FullPostCardProps {
  isStory?: boolean;
  post?: {
    username?: string;
    timeAgo?: string;
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
  const [isStoryVisible, setIsStoryVisible] = useState(isStory || false);
  const styles = useStyles(isStoryVisible);

  const handleLike = () => {
    if (post?.liked) {
      onUnlike?.();
    } else {
      onLike?.();
    }
  };

  const handleImageSwap = async () => {
    if (post.images && post.images.length > 1 && !isSwapping) {
      setIsSwapping(true);
      
      // Small delay to prevent spam clicking
      await new Promise(resolve => setTimeout(resolve, 100));
      
      onChangeMainImageIndex(mainImageIndex === 0 ? 1 : 0);
      
      // Wait for crossfade animation to complete
      await new Promise(resolve => setTimeout(resolve, 200));
      setIsSwapping(false);
    }
  };
  return (
    <View style={styles.container}>
      {/* Date Section */}
      {formattedDate && (
        <View style={styles.headerContent}>
          <View style={styles.dateSection}>
            <Text style={styles.dateText}>{formattedDate}</Text>
            {isStoryVisible && <Text style={styles.timeText}>{`${post.category} • ${formattedTime}`}</Text>}
          </View>
          {isStoryVisible && <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
            <MaterialCommunityIcons name="close-thick" size={20} color="white" />
          </TouchableOpacity>}
        </View>
      )}
      {!isStoryVisible && <PostHeader 
        username={post.username}
        profileImage={post.profileImage}
        imageUrls={post.images}
        mainImageIndex={mainImageIndex}
      />}

      <PostContent 
        caption={post.caption}
        imageUrls={post.images}
        mainImageIndex={mainImageIndex}
        onImageSwap={handleImageSwap}
        isSwapping={isSwapping}
        isStoryVisible={isStoryVisible}
        onNext={onNext}
        onPrev={onPrev}
      />

      {!isStoryVisible && <View style={styles.interactionContainer}>
        <View style={styles.leftInteractions}>
          <TouchableOpacity 
            style={styles.interactionButton}
            onPress={handleLike}
          >
            <MaterialCommunityIcons
              name={post?.liked ? "heart" : "heart-outline"}
              size={20}
              color={post?.liked ? "#FF0000" : "#000"}
            />
            <Text style={styles.count}>{post.likeCount}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.interactionButton}>
            <Image 
              source={require("@/assets/icons/commenticon.png")}
              style={styles.icon}
            />
            <Text style={styles.count}>{post.commentCount}</Text>
          </TouchableOpacity>
        </View>

        {/* Category */}
        {post.category && getIconByCategory(post.category) && (
          <View style={styles.categoryGroup}>
            <Image 
              source={getIconByCategory(post.category)!}
              style={styles.categoryIcon}
            />
            <Text style={styles.categoryText}>{getLabelByCategory(post.category)}</Text>
          </View>
        )}
      </View>}
    </View>
  );
};
const useStyles = (isStoryVisible: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isStoryVisible ? "#000000" : "#FFFFFF",
    },
    interactionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    leftInteractions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 20,
    },
    interactionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    icon: {
      width: 20,
      height: 20,
      resizeMode: 'contain',
    },
    count: {
      fontSize: 14,
      fontFamily: 'Open Sans',
      color: '#242020',
    },
    headerContent: { 
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: isStoryVisible? 'space-between' : 'center',
      backgroundColor: isStoryVisible? '#000' : '#FFFFFF',
      paddingVertical: 8,
    },
    dateSection: {
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    dateText: {
      fontSize: 16,
      fontFamily: 'Poppins',
      fontWeight: '600',
      color: isStoryVisible ? '"#fff' : '#DE728D',
      textAlign: isStoryVisible ? 'left' : 'center',
    },
    timeText: { 
      fontSize: 12,
      fontFamily: "Poppins",
      fontWeight: "500",
      color: "#fff",
      marginTop: 2,
    },
    closeButton: {
      marginRight: 24
    },
    categoryGroup: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    categoryIcon: {
      width: 16,
      height: 16,
      resizeMode: 'contain',
    },
    categoryText: {
      fontSize: 14,
      fontFamily: 'Open Sans',
      color: '#DE728D',
      fontWeight: '500',
    },
  });

export default FullPostCard;
