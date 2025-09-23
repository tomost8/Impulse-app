// React imports
import { useState, useEffect, useRef } from 'react';

// Contexts and wrappers
import AuthWrapper from '@/contexts/AuthWrapper';
import { useDataProvider } from '@/contexts/DataProviderContext';

// GraphQL hooks
import { useGetPostsByUserId } from '@/hooks/graphql/posts/queries';

// Components
import AccountMainScreen from '@/components/screens/account/AccountMainScreen';

// Debug utilities
import { debugAccountPage } from '@/debug/utils';

const AccountPage = () => {
  const { user, communities, friends, fetching } = useDataProvider();
  const [renderCounter, setRenderCounter] = useState(0);

  const acceptedFriends = friends.filter((friend: any) => friend.status === 'ACCEPTED');

  /* memories/posts */
  const memoriesRef = useRef<any | null>(null);
  const hasFetchedMemories = useRef(false);
  const { posts, fetched: hasNewMemoriesData } = useGetPostsByUserId(user.id, !hasFetchedMemories.current && !fetching);

  useEffect(() => {
    if (!hasNewMemoriesData) {
      return;
    }
    if (hasNewMemoriesData) {
      // Sort posts by most recent first
      const sortedPosts = [...posts].sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      
      const processedPostsLog = sortedPosts.map((post: any, index: number) => {
        const processedPost = {
          id: post.id,
          caption: post.caption,
          created_at: post.created_at,
          mediaUrlsLength: post.mediaUrls?.length || 0,
          category: post.category
        };
        return `Post ${index + 1}: ${JSON.stringify(processedPost)}`;
      }).join('\n');
      if (debugAccountPage) {
        console.log('Posts data:\n' + processedPostsLog);
      }
      
      hasFetchedMemories.current = true;
      memoriesRef.current = sortedPosts;
    }
    if (hasFetchedMemories.current) {
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewMemoriesData]);

  if (debugAccountPage && !fetching) {
    console.log(`Rendering AccountPage - User: ${user?.username || 'Unknown'} (ID: ${user?.id}, Double Cam: ${user?.is_double_cam}, TZ: ${user?.timezone}) | Communities: ${communities.length} | Friends: ${acceptedFriends.length} | Memories: ${memoriesRef.current?.length || 0}`);
  }

  return <AccountMainScreen
    user={user} 
    isLoading={fetching} 
    numCommunities={communities.length}
    numFriends={acceptedFriends.length}
    memories={memoriesRef.current}
  />;
}

export default AuthWrapper(AccountPage);