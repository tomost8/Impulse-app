import { useState, useEffect, useRef } from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useGetUser } from '@/hooks/graphql/useUsers';
// Components
import AccountScreen from '@/components/screens/AccountScreen';

const AccountPage = (props: any) => {
  const { userId, authToken } = props;
  const [isLoading, setIsLoading] = useState(true);

  const userRef = useRef<any | null>(null);
  const hasFetchedUser = useRef(false);
  const { user, fetched: hasNewUserData } = useGetUser(userId as number);

  useEffect(() => {
    if (!hasNewUserData) {
      return;
    }
    if (hasNewUserData) {
      userRef.current = user;
      hasFetchedUser.current = true;
    }
    if (hasFetchedUser.current) {
      setIsLoading(false);
    }
  }, [hasNewUserData]); 

  console.log("Rendering AccountPage.\n",
    "User:", userRef.current
  );

  return (
    <AccountScreen 
      user={userRef.current} 
      isUserLoading={!hasFetchedUser.current} 
    />
  );
}

export default AuthWrapper(AccountPage);