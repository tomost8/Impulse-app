import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Image } from "react-native";
import { router } from 'expo-router';
import { getLabelByCategory } from '@/utils/goals';

import LoadingScreen from "@/components/ui/common/loading";
import Bio from '@/components/features/profile/Bio';
import Memories from '@/components/features/memories/Memories';
import PointGuideModal from "./PointGuideModal";

interface AccountProfileProps {
  user: any;
  isLoading: boolean;
  numCommunities: number;
  numFriends: number;
  memories: any[];
}

function AccountProfile({ 
  user, 
  isLoading,
  numCommunities,
  numFriends,
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
          showsVerticalScrollIndicator={false}
          bounces={true}
          alwaysBounceVertical={false}
          scrollEventThrottle={16}
          decelerationRate="normal"
        >
          <View style={styles.headerExtension}>
            <View style={styles.headerRow}>
              <Text style={styles.headerTitle}>My Account</Text>
              <TouchableOpacity 
                style={styles.settingsButton}
                onPress={() => router.push('/account/settings')}
              >
                <Image
                  source={require('@/assets/icons/setting.png')}
                  style={styles.settingsIcon}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Custom Header Section */}
          <View style={styles.headerContainer}>
            {/* Crescent Background */}
            <View style={styles.crescentContainer}>
              <View style={styles.crescent} />
            </View>

            {/* Profile Section */}
            <View style={styles.profileSection}>
              <Image
                source={{ uri: user.profile_picture }}
                style={styles.profileImage}
              />
              <Text style={styles.profileName}>{user.first_name} {user.last_name}</Text>
              <Text style={styles.username}>@{user.username}</Text>
            </View>
          </View>

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
            <TouchableOpacity onPress={() => router.push('/account/communities')} style={styles.statItem}>
              <Text style={styles.statNumber}>{numCommunities}</Text>
              <Text style={styles.statLabel}>Communities</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity onPress={() => router.push('/account/friends')} style={styles.statItem}>
              <Text style={styles.statNumber}>{numFriends}</Text>
              <Text style={styles.statLabel}>Friends</Text>
            </TouchableOpacity>
          </View>

          {/* Bio Section - Temporarily Removed */}
          {/* <Bio 
            bioText={user.bio}
            primaryActivity={getLabelByCategory(user.primary_goal)}
            secondaryActivity={getLabelByCategory(user.secondary_goal)}
            gender={user.gender}
            timezone={user.timezone}
          /> */}

          {/* Memories Section */}
          <Memories memories={memories || []} />
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
  safeArea: {
    flex: 1,
    backgroundColor: '#E0EDFD',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerExtension: {
    backgroundColor: '#E0EDFD',
    width: '100%',
  },
  scrollView: {
    flex: 1,
  },
  headerContainer: {
    position: 'relative',
    paddingBottom: 16,
  },
  crescentContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 2,
    marginBottom: -8, 
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#242020',
  },
  settingsButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 60,
    zIndex: 1,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileName: {
    fontSize: 24,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#242020',
    marginTop: 16,
  },
  username: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    color: '#979797',
    marginTop: 4,
  },
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff0f1',
    borderRadius: 20,
    marginTop: 28,
    marginHorizontal: 20,
    padding: 15,
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  statNumber: {
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  statLabel: {
    fontFamily: 'Open Sans',
    fontSize: 14,
    color: '#000',
    marginTop: 5,
  },
  divider: {
    width: 1,
    height: 47,
    backgroundColor: '#d9d9d9',
    marginHorizontal: 33,
  },
  crescent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 500,
    borderBottomLeftRadius: 800,
    borderBottomRightRadius: 800,
    backgroundColor: '#E0EDFD',
    transform: [
      { scaleX: 1.3 },
      { translateY: -380 },
    ],
  },
});

export default AccountProfile;