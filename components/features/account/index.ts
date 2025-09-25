/*
 * Account Feature Components
 * ==========================
 * 
 * MAIN ACCOUNT ENTRY POINTS:
 * - app/(tabs)/account/index.tsx → AccountMainScreen
 * - app/(tabs)/account/redeems.tsx → RedeemScreen
 * - app/(tabs)/account/referrals.tsx → ReferralScreen
 * - app/(tabs)/account/communities.tsx → CommunityListScreen
 * - app/(tabs)/account/friends.tsx → FriendListScreen
 * 
 * MAIN ACCOUNT COMPONENT HIERARCHY:
 * 
 * AccountMainScreen (screens/account/AccountMainScreen.tsx)
 * ├── PointGuideModal (from rewards/)
 * └── MemoriesGrid (from features/posts)
 * 
 * RedeemScreen (screens/account/RedeemScreen.tsx)
 * ├── PointsDisplay (from rewards/)
 * ├── RewardItem (from rewards/, multiple instances)
 * └── RedeemRewardPopup (from rewards/)
 *     └── RedeemedModal (from rewards/)
 * 
 * ReferralScreen (screens/account/ReferralScreen.tsx)
 * ├── ReferralIllustration (from referrals/)
 * └── ReferralLinkBox (from referrals/)
 * 
 * FriendListScreen (screens/account/FriendListScreen.tsx)
 * └── FriendRemoveModal
 * 
 * CommunityListScreen (screens/account/CommunityListScreen.tsx)
 * └── CommunityLeaveModal
 * 
 */

// Account Main Screen Components
export { default as AccountHeader } from './AccountHeader';
export { default as ProfileHeader } from './ProfileHeader';

// Rewards Components
export { default as PointsDisplay } from './rewards/PointsDisplay';
export { default as RewardItem } from './rewards/RewardItem';
export { default as PointGuideModal } from './rewards/PointGuideModal';
export { default as RedeemRewardPopup } from './rewards/RedeemRewardPopup';
export { default as RedeemedModal } from './rewards/RedeemedModal';

// Referral Components
export { default as ReferralIllustration } from './referrals/ReferralIllustration';
export { default as ReferralLinkBox } from './referrals/ReferralLinkBox';

// List Components
export { default as CommunityLeaveModal } from './CommunityLeaveModal';
export { default as FriendRemoveModal } from './FriendRemoveModal';

/*
 * Settings + Feature Guide Components
 * ===========================
 * 
 * SETTINGS ENTRY POINTS:
 * - app/(tabs)/account/settings/index.tsx → SettingsScreen
 * - app/(tabs)/account/settings/featureGuide.tsx → GuideScreen
 * - app/(tabs)/account/settings/notifications.tsx → ReminderNotifications
 * - app/(tabs)/account/settings/viewProfile.tsx → ProfileScreen
 * - app/(tabs)/account/settings/feedback.tsx → FeedbackScreen
 * - app/(tabs)/account/settings/deletion.tsx → SupportScreen
 * - app/(tabs)/account/settings/password.tsx → PasswordScreen
 * - app/(tabs)/account/settings/editProfile.tsx → EditProfileScreen
 * 
 * SETTINGS COMPONENT HIERARCHY:
 * 
 * SettingsScreen (screens/account/settings/SettingsScreen.tsx)
 * └── (Navigation to other settings screens)
 * 
 * GuideScreen (screens/account/settings/GuideScreen.tsx)
 * ├── AddActivities (from guide/)
 * ├── CompleteActivities (from guide/)
 * ├── CustomNotifications (from guide/)
 * └── JoinCommunity (from guide/)
 * 
 * SupportScreen (screens/account/settings/SupportScreen.tsx)
 * └── AccountChangedConfirmation (from settings/)
 * 
 * ReminderNotifications (features/account/settings/ReminderNotifications.tsx)
 * ├── InfoPopup (from settings/)
 * ├── PreferencesUpdatedPopup (from settings/)
 * └── (Info components: info1, info2, info3, info4)
 * 
 */

// Feature Guide Components
export { default as AddActivities } from './guide/AddActivities';
export { default as CompleteActivities } from './guide/CompleteActivities';
export { default as CustomNotifications } from './guide/CustomNotifications';
export { default as JoinCommunity } from './guide/JoinCommunity';
export { default as WalkthroughPopup } from './guide/WalkthroughPopup';

// Settings Components
export { default as InfoPopup } from './settings/InfoPopup';
export { default as PreferencesUpdatedPopup } from './settings/PreferencesUpdatedPopup';
export { default as ReminderNotifications } from './settings/ReminderNotifications';
export { default as AccountChangedConfirmation } from './settings/AccountChangedConfirmation';
