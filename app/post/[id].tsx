import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { useFocusEffect } from '@react-navigation/native';

import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/contexts/AuthWrapper';
// GraphQL hooks
import { useGetPost, useGetPostComments } from '@/hooks/graphql/posts/queries';
import { useCreateComment, useLikePost, useUnlikePost } from '@/hooks/graphql/posts/mutations';
// Components
import PostScreen from '@/components/features/posts/PostScreen';
// Debug
import { debugRenders } from '@/debug/utils';
// Services
import { useAuth } from '@/contexts/AuthContext';
import { useDataProvider } from '@/contexts/DataProviderContext';
// Utilities
import { getLocalDay, getFormattedDate } from '@/utils/timezoneProcessing';

const PostPage = () => {
  const { id, isLiked } = useLocalSearchParams(); // postId
  const [renderCounter, setRenderCounter] = useState(0);
  const { timezone } = useDataProvider();
  
  // Use refs to track user's like actions (persistent across refetches)
  const userLikeAction = useRef<boolean | null>(null);
  const userLikeCount = useRef<number | null>(null);
  const hasInitialized = useRef(false);

  // Initialize user like action from URL parameter only once
  useEffect(() => {
    if (!hasInitialized.current) {
      userLikeAction.current = isLiked === 'true';
      hasInitialized.current = true;
    }
  }, [isLiked]);

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
      hasFetchedPost.current = false;
      hasFetchedComments.current = false;
      console.log("🔄 Fetching data - PostPage navigated to");
    }, [])
  );

  useEffect(() => {
    if (!hasNewPostData && !hasNewCommentsData) {
      return;
    }
    if (hasNewPostData) {
      // Update persistent like count from server only if we don't have a user-modified count
      if (post?.likeCount !== null && post?.likeCount !== undefined && userLikeCount.current === null) {
        userLikeCount.current = post.likeCount;
      }
      
      postRef.current = {
        ...post,
        // Use user's like action if available, otherwise fall back to server or URL parameter
        liked: userLikeAction.current !== null ? userLikeAction.current : (post?.liked !== null ? post.liked : (isLiked === 'true')),
        likeCount: userLikeCount.current !== null ? userLikeCount.current : post?.likeCount
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
  }, [hasNewPostData, hasNewCommentsData, post, comments, isLiked]);

  // Add like/unlike mutations
  const { likePost } = useLikePost();
  const { unlikePost } = useUnlikePost();

  // Add like/unlike handlers
  const handleLikePost = async () => {
    try {
      await likePost(Number(id));
      // Update persistent user action and like count immediately for UI feedback
      userLikeAction.current = true;
      userLikeCount.current = (userLikeCount.current || 0) + 1;
      if (postRef.current) {
        postRef.current.liked = true;
        postRef.current.likeCount = userLikeCount.current;
        setRenderCounter(prev => prev + 1);
      }
      // Reset fetch flags and trigger refetch after a delay
      setTimeout(() => {
        hasFetchedPost.current = false;
      }, 100);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  }

  const handleUnlikePost = async () => {
    try {
      await unlikePost(Number(id));
      // Update persistent user action and like count immediately for UI feedback
      userLikeAction.current = false;
      userLikeCount.current = Math.max(0, (userLikeCount.current || 0) - 1);
      if (postRef.current) {
        postRef.current.liked = false;
        postRef.current.likeCount = userLikeCount.current;
        setRenderCounter(prev => prev + 1);
      }
      // Reset fetch flags and trigger refetch after a delay
      setTimeout(() => {
        hasFetchedPost.current = false;
      }, 100);
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  }

  // Add comment mutation
  const { createComment } = useCreateComment();

  const handleCreateComment = async (content: string, parentCommentId?: number) => {
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
        setRenderCounter(prev => prev + 1);
      }, 100);
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  }

  // Debug
  const loading = !hasFetchedPost.current || !hasFetchedComments.current;
  if (debugRenders && !loading) {
    console.log(`📱 Rendering PostPage - ID: ${id}, Caption: "${postRef.current?.caption?.substring(0, 30)}...", Comments: ${commentsRef.current?.length || 0}, Liked: ${postRef.current?.liked}, LikeCount: ${postRef.current?.likeCount}`);
  }

  // Format the post date for display
  const formattedDate = postRef.current?.created_at ? getFormattedDate(postRef.current.created_at, timezone) : null;

  return (
    <PostScreen
      loading={loading}
      post={postRef.current}
      comments={commentsRef.current || []}
      createComment={handleCreateComment}
      onLike={handleLikePost}
      onUnlike={handleUnlikePost}
      formattedDate={formattedDate}
    />
  );
}

export default AuthWrapper(PostPage);