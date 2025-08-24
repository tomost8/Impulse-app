// Components
import AccountProfile from '@/components/screens/tabs/AccountScreen';
// Debug
import { debugAccountPage } from '@/debug/utils';
// Services
import AuthWrapper from '@/contexts/AuthWrapper';
import { useDataProvider } from '@/contexts/DataProviderContext';

const AccountPage = () => {
  const { user, communities, friends, fetching } = useDataProvider();

  const acceptedFriends = friends.filter((friend: any) => friend.status === 'ACCEPTED');

  if (debugAccountPage && !fetching) {
    console.log(`Rendering AccountPage - User: ${user?.username || 'Unknown'} (ID: ${user?.id}, Double Cam: ${user?.is_double_cam}, TZ: ${user?.timezone}) | Communities: ${communities.length} | Friends: ${acceptedFriends.length}`);
  }

  return <AccountProfile
    user={user} 
    isLoading={fetching} 
    numCommunities={communities.length}
    numFriends={acceptedFriends.length}
  />;
}

export default AuthWrapper(AccountPage);