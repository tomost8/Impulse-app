import { router, useLocalSearchParams } from 'expo-router';
import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/contexts/AuthWrapper';
// GraphQL hooks
import { useGetFriends } from '@/hooks/graphql/friends/queries';
import { useGetChatMembers } from '@/hooks/graphql/chats/queries';
import { useCreateChatMember } from '@/hooks/graphql/chats/mutations';
// Components
import InviteToChatScreen from '@/components/screens/chats/InviteToChatScreen';
// Debug
import { debugRenders } from '@/debug/utils';
// Services
import { useDataProvider } from '@/contexts/DataProviderContext';

const GroupInvitePage = (props: any) => {
  console.log("GroupInvitePage");
  const { chatId } = useLocalSearchParams();
  const { fetching, friends} = useDataProvider();
  const [renderCounter, setRenderCounter] = useState(0);

  // Queries 

  const chatMembersRef = useRef<any[] | null>(null);
  const hasFetchedChatMembers = useRef<boolean>(false);
  const { chatMembers, fetched: hasNewChatMembersData } = useGetChatMembers(Number(chatId), !hasFetchedChatMembers.current);

  useEffect(() => {
    if (!hasNewChatMembersData) {
      return;
    }
    if (hasNewChatMembersData) {
      chatMembersRef.current = chatMembers;
      hasFetchedChatMembers.current = true;
    }
    if (hasNewChatMembersData) {
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewChatMembersData]);

  // Mutations
  const { createChatMember } = useCreateChatMember();
  const [isInvitingUserToChat, setIsInvitingUserToChat] = useState(false);
  const handleInviteUserToChat = async (userId: number) => {
    setIsInvitingUserToChat(true);
    try {
      const input = { 
        user_id: userId, 
        chat_id: Number(chatId),
      };
      const response = await createChatMember(input);
      if (response.success) {
        console.log("response is successful:", response);
      } else {
        throw new Error("Response.success from createChatMember was false:" + response.errors);
      }
    } catch (error) {
      console.error("Error inviting friend:", error);
    } finally {
      setIsInvitingUserToChat(false);
    }
  }

  // Debug
  const acceptedFriends = friends.filter((friend: any) => friend.status === 'ACCEPTED').map((friend: any) => friend.friend);
  const friendsToInvite = acceptedFriends.filter((friend: any) => 
    !chatMembersRef.current?.some(member => 
      member.user.id === friend.id && member.status === 'ACCEPTED'
    )
  );
  const loading = fetching || !hasFetchedChatMembers.current || isInvitingUserToChat;
  if (debugRenders && !loading) {
    console.log('Rendering GroupInvitePage\n',
      'Accepted Friends:', acceptedFriends, '\n',
      'Friends to Invite:', friendsToInvite, '\n',
      'Chat Members:', chatMembersRef.current, '\n',
      'Render Counter:', renderCounter, '\n',
    );
  }

  return <InviteToChatScreen 
    loading={loading} 
    friends={acceptedFriends}
    members={chatMembersRef.current || []}
    handleInvite={handleInviteUserToChat}
  />
}

export default AuthWrapper(GroupInvitePage);