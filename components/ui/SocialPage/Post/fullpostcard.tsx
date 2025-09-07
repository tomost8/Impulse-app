//import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Header from './header';
import Content from './content';
import MaterialCommunityIcons from '@expo/vector-icons/build/MaterialCommunityIcons';

interface FullPostCardProps {
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
  onLike?: () => void;
  onUnlike?: () => void;
  formattedDate?: string | null;
}

const FullPostCard: React.FC<FullPostCardProps> = ({ post = {}, onLike, onUnlike, formattedDate }) => {
  const handleLike = () => {
    if (post?.liked) {
      onUnlike?.();
    } else {
      onLike?.();
    }
  };
  return (
    <View style={styles.container}>
      {/* Date Section */}
      {formattedDate && (
        <View style={styles.dateSection}>
          <Text style={styles.dateText}>{formattedDate}</Text>
        </View>
      )}
      
      <Header 
        username={post.username}
        timeAgo={post.timeAgo}
        profileImage={post.profileImage}
      />
      <Content 
        caption={post.caption}
        imageUrls={post.images}
      />
      <View style={styles.interactionContainer}>
        <View style={styles.interactionGroup}>
          <TouchableOpacity 
            style={styles.interactionButton}
            onPress={handleLike}
          >
            {/* <Image 
              source={require("@/assets/icons/heart.png")}
              style={styles.icon}
            /> */}
            <MaterialCommunityIcons
              name={post?.liked ? "heart" : "heart-outline"}
              size={20}
              color={post?.liked ? "#FF0000" : "#000"} // ✅ Changes to red when liked
              style={styles.icon}
            />
            <Text style={styles.count}>{post.likeCount} like{post.likeCount === 1 ? '' : 's'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.interactionGroup}>
          <TouchableOpacity style={styles.interactionButton}>
            <Image 
              source={require("@/assets/icons/commenticon.png")}
              style={styles.icon}
            />
            <Text style={styles.count}>{post.commentCount} comment{post.commentCount === 1 ? '' : 's'}</Text>
          </TouchableOpacity>
        </View>

        {/* Category */}
        {post.category && (
          <View style={styles.categoryGroup}>
            <Text style={styles.categoryText}>{post.category}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  interactionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  interactionGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
  dateSection: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1',
  },
  dateText: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#242020',
    textAlign: 'center',
  },
  categoryGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    color: '#666666',
    fontWeight: '500',
  },
});

export default FullPostCard;
