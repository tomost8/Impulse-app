import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { useFocusEffect } from '@react-navigation/native';

import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/contexts/AuthWrapper';
// GraphQL hooks
import { useGetPost, useGetPostComments } from '@/hooks/graphql/posts/queries';
// Components
import StoryScreen from '@/components/features/memories/StoryScreen';
// Debug
import { debugRenders } from '@/debug/utils';
// Services
import { useDataProvider } from '@/contexts/DataProviderContext';
// Utilities
import { getFormattedDate, convertUtcToLocal, } from '@/utils/timezoneProcessing';
import { useMemoriesNav } from '@/contexts/MemoriesContext';

const MemoryPage = () => {
  console.log("👋🏻 Welcome to Memory Page ---------------------------");
  const { id, isLiked } = useLocalSearchParams(); // postId
  const [renderCounter, setRenderCounter] = useState(0);
  const { timezone } = useDataProvider();
  
  // Use refs to track user's like actions (persistent across refetches)
  const userLikeAction = useRef<boolean | null>(null);
  const userLikeCount = useRef<number | null>(null);
  const hasInitialized = useRef(false);
  const { session, setIndex } = useMemoriesNav();

  useEffect(() => {
    if (!session?.ids?.length) return;
    const idx = session.ids.indexOf(Number(id));
    if (idx >= 0) setIndex(idx);
  }, [session?.ids?.join(','), id]);

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
      console.log("🔄 Fetching data - MemoryPage navigated to");
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

  // Debug
  const loading = !hasFetchedPost.current || !hasFetchedComments.current;
  if (debugRenders && !loading) {
    console.log(`📱 Rendering MemoryPage - ID: ${id}, Caption: "${postRef.current?.caption?.substring(0, 30)}...", Comments: ${commentsRef.current?.length || 0}, Liked: ${postRef.current?.liked}, LikeCount: ${postRef.current?.likeCount}`);
  }

  // Format the post date for display
  const formattedDate = postRef.current?.created_at ? getFormattedDate(postRef.current.created_at, timezone) : null;
  const formattedTime = postRef.current?.created_at ? convertUtcToLocal(postRef.current.created_at, timezone) : null;

  return (
    <StoryScreen
      loading={loading}
      post={postRef.current}
      formattedDate={formattedDate}
      formattedTime={formattedTime}
    />
  );
}

export default AuthWrapper(MemoryPage);
