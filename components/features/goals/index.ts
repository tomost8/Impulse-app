/*
 * Goals Feature Components
 * ========================
 * 
 * ENTRY POINTS:
 * - app/(tabs)/home/index.tsx → HomeScreen
 * - components/screens/home/AddActivitiesScreen.tsx → AddActivitiesScreen
 * - components/screens/home/ViewActivitiesScreen.tsx → ViewActivitiesScreen
 * 
 * - components/screens/camera/SelectActivityModal.tsx → SelectActivityModal
 * - components/features/goals/activities/SetupActivitiesModal.tsx → SetupActivitiesModal
 * - components/features/profile/DailyGoals.tsx → DailyGoals
 * 
 * COMPONENT HIERARCHY:
 * 
 * profile/DailyGoals
 * └── ActivityCard
 * 
 * HomeScreen
 * └── ActivitiesSection
 *     ├── ActivityCard
 *     └── EmptyActivitiesState
 * 
 * AddActivitiesScreen
 * └── AddActivityCard
 *     └── ActivityDetails
 * 
 * ViewActivitiesScreen
 * └── EditActivityCard
 *     └── ActivityDetails
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

// Modals
export { default as SetupActivitiesModal } from './activities/SetupActivitiesModal';
export { default as RequireActivitiesModal } from './activities/RequireActivitiesModal'; 
