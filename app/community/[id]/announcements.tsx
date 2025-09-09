import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/contexts/AuthWrapper';
// GraphQL hooks
// Components
import AnnouncementScreen from '@/components/screens/communities/AnnouncementScreen';
// Debug
import { debugAnnouncementsPage } from '@/debug/utils';
import { useGetCommunityAnnouncements } from '@/hooks/graphql/notifications/queries';
import { useSendCommunityNotification } from '@/hooks/graphql/notifications/mutations';
import { useLocalSearchParams } from 'expo-router';
// Services
import { useAuth } from '@/contexts/AuthContext';
import { useDataProvider } from '@/contexts/DataProviderContext';
import { useGetCommunity } from '@/hooks/graphql/communities/queries';

const AnnouncementsPage = () => {
 const { id } = useLocalSearchParams(); // communityId
 const { authToken } = useAuth();
 const { user } = useDataProvider();
 const [renderCounter, setRenderCounter] = useState(0);

 // Queries
 const communityRef = useRef<any | null>(null);
 const hasFetchedCommunity = useRef(false);
 const { community, fetched: hasNewCommunityData } = useGetCommunity(Number(id), !hasFetchedCommunity.current);

 const announcementsRef = useRef<any[] | null>(null);
 const hasFetchedAnnouncements = useRef(false);
 const { announcements, fetched: hasNewAnnouncementsData } = useGetCommunityAnnouncements(Number(id), authToken as string, !hasFetchedAnnouncements.current);

 // Mutation for sending announcements
 const { sendCommunityNotification } = useSendCommunityNotification();

 useEffect(() => {
  if (!hasNewCommunityData && !hasNewAnnouncementsData) {
    return;
  }
  if (hasNewCommunityData) {
    communityRef.current = community;
    hasFetchedCommunity.current = true;
  }
  if (hasNewAnnouncementsData) {
    announcementsRef.current = announcements;
    hasFetchedAnnouncements.current = true;
  }
  if (hasFetchedCommunity.current && hasFetchedAnnouncements.current) {
    setRenderCounter(prev => prev + 1);
  }
 }, [hasNewCommunityData, hasNewAnnouncementsData]);


 // Mutation for announcement

 // Debug
 const loading = !hasFetchedCommunity.current || !hasFetchedAnnouncements.current;
 if (debugAnnouncementsPage && !loading) {
  const community = communityRef.current;
  const isAdmin = community?.influencer?.id === user?.id;
  // Announcement data
  const announcements = announcementsRef.current || [];
  let announcementDetails = "";
  if (announcements.length > 0) {
    announcements.forEach((announcement: any, index: number) => {
      announcementDetails += `\n  - Announcement ${index + 1}: ${JSON.stringify({
        id: announcement.id,
        content: announcement.content,
        created_at: announcement.created_at,
        sender_id: announcement.sender?.id,
        sender_username: announcement.sender?.username,
        sender_profile_picture: !!announcement.sender?.profile_picture
      })}`;
    });
  }
  console.log(`📱 Rendering AnnouncementsPage - Community ID: ${id}, Name: ${community?.name}, Is Admin: ${isAdmin}, Announcements: ${announcements.length}${announcementDetails}`);
 }

 // Handle sending announcements
 const handleSendAnnouncement = async (content: string) => {
  try {
    await sendCommunityNotification({
      title: "Community Announcement",
      content: content.trim(),
      type: "COMMUNITY_NOTICE"
    }, Number(id), authToken as string);
    
    return { success: true };
  } catch (error) {
    console.error('Failed to send announcement:', error);
    return { success: false, error: error };
  }
 };

  const isAdmin = communityRef.current?.influencer?.id === user?.id;

  return (
   <AnnouncementScreen 
    communityName={communityRef.current?.name}
    announcements={announcementsRef.current || []}
    isAdmin={isAdmin}
    communityId={Number(id)}
    currentUserId={user?.id}
    onSendAnnouncement={handleSendAnnouncement}
   />
 );
};

export default AuthWrapper(AnnouncementsPage);