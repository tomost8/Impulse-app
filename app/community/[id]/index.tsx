import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import {useState, useEffect, useRef} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AuthWrapper from '@/contexts/AuthWrapper';
// Services
import { useAuth } from '@/contexts/AuthContext';
import { useDataProvider } from '@/contexts/DataProviderContext';
// GraphQL hooks
import { useGetCommunity, useGetCommunityMembers } from '@/hooks/graphql/communities/queries';
import { useGetCommunityAnnouncements } from '@/hooks/graphql/notifications/queries';
// Components
import CommunityMainScreen from '@/components/screens/social/main/communitymainscreen';
// Debug
import { debugCommunityPage } from '@/debug/utils';

const CommunityPage = () => {
  const { id } = useLocalSearchParams(); // communityId
  const { authToken } = useAuth();
  const { fetching, user } = useDataProvider();
  const [renderCounter, setRenderCounter] = useState(0);

  // Queries with fetch flags for initial load control
  const communityRef = useRef<any | null>(null);
  const hasFetchedCommunity = useRef(false);
  const { community, fetched: hasNewCommunityData } = useGetCommunity(Number(id), !hasFetchedCommunity.current);

  const membersRef = useRef<any[] | null>(null);
  const hasFetchedMembers = useRef(false);
  const { communityMembers, fetched: hasNewMembersData } = useGetCommunityMembers(Number(id), !hasFetchedMembers.current);

  const announcementsRef = useRef<any[] | null>(null);
  const hasFetchedAnnouncements = useRef(false);
  const { announcements, fetched: hasNewAnnouncementsData } = useGetCommunityAnnouncements(Number(id), authToken as string, !hasFetchedAnnouncements.current);

  // Force re-fetch when returning from edit page
  useFocusEffect(
    React.useCallback(() => {
      // Reset fetch flags to force re-fetch when screen comes into focus
      hasFetchedCommunity.current = false;
      hasFetchedMembers.current = false;
      hasFetchedAnnouncements.current = false;
      console.log("🔄 Fetching data - CommunityPage navigated to");
    }, [])
  );

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
      
      // Remove duplicates based on user ID
      const uniqueMembers = filteredMembers.filter((member: any, index: number, self: any[]) => 
        index === self.findIndex((m: any) => m.id === member.id)
      );
      
      membersRef.current = uniqueMembers;
      hasFetchedMembers.current = true;
    }
    if (hasNewAnnouncementsData) {
      announcementsRef.current = announcements;
      hasFetchedAnnouncements.current = true;
    }
    if (hasFetchedCommunity.current && hasFetchedMembers.current && hasFetchedAnnouncements.current) {
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewCommunityData, hasNewMembersData, hasNewAnnouncementsData, community, communityMembers, announcements]);

  const isAdmin = communityRef.current?.influencer?.id === user.id;

  // Debug
  const loading = fetching || !hasFetchedCommunity.current || !hasFetchedMembers.current || !hasFetchedAnnouncements.current;
  if (debugCommunityPage && !loading) {
    const community = communityRef.current;
    console.log(`📱 Rendering CommunityScreen - ID: ${id}, Name: ${community?.name}, Is Admin: ${isAdmin}, Members: ${membersRef.current?.length || 0}, Announcements: ${announcementsRef.current?.length || 0}`);
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