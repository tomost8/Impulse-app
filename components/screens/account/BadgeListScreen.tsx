import React from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Image } from "react-native";
import { router } from 'expo-router';
import LoadingScreen from '@/components/ui/common/loading';
import Header from '@/components/ui/common/headers/Header';

import { ProfileHeader } from '@/components/features/account';
import { badgeImages } from '@/utils/challengeUtils';

interface BadgeCount {
  badge: string;
  count: number;
}

interface BadgeListScreenProps {
  user: any;
  badgeCount: BadgeCount[];
  isLoading: boolean;
}

function BadgeListScreen({ user, badgeCount, isLoading }: BadgeListScreenProps): JSX.Element {
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <Header 
        title="My Badges" 
        onBackPress={() => router.back()} 
      />
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
          bounces={true}
          alwaysBounceVertical={false}
          scrollEventThrottle={16}
          decelerationRate="normal"
        >
          <ProfileHeader user={user} />

          {/* Badges Section */}
          <View style={styles.badgeContainer}>
            {badgeCount.map((badgeItem, index) => {
              const badgeImage = badgeImages[badgeItem.badge];
              return (
                <View key={badgeItem.badge} style={styles.badgeItem}>
                  {badgeImage ? (
                    <Image source={badgeImage} style={styles.badgeImage} />
                  ) : (
                    <View style={styles.badgePlaceholder}>
                      <Text style={styles.badgePlaceholderText}>?</Text>
                    </View>
                  )}
                  {badgeItem.count > 1 && (
                    <View style={styles.badgeCount}>
                      <Text style={styles.badgeCountText}>{badgeItem.count}×</Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
          
          {badgeCount.length === 0 && (
            <Text style={styles.emptyText}>No badges yet</Text>
          )}
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
    marginHorizontal: 20,
    gap: 16,
    //borderColor: 'blue',
    //borderWidth: 1,
  },
  badgeItem: {
    position: 'relative',
  },
  badgeImage: {
    width: 70,
    height: 60,
    resizeMode: 'contain',
    //borderColor: 'blue',
    //borderWidth: 1,
  },
  badgeCount: {
    position: 'absolute',
    top: 2,
    right: 10,
    backgroundColor: '#FE6D73',
    borderRadius: 10.5,
    width: 21,
    height: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeCountText: {
    color: '#ffffff',
    fontSize: 11,
    fontFamily: 'Poppins',
    fontWeight: '600',
  },

  /* Placeholders */
  badgePlaceholder: {
    width: 70,
    height: 60,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  badgePlaceholderText: {
    fontSize: 24,
    color: '#6c757d',
    fontFamily: 'Poppins',
    fontWeight: '600',
  },
  emptyText: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default BadgeListScreen;