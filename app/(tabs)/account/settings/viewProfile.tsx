import AuthWrapper from '@/components/auth/AuthWrapper';
// Components
import ProfileScreen from '@/components/screens/profile/ProfileSetting/ProfileScreen';
// Debug
import { debugRenders } from '@/utils/debug';
// Services
import { useUserData } from '@/services/UserPreferencesContext';

const ProfilePage = () => {
  const { fetching, user } = useUserData();

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