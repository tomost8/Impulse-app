import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/contexts/AuthWrapper';
import { useLocalSearchParams } from 'expo-router';
// GraphQL hooks
import { useGetCommunityMembers } from '@/hooks/graphql/communities/queries';
import { useDeleteCommunityMember } from '@/hooks/graphql/communities/mutations';
// Components
import EditMembersScreen from '@/components/screens/communities/EditMembersScreen';
// Debug
import { debugEditCommunityMembersPage } from '@/debug/utils';

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
       .map((member: any) => ({
         ...member.user,
         role: member.role,
         status: member.status
       }));
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
        console.log("🔄 Fetching data - Member removed, updating list");
        // Reset fetch flag to refetch updated member list
        hasFetchedMembers.current = false;
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
  if (debugEditCommunityMembersPage && !loadingData) {
    const members = membersRef.current || [];
    const memberDetails = members.map((member: any) => 
      `  ID: ${member.id}, Name: ${member.first_name} ${member.last_name}, Username: ${member.username}, Role: ${member.role}, Status: ${member.status}`
    ).join('\n');
    console.log(`📱 Rendering EditMembersPage - Members: ${members.length}\n${memberDetails}`);
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