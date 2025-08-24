import { useState, useEffect, useRef } from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
// Components
import CommunityScreen from '@/components/screens/profile/FriendsCommunityList/CommunitiesList';
// Services
import { useDataProvider } from '@/contexts/DataProviderContext';
import { useDeleteCommunityMember } from '@/hooks/graphql/communities/mutations';

const CommunitiesPage = () => {
  const { fetching, user, communities } = useDataProvider();

  // Mutations
  const { deleteCommunityMember } = useDeleteCommunityMember();
  const [isLeavingCommunity, setIsLeavingCommunity] = useState(false);
  const handleLeaveCommunity = async (communityId: number) => {
    try {
      setIsLeavingCommunity(true);
      const response = await deleteCommunityMember(user.id, communityId);
      if (response.success) {
        console.log("Successfully left community.");
      } else {
        throw new Error("Response.success from deleteCommunityMember was false:" + response.errors);
      }
      setIsLeavingCommunity(false);
    } catch (error) {
      console.error('Error leaving community:', error);
    } finally {
      setIsLeavingCommunity(false);
    }
  }

  const acceptedCommunities = communities.filter((community: any) => community.status === 'ACCEPTED').map((community: any) => community.community);
  
  const loading = fetching || isLeavingCommunity;

  return (
    <CommunityScreen
      loading={loading}
      communities={acceptedCommunities}
      handleLeaveCommunity={handleLeaveCommunity}
    />
  );
}

export default AuthWrapper(CommunitiesPage);