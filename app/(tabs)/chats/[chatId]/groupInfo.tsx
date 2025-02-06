import styles from '@/constants/testStyles';
import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { router, Link, useLocalSearchParams } from 'expo-router';
import MyComponent from '@/components/TwoTab';
import useUserInfo from '@/hooks/useUserInfo';
import { useGetChatMembers } from '@/hooks/graphql/chats/queries';
import { useGetGroupLeaderboard } from '@/hooks/graphql/chats/queries';

export default function GroupInfoScreen() {
  const { userId } = useUserInfo();
  const {chatId} = useLocalSearchParams();
  const {chatMembers} = useGetChatMembers(Number(chatId));
  console.log(chatMembers);
  //members/leaderboards
  const [tabView, setTabView] = useState<'members' | 'leaderboard'>('members');
  const onMembersPress = () => { setTabView('members');};
  const onLeaderboardPress = () => { setTabView('leaderboard');};
  //leaderboard
  const [activeView, setActiveView] = useState<'weekly' | 'monthly' | 'all'>('weekly');
  const { chatMembers: chatLeaderboard } = useGetGroupLeaderboard(Number(chatId), activeView === 'weekly' ? 'POINTS_WEEKLY' : activeView === 'monthly' ? 'POINTS_MONTHLY' : 'POINTS_ALL');
  if (chatLeaderboard !== null) {
    console.log('Group leaderboard data:', chatLeaderboard);
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