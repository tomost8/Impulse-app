import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import styles from '@/constants/testStyles';

import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { getUserCommunities } from '@/hooks/graphql/communities/queries';
// Components
// Debug
import { debugRenders } from '@/constants/debug';

function SocialScreen({
  communityMembers,
  isCommunityMembersLoading,
}: {
  communityMembers: any,
  isCommunityMembersLoading: boolean,
}) {
  if (isCommunityMembersLoading) {
    return <Text>Loading...</Text>;
  }
  return (
    <ScrollView>
      <View style={styles.section}>
        <Text style={styles.text}>Communities</Text>
        {(
          communityMembers.map((communityMember: any) => (
            <TouchableOpacity
              style={styles.button}
              key={communityMember.community.id}
              onPress={() => router.push(`/community/${communityMember.community.id}`)}
            >
              <Text style={styles.text}>
                {communityMember.community.name}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </View>
      <View style={styles.section}>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/social/explore')}>
          <Text style={styles.text}>Explore</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const SocialPage = (props: any) => {
  const { userId, authToken } = props;
  const [renderCounter, setRenderCounter] = useState(0);

  // Queries for Loading State
  const communitiesRef = useRef<any[] | null>(null);
  const hasFetchedCommunities = useRef(false);
  const { communityMembers, fetched: hasNewCommunitiesData } = getUserCommunities(userId as number, !hasFetchedCommunities.current);

  useEffect(() => {
    if (!hasNewCommunitiesData) {
      return;
    }
    if (hasNewCommunitiesData) {
      communitiesRef.current = communityMembers;
      hasFetchedCommunities.current = true;
    }
    if (hasFetchedCommunities.current) {
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewCommunitiesData]);

  // Debug
  const loading = !hasFetchedCommunities.current;
  if (debugRenders && !loading) {
    console.log("Rendering SocialPage\n",
      "Communities:", communitiesRef.current, "\n",
      "Render Counter:", renderCounter, "\n",
    );
  }
  
  return (
    <SocialScreen 
      communityMembers={communitiesRef.current}
      isCommunityMembersLoading={!hasFetchedCommunities.current}
    />
  );
}

export default AuthWrapper(SocialPage);