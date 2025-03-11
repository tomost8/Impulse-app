import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import TopBar from '@/components/ui/SocialPage/Communities/home/topbar';
import Header from '@/components/ui/SocialPage/Communities/home/header';
import About from '@/components/ui/SocialPage/Communities/home/about';
import Announcement from '@/components/ui/SocialPage/Communities/home/announcement';
import MembersList from '@/components/ui/SocialPage/Communities/home/memberslist';

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
  const handleLeaderboardPress = () => {
    // Handle leaderboard navigation
    console.log('Navigate to leaderboard');
  };

  const handleEdit = () => {
    // Handle community edit
    console.log('Edit community');
  };

  const handleViewAllAnnouncements = () => {
    // Handle view all announcements
    console.log('View all announcements');
  };

  const handleMakeAnnouncement = () => {
    // Handle make announcement
    console.log('Make announcement');
  };

  const handleViewProfile = (memberId: string) => {
    // Handle view profile navigation
    console.log('View profile:', memberId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopBar onLeaderboardPress={handleLeaderboardPress} />
      <ScrollView>
        <Header
          name={community?.name || "Community Name"}
          memberCount={members?.length || 25}
          communityId={community?.id}
        />
        <About
          description="Lorem ipsum dolor sit amet consectetur. Arcu elit mi fringilla pharetra morbi eget ultrices cursus. Habitant ut eu sapien etiam. Tortor lorem eget tincidunt scelerisque."
          founderName="Founder Name"
          founderBio="Lorem ipsum dolor sit amet consectetur. Bibendum vestibulum purus sed gravida aenean. At amet."
        />
        <Announcement
          onViewAll={handleViewAllAnnouncements}
          onMakeAnnouncement={handleMakeAnnouncement}
        />
        <MembersList
          onViewProfile={handleViewProfile}
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
