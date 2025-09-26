import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Image } from "react-native";
import { router } from 'expo-router';

import LoadingScreen from "@/components/ui/common/loading";
import { MemoriesGrid } from '@/components/features/posts';
import { ProfileHeader, PointGuideModal } from "@/components/features/account";

interface AccountProfileProps {
  user: any;
  isLoading: boolean;
  numCommunities: number;
  numFriends: number;
  badgeInfo: Array<{
    id: number;
    length: string;
    category: string;
    badgeLevel: string;
  }>;
  memories: any[];
}

function AccountMainScreen({ 
  user, 
  isLoading,
  numCommunities,
  numFriends,
  badgeInfo,
  memories
}: AccountProfileProps): JSX.Element {
  if (isLoading) {
    return <LoadingScreen />;
  }

  const [pointsModalVisible, setPointsModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
          bounces={true}
          alwaysBounceVertical={false}
          scrollEventThrottle={16}
          decelerationRate="normal"
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>My Account</Text>
            <View style={styles.headerButtons}>
              <TouchableOpacity 
                style={styles.headerButton}
                onPress={() => router.push('/account/referrals')}
              >
                <Image
                  source={require('@/assets/icons/referral.png')}
                  style={styles.headerIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.headerButton}
                onPress={() => router.push('/account/settings')}
              >
                <Image
                  source={require('@/assets/icons/setting.png')}
                  style={styles.headerIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
          <ProfileHeader user={user} />

          {/* Points Section */}
          <View style={styles.pointsContainer}>
            <View style={styles.pointsHeader}>
              <TouchableOpacity onPress={() => setPointsModalVisible(true)}>
                <Text style={styles.pointsGuide}>Point Earning Guide</Text>
              </TouchableOpacity>
              <Text style={styles.pointsValue}>{user.point?.spending_points} / 7.5k pts</Text>
            </View>
            <View style={styles.progressContainer}>
              <View 
                style={[
                  styles.progressBar,
                  { width: `${Math.min((user.point?.spending_points || 0) / 7500 * 100, 100)}%` }
                ]} 
              />
            </View>
            <TouchableOpacity onPress={() => router.push('/account/redeems')}>
              <Text style={styles.redeem}>Redeem</Text>
            </TouchableOpacity>
          </View>

          {/* Stats Section */}
          <View style={styles.statsContainer}>
            <TouchableOpacity onPress={() => router.push('/account/friends')} style={styles.statItem}>
              <Text style={styles.statNumber}>{numFriends}</Text>
              <Text style={styles.statLabel}>{numFriends === 1 ? 'Friend' : 'Friends'}</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity onPress={() => router.push('/account/badges')} style={styles.statItem}>
              <Text style={styles.statNumber}>{badgeInfo.length}</Text>
              <Text style={styles.statLabel}>{badgeInfo.length === 1 ? 'Badge' : 'Badges'}</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity onPress={() => router.push('/account/communities')} style={styles.statItem}>
              <Text style={styles.statNumber}>{numCommunities}</Text>
              <Text style={styles.statLabel}>{numCommunities === 1 ? 'Community' : 'Communities'}</Text>
            </TouchableOpacity>
          </View>


          {/* Memories Section */}
          <MemoriesGrid memories={memories || []} />
        </ScrollView>

        {/* Points Guide Modal */}
        <PointGuideModal
          visible={pointsModalVisible}
          onClose={() => setPointsModalVisible(false)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  /* Main Container & Layout */
  safeArea: {
    flex: 1,
    backgroundColor: '#E0EDFD',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 100,
  },

  /* Header */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E0EDFD',
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 20,
    paddingTop: 2,
    marginBottom: -8,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#242020',
  },
  headerButtons: {
    flexDirection: 'row',
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },


  /* Points */
  pointsContainer: {
    paddingHorizontal: 20,
    marginTop: 35,
  },
  pointsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  pointsGuide: {
    fontFamily: 'Open Sans',
    fontSize: 11,
    fontWeight: '700',
    color: '#DE728D',
    textDecorationLine: 'underline',
    paddingBottom: 3,
  },
  pointsValue: {
    fontFamily: 'Open Sans',
    fontSize: 10,
    color: '#000',
  },
  progressContainer: {
    backgroundColor: '#faeaee',
    borderRadius: 10,
    height: 11,
    width: '100%',
  },
  progressBar: {
    backgroundColor: '#de728d',
    borderRadius: 10,
    height: 11,
    width: '68%',
  },
  redeem: {
    color: '#DE728D',
    fontSize: 11,
    fontFamily: 'Open Sans',
    fontWeight: '700',
    textDecorationLine: 'underline',
    textAlign: 'right',
    marginTop: 7,
  },

  // ===== STATS SECTION =====
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 65,
    borderColor: '#fff0f1',
    borderWidth: 2,
    borderRadius: 20,
    marginTop: 28,
    marginHorizontal: 20,
    padding: 15,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  statNumber: {
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  statLabel: {
    fontFamily: 'Open Sans',
    fontSize: 13,
    color: '#000',
    marginTop: 5,
  },
  divider: {
    width: 1,
    height: 47,
    backgroundColor: '#d9d9d9',
  },

});

export default AccountMainScreen;