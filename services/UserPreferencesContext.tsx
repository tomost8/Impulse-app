import React, { createContext, useContext, useState } from 'react';

type UserPreferencesContextType = {
  timezone: string;
  setTimezone: (timezone: string) => void;
  cameraClickable: boolean;
  setCameraClickable: (status: boolean) => void;
};

const UserPreferencesContext = createContext<UserPreferencesContextType | undefined>(undefined);

export const UserPreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [timezone, setTimezone] = useState<string>('');
  const [cameraClickable, setCameraClickable] = useState<boolean>(false);

  const value = {
    timezone,
    setTimezone,
    cameraClickable,
    setCameraClickable,
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