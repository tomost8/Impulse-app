import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
import { useLocalSearchParams } from 'expo-router';
// GraphQL hooks
// Components
import LeaderboardScreen from '@/components/screens/social/communities/leaderboardscreen';
import { View, Text } from 'react-native';
// Debug
import { pageDisplay, debugRenders } from '@/utils/debug';


const LeaderboardPage = (props: any) => { 
const { id } = useLocalSearchParams();
 const { userId, authToken } = props;
 console.log("communityId", id);
 return (
  <LeaderboardScreen communityId={id as string} />
 );
};

export default AuthWrapper(LeaderboardPage);