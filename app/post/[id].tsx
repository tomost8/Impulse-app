import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useGetPost, useGetPostComments } from '@/hooks/graphql/posts/queries';
import { useCreateComment, useLikePost, useUnlikePost } from '@/hooks/graphql/posts/mutations';
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

  const commentsRef = useRef<any | null>(null);
  const hasFetchedComments = useRef(false);
  const { comments, fetched: hasNewCommentsData } = useGetPostComments(Number(id), !hasFetchedComments.current);

  useEffect(() => {
    if (!hasNewPostData && !hasNewCommentsData) {
      return;
    }
    if (hasNewPostData) {
      postRef.current = {
        ...post,
        liked: isLiked === 'true' // Convert string param to boolean
      };
      hasFetchedPost.current = true;
    }
    if (hasNewCommentsData) {
      commentsRef.current = comments;
      hasFetchedComments.current = true;
    }
    if (hasFetchedPost.current && hasFetchedComments.current) {
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewPostData, hasNewCommentsData, isLiked]);

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

  // Add comment mutation
  const { createComment } = useCreateComment();
  const [isHandlingCreateComment, setIsHandlingCreateComment] = useState(false);
  const [replyingToCommentId, setReplyingToCommentId] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');

  const handleCreateComment = async (content: string, parentCommentId?: number) => {
    setIsHandlingCreateComment(true);
    try {
      const input = {
        post_id: Number(id),
        content: content,
        parent_comment_id: parentCommentId || null
      }
      const response = await createComment(input, authToken);
      console.log("Response:", response);
      // Clear input and hide reply field on success
      if (parentCommentId) {
        setReplyText('');
        setReplyingToCommentId(null);
      } else {
        setCommentText('');
      }
    } catch (error) {
      console.error("Error creating comment:", error);
    } finally {
      setIsHandlingCreateComment(false);
    }
  }

  const [commentText, setCommentText] = useState('');
  const [isCommentBoxVisible, setIsCommentBoxVisible] = useState(false);

  // Debug
  const loading = !hasFetchedPost.current;
  if (debugRenders && !loading) {
    console.log("Rendering PostPage\n",
      "Post:", postRef.current, "\n",
      "Comments:", commentsRef.current, "\n",
      "Render Counter:", renderCounter, "\n",
    );
  }

  return (
    <View>
      <View style={styles.checkbox}>
        <Image source={{ uri: postRef.current?.author.profile_picture }} style={styles.smallImage} />
        <Text style={styles.text}>{postRef.current?.author.first_name} {postRef.current?.author.last_name}</Text>
        <Text style={styles.text}>{postRef.current?.created_at}</Text>
      </View>
      <Image source={{ uri: postRef.current?.mediaUrl }} style={styles.smallImage}/>
      <View style={styles.container}>
        <Text style={styles.text}>{postRef.current?.caption}</Text>
      </View>
      <View>
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
        <TouchableOpacity 
          style={[styles.button]} 
          onPress={() => setIsCommentBoxVisible(!isCommentBoxVisible)}
        >
          <Text style={styles.text}>Comments ({commentsRef.current?.length})</Text>
        </TouchableOpacity>

        {isCommentBoxVisible && (
          <View style={styles.checkbox}>
            <TextInput
              style={styles.input}
              value={commentText}
              onChangeText={setCommentText}
              placeholder="Add a comment"
            />
            <TouchableOpacity 
              style={[styles.button, { backgroundColor: commentText.length === 0 ? '#ccc' : '#007bff' }]} 
              onPress={() => {
                handleCreateComment(commentText);
                setIsCommentBoxVisible(false);
              }}
              disabled={isHandlingCreateComment || commentText.length === 0}
            >
              <Text style={styles.text}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}

        {commentsRef.current?.map((comment: any) => (
          <View key={comment.id}>
            {/* Base comment */}
            <View style={styles.checkbox}>
              <Image 
                source={{ uri: comment.user.profile_picture }} 
                style={[styles.smallImage, { marginRight: 10 }]} 
              />
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.text}>{comment.user.username}</Text>
                  <Text style={[styles.text, { color: '#666' }]}>{comment.created_at}</Text>
                </View>
                <Text style={styles.text}>{comment.content}</Text>
                {/* Only show reply button for base-level comments (no parent_comment_id) */}
                {!comment.parent_comment_id && (
                  <TouchableOpacity 
                    style={[styles.button, { marginTop: 5 }]}
                    onPress={() => setReplyingToCommentId(replyingToCommentId === comment.id ? null : comment.id)}
                  >
                    <Text style={styles.text}>Reply</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {/* Reply input field */}
            {replyingToCommentId === comment.id && (
              <View style={[styles.checkbox, { marginLeft: 20 }]}>
                <TextInput
                  style={styles.input}
                  value={replyText}
                  onChangeText={setReplyText}
                  placeholder="Add a reply"
                />
                <TouchableOpacity 
                  style={[styles.button, { backgroundColor: replyText.length === 0 ? '#ccc' : '#007bff' }]} 
                  onPress={() => handleCreateComment(replyText, comment.id)}
                  disabled={isHandlingCreateComment || replyText.length === 0}
                >
                  <Text style={styles.text}>Submit Reply</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Show replies indented */}
            {comment.replies?.map((reply: any) => (
              <View key={reply.id} style={[styles.checkbox, { marginLeft: 20 }]}>
                <Image 
                  source={{ uri: reply.user.profile_picture }} 
                  style={[styles.smallImage, { marginRight: 10 }]} 
                />
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.text}>{reply.user.username}</Text>
                    <Text style={[styles.text, { color: '#666' }]}>{reply.created_at}</Text>
                  </View>
                  <Text style={styles.text}>{reply.content}</Text>
                </View>
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

export default AuthWrapper(PostPage);