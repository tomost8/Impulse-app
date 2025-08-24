import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
// Components
import AnnouncementScreen from '@/components/screens/social/communities/announcementscreen';
// Debug
import { pageDisplay, debugRenders } from '@/debug/utils';
import { useGetCommunityAnnouncements } from '@/hooks/graphql/notifications/queries';
import { useLocalSearchParams } from 'expo-router';
// Services
import { useAuth } from '@/contexts/AuthContext';
import { useGetCommunity } from '@/hooks/graphql/communities/queries';

const AnnouncementsPage = () => {
 const { id } = useLocalSearchParams(); // communityId
   const { authToken } = useAuth();
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
 if (debugRenders && !loading) {
  console.log("Rendering AnnouncementsScreen\n",
    "Community:", communityRef.current, "\n",
    "Announcements:", announcementsRef.current, "\n",
    "Render Counter:", renderCounter, "\n",
  );
 }


 return (
   <AnnouncementScreen 
    communityName={communityRef.current?.name}
    announcements={announcementsRef.current || []} 
   />
 );
};

export default AuthWrapper(AnnouncementsPage);