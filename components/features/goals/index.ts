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
 * - components/features/goals/activities/dailyaddpopup.tsx → DailyAddPopup
 * - components/features/profile/DailyGoals.tsx → DailyGoals
 * 
 * COMPONENT HIERARCHY:
 * 
 * HomeScreen (screens/home/HomeScreen.tsx)
 * └── ActivitiesSection
 *     ├── ActivityCard
 *     └── AddDailyGoalsBox
 * 
 * AddActivitiesScreen (screens/home/AddActivitiesScreen.tsx)
 * ├── AddActivityCard
 * │   └── ActivityDetails
 * └── ConfirmGoalButton
 * 
 * ViewActivitiesScreen (screens/home/ViewActivitiesScreen.tsx)
 * ├── EditActivityCard
 * │   └── ActivityDetails
 * └── AddNewGoalButton
 * 
 * SelectActivityModal (screens/camera/SelectActivityModal.tsx)
 * └── PostActivityCard
 * 
 * DailyAddPopup (features/goals/activities/dailyaddpopup.tsx)
 * └── AddActivityCard
 *     └── ActivityDetails
 */

// Core Components
export { default as ActivityCard } from './activities/ActivityCard';

// HomeScreen Components
export { default as ActivitiesSection } from './activities/ActivitiesSection';
export { default as ChallengesSection } from './challenges/ChallengesSection';

// AddActivitiesScreen Components
export { default as AddActivityCard } from './activities/AddActivityCard';
export { default as ConfirmGoalButton } from './activities/ConfirmGoalButton';

// ViewActivitiesScreen Components
export { default as EditActivityCard } from './activities/EditActivityCard';
export { default as AddNewGoalButton } from './activities/AddNewGoalButton';

// Modal-related Components
export { default as CameraPopup } from './activities/camerapopup';
export { default as DailyAddPopup } from './activities/dailyaddpopup';
export { default as PostActivityCard } from './activities/PostActivityCard';

// Additional Components:
// - AddDailyGoalsBox (used by ActivitiesSection)
// - ActivityDetails (used by AddActivityCard and EditActivityCard)
