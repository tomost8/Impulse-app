import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
// Components
import styles from '@/utils/testStyles';
import { View, Text } from 'react-native';
// Debug
import { pageDisplay, debugRenders } from '@/utils/debug';

function LeaderboardScreen({ parameters }: { parameters?: any }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Leaderboard</Text>
    </View>
  );
}

const LeaderboardPage = (props: any) => {
 const { userId, authToken } = props;
 return (
   <LeaderboardScreen />
 );
};

export default AuthWrapper(LeaderboardPage);