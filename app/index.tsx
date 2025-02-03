import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import useUserInfo from '@/hooks/useUserInfo';

export default function Index() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state
  const { authToken, userId } = useUserInfo(); // Fetch user info
  console.log(authToken, userId);

  useEffect(() => {
    // Check if authToken exists
    if (authToken) {
      setIsAuthenticated(true);
    }
    setLoading(false); // Set loading to false after checking
  }, [authToken]);

  if (loading) {
    return null; // Optionally, you can return a loading spinner or placeholder
  }

  // Redirect only after loading is complete
  return <Redirect href={isAuthenticated ? '/(tabs)/home' : '/(auth)/login'} />;
}
