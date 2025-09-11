import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { useFocusEffect } from '@react-navigation/native';

import {useEffect, useRef} from 'react';
import AuthWrapper from '@/contexts/AuthWrapper';
// GraphQL hooks
import { useGetPostsFromSameDayAsPost } from '@/hooks/graphql/posts/queries';
// Components
import MemoryStoryScreen from '@/components/screens/social/MemoryStoryScreen';
// Debug
import { debugRenders } from '@/debug/utils';
import { useMemoriesNav } from '@/contexts/MemoriesContext';

type Post = {
  id: string;
  mediaUrls?: string[];
  caption?: string;
  author?: {
    profile_picture?: string;
    username?: string;
  };
  created_at?: string;
  commentCount?: number;
  likeCount?: number;
  liked?: boolean;
  community?: {
    id: number;
    name: string;
  };
};

const MemoryPage = () => {
  const { id } = useLocalSearchParams(); // postId
  const hasFetchedPost = useRef(false);
  
  const { posts: postsOfDay, loading } = useGetPostsFromSameDayAsPost(Number(id));
  const postRef = useRef<Post | null>(null);

  const { session, setIndex } = useMemoriesNav();

  useEffect(() => {
    if (!session?.ids?.length) return;
    const idx = session.ids.indexOf(Number(id));
    if (idx >= 0) setIndex(idx);
  }, [session?.ids?.join(','), id]);

  useEffect(() => {
    if (!postsOfDay || postsOfDay.length === 0) return;

    const idx = postsOfDay.findIndex((p: Post) => Number(p.id) === Number(id));
    if (idx >= 0) {
      setIndex(idx);
      postRef.current = postsOfDay[idx]; // ✅ assign to ref
    }
  }, [postsOfDay, id, setIndex]);

  // Force re-fetch when returning to this page
  useFocusEffect(
    React.useCallback(() => {
      hasFetchedPost.current = false;
      console.log("🔄 Fetching data - MemoryPage navigated to");
    }, [])
  );

  // Debug
  if (debugRenders && !loading) {
    const currentPost = postsOfDay?.find((p: Post) => Number(p.id) === Number(id));
    const date = currentPost?.created_at ? new Date(currentPost.created_at).toISOString() : 'No date';
    console.log(`📱 Rendering MemoryPage - ID: ${id}, Date: ${date}, Posts Count: ${postsOfDay?.length || 0}`);
  }

  return (
    <MemoryStoryScreen
      loading={loading}
      posts={postsOfDay}
    />
  );
}

export default AuthWrapper(MemoryPage);
