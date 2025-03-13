import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
// Components
import RequestsScreen from '@/components/screens/chats/requests';
// Debug
import { pageDisplay, debugRenders } from '@/utils/debug';

const RequestsPage = (props: any) => {
 const { userId, authToken } = props;
 return (
   <RequestsScreen />
 );
};

export default AuthWrapper(RequestsPage);