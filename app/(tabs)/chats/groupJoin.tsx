import { router } from 'expo-router';
import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/contexts/AuthWrapper';
// GraphQL hooks
import { useGetAllChats, useGetUserChats } from '@/hooks/graphql/chats/queries';
import { useCreateChatMember } from '@/hooks/graphql/chats/mutations';
// Components
import JoinChatScreen from '@/components/screens/chats/JoinChatScreen';
// Debug
import { debugRenders } from '@/debug/utils';


const JoinGroupPage = (props: any) => {
  const { userId, authToken } = props;
  const [renderCounter, setRenderCounter] = useState(0);

  // Queries for Loading State
  const chatsRef = useRef<any[] | null>(null);
  const hasFetchedChats = useRef(false);
  const { chats, fetched: hasNewChatsData } = useGetAllChats(!hasFetchedChats.current);

  const userChatsRef = useRef<any[] | null>(null);
  const hasFetchedChatMembers = useRef(false);
  const { chatMembers, fetched: hasNewChatMembersData } = useGetUserChats(userId as number, !hasFetchedChatMembers.current);

  useEffect(() => {
    if (!hasNewChatsData && !hasNewChatMembersData) {
      return;
    }
    if (hasNewChatsData) {
      const groups = chats.filter((chat: any) => chat.type === 'group');
      chatsRef.current = groups;
      hasFetchedChats.current = true;
    }
    if (hasNewChatMembersData) {
      const filteredChats = chatMembers.filter((member: any) => member.status === 'ACCEPTED').map((member: any) => member.chat);
      userChatsRef.current = filteredChats;
      hasFetchedChatMembers.current = true;
    }
    if (hasFetchedChats.current && hasFetchedChatMembers.current) {
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewChatsData, hasNewChatMembersData]);

  // Mutations
  const { createChatMember } = useCreateChatMember();
  const [isJoiningGroup, setIsJoiningGroup] = useState(false);
  const handleJoinGroup = async (id: string) => {
    setIsJoiningGroup(true);
    let response_log = "";
    try {
      const input = { 
        user_id: userId, 
        chat_id: Number(id),
        status: 'ACCEPTED'
      };
      response_log += "Joining group with input:\n" + JSON.stringify(input) + "\n";
      const response = await createChatMember(input);
      if (response.success) {
        response_log += "Group joined successfully:\n" + response.chat_member.id + "\n";
      } else {
        throw new Error("Response.success from createChatMember was false:" + response.errors);
      }
      console.log(response_log);
      router.back();
    } catch (error) {
      console.error("Error joining group:", error);
    } finally {
      setIsJoiningGroup(false);
    }
  };

  // Debug
  const loading = !hasFetchedChats.current || !hasFetchedChatMembers.current || isJoiningGroup;
  const joinableGroups = chatsRef.current?.filter((chat: any) => 
    !userChatsRef.current?.some((userChat: any) => userChat.id === chat.id)
  );
  if (debugRenders && !loading) {
    console.log("Rendering JoinGroupPage\n",
      "All Groups:", chatsRef.current, "\n",
      "User Chats:", userChatsRef.current, "\n",
      "Joinable Groups:", joinableGroups, "\n",
      "Render Counter:", renderCounter, "\n",
    );
  }

  return (
    <JoinChatScreen 
      loading={loading}
      groups={joinableGroups || []}
      handleJoinGroup={handleJoinGroup}
    />
  );
}

export default AuthWrapper(JoinGroupPage);
