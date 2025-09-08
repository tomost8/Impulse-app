// React imports
import { useState, useEffect, useRef } from 'react';
import { useLocalSearchParams } from 'expo-router';

// Contexts and wrappers
import { useAuth } from '@/contexts/AuthContext';
import AuthWrapper from '@/contexts/AuthWrapper';
import { useDataProvider } from '@/contexts/DataProviderContext';

// GraphQL hooks
import { useGetPostsByUserId } from '@/hooks/graphql/posts/queries';

// Utilities
import { getLocalDay } from '@/utils/timezoneProcessing';

// Components
import MemoriesScreen from '@/components/screens/account/MemoriesScreen';

// Debug utilities
import { debugRenders } from '@/debug/utils';

const MemoriesPage = () => {
  const {fetching, user, timezone} = useDataProvider();
  const [renderCounter, setRenderCounter] = useState(0);
  const { initialDate, categories } = useLocalSearchParams<{ initialDate?: string; categories?: string }>();
  const initialSelectedCategories = (categories || '').split(',').filter(Boolean);

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
      const postsWithLocalDates = posts.map((post: any) => ({
        ...post,
        date: getLocalDay(post.created_at, timezone)
      }));
      
      hasFetchedMemories.current = true;
      memoriesRef.current = postsWithLocalDates;
    }
    if (hasFetchedMemories.current) {
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewMemoriesData, timezone]);

  const loading = !hasFetchedMemories.current;
  if (debugRenders && !loading) {
    const postsLog = memoriesRef.current?.map((post: any, index: number) => {
      const processedPost = {
        id: post.id,
        caption: post.caption,
        date: post.date,
        mediaUrlsLength: post.mediaUrls?.length || 0,
        category: post.category
      };
      return `Post ${index + 1}: ${JSON.stringify(processedPost)}`;
    }).join('\n');
    
    console.log('MemoriesPage\n',
      "Render Counter:", renderCounter, "\n",
      "Posts data:\n" + postsLog, "\n",
    );
  }

  return (
    <MemoriesScreen 
      loading={loading} 
      memories={memoriesRef.current}
      initialDate={initialDate}
      initialSelectedCategories={initialSelectedCategories}
    />
  );
};


export default AuthWrapper(MemoriesPage);