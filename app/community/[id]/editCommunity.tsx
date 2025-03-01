import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
// Components
import styles from '@/utils/testStyles';
import { View, Text } from 'react-native';
// Debug
import { pageDisplay, debugRenders } from '@/utils/debug';

function EditCommunityScreen({ parameters }: { parameters?: any }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Edit Community</Text>
    </View>
  );
}

const EditCommunityPage = (props: any) => {
 const { userId, authToken } = props;
 return (
   <EditCommunityScreen />
 );
};

export default AuthWrapper(EditCommunityPage);