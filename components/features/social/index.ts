/*
 * Social Feature Components
 * =========================
 * 
 * ENTRY POINTS:
 * - app/(tabs)/social/index.tsx → SocialScreen
 * - app/(tabs)/social/explore.tsx → ExploreScreen
 * 
 * COMPONENT HIERARCHY:
 * 
 * SocialScreen (screens/social/SocialScreen.tsx)
 * ├── TabSelector
 * ├── CommunityList
 * ├── CommunityFilter
 * └── Feed
 *     └── PostCard
 *         ├── PostContent
 *         └── PostFooter
 *             ├── LikeButton
 *             └── CommentButton
 * 
 * ExploreScreen (screens/social/ExploreScreen.tsx)
 * ├── ExploreHeader
 * ├── SearchBar
 * ├── CategoriesBar
 * └── CommunityCard (in grid)
 */

// Feed Components
export { default as Feed } from './feeds/Feed';
export { default as PostCard } from './feeds/PostCard';
export { default as PostContent } from './feeds/PostContent';
export { default as PostFooter } from './feeds/PostFooter';
export { default as LikeButton } from './feeds/LikeButton';
export { default as CommentButton } from './feeds/CommentButton';

// Social Screen Components
export { default as TabSelector } from './main/TabSelector';
export { default as CommunityList } from './main/CommunityList';
export { default as CommunityFilter } from './main/CommunityFilter';

// Explore Screen Components
export { default as ExploreHeader } from './explore/ExploreHeader';
export { default as SearchBar } from './explore/SearchBar';
export { default as CategoriesBar } from './explore/CategoriesBar';
export { default as CommunityCard } from './explore/CommunityCard';

