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
    image?: string;
    likes?: number;
    comments?: number;
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
        image={post.image}
      />
      <View style={styles.interactionContainer}>
        <View style={styles.interactionGroup}>
          <TouchableOpacity style={styles.interactionButton}>
            <Image 
              source={require("@/assets/icons/heart.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
          <Text style={styles.count}>{post.likes || 67} likes</Text>
        </View>

        <View style={styles.interactionGroup}>
          <TouchableOpacity style={styles.interactionButton}>
            <Image 
              source={require("@/assets/icons/commenticon.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
          <Text style={styles.count}>{post.comments || 10} comments</Text>
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
    width: 350,
    height: 19.7,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 32.9,
    alignSelf: 'center',
    marginTop: 14,
  },
  interactionGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  interactionButton: {
    padding: 4,
  },
  icon: {
    width: 13.16,
    height: 13.16,
    resizeMode: 'contain',
  },
  count: {
    fontSize: 12,
    fontFamily: 'Open Sans',
    color: '#000000',
  },
});

export default FullPostCard;
