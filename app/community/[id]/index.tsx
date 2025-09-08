import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import {useState, useEffect, useRef} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AuthWrapper from '@/contexts/AuthWrapper';
// Services
import { useAuth } from '@/contexts/AuthContext';
import { useDataProvider } from '@/contexts/DataProviderContext';
import { useDataRefetch } from '@/contexts/DataFetcher';
// GraphQL hooks
import { useGetCommunity, useGetCommunityMembers } from '@/hooks/graphql/communities/queries';
import { useGetCommunityAnnouncements } from '@/hooks/graphql/notifications/queries';
import { useCreateCommunityMember } from '@/hooks/graphql/communities/mutations';
// Components
import CommunityMainScreen from '@/components/screens/communities/CommunityMainScreen';
// Debug
import { debugCommunityPage } from '@/debug/utils';

const CommunityPage = () => {
  const { id } = useLocalSearchParams(); // communityId
  const { authToken } = useAuth();
  const { fetching, user, communities } = useDataProvider();
  const { refetchData } = useDataRefetch();
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
  
  // Check if user is already a member of this community
  const isMember = communities.some((userCommunity: any) => 
    userCommunity.community.id === Number(id) && userCommunity.status === 'ACCEPTED'
  );

  // Mutations
  const { createCommunityMember } = useCreateCommunityMember();
  const [isJoiningCommunity, setIsJoiningCommunity] = useState(false);
  
  const handleJoinCommunity = async () => {
    if (isMember || isJoiningCommunity) return;
    
    setIsJoiningCommunity(true);
    try {
      const input = {
        community_id: Number(id),
        user_id: user.id
      };
      const response = await createCommunityMember(input);
      if (response.success) {
        console.log("Community Member created successfully:", response);
        // Refetch communities data to update the UI
        await refetchData({ communities: true });
        // Force re-render after refetch
        setRenderCounter(prev => prev + 1);
      } else {
        console.error("Error creating community member:", response);
      }
    } catch (error) {
      console.error("Error creating community member:", error);
    } finally {
      setIsJoiningCommunity(false);
    }
  };

  // Debug
  const loading = fetching || !hasFetchedCommunity.current || !hasFetchedMembers.current || !hasNewAnnouncementsData;
  if (debugCommunityPage && !loading) {
    const community = communityRef.current;
    console.log(`📱 Rendering CommunityScreen - ID: ${id}, Name: ${community?.name}, Is Admin: ${isAdmin}, Is Member: ${isMember}, Members: ${membersRef.current?.length || 0}, Announcements: ${announcementsRef.current?.length || 0}`);
  }

  return (
    <CommunityMainScreen 
      community={communityRef.current}
      members={membersRef.current || []}
      announcements={announcementsRef.current || []}
      isAdmin={isAdmin}
      isMember={isMember}
      onJoinCommunity={handleJoinCommunity}
      isJoining={isJoiningCommunity}
    />
  );
}

export default AuthWrapper(CommunityPage);