import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
// Components
import styles from '@/utils/testStyles';
import { View, Text } from 'react-native';
import AnnouncementScreen from '@/components/screens/social/communities/announcementscreen';
// Debug
import { pageDisplay, debugRenders } from '@/utils/debug';

function AnnouncementsScreen({ parameters }: { parameters?: any }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Announcements</Text>
    </View>
  );
}

const AnnouncementsPage = (props: any) => {
 const { userId, authToken } = props;
 return (
   <AnnouncementScreen />
 );
};

export default AuthWrapper(AnnouncementsPage);