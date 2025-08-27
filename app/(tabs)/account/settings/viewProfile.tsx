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
    console.log(`📱 Rendering ProfilePage - User: ${user?.first_name} ${user?.last_name} (${user?.username}), Age: ${user?.age || 'N/A'}, Gender: ${user?.gender || 'N/A'}, Primary Goal: ${user?.primary_goal || 'N/A'}, Secondary Goal: ${user?.secondary_goal || 'N/A'}, Points: ${user?.point?.points || 0}, Weekly Points: ${user?.point?.weekly_points || 0}, Monthly Points: ${user?.point?.monthly_points || 0}, Streak: ${user?.login_streak?.streak_count || 0}, Status: ${user?.status || 'N/A'}, Timezone: ${user?.timezone || 'N/A'}`);
  }
  
  return <ProfileScreen
    user={user}
    isUserLoading={fetching}
  />
  
}

export default AuthWrapper(ProfilePage);