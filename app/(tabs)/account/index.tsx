// Components
import AccountProfile from '@/components/screens/tabs/AccountScreen';
// Debug
import { debugRenders } from '@/utils/debug';
// Services
import AuthWrapper from '@/components/auth/AuthWrapper';
import { useUserData } from '@/services/UserPreferencesContext';

const AccountPage = () => {
  const { user, communities, friends, fetching } = useUserData();

  const acceptedFriends = friends.filter((friend: any) => friend.status === 'ACCEPTED');

  if (debugRenders && !fetching) {
    console.log("Rendering AccountPage.",
      "\nUser:", user, 
      "\nCommunities:", communities, 
      "\nFriends:", acceptedFriends,
    );
  }

  return <AccountProfile
    user={user} 
    isLoading={fetching} 
    numCommunities={communities.length}
    numFriends={acceptedFriends.length}
  />;
}

export default AuthWrapper(AccountPage);