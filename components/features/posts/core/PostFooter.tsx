import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/build/MaterialCommunityIcons';
import { getIconByCategory, getLabelByCategory } from '@/utils/goals';

interface PostFooterProps {
  liked?: boolean;
  likeCount?: number;
  commentCount?: number;
  category?: string;
  onLike?: () => void;
  onUnlike?: () => void;
}

const PostFooter: React.FC<PostFooterProps> = ({
  liked,
  likeCount,
  commentCount,
  category,
  onLike,
  onUnlike
}) => {
  const handleLike = () => {
    if (liked) {
      onUnlike?.();
    } else {
      onLike?.();
    }
  };

  return (
    <View style={styles.interactionContainer}>
      <View style={styles.leftInteractions}>
        <TouchableOpacity 
          style={styles.interactionButton}
          onPress={handleLike}
        >
          <MaterialCommunityIcons
            name={liked ? "heart" : "heart-outline"}
            size={20}
            color={liked ? "#FF0000" : "#000"}
          />
          <Text style={styles.count}>{likeCount}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.interactionButton}>
          <Image 
            source={require("@/assets/icons/commenticon.png")}
            style={styles.icon}
          />
          <Text style={styles.count}>{commentCount}</Text>
        </TouchableOpacity>
      </View>

      {/* Category */}
      {category && getIconByCategory(category) && (
        <View style={styles.categoryGroup}>
          <Image 
            source={getIconByCategory(category)!}
            style={styles.categoryIcon}
          />
          <Text style={styles.categoryText}>{getLabelByCategory(category)}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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

export default PostFooter;
