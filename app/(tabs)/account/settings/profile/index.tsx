import { useState, useEffect, useRef } from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useGetUser } from '@/hooks/graphql/users/queries';
// Components
import ProfileScreen from '@/components/screens/profile/ProfileScreen';
import _ProfileScreen from '@/components/screens/old/ProfileScreen';
// Debug
import { debugRenders, pageDisplay } from '@/constants/debug';

const ProfilePage = (props: any) => {
  const { userId, authToken } = props;
  const [renderCounter, setRenderCounter] = useState(0);

  const userRef = useRef<any | null>(null);
  const hasFetchedUser = useRef(false);
  const { user, fetched: hasNewUserData } = useGetUser(userId as number, !hasFetchedUser.current);

  // Queries for Loading State
  useEffect(() => {
    if (!hasNewUserData) {
      return;
    }
    if (hasNewUserData) {
      userRef.current = user;
      hasFetchedUser.current = true;
    }
    if (hasFetchedUser.current) {
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewUserData]);

  // Debug
  const loading = !hasFetchedUser.current;
  if (debugRenders && !loading) {
    console.log("Rendering ProfilePage\n",
      "User:", userRef.current, "\n",
      "Render Counter:", renderCounter, "\n",
    );
  }
  
  if (pageDisplay) {
    return <ProfileScreen
      user={userRef.current}
      isUserLoading={!hasFetchedUser.current}
    />
  } else {
    return <_ProfileScreen
      user={userRef.current}
      isUserLoading={!hasFetchedUser.current}
    />
  }
}

export default AuthWrapper(ProfilePage);