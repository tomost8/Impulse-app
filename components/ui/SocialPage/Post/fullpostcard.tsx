import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Header from './header';
import Content from './content';

interface FullPostCardProps {
  post?: {
    username?: string;
    timeAgo?: string;
    profileImage?: string;
    caption?: string;
    images?: string[];
    likeCount?: number;
    commentCount?: number;
  };
}

const FullPostCard: React.FC<FullPostCardProps> = ({ post = {} }) => {
  return (
    <View style={styles.container}>
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
          <TouchableOpacity style={styles.interactionButton}>
            <Image 
              source={require("@/assets/icons/heart.png")}
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
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 32,
  },
  interactionGroup: {
    flexDirection: 'row',
    alignItems: 'center',
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
});

export default FullPostCard;
