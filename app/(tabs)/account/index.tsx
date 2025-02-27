import { useState, useEffect, useRef } from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useGetUser } from '@/hooks/graphql/users/queries';
// Components
import AccountScreenOld from '@/components/old/account/AccountScreen';
import AccountProfile from '@/components/screens/AccountProfile';
// Debug
import { pageDisplay, debugRenders } from '@/utils/debug';

const AccountPage = (props: any) => {
  const { userId, authToken } = props;
  const [renderCounter, setRenderCounter] = useState(0);

  const userRef = useRef<any | null>(null);
  const hasFetchedUser = useRef(false);
  const { user, fetched: hasNewUserData } = useGetUser(userId as number, !hasFetchedUser.current);

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

  const loading = !hasFetchedUser.current;
  if (debugRenders && !loading) {
    console.log("Rendering AccountPage\n",
      "User:", userRef.current, "\n",
      "Render Counter:", renderCounter
    );
  }

  if (pageDisplay) {
    return <AccountProfile
      user={userRef.current} 
      isUserLoading={!hasFetchedUser.current} 
    />;
  } else {
    return <AccountScreenOld
      user={userRef.current} 
      isUserLoading={!hasFetchedUser.current} 
    />;
  }
}

export default AuthWrapper(AccountPage);