import React, { createContext, useContext, useState } from 'react';

type UserDataContextType = {
  fetching: boolean; setFetching: (status: boolean) => void;
  user: any; setUser: (user: any) => void;
  activities: any[]; setActivities: (activities: any[]) => void;
  communities: any[]; setCommunities: (communities: any[]) => void;
  friends: any[]; setFriends: (friends: any[]) => void;
  timezone: string; setTimezone: (timezone: string) => void;
  cameraClickable: boolean; setCameraClickable: (status: boolean) => void;
};

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

export const UserDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fetching, setFetching] = useState<boolean>(true);
  // General Data
  const [user, setUser] = useState<any>(null);
  const [activities, setActivities] = useState<any[]>([]);
  const [communities, setCommunities] = useState<any[]>([]);
  const [friends, setFriends] = useState<any[]>([]);
  // Specific Data
  const [timezone, setTimezone] = useState<string>('');
  const [cameraClickable, setCameraClickable] = useState<boolean>(false);

  const value = {
    fetching, setFetching,
    user, setUser,
    activities, setActivities,
    communities, setCommunities,
    friends, setFriends,
    timezone, setTimezone,
    cameraClickable, setCameraClickable,
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