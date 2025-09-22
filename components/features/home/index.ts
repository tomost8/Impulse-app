/*
 * Home Feature Components
 * =======================
 * 
 * ENTRY POINTS:
 * - app/(tabs)/home/index.tsx → HomeScreen
 * 
 * COMPONENT HIERARCHY:
 * 
 * HomeScreen (screens/home/HomeScreen.tsx)
 * ├── HomeHeader
 * │   ├── Greeting
 * │   ├── StreakBadge
 * │   └── StreakTracker
 * ├── QuoteOfTheDay
 * │   └── QuoteCard
 * ├── ActivitiesSection (from features/goals/activities/ActivitiesSection)
 * ├── ChallengesSection (from features/goals/challenges/ChallengesSection)
 * └── LeaderboardFull (from features/leaderboard/homeLeaderboard/LeaderboardFull)
 */

export { default as HomeHeader } from './HomeHeader';
export { default as QuoteofDay } from './QuoteofDay';

// Internal components:
// - Greeting (used by HomeHeader)
// - StreakBadge (used by HomeHeader)
// - StreakTracker (used by HomeHeader)
// - QuoteCard (used by QuoteOfTheDay)
