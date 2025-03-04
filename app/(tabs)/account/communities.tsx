import { useState, useEffect, useRef } from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useGetUserCommunities } from '@/hooks/graphql/communities/queries';
// Components
import CommunityScreen from '@/components/screens/profile/FriendsCommunityList/CommunityScreen';
// Debug
import { debugRenders, pageDisplay } from '@/utils/debug';
// Services
import { useUserInfo } from '@/services/UserContext';

const CommunitiesPage = () => {
  const { userId, authToken } = useUserInfo();
  const [renderCounter, setRenderCounter] = useState(0);

  const communitiesRef = useRef<any | null>(null);
  const hasFetchedCommunities = useRef(false);
  const { communityMembers, fetched: hasNewCommunitiesData } = useGetUserCommunities(userId as number, !hasFetchedCommunities.current);

  useEffect(() => {
    if (!hasNewCommunitiesData) {
      return;
    }
    if (hasNewCommunitiesData) {
      communitiesRef.current = communityMembers;
      hasFetchedCommunities.current = true;
    }
    if (hasFetchedCommunities.current) {
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewCommunitiesData]); 

  const loading = !hasFetchedCommunities.current;
  if (debugRenders && !loading) {
    console.log("Rendering CommunitiesPage\n",
      "Communities:", communitiesRef.current, "\n",
      "Render Counter:", renderCounter
    );
  }

  return (
    <CommunityScreen
      communities={communitiesRef.current}
      isLoading={loading}
    />
  );
}

export default AuthWrapper(CommunitiesPage);