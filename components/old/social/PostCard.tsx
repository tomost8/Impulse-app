import { View, Text, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import styles from '@/utils/testStyles';
import { useUserData } from '@/services/UserPreferencesContext';
import { getTimeAgo, convertUtcToLocal } from '@/utils/timezoneProcessing';


interface PostCardProps {
  post: {
    id: number;
    mediaUrls: string[];
    caption: string;
    author: {
      profile_picture: string;
      first_name: string;
      last_name: string;
    };
    created_at: string;
    expires_at: string;
    liked: boolean;
    likeCount: number;
    commentCount: number;
    post_targets: {
      id: number;
      target_id: number;
      target_type: string;
    }[];
  };
  handleLikePost: (postId: number) => Promise<void>;
  handleUnlikePost: (postId: number) => Promise<void>;
  updatePostLikeState: (postId: number, liked: boolean) => void;
  communityId?: number;
  communityName?: string;
}

export default function PostCard({ 
  post, 
  handleLikePost, 
  handleUnlikePost, 
  updatePostLikeState,
  communityId,
  communityName,
}: PostCardProps) {
  const { timezone } = useUserData();
  return (
    <View key={post.id} style={styles.section}>
      <TouchableOpacity onPress={() => router.push({
        pathname: "/post/[id]",
        params: { id: post.id, isLiked: post.liked.toString(), likeCount: post.likeCount }
      })}>
        <Image 
          source={{ uri: post.mediaUrls[0] }}
          style={styles.smallImage}
        />
      </TouchableOpacity>
      
      {communityId && (
        <TouchableOpacity style={styles.button} onPress={() => router.push(`/community/${communityId}`)}>
          <Text style={styles.text}>{communityName}</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.text}>{post.caption}</Text>
      <Image source={{ uri: post.author.profile_picture }} style={styles.smallImage} />
      <Text style={styles.text}>Name: {post.author.first_name} {post.author.last_name}</Text>
      <Text style={styles.text}>Created At: {getTimeAgo(post.created_at)}, Expires At: {convertUtcToLocal(post.expires_at, timezone)}</Text>
      
      <TouchableOpacity style={styles.button} onPress={() => router.push({
        pathname: "/post/[id]",
        params: { id: post.id, isLiked: post.liked.toString(), likeCount: post.likeCount }
      })}>
        <Text style={styles.text}>Comment Button ({post.commentCount})</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[
          styles.button,
          //post.liked && styles.likedButton
        ]} 
        onPress={() => {
          const newLikedState = !post.liked;
          updatePostLikeState(post.id, newLikedState);
          if (newLikedState) {
            handleLikePost(post.id);
          } else {
            handleUnlikePost(post.id);
          }
        }}
      >
        <Text style={styles.text}>
          {post.liked ? 'Unlike' : 'Like'} ({post.likeCount})
        </Text>
      </TouchableOpacity>
    </View>
  );
}