import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { getUserCommunities } from '../../../hooks/api/useCommunities';
import { router } from 'expo-router';
import styles from '@/constants/testStyles';
import useUserInfo from '@/hooks/useUserInfo';

export default function CommunitiesScreen() {
  const { userId } = useUserInfo();
  
  const { communityMembers, isLoading, error } = getUserCommunities(userId as number);
  if (userId !== null) {
    console.log('Community Members data:', communityMembers);
  }
  

  const handleCommunityPress = (id: string | number) => {
    router.push(`/community/${id}`);
  };

  return (
    <ScrollView>
      <View style={styles.section}>
        <Text style={styles.text}>Communities</Text>
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : error ? (
          <Text style={styles.error}>{error}</Text>
        ) : (
          communityMembers.map((communityMember: any) => (
            <TouchableOpacity
              style={styles.button}
              key={communityMember.community.id}
              onPress={() => handleCommunityPress(communityMember.community.id)}
            >
              <Text style={styles.text}>
                {communityMember.community.name}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </View>
      <View style={styles.section}>
        <TouchableOpacity style={styles.button} onPress={() => router.push('communities/explore')}>
          <Text style={styles.text}>Explore</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}