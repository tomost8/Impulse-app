/*
 * Posts Feature Components
 * ========================
 * 
 * ENTRY POINTS:
 * - app/(tabs)/account/index.tsx → MemoriesGrid (grid view in account tab)
 * - app/(tabs)/account/memories.tsx → MemoryCalendarScreen (calendar view)
 * - app/memories/[id].tsx → MemoryStoryScreen (individual memory story view)
 * - app/post/[id].tsx → PostScreen (full post view with comments)
 * 
 * COMPONENT HIERARCHY:
 * 
 * AccountScreen (screens/account/AccountScreen.tsx)
 * └── MemoriesGrid
 *     └── PostImageThumbnail
 * 
 * MemoryCalendarScreen (screens/social/MemoryCalendarScreen.tsx)
 * └── DayComponent
 * 
 * MemoryStoryScreen (screens/social/MemoryStoryScreen.tsx)
 * ├── ProgressBar
 * └── FullPostCard
 * 
 * PostScreen (screens/social/PostScreen.tsx)
 * ├── FullPostCard
 * ├── CommentSection
 * ├── CommentInput
 * └── ReplyContext
 * 
 * FullPostCard (core/FullPostCard.tsx)
 * ├── PostHeader
 * ├── PostImage
 * └── PostFooter
 */

// Layout Components
export { default as MemoriesGrid } from './MemoriesGrid';

// Core Post Components
export { default as DayComponent } from './core/DayComponent';
export { default as FullPostCard } from './core/FullPostCard';
export { default as ProgressBar } from './core/ProgressBar';


// Comment Components
export { default as CommentSection } from './comments/CommentSection';
export { default as CommentInput } from './comments/CommentInput';
export { default as ReplyContext } from './comments/ReplyContext';

