import { useState, useEffect, useRef } from 'react';

import AuthWrapper from '@/contexts/AuthWrapper';
import { useDataProvider } from '@/contexts/DataProviderContext';
// GraphQL hooks
import { useGetPostsByUserId } from '@/hooks/graphql/posts/queries';
// Components
import AccountMainScreen from '@/components/screens/account/AccountMainScreen';

const DEBUG_ACCOUNT_PAGE = false;

const AccountPage = () => {
  const { user, communities, friends, fetching, challenges } = useDataProvider();
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
    }).join('\n  - ');
    if (DEBUG_ACCOUNT_PAGE) {
      console.log('Posts data:\n  - ' + processedPostsLog);
    }
    
    hasFetchedMemories.current = true;
    memoriesRef.current = sortedPosts;
    setRenderCounter(prev => prev + 1);
  }, [hasNewMemoriesData]);

  // Debug logging for challenges
  if (DEBUG_ACCOUNT_PAGE && challenges) {
    const activeChallengesLog = challenges.activeChallenges?.map((challenge: any, index: number) => {
      const processedChallenge = {
        id: challenge.userChallenge.id,
        length: challenge.userChallenge.challenge.length,
        category: challenge.userChallenge.challenge.category,
        status: challenge.userChallenge.status,
        badgesEarned: challenge.badgesEarned?.length || 0
      };
      return `Active ${index + 1}: ${JSON.stringify(processedChallenge)}`;
    }).join('\n  - ') || 'None';
    
    const completedChallengesLog = challenges.completedChallenges?.map((challenge: any, index: number) => {
      const processedChallenge = {
        id: challenge.userChallenge.id,
        length: challenge.userChallenge.challenge.length,
        category: challenge.userChallenge.challenge.category,
        status: challenge.userChallenge.status,
        badgeLevel: challenge.userChallenge.badge_level,
        badgesEarned: challenge.badgesEarned?.length || 0
      };
      return `Completed ${index + 1}: ${JSON.stringify(processedChallenge)}`;
    }).join('\n  - ') || 'None';
    
    console.log(`Challenges data:\n  - ${activeChallengesLog}\n  - ${completedChallengesLog}`);
  }

  // Calculate badge info from completed challenges only
  const badgeInfo = challenges?.completedChallenges
    ?.filter((challenge: any) => (challenge.badgesEarned?.length || 0) > 0)
    ?.map((challenge: any) => ({
      id: challenge.userChallenge.id,
      length: challenge.userChallenge.challenge.length,
      category: challenge.userChallenge.challenge.category,
      badgeLevel: challenge.userChallenge.badge_level
    })) || [];

  if (DEBUG_ACCOUNT_PAGE && !fetching) {
    console.log(
      `Rendering AccountPage:` +
      `\n  - User: ${user?.username || 'Unknown'} (ID: ${user?.id}, Double Cam: ${user?.is_double_cam}, TZ: ${user?.timezone})` +
      ` | Friends: ${acceptedFriends.length} | Communities: ${communities.length} | Memories: ${memoriesRef.current?.length || 0}` +
      `\n  - BadgeInfo: ${JSON.stringify(badgeInfo)}`
    );
  }

  return <AccountMainScreen
    user={user} 
    isLoading={fetching} 
    numCommunities={communities.length}
    numFriends={acceptedFriends.length}
    badgeInfo={badgeInfo}
    memories={memoriesRef.current}
  />;
}

export default AuthWrapper(AccountPage);