import styles from '@/utils/testStyles';
import { View, Text, TouchableOpacity } from 'react-native';
import { router, Link, useLocalSearchParams } from 'expo-router';
import MyComponent from '@/components/old/misc/TwoTab';

export default function GroupInfoScreenOld({
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