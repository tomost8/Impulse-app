import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  ScrollView 
} from 'react-native';
import { router } from 'expo-router';
import LeavePopup from './leavepopup';
import LeaderboardCard from '@/components/ui/HomeComponents/LeaderboardComponents/LeaderboardCard';

interface Member {
  id: string;
  name: string;
  username: string;
  profileImage: any;
}

interface GroupInfoScreenProps {
  loading: boolean;
}

const GroupInfoScreen = (props: GroupInfoScreenProps) => {
  const [activeTab, setActiveTab] = useState<'Members (25)' | 'Leaderboard'>('Members (25)');
  const [isLeavePopupVisible, setIsLeavePopupVisible] = useState(false);

  // Sample member data
  const members: Member[] = [
    { 
      id: '1', 
      name: 'Courtney', 
      username: 'username', 
      profileImage: require('@/assets/images/andrew.png')
    },
    { 
      id: '2', 
      name: 'Courtney', 
      username: 'username', 
      profileImage: require('@/assets/images/andrew.png')
    },
    { 
      id: '31', 
      name: 'Courtney', 
      username: 'username', 
      profileImage: require('@/assets/images/andrew.png')
    },
  ];

  // Sample leaderboard data
  const leaderboardUsers = [
    {
      username: 'williamwang',
      point: { weekly_points: 100 },
      profile_picture: require('@/assets/images/andrew.png')
    },
    {
      username: 'TestUser',
      point: { weekly_points: 80 },
      profile_picture: require('@/assets/images/andrew.png')
    },
    {
      username: 'TestUser',
      point: { weekly_points: 60 },
      profile_picture: require('@/assets/images/andrew.png')
    },
    {
      username: 'TestUser',
      point: { weekly_points: 40 },
      profile_picture: require('@/assets/images/andrew.png')
    }
  ];

  const handleBack = () => {
    router.back();
  };

  const handleViewProfile = (memberId: string) => {
    console.log('View profile:', memberId);
    router.push(`/user/${memberId}`);
  };

  const handleLeaveClick = () => {
    setIsLeavePopupVisible(true);
  };

  const handleLeaveConfirm = () => {
    setIsLeavePopupVisible(false);
    router.back();
  };

  const handleTabChange = (tab: 'Members (25)' | 'Leaderboard') => {
    if (tab === 'Leaderboard') {
      //router.push('/chats/groups/groupleaderboard');
      setActiveTab('Leaderboard');
    } else {
      setActiveTab(tab);
    }
  };

  const renderContent = () => {
    if (activeTab === 'Members (25)') {
      return (
        <View style={styles.membersList}>
          {members.map((member) => (
            <View key={member.id} style={styles.memberCard}>
              <View style={styles.memberInfo}>
                <Image 
                  source={member.profileImage}
                  style={styles.profileImage}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.name}>{member.name}</Text>
                  <Text style={styles.username}>{member.username}</Text>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.viewProfileButton}
                onPress={() => handleViewProfile(member.id)}
              >
                <Text style={styles.viewProfileText}>View Profile</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      );
    } else {
      return (
        <View style={styles.leaderboardContainer}>
          <LeaderboardCard users={leaderboardUsers} />
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleBack}
          >
            <Image 
              source={require("@/assets/icons/backArrow.png")}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Teaching Assistants</Text>
        </View>
        <TouchableOpacity 
          style={styles.leaveButton}
          onPress={handleLeaveClick}
        >
          <Text style={styles.leaveButtonText}>Leave</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Members (25)' && styles.activeTab]}
          onPress={() => setActiveTab('Members (25)')}
        >
          <Text style={[styles.tabText, activeTab === 'Members (25)' && styles.activeTabText]}>
            Members (25)
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

      <LeavePopup
        isVisible={isLeavePopupVisible}
        onClose={() => setIsLeavePopupVisible(false)}
        onLeave={handleLeaveConfirm}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 65,
    backgroundColor: '#E0EDFD',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
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
  membersList: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  memberCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
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
  leaderboardContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
});

export default GroupInfoScreen;
