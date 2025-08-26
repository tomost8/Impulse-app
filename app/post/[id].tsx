import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { useFocusEffect } from '@react-navigation/native';

import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/contexts/AuthWrapper';
// GraphQL hooks
import { useGetPost, useGetPostComments } from '@/hooks/graphql/posts/queries';
import { useCreateComment, useLikePost, useUnlikePost } from '@/hooks/graphql/posts/mutations';
// Components
import PostScreen from '@/components/screens/social/post';
// Debug
import { pageDisplay, debugRenders } from '@/debug/utils';
// Services
import { useAuth } from '@/contexts/AuthContext';
import { useDataRefetch } from '@/contexts/DataFetcher';

const PostPage = () => {
  const { id, isLiked } = useLocalSearchParams(); // postId
  const { authToken } = useAuth();
  const { refetchData, isRefetching } = useDataRefetch();
  const [renderCounter, setRenderCounter] = useState(0);
  const [refetchTrigger, setRefetchTrigger] = useState(0);
  
  // Local like state management
  const [localLikedState, setLocalLikedState] = useState<boolean | null>(null);
  const [localLikeCount, setLocalLikeCount] = useState<number | null>(null);
  
  // Use ref to track if we've initialized to prevent multiple initializations
  const hasInitialized = useRef(false);

  // Initialize local state from URL parameter only once
  useEffect(() => {
    if (!hasInitialized.current && localLikedState === null) {
      setLocalLikedState(isLiked === 'true');
      hasInitialized.current = true;
    }
  }, [isLiked, localLikedState]);

  // Queries with fetch flags for initial load control
  const postRef = useRef<any | null>(null);
  const hasFetchedPost = useRef(false);
  const { post, fetched: hasNewPostData } = useGetPost(Number(id), !hasFetchedPost.current);

  const commentsRef = useRef<any[] | null>(null);
  const hasFetchedComments = useRef(false);
  const { comments, fetched: hasNewCommentsData } = useGetPostComments(Number(id), !hasFetchedComments.current);

  // Force re-fetch when returning to this page
  useFocusEffect(
    React.useCallback(() => {
      // Reset fetch flags to force re-fetch when screen comes into focus
      hasFetchedPost.current = false;
      hasFetchedComments.current = false;
      setRefetchTrigger(prev => prev + 1);
      console.log("🔄 Fetching data - PostPage navigated to");
    }, [])
  );

  useEffect(() => {
    if (!hasNewPostData && !hasNewCommentsData) {
      return;
    }
    if (hasNewPostData) {
      // Update local like count from server only if it's different
      if (post?.likeCount !== null && post?.likeCount !== undefined && localLikeCount !== post.likeCount) {
        setLocalLikeCount(post.likeCount);
      }
      
      postRef.current = {
        ...post,
        // Use local like state if available, otherwise fall back to server or URL parameter
        liked: localLikedState !== null ? localLikedState : (post?.liked !== null ? post.liked : (isLiked === 'true')),
        likeCount: localLikeCount !== null ? localLikeCount : post?.likeCount
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
  }, [hasNewPostData, hasNewCommentsData, isLiked, post, comments, refetchTrigger, localLikedState, localLikeCount]);

  // Add like/unlike mutations
  const { likePost } = useLikePost();
  const { unlikePost } = useUnlikePost();
  const [isHandlingLike, setIsHandlingLike] = useState(false);
  const [isHandlingUnlike, setIsHandlingUnlike] = useState(false);

  // Add like/unlike handlers
  const handleLikePost = async () => {
    setIsHandlingLike(true);
    try {
      await likePost(Number(id));
      // Batch optimistic updates to reduce re-renders
      setLocalLikedState(true);
      setLocalLikeCount(prev => (prev || 0) + 1);
      // Reset fetch flags and trigger refetch after a delay
      setTimeout(() => {
        hasFetchedPost.current = false;
        setRefetchTrigger(prev => prev + 1);
      }, 100);
    } catch (error) {
      console.error("Error liking post:", error);
      // Revert optimistic update on error
      setLocalLikedState(false);
      setLocalLikeCount(prev => Math.max(0, (prev || 0) - 1));
    } finally {
      setIsHandlingLike(false);
    }
  }

  const handleUnlikePost = async () => {
    setIsHandlingUnlike(true);
    try {
      await unlikePost(Number(id));
      // Batch optimistic updates to reduce re-renders
      setLocalLikedState(false);
      setLocalLikeCount(prev => Math.max(0, (prev || 0) - 1));
      // Reset fetch flags and trigger refetch after a delay
      setTimeout(() => {
        hasFetchedPost.current = false;
        setRefetchTrigger(prev => prev + 1);
      }, 100);
    } catch (error) {
      console.error("Error unliking post:", error);
      // Revert optimistic update on error
      setLocalLikedState(true);
      setLocalLikeCount(prev => (prev || 0) + 1);
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
      const response = await createComment(input);
      console.log("Response:", response);
      // Reset fetch flags and trigger refetch after a delay
      setTimeout(() => {
        hasFetchedComments.current = false;
        setRefetchTrigger(prev => prev + 1);
      }, 100);
      // Clear input and hide reply field on success
      if (parentCommentId) {
        setReplyText('');
        setReplyingToCommentId(null);
      }
    } catch (error) {
      console.error("Error creating comment:", error);
    } finally {
      setIsHandlingCreateComment(false);
    }
  }

  // Debug
  const loading = !hasFetchedPost.current || !hasFetchedComments.current;
  if (debugRenders && !loading) {
    console.log(`📱 Rendering PostPage - ID: ${id}, Caption: "${postRef.current?.caption?.substring(0, 30)}...", Comments: ${commentsRef.current?.length || 0}, Liked: ${postRef.current?.liked}, LikeCount: ${postRef.current?.likeCount}`);
  }

  return (
    <PostScreen
      loading={loading}
      post={postRef.current}
      comments={commentsRef.current || []}
      createComment={handleCreateComment}
      onLike={handleLikePost}
      onUnlike={handleUnlikePost}
    />
  );
}

export default AuthWrapper(PostPage);