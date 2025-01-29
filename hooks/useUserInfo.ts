import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useUserInfo = () => {
    const [authToken, setAuthToken] = useState<string | null>(null);
    const [userId, setUserId] = useState<number | null>(null);

    useEffect(() => {
        const getUserInfo = async () => {
          try {
            const storedAuthToken = await AsyncStorage.getItem('authToken');
            const storedUserId = await AsyncStorage.getItem('idUser');
            if (storedAuthToken) {
              setAuthToken(storedAuthToken);
            }
            if (storedUserId) {
              setUserId(parseInt(storedUserId));
            }
          } catch (error) {
            console.error('Error fetching data from AsyncStorage:', error);
          }
        };

        getUserInfo();
      }, []);

    return { authToken, userId };
};

export default useUserInfo;