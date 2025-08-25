import { useState, useEffect, useRef } from 'react';
import AuthWrapper from '@/contexts/AuthWrapper';
// GraphQL hooks
// Components
import CommunityScreen from '@/components/screens/profile/FriendsCommunityList/CommunitiesList';
// Services
import { useAuth } from '@/contexts/AuthContext';
import { useDataProvider } from '@/contexts/DataProviderContext';
import { useDataRefetch } from '@/contexts/DataFetcher';
import { useDeleteCommunityMember } from '@/hooks/graphql/communities/mutations';

const CommunitiesPage = () => {
  const { authToken } = useAuth();
  const { fetching, user, communities } = useDataProvider();
  const { refetchData, isRefetching } = useDataRefetch();
  const [renderCounter, setRenderCounter] = useState(0);

   // Mutations: Cancel
const { deleteCommunityMember } = useDeleteCommunityMember();
const [isLeavingCommunity, setIsLeavingCommunity] = useState(false);
const handleLeaveCommunity = async (communityId: number) => {
  try {
    setIsLeavingCommunity(true);
    const response = await deleteCommunityMember(user.id, communityId);
    if (response.success) {
      console.log("Successfully left community.");
      // Refetch communities data to update the UI
      await refetchData({ communities: true });
      // Force re-render after refetch
      setRenderCounter(prev => prev + 1);
    } else {
      throw new Error("Response.success from deleteCommunityMember was false:" + response.errors);
    }
  } catch (error) {
    console.error('Error leaving community:', error);
  } finally {
    setIsLeavingCommunity(false);
  }
}

  const acceptedCommunities = communities.filter((community: any) => community.status === 'ACCEPTED').map((community: any) => community.community);
  
  // Debug logging to see communities data
  console.log("CommunitiesPage - Current communities:", communities);
  console.log("CommunitiesPage - Accepted communities:", acceptedCommunities);
  console.log("CommunitiesPage - Render counter:", renderCounter);
  
  const loading = fetching || isLeavingCommunity || isRefetching;

  return (
    <CommunityScreen
      loading={loading}
      communities={acceptedCommunities}
      handleLeaveCommunity={handleLeaveCommunity}
    />
  );
}

export default AuthWrapper(CommunitiesPage);