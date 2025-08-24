import { useLocalSearchParams } from 'expo-router';
import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// Services
import { useAuth } from '@/contexts/AuthContext';
import { useDataProvider } from '@/contexts/DataProviderContext';
// GraphQL hooks
import { useGetCommunity, useGetCommunityMembers } from '@/hooks/graphql/communities/queries';
import { useGetCommunityAnnouncements } from '@/hooks/graphql/notifications/queries';
// Components
import CommunityMainScreen from '@/components/screens/social/main/communitymainscreen';
// Debug
import { debugRenders } from '@/debug/utils';

const CommunityPage = () => {
  const { id } = useLocalSearchParams(); // communityId
  const { authToken } = useAuth();
  const { fetching, user } = useDataProvider();
  const [renderCounter, setRenderCounter] = useState(0);

  // Queries for Loading State
  const communityRef = useRef<any | null>(null);
  const hasFetchedCommunity = useRef(false);
  const { community, fetched: hasNewCommunityData } = useGetCommunity(Number(id), !hasFetchedCommunity.current);

  const membersRef = useRef<any[] | null>(null);
  const hasFetchedMembers = useRef(false);
  const { communityMembers, fetched: hasNewMembersData } = useGetCommunityMembers(Number(id), !hasFetchedMembers.current);

  const announcementsRef = useRef<any[] | null>(null);
  const hasFetchedAnnouncements = useRef(false);
  const { announcements, fetched: hasNewAnnouncementsData } = useGetCommunityAnnouncements(Number(id), authToken as string, !hasFetchedAnnouncements.current);

  useEffect(() => {
    if (!hasNewCommunityData && !hasNewMembersData && !hasNewAnnouncementsData) {
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
    if (hasNewAnnouncementsData) {
      announcementsRef.current = announcements;
      hasFetchedAnnouncements.current = true;
    }
    if (hasFetchedCommunity.current && hasFetchedMembers.current && hasFetchedAnnouncements.current) {
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewCommunityData, hasNewMembersData, hasNewAnnouncementsData]);

  const isAdmin = communityRef.current?.influencer?.id === user.id;

  // Debug
  const loading = fetching || !hasFetchedCommunity.current || !hasFetchedMembers.current || !hasFetchedAnnouncements.current;
  if (debugRenders && !loading) {
    console.log("Rendering CommunityScreen\n",
      "Community:", communityRef.current, "\n",
      "Members:", membersRef.current, "\n",
      "Announcements:", announcementsRef.current, "\n",
      "Render Counter:", renderCounter, "\n",
      "Is Admin:", isAdmin, "\n",
    );
  }

  return (
    <CommunityMainScreen 
      community={communityRef.current}
      members={membersRef.current || []}
      announcements={announcementsRef.current || []}
      isAdmin={isAdmin}
    />
  );
}

export default AuthWrapper(CommunityPage);