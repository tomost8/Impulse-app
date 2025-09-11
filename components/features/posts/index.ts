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
 */

// Core Post Components
export { default as FullPostCard } from './core/FullPostCard';
export { default as ProgressBar } from './core/ProgressBar';
export { default as DayComponent } from './core/DayComponent';

// Layout Components
export { default as MemoriesGrid } from './MemoriesGrid';

// Comment Components
export { default as CommentSection } from './comments/CommentSection';
export { default as CommentInput } from './comments/CommentInput';
export { default as ReplyContext } from './comments/ReplyContext';

