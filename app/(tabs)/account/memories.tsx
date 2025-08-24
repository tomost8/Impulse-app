import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
// Components
import Memories from '@/components/screens/profile/Memories';
// Debug
import { debugRenders } from '@/utils/debug';
// Services
import { useUserAuth } from '@/services/AuthContext';
import { useDataProvider } from '@/contexts/DataProviderContext';
import { useGetPostsByUserId } from '@/hooks/graphql/posts/queries';
import { getLocalDay } from '@/utils/timezoneProcessing';

const MemoriesPage = () => {
  const {fetching, user, timezone} = useDataProvider();
  const [renderCounter, setRenderCounter] = useState(0);

  const memoriesRef = useRef<any | null>(null); 
  const hasFetchedMemories = useRef(false);
  const { posts, fetched: hasNewMemoriesData } = useGetPostsByUserId(user.id, !hasFetchedMemories.current && !fetching);

  useEffect(() => {
    if (!hasNewMemoriesData) {
      return;
    }
    if (hasNewMemoriesData) {
      console.log('hasNewMemoriesData', posts);
      // Format the dates for each memory using existing getLocalDay
      const formattedPosts = posts.map((post: any) => ({
        ...post,
        date: getLocalDay(post.created_at, timezone)
      }));

      // Filter to keep only one post per day
      const uniqueDailyPosts = formattedPosts.reduce((acc: any[], post: any) => {
        // Check if we already have a post for this date
        const existingPost = acc.find(p => p.date === post.date);
        if (!existingPost) {
          acc.push(post);
        }
        return acc;
      }, [])
      .map((post: any) => ({
        id: post.id,
        date: post.date,
        mediaUrls: post.mediaUrls
      }));
      
      hasFetchedMemories.current = true;
      memoriesRef.current = uniqueDailyPosts;
    }
    if (hasFetchedMemories.current) {
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewMemoriesData]);

  const loading = !hasFetchedMemories.current;
  if (debugRenders && !loading) {
    console.log('MemoriesPage\n',
      "Render Counter:", renderCounter, "\n",
      "Memories:", memoriesRef.current, "\n",
    );
  }

  return (
    <Memories 
      loading={loading} 
      memories={memoriesRef.current} 
    />
  );
};


export default AuthWrapper(MemoriesPage);