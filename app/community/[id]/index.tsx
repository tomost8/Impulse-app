import { useLocalSearchParams } from 'expo-router';
import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// Services
import { useUserInfo } from '@/services/UserContext';
// GraphQL hooks
import { useGetCommunity, useGetCommunityMembers } from '@/hooks/graphql/communities/queries';
// Components
import CommunityMainScreen from '@/components/screens/social/main/communitymainscreen';
// Debug
import { debugRenders } from '@/utils/debug';

const CommunityPage = () => {
  const { id } = useLocalSearchParams(); // communityId
  const { userId } = useUserInfo();
  const [renderCounter, setRenderCounter] = useState(0);

  // Queries for Loading State
  const communityRef = useRef<any | null>(null);
  const hasFetchedCommunity = useRef(false);
  const { community, fetched: hasNewCommunityData } = useGetCommunity(Number(id), !hasFetchedCommunity.current);

  const membersRef = useRef<any[] | null>(null);
  const hasFetchedMembers = useRef(false);
  const { communityMembers, fetched: hasNewMembersData } = useGetCommunityMembers(Number(id), !hasFetchedMembers.current);

  useEffect(() => {
    if (!hasNewCommunityData && !hasNewMembersData) {
      return;
    }
    if (hasNewCommunityData) {
      communityRef.current = community;
      hasFetchedCommunity.current = true;
    }
    if (hasNewMembersData) {
      let filteredMembers = communityMembers
        .filter((member: any) => member.status === "ACCEPTED")
        .map((member: any) => member.user);
      membersRef.current = filteredMembers;
      hasFetchedMembers.current = true;
    }
    if (hasFetchedCommunity.current && hasFetchedMembers.current) {
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewCommunityData, hasNewMembersData]);

  const isAdmin = communityRef.current?.influencer?.id === userId;

  // Debug
  const loading = !hasFetchedCommunity.current || !hasFetchedMembers.current;
  if (debugRenders && !loading) {
    console.log("Rendering CommunityScreen\n",
      "Community:", communityRef.current, "\n",
      "Members:", membersRef.current, "\n",
      "Render Counter:", renderCounter, "\n",
      "Is Admin:", isAdmin, "\n",
    );
  }

  return (
    <CommunityMainScreen 
      community={communityRef.current}
      members={membersRef.current || []}
      isAdmin={isAdmin}
    />
  );
}

export default AuthWrapper(CommunityPage);