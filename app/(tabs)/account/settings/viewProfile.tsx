import AuthWrapper from '@/contexts/AuthWrapper';
// Components
import ProfileScreen from '@/components/screens/profile/ProfileSetting/ProfileScreen';
// Debug
import { debugRenders } from '@/debug/utils';
// Services
import { useDataProvider } from '@/contexts/DataProviderContext';

const ProfilePage = () => {
  const { fetching, user } = useDataProvider();

  // Debug
  if (debugRenders && !fetching) {
    console.log("Rendering ProfilePage\n",
      "User:", user,
    );
  }
  
  return <ProfileScreen
    user={user}
    isUserLoading={fetching}
  />
  
}

export default AuthWrapper(ProfilePage);