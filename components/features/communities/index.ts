/*
 * Communities Feature Components
 * ==============================
 * 
 * ENTRY POINTS:
 * - app/(tabs)/social/createCommunity.tsx → CreateCommunityScreen
 * - app/community/[id]/index.tsx → CommunityMainScreen
 * - app/community/[id]/leaderboard.tsx → LeaderboardScreen
 * - app/community/[id]/announcements.tsx → AnnouncementScreen
 * - app/community/[id]/editCommunity.tsx → EditCommunityScreen
 * - app/community/[id]/editMembers.tsx → EditMembersScreen
 * 
 * COMPONENT HIERARCHY:
 * 
 * CommunityMainScreen (screens/communities/CommunityMainScreen.tsx)
 * ├── CommunityHeader
 * ├── CommunityProfile
 * ├── About
 * ├── Announcement
 * └── MembersList
 * 
 * AnnouncementScreen (screens/communities/AnnouncementScreen.tsx)
 * ├── Header (from ui/common/headers/Header)
 * └── AnnouncementMessageList
 * 
 * EditMembersScreen (screens/communities/EditMembersScreen.tsx)
 * └── RemoveUserPopup
 */

// Community Main Screen Components
export { default as CommunityHeader } from './main/CommunityHeader';
export { default as CommunityProfile } from './main/CommunityProfile';
export { default as About } from './main/About';
export { default as Announcement } from './main/Announcement';
export { default as MembersList } from './main/MembersList';

// Announcement Screen Components
export { default as AnnouncementMessageList } from './announcements/AnnouncementMessageList';

// Edit Members Screen Components
export { default as RemoveUserPopup } from './RemoveUserPopup';
