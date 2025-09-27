import React from 'react';
import AuthWrapper from '@/contexts/AuthWrapper';
import { useDataProvider } from '@/contexts/DataProviderContext';
import BadgeListScreen from '@/components/screens/account/BadgeListScreen';

const DEBUG_BADGES_PAGE = true;
const USE_SAMPLE_BADGES = false;

// Sample badge data for testing
const SAMPLE_BADGES = [
  // Food badges - Level 1 (7 days)
  { badge: 'food_level_1_bronze', count: 1, length: 7 },
  { badge: 'food_level_1_silver', count: 2, length: 7 },
  // Food badges - Level 2 (14 days)
  { badge: 'food_level_2_gold', count: 2, length: 14 },
  // Food badges - Level 3 (21 days)
  { badge: 'food_level_3_diamond', count: 2, length: 21 },
  
  // Workout badges - Level 1 (7 days)
  { badge: 'workout_level_1_bronze', count: 1, length: 7 },
  { badge: 'workout_level_1_silver', count: 2, length: 7 },
  // Workout badges - Level 2 (14 days)
  { badge: 'workout_level_2_gold', count: 2, length: 14 },
  // Workout badges - Level 3 (21 days)
  { badge: 'workout_level_3_diamond', count: 2, length: 21 },
  
  // Studying badges - Level 1 (7 days)
  { badge: 'studying_level_1_bronze', count: 1, length: 7 },
  { badge: 'studying_level_1_silver', count: 2, length: 7 },
  // Studying badges - Level 2 (14 days)
  { badge: 'studying_level_2_gold', count: 2, length: 14 },
  // Studying badges - Level 3 (21 days)
  { badge: 'studying_level_3_diamond', count: 2, length: 21 },
  
  // Wellness badges - Level 1 (7 days)
  { badge: 'wellness_level_1_bronze', count: 1, length: 7 },
  { badge: 'wellness_level_1_silver', count: 2, length: 7 },
  // Wellness badges - Level 2 (14 days)
  { badge: 'wellness_level_2_gold', count: 2, length: 14 },
  // Wellness badges - Level 3 (21 days)
  { badge: 'wellness_level_3_diamond', count: 2, length: 21 },
  
  // Rise badges - Level 1 (7 days)
  { badge: 'rise_level_1_bronze', count: 1, length: 7 },
  { badge: 'rise_level_1_silver', count: 2, length: 7 },
  // Rise badges - Level 2 (14 days)
  { badge: 'rise_level_2_gold', count: 2, length: 14 },
  // Rise badges - Level 3 (21 days)
  { badge: 'rise_level_3_diamond', count: 2, length: 21 },
  
  // Passion badges - Level 1 (7 days)
  { badge: 'passion_level_1_bronze', count: 1, length: 7 },
  { badge: 'passion_level_1_silver', count: 2, length: 7 },
  // Passion badges - Level 2 (14 days)
  { badge: 'passion_level_2_gold', count: 2, length: 14 },
  // Passion badges - Level 3 (21 days)
  { badge: 'passion_level_3_diamond', count: 2, length: 21 },

  // Placeholder badges
  { badge: 'placeholder_badge_1', count: 2, length: 7 },
  { badge: 'placeholder_badge_2', count: 2, length: 14 },
  { badge: 'placeholder_badge_3', count: 2, length: 21 },
];

// Helper functions for challenge level and length mapping

const getBadgeKeyAndLength = (badge: any): { key: string; length: number } => {
  // Convert length to level number and extract day count
  const dayCount = parseInt(badge.length.replace('DAYS_', ''));
  let level = 1;
  if (dayCount >= 21) level = 3;
  if (dayCount >= 14) level = 2;
  
  const category = badge.category.toLowerCase();
  const key = `${category}_level_${level}_${badge.badgeLevel.toLowerCase()}`;
  return { key, length: dayCount };
};

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
  const badgeCountMap = new Map<string, { count: number; length: number }>();
  
  if (USE_SAMPLE_BADGES) {
    // Add sample test data for debugging
    SAMPLE_BADGES.forEach(({ badge, count, length }) => {
      const existing = badgeCountMap.get(badge) || { count: 0, length: length || 7 };
      badgeCountMap.set(badge, { count: existing.count + count, length: length || 7 });
    });
  } else {
    // Process real badge data
    badgeInfo.forEach((badge: any) => {
      const { key, length } = getBadgeKeyAndLength(badge);
      const existing = badgeCountMap.get(key) || { count: 0, length };
      badgeCountMap.set(key, { count: existing.count + 1, length });
    });
  }
  
  const badgeCount = Array.from(badgeCountMap.entries()).map(([badge, data]) => ({
    badge,
    count: data.count,
    length: data.length
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
