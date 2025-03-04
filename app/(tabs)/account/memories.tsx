import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
// Components
import styles from '@/utils/testStyles';
import { View, Text } from 'react-native';
// Debug
import { pageDisplay, debugRenders } from '@/utils/debug';
// Services
import { useUserInfo } from '@/services/UserContext';



function MemoriesScreen({ parameters }: { parameters?: any }) {
 return (
   <View style={styles.container}>
     <Text style={styles.text}>Memories</Text>
   </View>
 );
}


const MemoriesPage = () => {
const { userId, authToken } = useUserInfo();
return (
  <MemoriesScreen />
);
};


export default AuthWrapper(MemoriesPage);