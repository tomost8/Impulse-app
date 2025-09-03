import React from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Text } from 'react-native';
import TopBar from '@/components/ui/SocialPage/Communities/home/topbar';
import Header from '@/components/ui/SocialPage/Communities/home/header';
import About from '@/components/ui/SocialPage/Communities/home/about';
import Announcement from '@/components/ui/SocialPage/Communities/home/announcement';
import MembersList from '@/components/ui/SocialPage/Communities/home/memberslist';
import { router } from 'expo-router';

interface CommunityMainScreenProps {
  community: any;
  members: any[];
  announcements: any[];
  isAdmin: boolean;
  isMember: boolean;
  onJoinCommunity: () => void;
  isJoining: boolean;
}

const CommunityMainScreen: React.FC<CommunityMainScreenProps> = ({
  community,
  members,
  announcements,
  isAdmin,
  isMember,
  onJoinCommunity,
  isJoining
}) => {
  const handleLeaderboardPress = () => {
    // Handle leaderboard navigation
    router.push(`/community/${community?.id}/leaderboard`);
  };

  const handleViewAllAnnouncements = () => {
    // Handle view all announcements
    router.push(`/community/${community?.id}/announcements`);
  };

  const handleMakeAnnouncement = () => {
    // Handle make announcement
    router.push(`/community/${community?.id}/announcements`);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.headerContainer}>
          <View style={styles.headerContent}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Image 
                source={require("@/assets/icons/backArrow.png")}
                style={styles.backIcon}
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Community</Text>
            <TouchableOpacity 
              style={styles.leaderboardButton}
              onPress={handleLeaderboardPress}
            >
              <Image 
                source={require("@/assets/icons/leaderboard.png")}
                style={styles.leaderboardIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Header
          thumbnail={community?.thumbnail}
          name={community?.name || "Community Name"}
          memberCount={members?.length || 0}
          communityId={community?.id}
          isAdmin={isAdmin}
          isMember={isMember}
          onJoinCommunity={onJoinCommunity}
          isJoining={isJoining}
        />
        <About
          description={community?.description}
          founderName={community?.influencer?.first_name + " " + community?.influencer?.last_name}
          founderBio={community?.influencer?.bio}
          founderImage={community?.influencer?.profile_picture}
        />
        <Announcement
          announcement={announcements[0]?.content}
          onViewAll={handleViewAllAnnouncements}
          onMakeAnnouncement={handleMakeAnnouncement}
          isAdmin={isAdmin}
        />
        <MembersList
          members={members}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: '#E0EDFD',
    paddingTop: 45, // Add padding for status bar
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // This will space out the elements
  },
  backButton: {
    padding: 5, // Smaller hit area
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    width: 12,
    height: 16,
    tintColor: '#242020',
  },
  headerTitle: {
    flex: 1, // This will push the leaderboard icon to the right
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#242020',
    marginLeft: 12,
  },
  leaderboardButton: {
    padding: 5, // Smaller hit area
  },
  leaderboardIcon: {
    width: 24,
    height: 24,
    tintColor: '#DE728D',
  },
});

export default CommunityMainScreen;
