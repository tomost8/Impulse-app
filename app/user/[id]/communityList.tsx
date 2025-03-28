import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// Services
import { useUserData } from '@/services/UserPreferencesContext';
// GraphQL hooks
// Components
import CommunityList from '@/components/screens/connect/profiles/communitylist';
// Debug
import { debugRenders } from '@/utils/debug';


const CommunityListPage = () => {
    const { user } = useUserData();
    return (
        <CommunityList />
    );
};


export default AuthWrapper(CommunityListPage);