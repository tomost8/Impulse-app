/*
 * Chats Feature Components
 * ========================
 * 
 * ENTRY POINTS:
 * - app/(tabs)/chats/index.tsx → ChatsListScreen
 * - app/(tabs)/chats/addFriends.tsx → AddFriendsScreen
 * - app/(tabs)/chats/groupCreate.tsx → CreateChatScreen
 * - app/(tabs)/chats/groupJoin.tsx → JoinChatScreen
 * - app/(tabs)/chats/requests.tsx → RequestsScreen
 * - app/(tabs)/chats/[chatId]/index.tsx → ChatScreen (pending extract)
 * - app/(tabs)/chats/[chatId]/groupInfo.tsx → ChatInfoScreen
 * - app/(tabs)/chats/[chatId]/invite.tsx → InviteToChatScreen
 * 
 * COMPONENT HIERARCHY:
 * 
 * ChatsListScreen (screens/chats/ChatsListScreen.tsx)
 * └── ConnectPopup
 * 
 * AddFriendsScreen (screens/chats/AddFriendsScreen.tsx)
 * └── Header (from ui/common/headers/Header)
 * 
 * CreateChatScreen (screens/chats/CreateChatScreen.tsx)
 * └── Header (from ui/common/headers/Header)
 * 
 * JoinChatScreen (screens/chats/JoinChatScreen.tsx)
 * ├── Header (from ui/common/headers/Header)
 * ├── JoinSuccessPopup
 * └── PasswordPopup
 * 
 * ChatInfoScreen (screens/chats/ChatInfoScreen.tsx)
 * ├── LeaderboardPodium (from ui/common/Leaderboard)
 * ├── LeaderboardList (from ui/common/Leaderboard)
 * └── LeavePopup
 * 
 * InviteToChatScreen (screens/chats/InviteToChatScreen.tsx)
 * ├── Header (from ui/common/headers/Header)
 * └── InviteSentPopup
 * 
 * RequestsScreen (screens/chats/RequestsScreen.tsx)
 * └── Header (from ui/common/headers/Header)
 */

// Popup Components
export { default as ConnectPopup } from './connectpopup';
export { default as JoinSuccessPopup } from './joinsuccesspopup';
export { default as PasswordPopup } from './passwordpopup';
export { default as LeavePopup } from './leavepopup';
export { default as InviteSentPopup } from './invitesentpopup';
