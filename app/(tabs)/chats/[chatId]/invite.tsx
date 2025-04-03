
import { router, useLocalSearchParams } from 'expo-router';
import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useGetFriends } from '@/hooks/graphql/friends/queries';
import { useGetChatMembers } from '@/hooks/graphql/chats/queries';
import { useCreateChatMember } from '@/hooks/graphql/chats/mutations';
// Components
import InviteToGroupScreen from '@/components/screens/chats/groups/invitetogroup';
// Debug
import { debugRenders } from '@/utils/debug';

const GroupInvitePage = (props: any) => {
  console.log("GroupInvitePage");
  const { chatId } = useLocalSearchParams();
  const { userId, authToken } = props;
  const [renderCounter, setRenderCounter] = useState(0);

  // Queries for Loading State
  const friendsRef = useRef<any[] | null>(null);
  const hasFetchedFriends = useRef<boolean>(false);
  const { friends, fetched: hasNewFriendsData } = useGetFriends(userId as number, !hasFetchedFriends.current);

  const chatMembersRef = useRef<any[] | null>(null);
  const hasFetchedChatMembers = useRef<boolean>(false);
  const { chatMembers, fetched: hasNewChatMembersData } = useGetChatMembers(Number(chatId), !hasFetchedChatMembers.current);

  useEffect(() => {
    if (!hasNewFriendsData && !hasNewChatMembersData) {
      return;
    }
    if (hasNewFriendsData) {
      friendsRef.current = friends;
      hasFetchedFriends.current = true;
    }
    if (hasNewChatMembersData) {
      chatMembersRef.current = chatMembers;
      hasFetchedChatMembers.current = true;
    }
    if (hasNewFriendsData && hasNewChatMembersData) {
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewFriendsData, hasNewChatMembersData]);

  // Mutations
  const { createChatMember } = useCreateChatMember();
  const [isInvitingUserToChat, setIsInvitingUserToChat] = useState(false);
  const handleInviteUserToChat = async (chatId: number) => {
    setIsInvitingUserToChat(true);
    try {
      const input = { 
        user_id: userId, 
        chat_id: chatId,
      };
      const response = await createChatMember(input);
      console.log(response.data.createChatMember);
      return response.data.createChatMember;
    } catch (error) {
      console.error("Error inviting friend:", error);
      throw error;
    } finally {
      setIsInvitingUserToChat(false);
    }
  }

  // Debug
  const loading = !hasFetchedFriends.current || !hasFetchedChatMembers.current || isInvitingUserToChat;
  if (debugRenders && !loading) {
    console.log('Rendering GroupInvitePage\n',
      'Friends:', friendsRef.current, '\n',
      'Chat Members:', chatMembersRef.current, '\n',
      'Render Counter:', renderCounter, '\n',
    );
  }

  return <InviteToGroupScreen 
    loading={loading} 
  />
}

export default AuthWrapper(GroupInvitePage);