import styles from '@/utils/testStyles';
import { View, Text, TouchableOpacity } from 'react-native';
import { router, Link, useLocalSearchParams } from 'expo-router';
import MyComponent from '@/components/TwoTab';

import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useGetChatMembers } from '@/hooks/graphql/chats/queries';
import { useGetGroupLeaderboard } from '@/hooks/graphql/chats/queries';
// Components
import GroupInfoScreen from '@/components/screens/chats/groups/groupinfo';
// Debug
import { pageDisplay, debugRenders } from '@/utils/debug';

function GroupInfoScreenOld({
  userId,
  chatId,
  chatMembers,
  isChatMembersLoading,
  chatLeaderboard,
  isChatLeaderboardLoading,
  // Tab Status
  tabView,
  onMembersPress,
  onLeaderboardPress,
  activeView,
  setActiveView,
}: {
  userId: number;
  chatId: number;
  chatMembers: any;
  isChatMembersLoading: boolean;
  chatLeaderboard: any;
  isChatLeaderboardLoading: boolean;
  // Tab Status
  tabView: 'members' | 'leaderboard';
  onMembersPress: () => void;
  onLeaderboardPress: () => void;
  activeView: 'weekly' | 'monthly' | 'all';
  setActiveView: (view: 'weekly' | 'monthly' | 'all') => void;
}) {
  if (isChatMembersLoading || isChatLeaderboardLoading) {
    return <Text>Loading...</Text>;
  }
  
  return (
    <View style={styles.container}>
      {/* Button for active view: members or leaderboard */}
      <MyComponent onLeftPress={onMembersPress} onRightPress={onLeaderboardPress} value={tabView} />
      
      {tabView === 'members' && (
        <View>
          <View style={styles.section}>
              <Text style={styles.text}>Members</Text>
              {chatMembers.map((member: any) => (
                  <View key={member.user.id}>
                      <Text style={styles.text}>
                          {member.user.first_name} {member.user.last_name}, {member.user.username}, {member.user.profile_picture}
                      </Text>
                      {/* View Profile button */}
                      {member.user.id !== userId && (
                        <TouchableOpacity onPress={() => {router.push(`/chats/${chatId}/${member.user.id}`)}}>
                            <Text style={styles.button}>View Profile</Text>
                        </TouchableOpacity>
                      )}
                  </View>
              ))}
          </View>
          <View style={styles.section}>
            <Link href={`/chats/${chatId}/invite`}>
                <Text style={styles.button}>Go to Invites</Text>
            </Link>
          </View>
        </View>
      )}

      {tabView === 'leaderboard' && (
        <View style={styles.section}>
            <Text style={styles.text}>Leaderboard</Text>
            {/* Buttons to change active view */}
            <View style={styles.container}>
                <TouchableOpacity onPress={() => setActiveView('weekly')}>
                    <Text style={styles.button}>Weekly</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveView('monthly')}>
                    <Text style={styles.button}>Monthly</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveView('all')}>
                    <Text style={styles.button}>All</Text>
                </TouchableOpacity>
            </View>
            {chatLeaderboard.map((member: any) => (
                <View key={member.user.id}>
                    <Text style={styles.text}>
                        {member.user.username}, 
                        {activeView === 'weekly' ? member.user.point.weekly_points : activeView === 'monthly' ? member.user.point.monthly_points : member.user.point.points}
                    </Text>
                </View>
            ))}
        </View>
      )}
    </View>
  );
}

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

  useEffect(() => {
    if (!hasNewChatMembersData && !hasNewChatLeaderboardData) {
      return;
    }
    if (hasNewChatMembersData) {
      chatMembersRef.current = chatMembers;
      hasFetchedChatMembers.current = true;
    }
    if (hasNewChatLeaderboardData) {
      chatLeaderboardRef.current = chatLeaderboard;
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

  if (pageDisplay) {
    return <GroupInfoScreen />
  } else {
    return GroupInfoScreenOld({
      userId: userId,
      chatId: Number(chatId),
      chatMembers: chatMembersRef.current,
      isChatMembersLoading: !hasFetchedChatMembers.current,
      chatLeaderboard: chatLeaderboardRef.current,
      isChatLeaderboardLoading: !hasFetchedChatLeaderboard.current,
      // Tab Status
      tabView: tabView,
      onMembersPress: onMembersPress,
      onLeaderboardPress: onLeaderboardPress,
      activeView: activeView,
      setActiveView: setActiveView,
    });
  }
}

export default AuthWrapper(GroupInfoPage);