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
  length?: number; // Challenge length in days (e.g., 7, 14, 21)
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

  // Group badges by length
  const challengeLengths = [7, 14, 21];

  const badgesByLength = badgeCount.reduce((groups, badgeItem) => {
    const length = badgeItem.length || 0;
    if (!groups[length]) {
      groups[length] = [];
    }
    groups[length].push(badgeItem);
    return groups;
  }, {} as Record<number, BadgeCount[]>);

  const renderBadgeSection = (length: number) => {
    const badges = badgesByLength[length] || [];
    
    return (
      <View key={length} style={styles.badgeSection}>
        <Text style={styles.sectionTitle}>{length} Day Challenges</Text>
        <View style={styles.badgeContainer}>
          {badges.length > 0 ? (
            badges.map((badgeItem: BadgeCount) => {
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
            })
          ) : (
            <Text style={styles.emptySectionText}>No badges earned</Text>
          )}
        </View>
      </View>
    );
  };

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

          {/* Badge Sections */}
          {challengeLengths.map(renderBadgeSection)}
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

  /* Badge Section */
  badgeSection: {
    marginTop: 0,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Lato',
    fontWeight: '700',
    color: '#333333',
    textAlign: 'left',
    marginBottom: 15,
    marginHorizontal: 20,
  },
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
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
  emptySectionText: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Open Sans',
    color: '#5E6676',
    textAlign: 'center',
    marginTop: 20,
  },
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
});

export default BadgeListScreen;