import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useGetCommunityMembers } from '@/hooks/graphql/communities/queries';
// Components
import EditMembersScreen from '@/components/screens/social/communities/editmembersscreen';
// Debug
import { useLocalSearchParams } from 'expo-router';


const EditMembersPage = () => {
 const { id } = useLocalSearchParams();
 const [renderCounter, setRenderCounter] = useState(0);
 
 // Queries for Loading State
 const membersRef = useRef<any[] | null>(null);
 const hasFetchedMembers = useRef(false);
 const { communityMembers, fetched: hasNewMembersData } = useGetCommunityMembers(Number(id), !hasFetchedMembers.current);

 useEffect(() => {
   if (!hasNewMembersData) {
     return;
   }
   if (hasNewMembersData) {
     let filteredMembers = communityMembers
       .filter((member: any) => member.status === "ACCEPTED")
       .map((member: any) => member.user);
     membersRef.current = filteredMembers;
     hasFetchedMembers.current = true;
   }
   if (hasFetchedMembers.current) {
     setRenderCounter(prev => prev + 1);
   }
 }, [hasNewMembersData]);

 return (
   <EditMembersScreen members={membersRef.current || []} />
 );
};

export default AuthWrapper(EditMembersPage);