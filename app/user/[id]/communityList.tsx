import { useState, useEffect, useRef } from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// Services
import { useDataProvider } from '@/contexts/DataProviderContext';
// GraphQL hooks
// Components
import CommunityList from '@/components/screens/connect/profiles/communitylist';
// Debug
import { debugRenders } from '@/utils/debug';
import { useLocalSearchParams } from 'expo-router';
import { useGetUserCommunities } from '@/hooks/graphql/communities/queries';

const CommunityListPage = () => {
  const { id } = useLocalSearchParams();
  const [renderCounter, setRenderCounter] = useState(0);
  // Queries
  const communitiesRef = useRef<any[] | null>(null);
  const hasFetchedCommunities = useRef(false);
  const { communityMembers, fetched: hasNewCommunitiesData } = useGetUserCommunities(Number(id), !hasFetchedCommunities.current);

  useEffect(() => {
    if (!hasNewCommunitiesData) {
      return;
    }
    if (hasNewCommunitiesData) {
      const filteredCommunities = communityMembers
        .filter((member: any) => member.status === 'ACCEPTED')
        .map((member: any) => member.community);
      communitiesRef.current = filteredCommunities;
      hasFetchedCommunities.current = true;
    }
    if (hasFetchedCommunities.current) {
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewCommunitiesData]);

  const loading = !hasFetchedCommunities.current;
  if (debugRenders && !loading) {
    console.log("Rendering CommunityListPage for user with ID:", id, "\n",
      "Community Members:", communitiesRef.current, "\n",
      "Render Counter:", renderCounter, "\n",
    );
  }

  return (
    <CommunityList 
      loading={loading}
      communities={communitiesRef.current ?? []}
    />
  );
};

export default AuthWrapper(CommunityListPage);