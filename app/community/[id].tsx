import { View, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useGetCommunity, useGetCommunityMembers } from '../../hooks/graphql/communities/queries';
// Components
import styles from '@/utils/testStyles';
// Debug
import { debugRenders } from '@/utils/debug';

const CommunityScreen = (props: any) => {
  const { id } = useLocalSearchParams(); // communityId
  const { userId, authToken } = props;
  const [renderCounter, setRenderCounter] = useState(0);

  // Queries for Loading State
  const communityRef = useRef<any | null>(null);
  const hasFetchedCommunity = useRef(false);
  const { community, fetched: hasNewCommunityData } = useGetCommunity(Number(id), !hasFetchedCommunity.current);

  const membersRef = useRef<any[] | null>(null);
  const hasFetchedMembers = useRef(false);
  const { communityMembers, fetched: hasNewMembersData } = useGetCommunityMembers(Number(id), !hasFetchedMembers.current);

  useEffect(() => {
    if (!hasNewCommunityData && !hasNewMembersData) {
      return;
    }
    if (hasNewCommunityData) {
      communityRef.current = community;
      hasFetchedCommunity.current = true;
    }
    if (hasNewMembersData) {
      membersRef.current = communityMembers;
      hasFetchedMembers.current = true;
    }
    if (hasFetchedCommunity.current && hasFetchedMembers.current) {
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewCommunityData, hasNewMembersData]);

  const isAdmin = communityRef.current?.influencer?.id === userId;

  // Debug
  const loading = !hasFetchedCommunity.current || !hasFetchedMembers.current;
  if (debugRenders && !loading) {
    console.log("Rendering CommunityScreen\n",
      "Community:", communityRef.current, "\n",
      "Members:", membersRef.current, "\n",
      "Render Counter:", renderCounter, "\n",
      "Is Admin:", isAdmin, "\n",
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{communityRef.current?.name}</Text>
      {isAdmin && (
        <TouchableOpacity style={styles.button} onPress={() => console.log("Edit Community")}>
          <Text style={styles.text}>Edit Community</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.text}>About</Text>
      <Text style={styles.text}>{communityRef.current?.description}</Text>

      <Text style={styles.text}>Founder</Text>
      <Text style={styles.text}>{communityRef.current?.influencer?.first_name} {communityRef.current?.influencer?.last_name}</Text>

      <Text style={styles.text}>Recent Announcement</Text>
      {isAdmin && (
        <TouchableOpacity style={styles.button} onPress={() => console.log("Create Announcement")}>
          <Text style={styles.text}>Create Announcement</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.text}>Members</Text>
      {membersRef.current?.map((member: any) => (
        <View key={member.user.id}>
          <Text style={styles.text}>{member.user.first_name} {member.user.last_name}</Text>
          <Text style={styles.text}>{member.user.username}</Text>
        </View>
      ))}
    </View>
  );
}

export default AuthWrapper(CommunityScreen);