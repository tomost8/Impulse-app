import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/contexts/AuthWrapper';
import { useLocalSearchParams } from 'expo-router';
// GraphQL hooks
import { useGetCommunityMembers } from '@/hooks/graphql/communities/queries';
import { useDeleteCommunityMember } from '@/hooks/graphql/communities/mutations';
// Components
import EditMembersScreen from '@/components/screens/social/communities/editmembersscreen';
// Debug
import { debugRenders } from '@/debug/utils';

const EditMembersPage = () => {
 const { id } = useLocalSearchParams();
 const [renderCounter, setRenderCounter] = useState(0);

 // Queries
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

 // Mutations
 const { deleteCommunityMember } = useDeleteCommunityMember();
 const [isDeletingMember, setIsDeletingMember] = useState(false);
  const handleDeleteMember = async (memberId: number) => {
    setIsDeletingMember(true);
    try {
      const response = await deleteCommunityMember(memberId, Number(id));
      if (response.success) {
        console.log("Member successfully removed:", response);
      } else {
        throw new Error("Response from deleteCommunityMember was not successful: " + response.errors);
      }
    } catch (error) {
      console.error('Error deleting member:', error);
    } finally {
      setIsDeletingMember(false);
    }
  };

  // Debug
  const loadingData = !hasFetchedMembers.current || isDeletingMember;
  if (debugRenders && !loadingData) {
    console.log("Rendering EditMembersPage. Counter: ", renderCounter,
      "\nMembers:", membersRef.current,
    );
  }

 return (
   <EditMembersScreen 
    loading={loadingData}
    members={membersRef.current || []} 
    onRemoveMember={handleDeleteMember}
   />
 );
};

export default AuthWrapper(EditMembersPage);