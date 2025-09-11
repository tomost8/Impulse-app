import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { useFocusEffect } from '@react-navigation/native';

import {useEffect, useRef} from 'react';
import AuthWrapper from '@/contexts/AuthWrapper';
// GraphQL hooks
import { useGetPostsFromSameDayAsPost } from '@/hooks/graphql/posts/queries';
// Components
import StoryScreen from '@/components/features/memories/StoryScreen';
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
  console.log("👋🏻 Welcome to Memory Page ---------------------------");
  const { id } = useLocalSearchParams(); // postId
  console.log("🆔 MemoryPage id param:", id);
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
    console.log("🔍 Found post index in postsOfDay:", idx);
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
    console.log(`📱 Rendering MemoryPage - ID: ${id}, Caption: "${postRef.current?.caption?.substring(0, 30)}...", Liked: ${postRef.current?.liked}, LikeCount: ${postRef.current?.likeCount}`);
  }

  return (
    <StoryScreen
      loading={loading}
      posts={postsOfDay}
    />
  );
}

export default AuthWrapper(MemoryPage);
