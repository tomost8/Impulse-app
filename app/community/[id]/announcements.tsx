import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
// Components
import AnnouncementScreen from '@/components/screens/social/communities/announcementscreen';
// Debug
import { pageDisplay, debugRenders } from '@/utils/debug';
import { useGetCommunityAnnouncements } from '@/hooks/graphql/notifications/queries';
import { useLocalSearchParams } from 'expo-router';
// Services
import { useUserInfo } from '@/services/UserContext';

const AnnouncementsPage = () => {
 const { id } = useLocalSearchParams(); // communityId
 const { userId, authToken } = useUserInfo();

 // Queries
 const announcementsRef = useRef<any[] | null>(null);
 const hasFetchedAnnouncements = useRef(false);
 const { announcements, fetched: hasNewAnnouncementsData } = useGetCommunityAnnouncements(Number(id), authToken as string, !hasFetchedAnnouncements.current);

 useEffect(() => {
  if (!hasNewAnnouncementsData) {
    return;
  }
  if (hasNewAnnouncementsData) {
    announcementsRef.current = announcements;
    hasFetchedAnnouncements.current = true;
  }
 }, [hasNewAnnouncementsData]);

 // Debug
 const loading = !hasFetchedAnnouncements.current;
 if (debugRenders && !loading) {
  console.log("Announcements:", announcementsRef.current);
 }


 return (
   <AnnouncementScreen announcements={announcementsRef.current || []} />
 );
};

export default AuthWrapper(AnnouncementsPage);