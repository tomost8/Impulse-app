import * as React from 'react';
import { createContext, useContext, useState } from 'react';

type UserDataContextType = {
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
  debugLog: () => void;
  refetchFriendsFeed: () => Promise<void>;
  refetchCommunityFeed: () => Promise<void>;
  refetchFriendsFeedTrigger: number;
  refetchCommunityFeedTrigger: number;
};

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

export const UserDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
  const [refetchFriendsFeedTrigger, setRefetchFriendsFeedTrigger] = useState(0);
  const [refetchCommunityFeedTrigger, setRefetchCommunityFeedTrigger] = useState(0);

  const debugLog = () => {
    console.log("=== User Data Debug Log ===",
      "\nFetching:", fetching,
      "\nUser:", user,
      "\nActivities:", activities,
      "\nCommunities:", communities,
      "\nFriends:", friends,
      "\nTimezone:", timezone,
      "\nCamera Clickable:", cameraClickable,
      "\nLogin Streak:", loginStreak
    );
  };

  const refetchFriendsFeed = async () => {
    setRefetchFriendsFeedTrigger(prev => prev + 1);
  };

  const refetchCommunityFeed = async () => {
    setRefetchCommunityFeedTrigger(prev => prev + 1);
  };

  const value = {
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
    debugLog,
    refetchFriendsFeed,
    refetchCommunityFeed,
    refetchFriendsFeedTrigger,
    refetchCommunityFeedTrigger
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error('useUserData must be used within a UserDataProvider');
  }
  return context;
}; 