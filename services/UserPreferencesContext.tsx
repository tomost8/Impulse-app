import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUserInfo } from './UserContext';
import { useGetUser } from '@/hooks/graphql/users/queries';

type UserPreferencesContextType = {
  timezone: string;
  activityStatus: boolean;
  setTimezone: (timezone: string) => void;
  setActivityStatus: (status: boolean) => void;
};

const UserPreferencesContext = createContext<UserPreferencesContextType | undefined>(undefined);

export const UserPreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [timezone, setTimezone] = useState<string>('');
  const [activityStatus, setActivityStatus] = useState<boolean>(false);
  
  const value = {
    timezone,
    setTimezone,
    activityStatus,
    setActivityStatus,
  };

  return (
    <UserPreferencesContext.Provider value={value}>
      {children}
    </UserPreferencesContext.Provider>
  );
};

export const useUserPreferences = () => {
  const context = useContext(UserPreferencesContext);
  if (context === undefined) {
    throw new Error('useUserPreferences must be used within a UserPreferencesProvider');
  }
  return context;
}; 