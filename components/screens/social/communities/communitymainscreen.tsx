import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import TopBar from '@/components/ui/SocialPage/Communities/home/topbar';
import Header from '@/components/ui/SocialPage/Communities/home/header';
import About from '@/components/ui/SocialPage/Communities/home/about';
import Announcement from '@/components/ui/SocialPage/Communities/home/announcement';
import MembersList from '@/components/ui/SocialPage/Communities/home/memberslist';
import { router } from 'expo-router';

interface CommunityMainScreenProps {
  community: any;
  members: any[];
  isAdmin: boolean;
}

const CommunityMainScreen: React.FC<CommunityMainScreenProps> = ({
  community,
  members,
  isAdmin
}) => {
  console.log(members);

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
    <SafeAreaView style={styles.container}>
      <TopBar onLeaderboardPress={handleLeaderboardPress} />
      <ScrollView>
        <Header
          thumbnail={community?.thumbnail}
          name={community?.name || "Community Name"}
          memberCount={members?.length || 0}
          communityId={community?.id}
        />
        <About
          description={community?.description}
          founderName={community?.influencer?.first_name + " " + community?.influencer?.last_name}
          founderBio={community?.influencer?.bio}
          founderImage={community?.influencer?.profile_picture}
        />
        <Announcement
          onViewAll={handleViewAllAnnouncements}
          onMakeAnnouncement={handleMakeAnnouncement}
        />
        <MembersList
          members={members}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default CommunityMainScreen;
