import React from 'react';
import AuthWrapper from '@/contexts/AuthWrapper';
import { useDataProvider } from '@/contexts/DataProviderContext';
import BadgeListScreen from '@/components/screens/account/BadgeListScreen';

const DEBUG_BADGES_PAGE = true;
const USE_SAMPLE_BADGES = false;

// Sample badge data for testing
const SAMPLE_BADGES = [
  // Food badges
  { badge: 'food_level_1_bronze', count: 1 },
  { badge: 'food_level_1_silver', count: 2 },
  { badge: 'food_level_2_gold', count: 2 },
  { badge: 'food_level_3_diamond', count: 2 },
  
  // Workout badges
  { badge: 'workout_level_1_bronze', count: 1 },
  { badge: 'workout_level_1_silver', count: 2 },
  { badge: 'workout_level_2_gold', count: 2 },
  { badge: 'workout_level_3_diamond', count: 2 },
  
  // Studying badges
  { badge: 'studying_level_1_bronze', count: 1 },
  { badge: 'studying_level_1_silver', count: 2 },
  { badge: 'studying_level_2_gold', count: 2 },
  { badge: 'studying_level_3_diamond', count: 2 },
  
  // Wellness badges
  { badge: 'wellness_level_1_bronze', count: 1 },
  { badge: 'wellness_level_1_silver', count: 2 },
  { badge: 'wellness_level_2_gold', count: 2 },
  { badge: 'wellness_level_3_diamond', count: 2 },
  
  // Rise badges
  { badge: 'rise_level_1_bronze', count: 1 },
  { badge: 'rise_level_1_silver', count: 2 },
  { badge: 'rise_level_2_gold', count: 2 },
  { badge: 'rise_level_3_diamond', count: 2 },
  
  // Passion badges
  { badge: 'passion_level_1_bronze', count: 1 },
  { badge: 'passion_level_1_silver', count: 2 },
  { badge: 'passion_level_2_gold', count: 2 },
  { badge: 'passion_level_3_diamond', count: 2 },

  // Placeholder badge (badge that doesn't exist in badgeImages)
  { badge: 'placeholder_badge_1', count: 2 },
  { badge: 'placeholder_badge_2', count: 2 },
  { badge: 'placeholder_badge_3', count: 2 },
];

const BadgesPage = () => {
  const { user, fetching, challenges } = useDataProvider();

  // Debug logging
  if (DEBUG_BADGES_PAGE && challenges) {
    const activeChallengesLog = challenges.activeChallenges?.map((challenge: any, index: number) => {
      const processedChallenge = {
        id: challenge.userChallenge.id,
        length: challenge.userChallenge.challenge.length,
        category: challenge.userChallenge.challenge.category,
        status: challenge.userChallenge.status,
        badgesEarned: challenge.badgesEarned?.length || 0
      };
      return `Active ${index + 1}: ${JSON.stringify(processedChallenge)}`;
    }).join('\n  - ') || 'None';
    
    const completedChallengesLog = challenges.completedChallenges?.map((challenge: any, index: number) => {
      const processedChallenge = {
        id: challenge.userChallenge.id,
        length: challenge.userChallenge.challenge.length,
        category: challenge.userChallenge.challenge.category,
        status: challenge.userChallenge.status,
        badgeLevel: challenge.userChallenge.badge_level,
        badgesEarned: challenge.badgesEarned?.length || 0
      };
      return `Completed ${index + 1}: ${JSON.stringify(processedChallenge)}`;
    }).join('\n  - ') || 'None';
    
    console.log(`Challenges data:\n  - ${activeChallengesLog}\n  - ${completedChallengesLog}`);
  }

  // Calculate badge info from completed challenges only
  const badgeInfo = challenges?.completedChallenges
    ?.filter((challenge: any) => (challenge.badgesEarned?.length || 0) > 0)
    ?.map((challenge: any) => ({
      id: challenge.userChallenge.id,
      length: challenge.userChallenge.challenge.length,
      category: challenge.userChallenge.challenge.category,
      badgeLevel: challenge.userChallenge.badge_level
    })) || [];

  // Count occurrences of each badge type and create badge count array
  const badgeCountMap = new Map<string, number>();
  
  if (USE_SAMPLE_BADGES) {
    // Add sample test data for debugging
    SAMPLE_BADGES.forEach(({ badge, count }) => {
      badgeCountMap.set(badge, (badgeCountMap.get(badge) || 0) + count);
    });
  } else {
    // Process real badge data
    badgeInfo.forEach((badge: any) => {
      // Convert length to level number
      const dayCount = parseInt(badge.length.split(' ')[0]);
      let level = 1;
      if (dayCount >= 14) level = 2;
      if (dayCount >= 30) level = 3;
      
      // Normalize category name
      let category = badge.category.toLowerCase();
      
      // Create the correct key format for badgeImages
      const key = `${category}_level_${level}_${badge.badgeLevel.toLowerCase()}`;
      badgeCountMap.set(key, (badgeCountMap.get(key) || 0) + 1);
    });
  }
  
  const badgeCount = Array.from(badgeCountMap.entries()).map(([badge, count]) => ({
    badge,
    count
  }));

  if (DEBUG_BADGES_PAGE && !fetching) {
    console.log(`Rendering BadgesPage:` +
      `\n  - badgeInfo:`, badgeInfo, 
      `\n  - badgeCount:`, badgeCount
    );
  }

  return <BadgeListScreen 
    isLoading={fetching}
    user={user} 
    badgeCount={badgeCount} 
  />;
};

export default AuthWrapper(BadgesPage);
