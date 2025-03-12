import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
// Components
import EditMembersScreen from '@/components/screens/social/communities/editmembersscreen';
// Debug
import { pageDisplay, debugRenders } from '@/utils/debug';


const EditMembersPage = (props: any) => {
 const { userId, authToken } = props;
 return (
   <EditMembersScreen />
 );
};

export default AuthWrapper(EditMembersPage);