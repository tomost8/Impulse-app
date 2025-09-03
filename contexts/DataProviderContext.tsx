import * as React from 'react';
import { createContext, useContext, useState, useMemo } from 'react';

type DataProviderContextType = {
  fetching: boolean; setFetching: (status: boolean) => void;
  user: any; setUser: (user: any) => void;
  activities: any[]; setActivities: (activities: any[]) => void;
  communities: any[]; setCommunities: (communities: any[]) => void;
  chats: any[]; setChats: (chats: any[]) => void;
  friends: any[]; setFriends: (friends: any[]) => void;
  friendsFeed: any[]; setFriendsFeed: (friendsFeed: any[]) => void;
  communityFeed: any[]; setCommunityFeed: (communityFeed: any[]) => void;

  timezone: string; setTimezone: (timezone: string) => void;
  cameraClickable: boolean; setCameraClickable: (status: boolean) => void;
  loginStreak: any; setLoginStreak: (streak: any) => void;
  // Current community data for community pages
  currentCommunity: any; setCurrentCommunity: (community: any) => void;
  currentCommunityMembers: any[]; setCurrentCommunityMembers: (members: any[]) => void;
  currentCommunityAnnouncements: any[]; setCurrentCommunityAnnouncements: (announcements: any[]) => void;
  // Current post data for post pages
  currentPost: any; setCurrentPost: (post: any) => void;
  currentPostComments: any[]; setCurrentPostComments: (comments: any[]) => void;
  debugLog: () => void;
};

const DataProviderContext = createContext<DataProviderContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fetching, setFetching] = useState<boolean>(true);
  // General Data
  const [user, setUser] = useState<any>(null);
  const [activities, setActivities] = useState<any[]>([]);
  const [communities, setCommunities] = useState<any[]>([]);
  const [chats, setChats] = useState<any[]>([]);
  const [friends, setFriends] = useState<any[]>([]);
  const [friendsFeed, setFriendsFeed] = useState<any[]>([]);
  const [communityFeed, setCommunityFeed] = useState<any[]>([]);

  // Specific Data
  const [timezone, setTimezone] = useState<string>('');
  const [cameraClickable, setCameraClickable] = useState<boolean>(false);
  const [loginStreak, setLoginStreak] = useState<any>(null);
  // Current community data
  const [currentCommunity, setCurrentCommunity] = useState<any>(null);
  const [currentCommunityMembers, setCurrentCommunityMembers] = useState<any[]>([]);
  const [currentCommunityAnnouncements, setCurrentCommunityAnnouncements] = useState<any[]>([]);
  // Current post data
  const [currentPost, setCurrentPost] = useState<any>(null);
  const [currentPostComments, setCurrentPostComments] = useState<any[]>([]);

  const debugLog = () => {
    console.log("=== Data Provider Debug Log ===",
      "\nFetching:", fetching,
      "\nUser:", user,
      "\nActivities:", activities,
      "\nCommunities:", communities,
      "\nFriends:", friends,

      "\nTimezone:", timezone,
      "\nCamera Clickable:", cameraClickable,
      "\nLogin Streak:", loginStreak,
      "\nCurrent Community:", currentCommunity?.id,
      "\nCurrent Community Members:", currentCommunityMembers.length,
      "\nCurrent Community Announcements:", currentCommunityAnnouncements.length,
      "\nCurrent Post:", currentPost?.id,
      "\nCurrent Post Comments:", currentPostComments.length
    );
  };

  const value = useMemo(() => ({
    fetching, setFetching,
    user, setUser,
    activities, setActivities,
    communities, setCommunities,
    chats, setChats,
    friends, setFriends,
    friendsFeed, setFriendsFeed,
    communityFeed, setCommunityFeed,

    timezone, setTimezone,
    cameraClickable, setCameraClickable,
    loginStreak, setLoginStreak,
    currentCommunity, setCurrentCommunity,
    currentCommunityMembers, setCurrentCommunityMembers,
    currentCommunityAnnouncements, setCurrentCommunityAnnouncements,
    currentPost, setCurrentPost,
    currentPostComments, setCurrentPostComments,
    debugLog,
  }), [
    fetching, user, activities, communities, chats, friends, friendsFeed, communityFeed,
    timezone, cameraClickable, loginStreak, currentCommunity, currentCommunityMembers, currentCommunityAnnouncements,
    currentPost, currentPostComments
  ]);

  return (
    <DataProviderContext.Provider value={value}>
      {children}
    </DataProviderContext.Provider>
  );
};

export const useDataProvider = () => {
  const context = useContext(DataProviderContext);
  if (context === undefined) {
    throw new Error('useDataProvider must be used within a DataProvider');
  }
  return context;
};
