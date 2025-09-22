/*
 * Goals Feature Components
 * ========================
 * 
 * ENTRY POINTS:
 * - components/features/profile/DailyGoals.tsx → DailyGoals
 * 
 * - app/(tabs)/home/index.tsx → HomeScreen
 * - components/screens/home/AddActivitiesScreen.tsx → AddActivitiesScreen
 * - components/screens/home/ViewActivitiesScreen.tsx → ViewActivitiesScreen
 * - components/screens/home/ViewChallengesScreen.tsx → ViewChallengesScreen
 * 
 * - components/screens/camera/SelectActivityModal.tsx → SelectActivityModal
 * - components/features/goals/activities/SetupActivitiesModal.tsx → SetupActivitiesModal
 * 
 * COMPONENT HIERARCHY:
 * 
 * profile/DailyGoals
 * └── ActivityCard
 * 
 * HomeScreen
 * ├── ActivitiesSection
 * │   ├── ActivityCard
 * │   └── EmptyActivitiesState
 * └── ChallengesSection
 *     ├── HomeActiveChallenge
 *     └── HomeCompletedChallenge
 * 
 * AddActivitiesScreen
 * └── AddActivityCard
 *     └── ActivityDetails
 * 
 * ViewActivitiesScreen
 * └── EditActivityCard
 *     └── ActivityDetails
 * 
 * ViewChallengesScreen
 * ├── ViewActiveChallenge
 * └── ViewCompletedChallenge
 * 
 * SetupActivitiesModal
 * └── AddActivityCard
 *     └── ActivityDetails
 * 
 * SelectActivityModal
 * └── PostActivityCard
 * 
 */

// HomeScreen Components
export { default as ActivitiesSection } from './activities/ActivitiesSection';
export { default as ChallengesSection } from './challenges/ChallengesSection';

// Activity Cards
export { default as ActivityCard } from './activities/cards/ActivityCard';
export { default as AddActivityCard } from './activities/cards/AddActivityCard';
export { default as EditActivityCard } from './activities/cards/EditActivityCard';
export { default as PostActivityCard } from './activities/cards/PostActivityCard';

// Challenge Cards
export { default as HomeActiveChallenge } from './challenges/cards/HomeActiveChallenge';
export { default as HomeCompletedChallenge } from './challenges/cards/HomeCompletedChallenge';
export { default as ViewActiveChallenge } from './challenges/cards/ViewActiveChallenge';
export { default as ViewCompletedChallenge } from './challenges/cards/ViewCompletedChallenge';
export { default as ExploreChallenge } from './challenges/cards/ExploreChallenge';

// Modals
export { default as SetupActivitiesModal } from './activities/SetupActivitiesModal';
export { default as RequireActivitiesModal } from './activities/RequireActivitiesModal'; 
