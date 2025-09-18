export const debugQueries = true;
export const debugMixpanel = true;
export const debugRouting = false;

export const debugComponentsOn = false;

export const pageDisplay = true;

export const debugRenders = true;
// Main pages from bottom tabs
export const debugHomePage = false && debugRenders;
export const debugChatsPage = false && debugRenders;
export const debugSocialPage = true && debugRenders; // social/index.tsx
export const debugAccountPage = false && debugRenders;
// Social + Community pages
export const debugUserCommunitiesPage = true && debugRenders; // account/communities.tsx
export const debugExplorePage = true && debugRenders; // social/explore.tsx
export const debugCreateCommunityPage = true && debugRenders; // social/createCommunity.tsx
export const debugCommunityPage = true && debugRenders; // community/[id]/index.tsx
export const debugEditCommunityPage = true && debugRenders; // community/[id]/editCommunity.tsx
export const debugEditCommunityMembersPage = true && debugRenders; // community/[id]/editMembers.tsx
export const debugCommunityLeaderboardPage = true && debugRenders; // community/[id]/leaderboard.tsx
export const debugAnnouncementsPage = true && debugRenders; // community/[id]/announcements.tsx
// Post pages

// Chat and profile pages

// Home and activity pages

// Account pages
export const debugEditProfile = false;
