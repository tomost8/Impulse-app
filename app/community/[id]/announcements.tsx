import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/contexts/AuthWrapper';
// GraphQL hooks
// Components
import AnnouncementScreen from '@/components/screens/communities/AnnouncementScreen';
// Debug
import { debugAnnouncementsPage } from '@/debug/utils';
import { useGetCommunityAnnouncements } from '@/hooks/graphql/notifications/queries';
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
  const announcements = announcementsRef.current || [];
  const isAdmin = community?.influencer?.id === user?.id;
  const announcementDetails = announcements.map((announcement: any) => 
    `  ID: ${announcement.id}, Title: ${announcement.title}, Content: ${announcement.content?.substring(0, 50)}${announcement.content?.length > 50 ? '...' : ''}`
  ).join('\n');
  console.log(`📱 Rendering AnnouncementsPage - Community ID: ${id}, Name: ${community?.name}, Is Admin: ${isAdmin}, Announcements: ${announcements.length}\n${announcementDetails}`);
 }


  const isAdmin = communityRef.current?.influencer?.id === user?.id;

  return (
   <AnnouncementScreen 
    communityName={communityRef.current?.name}
    announcements={announcementsRef.current || []}
    isAdmin={isAdmin}
   />
 );
};

export default AuthWrapper(AnnouncementsPage);