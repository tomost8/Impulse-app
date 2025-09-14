import { router, useLocalSearchParams } from 'expo-router';
import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/contexts/AuthWrapper';
// GraphQL hooks
import { useGetChat, useGetChatMembers, useGetGroupLeaderboard } from '@/hooks/graphql/chats/queries';
import { useDeleteChatMember } from '@/hooks/graphql/chats/mutations';
// Components
import ChatInfoScreen from '@/components/screens/chats/ChatInfoScreen';
// Debug
import { debugRenders } from '@/debug/utils';



const GroupInfoPage = (props: any) => {
  const { chatId } = useLocalSearchParams();
  const { userId, authToken } = props;
  const [renderCounter, setRenderCounter] = useState(0);

  // Tab Status: Have to figure out how to separate these to components
  const [activeView, setActiveView] = useState<'weekly' | 'monthly' | 'all'>('weekly');

  // Queries
  const chatRef = useRef<any | null>(null);
  const hasFetchedChat = useRef(false);
  const { chat, fetched: hasNewChatData } = useGetChat(Number(chatId), !hasFetchedChat.current);
  
  const chatMembersRef = useRef<any[] | null>(null);
  const hasFetchedChatMembers = useRef(false);
  const { chatMembers, fetched: hasNewChatMembersData } = useGetChatMembers(Number(chatId), !hasFetchedChatMembers.current);

  const chatLeaderboardRef = useRef<any[] | null>(null);
  const hasFetchedChatLeaderboard = useRef(false);
  const { chatMembers: chatLeaderboard, fetched: hasNewChatLeaderboardData } = useGetGroupLeaderboard(Number(chatId), activeView === 'weekly' ? 'POINTS_WEEKLY' : activeView === 'monthly' ? 'POINTS_MONTHLY' : 'POINTS_ALL', !hasFetchedChatLeaderboard.current);

  // Mutations
  const { deleteChatMember } = useDeleteChatMember();
  const [isLeavingGroup, setIsLeavingGroup] = useState(false);
  const handleLeaveGroup = async (userId: number, chatId: number) => {
    try {
      setIsLeavingGroup(true);
      const response = await deleteChatMember(userId, chatId);
      if (response.success) {
        console.log("Successfully left group.");
      } else {
        throw new Error("Response.success from deleteChatMember was false:" + response.errors);
      }
    } catch (error) {
      console.error('Error leaving group:', error);
    } finally {
      setIsLeavingGroup(false);
    }
  }

  useEffect(() => {
    if (!hasNewChatData && !hasNewChatMembersData && !hasNewChatLeaderboardData) {
      return;
    }
    if (hasNewChatData) {
      chatRef.current = chat;
      hasFetchedChat.current = true;
    }
    if (hasNewChatMembersData) {
      const acceptedMembers = chatMembers.filter((member: any) => member.status === 'ACCEPTED').map((member: any) => member.user);
      chatMembersRef.current = acceptedMembers;
      hasFetchedChatMembers.current = true;
    }
    if (hasNewChatLeaderboardData) {
      const acceptedMembersLeaderboard = chatLeaderboard.filter((member: any) => member.status === 'ACCEPTED').map((member: any) => member.user);
      chatLeaderboardRef.current = acceptedMembersLeaderboard;
      hasFetchedChatLeaderboard.current = true;
    }
    if (hasFetchedChat.current && hasFetchedChatMembers.current && hasFetchedChatLeaderboard.current) {
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewChatData, hasNewChatMembersData, hasNewChatLeaderboardData]);

  // Debug
  const loading = !hasFetchedChat.current || !hasFetchedChatMembers.current || !hasFetchedChatLeaderboard.current || isLeavingGroup;
  if (debugRenders && !loading) {
    console.log("GroupInfoPage\n",
      "Chat:", chatRef.current, "\n",
      "Chat Members:", chatMembersRef.current, "\n",
      "Chat Leaderboard:", chatLeaderboardRef.current, "\n",
      "Render Counter:", renderCounter, "\n",
    );
  }

  return <ChatInfoScreen 
    loading={loading}
    title={chatRef.current?.title || ''}
    members={chatMembersRef.current || []}
    leaderboard={chatLeaderboardRef.current || []}
    handleLeave={() => handleLeaveGroup(userId, Number(chatId))}
    chatId={chatId}
  />
}

export default AuthWrapper(GroupInfoPage);