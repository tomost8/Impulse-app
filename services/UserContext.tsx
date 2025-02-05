import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserContextType {
    authToken: string | null;
    userId: number | null;
    isLoading: boolean;
    login: (token: string, id: number) => Promise<void>;
    logout: () => Promise<void>;
    refreshUserInfo: () => Promise<void>;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [authToken, setAuthToken] = useState<string | null>(null);
    const [userId, setUserId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const getUserInfo = async () => {
        try {
            const [storedAuthToken, storedUserId] = await Promise.all([
                AsyncStorage.getItem('authToken'),
                AsyncStorage.getItem('userId')
            ]);
            
            setAuthToken(storedAuthToken);
            setUserId(storedUserId ? Number(storedUserId) : null);
        } catch (error) {
            console.error('Error fetching data from AsyncStorage:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Initial load
    useEffect(() => {
        getUserInfo();
    }, []);

    const login = async (token: string, id: number) => {
        try {
            await Promise.all([
                AsyncStorage.setItem('authToken', token),
                AsyncStorage.setItem('userId', id.toString())
            ]);
            setAuthToken(token);
            setUserId(id);
        } catch (error) {
            console.error('Error storing login data:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await Promise.all([
                AsyncStorage.removeItem('authToken'),
                AsyncStorage.removeItem('userId')
            ]);
            setAuthToken(null);
            setUserId(null);
        } catch (error) {
            console.error('Error removing login data:', error);
            throw error;
        }
    };

    const refreshUserInfo = async () => {
        setIsLoading(true);
        await getUserInfo();
    };

    return (
        <UserContext.Provider 
            value={{ 
                authToken, 
                userId, 
                isLoading, 
                login, 
                logout,
                refreshUserInfo 
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUserInfo = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserInfo must be used within a UserProvider');
    }
    return context;
}; 