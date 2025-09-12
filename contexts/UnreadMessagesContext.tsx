import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UnreadMessagesContextType {
  lastViewedTimestamps: Record<string, string>; // chatId -> lastViewed timestamp
  unreadCounts: Record<string, number>; // chatId -> unread count
  updateLastViewed: (chatId: string) => void;
  updateUnreadCount: (chatId: string, count: number) => void;
  getUnreadCount: (chatId: string) => number;
}

const UnreadMessagesContext = createContext<UnreadMessagesContextType | undefined>(undefined);

export const useUnreadMessages = () => {
  const context = useContext(UnreadMessagesContext);
  if (!context) {
    throw new Error('useUnreadMessages must be used within an UnreadMessagesProvider');
  }
  return context;
};

interface UnreadMessagesProviderProps {
  children: ReactNode;
}

export const UnreadMessagesProvider: React.FC<UnreadMessagesProviderProps> = ({ children }) => {
  const [lastViewedTimestamps, setLastViewedTimestamps] = useState<Record<string, string>>({});
  const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});

  // Load data from AsyncStorage on mount
  useEffect(() => {
    loadStoredData();
  }, []);

  const loadStoredData = async () => {
    try {
      const storedTimestamps = await AsyncStorage.getItem('lastViewedTimestamps');
      const storedCounts = await AsyncStorage.getItem('unreadCounts');
      
      if (storedTimestamps) {
        setLastViewedTimestamps(JSON.parse(storedTimestamps));
      }
      if (storedCounts) {
        setUnreadCounts(JSON.parse(storedCounts));
      }
    } catch (error) {
      console.error('Error loading unread messages data:', error);
    }
  };

  const updateLastViewed = useCallback(async (chatId: string) => {
    const timestamp = new Date().toISOString();
    const newTimestamps = { ...lastViewedTimestamps, [chatId]: timestamp };
    setLastViewedTimestamps(newTimestamps);
    
    // Clear unread count when user views the chat
    const newCounts = { ...unreadCounts, [chatId]: 0 };
    setUnreadCounts(newCounts);
    
    try {
      await AsyncStorage.setItem('lastViewedTimestamps', JSON.stringify(newTimestamps));
      await AsyncStorage.setItem('unreadCounts', JSON.stringify(newCounts));
    } catch (error) {
      console.error('Error saving last viewed timestamp:', error);
    }
  }, [lastViewedTimestamps, unreadCounts]);

  const updateUnreadCount = useCallback(async (chatId: string, count: number) => {
    const newCounts = { ...unreadCounts, [chatId]: count };
    setUnreadCounts(newCounts);
    
    try {
      await AsyncStorage.setItem('unreadCounts', JSON.stringify(newCounts));
    } catch (error) {
      console.error('Error saving unread count:', error);
    }
  }, [unreadCounts]);

  const getUnreadCount = useCallback((chatId: string): number => {
    return unreadCounts[chatId] || 0;
  }, [unreadCounts]);

  const value: UnreadMessagesContextType = {
    lastViewedTimestamps,
    unreadCounts,
    updateLastViewed,
    updateUnreadCount,
    getUnreadCount,
  };

  return (
    <UnreadMessagesContext.Provider value={value}>
      {children}
    </UnreadMessagesContext.Provider>
  );
};
