import { useState, useEffect, useRef } from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
// Components
import CommunityScreen from '@/components/screens/profile/FriendsCommunityList/CommunitiesList';
// Services
import { useUserData } from '@/services/UserPreferencesContext';

const CommunitiesPage = () => {
  const { fetching, communities } = useUserData();

  return (
    <CommunityScreen
      communities={communities}
      isLoading={fetching}
    />
  );
}

export default AuthWrapper(CommunitiesPage);