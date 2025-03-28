import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// Services
import { useUserData } from '@/services/UserPreferencesContext';
// GraphQL hooks
// Components
import styles from '@/utils/testStyles';
import { View, Text } from 'react-native';
// Debug
import { debugRenders } from '@/utils/debug';


function TestScreen({ parameters }: { parameters?: any }) {
 return (
   <View style={styles.container}>
     <Text style={styles.text}>Test</Text>
   </View>
 );
}


const TestPage = () => {
    const { user } = useUserData();
    return (
        <TestScreen />
    );
};


export default AuthWrapper(TestPage);