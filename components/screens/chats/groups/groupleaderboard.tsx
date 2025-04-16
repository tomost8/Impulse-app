import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  ScrollView,
  StatusBar,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import LeaderboardTabs from '@/components/ui/Leaderboard/LeaderboardTabs';

interface LeaderboardUser {
  id: string;
  rank: number;
  name: string;
  points: {
    points: number;
  };
  profileImage: any;
}

const GroupLeaderboardScreen = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'Weekly' | 'Monthly' | 'All Time'>('Weekly');

  // Updated sample data structure to match GraphQL schema
  const leaderboardData: LeaderboardUser[] = [
    { id: '1', rank: 1, name: 'Pedro', points: { points: 3645 }, profileImage: require('@/assets/images/andrew.png') },
    { id: '2', rank: 2, name: 'Andrew', points: { points: 3496 }, profileImage: require('@/assets/images/andrew.png') },
    { id: '3', rank: 3, name: 'Freida', points: { points: 3178 }, profileImage: require('@/assets/images/andrew.png') },
    { id: '4', rank: 4, name: 'Rodrigo', points: { points: 800 }, profileImage: require('@/assets/images/andrew.png') },
    { id: '5', rank: 5, name: 'Rodrigo', points: { points: 800 }, profileImage: require('@/assets/images/andrew.png') },
    { id: '6', rank: 6, name: 'Rodrigo', points: { points: 800 }, profileImage: require('@/assets/images/andrew.png') },
    { id: '7', rank: 7, name: 'Rodrigo', points: { points: 800 }, profileImage: require('@/assets/images/andrew.png') },
    { id: '8', rank: 8, name: 'Rodrigo', points: { points: 800 }, profileImage: require('@/assets/images/andrew.png') },
    { id: '9', rank: 9, name: 'Rodrigo', points: { points: 800 }, profileImage: require('@/assets/images/andrew.png') },
    { id: '10', rank: 10, name: 'Rodrigo', points: { points: 800 }, profileImage: require('@/assets/images/andrew.png') },
  ];

  const handleBack = () => {
    router.back();
  };

  const topThree = leaderboardData.slice(0, 3);
  const remainingUsers = leaderboardData.slice(3, 10);

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
          <Text style={styles.title}>Leaderboard</Text>
        </View>
        <View style={styles.periodSelector}>
          <Text style={styles.periodText}>{selectedPeriod}</Text>
          <TouchableOpacity>
            <Image 
              source={require("@/assets/icons/dropdown.png")}
              style={styles.dropdownIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Podium Section */}
        <View style={styles.podium}>
          {/* Second Place */}
          <View style={styles.podiumItem}>
            <Image source={leaderboardData[1].profileImage} style={styles.podiumImage} />
            <Text style={styles.podiumName}>{leaderboardData[1].name}</Text>
            <Text style={styles.podiumPoints}>{leaderboardData[1].points.points} Pts</Text>
            <View style={[styles.podiumPosition, styles.secondPlace]}>
              <Text style={styles.podiumNumber}>2</Text>
            </View>
          </View>

          {/* First Place */}
          <View style={[styles.podiumItem, styles.firstPlaceItem]}>
            <Image source={leaderboardData[0].profileImage} style={styles.podiumImage} />
            <Text style={styles.podiumName}>{leaderboardData[0].name}</Text>
            <Text style={styles.podiumPoints}>{leaderboardData[0].points.points} Pts</Text>
            <View style={[styles.podiumPosition, styles.firstPlace]}>
              <Text style={styles.podiumNumber}>1</Text>
            </View>
          </View>

          {/* Third Place */}
          <View style={styles.podiumItem}>
            <Image source={leaderboardData[2].profileImage} style={styles.podiumImage} />
            <Text style={styles.podiumName}>{leaderboardData[2].name}</Text>
            <Text style={styles.podiumPoints}>{leaderboardData[2].points.points} Pts</Text>
            <View style={[styles.podiumPosition, styles.thirdPlace]}>
              <Text style={styles.podiumNumber}>3</Text>
            </View>
          </View>
        </View>

        {/* Remaining Rankings */}
        <View style={styles.rankings}>
          {leaderboardData.slice(3, 10).map((user) => (
            <View key={user.id} style={styles.rankingItem}>
              <View style={styles.rankInfo}>
                <View style={styles.rankBadge}>
                  <Text style={styles.rankNumber}>{user.rank}</Text>
                </View>
                <Image source={user.profileImage} style={styles.rankImage} />
                <Text style={styles.rankName}>{user.name}</Text>
              </View>
              <Text style={styles.rankPoints}>{user.points.points}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    height: 65,
    backgroundColor: '#E0EDFD',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 10 : 0,
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
  periodSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DE728D',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 100,
  },
  periodText: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    color: '#FFFFFF',
    marginRight: 4,
  },
  dropdownIcon: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
    tintColor: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  podium: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  podiumItem: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  firstPlaceItem: {
    marginTop: -20,
  },
  podiumImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: 8,
  },
  podiumName: {
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#000000',
  },
  podiumPoints: {
    fontSize: 12,
    fontFamily: 'Open Sans',
    color: '#979797',
  },
  podiumPosition: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  firstPlace: {
    backgroundColor: '#DE728D',
  },
  secondPlace: {
    backgroundColor: '#979797',
  },
  thirdPlace: {
    backgroundColor: '#8B4513',
  },
  podiumNumber: {
    fontSize: 16,
    fontFamily: 'Open Sans',
    fontWeight: '600',
    color: '#FFFFFF',
  },
  rankings: {
    paddingHorizontal: 16,
  },
  rankingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  rankInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#DE728D',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rankNumber: {
    fontSize: 12,
    fontFamily: 'Open Sans',
    fontWeight: '600',
    color: '#FFFFFF',
  },
  rankImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  rankName: {
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#000000',
  },
  rankPoints: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    color: '#DE728D',
    fontWeight: '600',
  },
});

export default GroupLeaderboardScreen;
