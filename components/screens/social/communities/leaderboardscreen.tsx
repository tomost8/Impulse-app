import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import LeaderboardPodium from '@/components/ui/Leaderboard/LeaderboardPodium';
import LeaderboardList from '@/components/ui/Leaderboard/LeaderboardList';

interface LeaderboardScreenProps {
  communityId: string;
  communityName?: string;
}

const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({
  communityId,
  communityName = "Community"
}) => {
  // Sample data - replace with real data later
  const leaderboardData = [
    { id: '1', name: 'Pedro', points: 3645, rank: 1, profileImage: require('@/assets/images/andrew.png') },
    { id: '2', name: 'Andrew', points: 3496, rank: 2, profileImage: require('@/assets/images/andrew.png') },
    { id: '3', name: 'Freida', points: 3178, rank: 3, profileImage: require('@/assets/images/andrew.png') },
    { id: '4', name: 'Rodrigo', points: 800, rank: 4, profileImage: require('@/assets/images/andrew.png') },
    { id: '5', name: 'Rodrigo', points: 800, rank: 5, profileImage: require('@/assets/images/andrew.png') },
    { id: '6', name: 'Rodrigo', points: 800, rank: 6, profileImage: require('@/assets/images/andrew.png') },
    { id: '7', name: 'Rodrigo', points: 800, rank: 7, profileImage: require('@/assets/images/andrew.png') },
    { id: '8', name: 'Rodrigo', points: 800, rank: 8, profileImage: require('@/assets/images/andrew.png') },
  ];

  const topThree = leaderboardData.slice(0, 3);
  const remainingUsers = leaderboardData.slice(3);

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Image 
            source={require("@/assets/icons/backArrow.png")}
            style={styles.backIcon}
          />
          <Text style={styles.pageTitle}>Leaderboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.weeklyButton}>
          <Text style={styles.weeklyText}>Weekly</Text>
          <Image 
            source={require("@/assets/icons/chevronDown.png")}
            style={styles.chevronIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Podium Section */}
      <LeaderboardPodium users={topThree} />

      {/* List Section */}
      <LeaderboardList users={remainingUsers} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topBar: {
    height: 65,
    backgroundColor: '#E0EDFD',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  backIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    tintColor: '#242020',
  },
  pageTitle: {
    fontSize: 16,
    fontFamily: 'Poppins',
    color: '#242020',
  },
  weeklyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DE728D',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 100,
    gap: 4,
  },
  weeklyText: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    color: '#FFFFFF',
  },
  chevronIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    tintColor: '#FFFFFF',
  },
});

export default LeaderboardScreen;
