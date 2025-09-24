/*
 * Goals Feature Components
 * ========================
 * 
 * ENTRY POINTS:
 * - components/features/profile/DailyGoals.tsx → DailyGoals
 * 
 * - app/(tabs)/home/index.tsx → HomeScreen
 * - app/(tabs)/home/viewActivity.tsx → ViewActivitiesScreen
 * - app/(tabs)/home/addActivity.tsx → AddActivitiesScreen
 * - app/(tabs)/home/challenges/index.tsx → ViewChallengesScreen
 * - app/(tabs)/home/challenges/addChallenge.tsx → AddChallengeScreen
 * 
 * - app/(tabs)/camera/displayPicture.tsx → DisplayPictureScreen → SelectActivityModal
 * 
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
 * ├── ChallengesSection
 * │   ├── HomeActiveChallenge
 * │   └── HomeCompletedChallenge
 * └── SetupActivitiesModal
 *     └── AddActivityCard
 *         └── ActivityDetails
 * 
 * ViewActivitiesScreen
 * └── EditActivityCard
 *     └── ActivityDetails
 * 
 * AddActivitiesScreen
 * └── AddActivityCard
 *     └── ActivityDetails
 * 
 * ViewChallengesScreen
 * ├── ViewActiveChallenge
 * ├── ViewCompletedChallenge
 * └── WelcomeModal
 * 
 * AddChallengeScreen
 * └── ExploreChallenge
 * 
 * SelectActivityModal
 * └── PostActivityCard
 * 
 */

// HomeScreen Components
export { default as ActivitiesSection } from './activities/ActivitiesSection';
export { default as ChallengesSection } from './challenges/ChallengesSection';
export { default as SetupActivitiesModal } from './activities/SetupActivitiesModal';

// Activities
export { default as ActivityCard } from './activities/cards/ActivityCard';
export { default as AddActivityCard } from './activities/cards/AddActivityCard';
export { default as EditActivityCard } from './activities/cards/EditActivityCard';
export { default as PostActivityCard } from './activities/cards/PostActivityCard';

// Challenges
export { default as ViewActiveChallenge } from './challenges/cards/ViewActiveChallenge';
export { default as ViewCompletedChallenge } from './challenges/cards/ViewCompletedChallenge';
export { default as WelcomeModal } from './challenges/WelcomeModal'; 
export { default as ExploreChallenge } from './challenges/cards/ExploreChallenge';

// Modals
export { default as RequireActivitiesModal } from './activities/RequireActivitiesModal';
