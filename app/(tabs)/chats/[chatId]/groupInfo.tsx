import { router, useLocalSearchParams } from 'expo-router';
import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useGetChatMembers } from '@/hooks/graphql/chats/queries';
import { useGetGroupLeaderboard } from '@/hooks/graphql/chats/queries';
// Components
import GroupInfoScreen from '@/components/screens/chats/groups/groupinfo';
// Debug
import { debugRenders } from '@/utils/debug';
import { useDeleteChatMember } from '@/hooks/graphql/chats/mutations';



const GroupInfoPage = (props: any) => {
  const { chatId } = useLocalSearchParams();
  const { userId, authToken } = props;
  const [renderCounter, setRenderCounter] = useState(0);


  // Tab Status: Have to figure out how to separate these to components
  const [tabView, setTabView] = useState<'members' | 'leaderboard'>('members');
  const onMembersPress = () => { setTabView('members');};
  const onLeaderboardPress = () => { setTabView('leaderboard')};  
  const [activeView, setActiveView] = useState<'weekly' | 'monthly' | 'all'>('weekly');

  // Queries for Loading State
  const chatMembersRef = useRef<any[] | null>(null);
  const hasFetchedChatMembers = useRef(false);
  const { chatMembers, fetched: hasNewChatMembersData } = useGetChatMembers(Number(chatId), !hasFetchedChatMembers.current);

  const chatLeaderboardRef = useRef<any[] | null>(null);
  const hasFetchedChatLeaderboard = useRef(false);
  const { chatMembers: chatLeaderboard, fetched: hasNewChatLeaderboardData } = useGetGroupLeaderboard(Number(chatId), activeView === 'weekly' ? 'POINTS_WEEKLY' : activeView === 'monthly' ? 'POINTS_MONTHLY' : 'POINTS_ALL', !hasFetchedChatLeaderboard.current);

  // Mutations
  const { deleteChatMember } = useDeleteChatMember();
  const [isDeletingChatMember, setIsDeletingChatMember] = useState(false);
  const handleDeleteChatMember = async (userId: number, chatId: number) => {
    try {
      setIsDeletingChatMember(true);
      const response = await deleteChatMember(userId, chatId);
      console.log("Delete Chat Member response:", response);
    } catch (error) {
      console.error('Delete Chat Member failed:', error);
    } finally {
      setIsDeletingChatMember(false);
    }
  }

  useEffect(() => {
    if (!hasNewChatMembersData && !hasNewChatLeaderboardData) {
      return;
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
    if (hasFetchedChatMembers.current && hasFetchedChatLeaderboard.current) {
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewChatMembersData, hasNewChatLeaderboardData]);

  // Debug
  const loading = !hasFetchedChatMembers.current || !hasFetchedChatLeaderboard.current;
  if (debugRenders && !loading) {
    console.log("GroupInfoPage\n",
      "Chat Members:", chatMembersRef.current, "\n",
      "Chat Leaderboard:", chatLeaderboardRef.current, "\n",
      "Render Counter:", renderCounter, "\n",
    );
  }

  return <GroupInfoScreen 
    loading={loading}
    members={chatMembersRef.current || []}
    leaderboard={chatLeaderboardRef.current || []}
    handleLeave={() => handleDeleteChatMember(userId, Number(chatId))}
  />
}

export default AuthWrapper(GroupInfoPage);