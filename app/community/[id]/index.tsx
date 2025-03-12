import { useLocalSearchParams } from 'expo-router';
import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useGetCommunity, useGetCommunityMembers } from '@/hooks/graphql/communities/queries';
// Components
import CommunityMainScreen from '@/components/screens/social/communities/communitymainscreen';
import CommunityScreenOld from '@/components/old/social/community/CommunityScreen';
// Debug
import { pageDisplay, debugRenders } from '@/utils/debug';

const CommunityPage = (props: any) => {
  const { id } = useLocalSearchParams(); // communityId
  const { userId, authToken } = props;
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
      membersRef.current = communityMembers;
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

  if (pageDisplay) {
    return (
      <CommunityMainScreen 
        community={communityRef.current}
        members={membersRef.current || []}
        isAdmin={true} //isAdmin
      />
    );
  } else {
    return (
      <CommunityScreenOld 
        community={communityRef.current}
        members={membersRef.current || []}
        isAdmin={true} //isAdmin
      />
    );
  }
}

export default AuthWrapper(CommunityPage);