import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';
import { LeavePopup } from '@/components/features/chats';
import ProfilePictureWithLoading from '@/components/ui/common/ProfilePictureWithLoading';
import { LeaderboardPodium, LeaderboardList } from "@/components/features/leaderboard";

interface Member {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  profile_picture: any;
}

interface ChatInfoScreenProps {
  loading: boolean;
  title: string;
  members: Member[];
  leaderboard: any[];
  handleLeave: () => void;
  chatId?: string | string[];
}

const ChatInfoScreen = (props: ChatInfoScreenProps) => {
  if (props.loading) {
    return <Text>Loading...</Text>;
  }

  // Tab Selector
  const [activeTab, setActiveTab] = useState<'Members' | 'Leaderboard'>('Members');
  const handleTabChange = (tab: 'Members' | 'Leaderboard') => {
    if (tab === 'Leaderboard') {
      setActiveTab('Leaderboard');
    } else {
      setActiveTab('Members');
    }
  };

  // Leave Popup
  const [isLeavePopupVisible, setIsLeavePopupVisible] = useState(false);
  const handleLeaveClick = () => {
    setIsLeavePopupVisible(true);
  };

  const handleLeaveConfirm = () => {
    setIsLeavePopupVisible(false);
    props.handleLeave();
    router.replace('/chats');
  };

  const renderContent = () => {
    if (activeTab === 'Members') {
      return (
        <View style={styles.membersContainer}>
          <View style={styles.membersList}>
            {props.members.map((member) => (
              <View key={member.id} style={styles.memberCard}>
                <View style={styles.memberInfo}>
                  <ProfilePictureWithLoading 
                    source={{ uri: member.profile_picture }}
                    size={48}
                    style={styles.profileImage}
                  />
                  <View style={styles.textContainer}>
                    <Text style={styles.name}>{member.first_name} {member.last_name}</Text>
                    <Text style={styles.username}>{member.username}</Text>
                  </View>
                </View>
                <TouchableOpacity 
                  style={styles.viewProfileButton}
                  onPress={() => router.push(`/user/${member.id}`)}
                >
                  <Text style={styles.viewProfileText}>View Profile</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.leaderboardContainer}>
          <LeaderboardPodium podiumData={props.leaderboard.slice(0, 3)} selectedPeriod="POINTS_WEEKLY" />
          <LeaderboardList leaderboardData={props.leaderboard.slice(3)} selectedPeriod="POINTS_WEEKLY" />
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Header with extended background */}
      <View style={styles.headerBackground}>
        <SafeAreaView>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => router.back()}
              >
                <Image 
                  source={require("@/assets/icons/backArrow.png")}
                  style={styles.backIcon}
                />
              </TouchableOpacity>
              <Text style={styles.title}>{props.title}</Text>
            </View>
            <TouchableOpacity 
              style={styles.leaveButton}
              onPress={handleLeaveClick}
            >
              <Text style={styles.leaveButtonText}>Leave</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>

      {/* Rest of the content */}
      <View style={styles.content}>
        {/* Tab Selector */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Members' && styles.activeTab]}
            onPress={() => setActiveTab('Members')}
          >
            <Text style={[styles.tabText, activeTab === 'Members' && styles.activeTabText]}>
              Members ({props.members.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'Leaderboard' && styles.activeTab]}
            onPress={() => handleTabChange('Leaderboard')}
          >
            <Text style={[styles.tabText, activeTab === 'Leaderboard' && styles.activeTabText]}>
              Leaderboard
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView>
          {renderContent()}
        </ScrollView>
      </View>

      {/* Invite Button */}
      <TouchableOpacity 
        style={styles.inviteButton}
        onPress={() => router.push(`/chats/${props.chatId}/invite`)}
      >
        <Text style={styles.inviteButtonText}>Invite a friend to this group</Text>
      </TouchableOpacity>

      <LeavePopup
        isVisible={isLeavePopupVisible}
        onClose={() => setIsLeavePopupVisible(false)}
        onLeave={handleLeaveConfirm}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerBackground: {
    backgroundColor: '#E0EDFD',
    paddingTop: Platform.OS === 'android' ? 10 : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    tintColor: '#242020',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins',
    color: '#242020',
    fontWeight: '600',
    marginLeft: 6,
  },
  leaveButton: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    backgroundColor: 'transparent',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#A4ACBC',
  },
  leaveButtonText: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontWeight: '600',
    color: '#A4ACBC',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(222, 114, 141, 0.25)',
    borderRadius: 15,
    height: 48,
    alignItems: 'center',
    padding: 5,
    marginHorizontal: 20,
    marginTop: 12,
  },
  tab: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  activeTab: {
    backgroundColor: '#DE728D',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Open Sans',
    color: '#242020',
    opacity: 0.7,
  },
  activeTabText: {
    color: '#FFFFFF',
    opacity: 1,
  },
  membersContainer: {
    flex: 1,
  },
  membersList: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  memberCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingRight: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  memberInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  textContainer: {
    gap: 4,
  },
  name: {
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#000000',
  },
  username: {
    fontSize: 12,
    fontFamily: 'Open Sans',
    color: '#979797',
  },
  viewProfileButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#DE728D',
    borderRadius: 100,
  },
  viewProfileText: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontWeight: '600',
    color: '#FFFFFF',
  },
  inviteButton: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
    height: 48,
    backgroundColor: '#DE728D',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inviteButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Poppins',
    fontWeight: '600',
  },
  leaderboardContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingBottom: 80,
  },
  content: {
    flex: 1,
  },
});

export default ChatInfoScreen;
