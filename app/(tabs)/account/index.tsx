// Components
import AccountProfile from '@/components/screens/tabs/AccountScreen';
// Debug
import { debugRenders } from '@/utils/debug';
// Services
import AuthWrapper from '@/components/auth/AuthWrapper';
import { useUserData } from '@/services/UserPreferencesContext';

const AccountPage = () => {
  const { user, communities, friends, fetching } = useUserData();

  if (debugRenders && !fetching) {
    console.log("Rendering AccountPage.",
      "\nUser:", user, 
      "\nCommunities:", communities, 
      "\nFriends:", friends,
    );
  }

  return <AccountProfile
    user={user} 
    isLoading={fetching} 
    numCommunities={communities.length}
    numFriends={friends.length}
  />;
}

export default AuthWrapper(AccountPage);