import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
// Components
import Memories from '@/components/screens/Memories';
// Debug
import { debugRenders } from '@/utils/debug';
// Services
import { useUserInfo } from '@/services/UserContext';


const MemoriesPage = () => {
  const { userId, authToken } = useUserInfo();
  return (
    <Memories />
  );
};


export default AuthWrapper(MemoriesPage);