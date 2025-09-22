import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { CommunityHeader, CommunityProfile, About, Announcement, MembersList } from '@/components/features/communities';
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
      <CommunityHeader onLeaderboardPress={handleLeaderboardPress} />
      <CommunityProfile
        thumbnail={community?.thumbnail}
        name={community?.name || "Community Name"}
        memberCount={members?.length || 0}
        communityId={community?.id}
        isAdmin={isAdmin}
        isMember={isMember}
        onJoinCommunity={onJoinCommunity}
        isJoining={isJoining}
      />
      <ScrollView style={styles.scrollView}>
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
});

export default CommunityMainScreen;
