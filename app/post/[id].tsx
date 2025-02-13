import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useGetPost } from '@/hooks/graphql/posts/queries';
import { useLikePost, useUnlikePost } from '@/hooks/graphql/posts/mutations';
// Components
import styles from '@/constants/testStyles';
// Debug
import { debugRenders } from '@/constants/debug';

const PostPage = (props: any) => {
  const { id, isLiked } = useLocalSearchParams(); // postId
  const { userId, authToken } = props;
  const [renderCounter, setRenderCounter] = useState(0);

  // Queries for Loading State
  const postRef = useRef<any | null>(null);
  const hasFetchedPost = useRef(false);
  const { post, fetched: hasNewPostData } = useGetPost(Number(id), !hasFetchedPost.current);

  useEffect(() => {
    if (!hasNewPostData) {
      return;
    }
    if (hasNewPostData) {
      postRef.current = {
        ...post,
        liked: isLiked === 'true' // Convert string param to boolean
      };
      hasFetchedPost.current = true;
    }
    if (hasFetchedPost.current) {
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewPostData, isLiked]);

  // Add like/unlike mutations
  const { likePost } = useLikePost();
  const { unlikePost } = useUnlikePost();
  const [isHandlingLike, setIsHandlingLike] = useState(false);
  const [isHandlingUnlike, setIsHandlingUnlike] = useState(false);

  // Add function to update local post state
  const updatePostLikeState = (liked: boolean) => {
    if (postRef.current) {
      postRef.current = {
        ...postRef.current,
        liked: liked,
        likeCount: liked ? postRef.current.likeCount + 1 : postRef.current.likeCount - 1
      };
      setRenderCounter(prev => prev + 1);
    }
  };

  // Add like/unlike handlers
  const handleLikePost = async () => {
    setIsHandlingLike(true);
    try {
      await likePost(Number(id), authToken);
      // No need to refetch - state already updated optimistically
    } catch (error) {
      console.error("Error liking post:", error);
      // Revert optimistic update on error
      updatePostLikeState(false);
    } finally {
      setIsHandlingLike(false);
    }
  }

  const handleUnlikePost = async () => {
    setIsHandlingUnlike(true);
    try {
      await unlikePost(Number(id), authToken);
      // No need to refetch - state already updated optimistically
    } catch (error) {
      console.error("Error unliking post:", error);
      // Revert optimistic update on error
      updatePostLikeState(true);
    } finally {
      setIsHandlingUnlike(false);
    }
  }

  // Debug
  const loading = !hasFetchedPost.current;
  if (debugRenders && !loading) {
    console.log("Rendering PostPage\n",
      "Post:", postRef.current, "\n",
      "Render Counter:", renderCounter, "\n",
    );
  }

  return (
    <View>
      <View style={styles.container}>
        <Image source={{ uri: postRef.current?.author.profile_picture }} style={styles.smallImage} />
        <Text style={styles.text}>{postRef.current?.author.first_name} {postRef.current?.author.last_name}</Text>
        <Text style={styles.text}>{postRef.current?.created_at}</Text>
      </View>
      <Image source={{ uri: postRef.current?.mediaUrl }} style={styles.smallImage}/>
      <View style={styles.container}>
        <Text style={styles.text}>{postRef.current?.caption}</Text>
      </View>
      <View style={styles.container}>
        <TouchableOpacity 
          style={[styles.button]} 
          onPress={() => {
            const newLikedState = !postRef.current?.liked;
            updatePostLikeState(newLikedState);
            if (newLikedState) {
              handleLikePost();
            } else {
              handleUnlikePost();
            }
          }}
          disabled={isHandlingLike || isHandlingUnlike}
        >
          <Text style={styles.text}>
            {postRef.current?.liked ? 'Unlike' : 'Like'} ({postRef.current?.likeCount})
          </Text>
        </TouchableOpacity>
        <Text style={styles.text}>Comment Count + Icon: {postRef.current?.comments}</Text>
        <Text style={styles.text}>Actual Comments Section</Text>
      </View>
    </View>
  );
}

export default AuthWrapper(PostPage);