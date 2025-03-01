import { View, Text, TouchableOpacity } from 'react-native';
import styles from '@/utils/testStyles';
import { router } from 'expo-router';

export default function CommunityScreenOld({ community, members, isAdmin }: {
  community: any;
  members: any[];
  isAdmin: boolean;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{community?.name}</Text>
      {isAdmin && (
        <TouchableOpacity style={styles.button} onPress={() => router.push("/community/[id]/editCommunity")}>
          <Text style={styles.text}>Edit Community</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.text}>About</Text>
      <Text style={styles.text}>{community?.description}</Text>
  
      <Text style={styles.text}>Founder</Text>
      <Text style={styles.text}>{community?.influencer?.first_name} {community?.influencer?.last_name}</Text>
  
      <Text style={styles.text}>Recent Announcement</Text>
      {isAdmin && (
        <TouchableOpacity style={styles.button} onPress={() => router.push("/community/[id]/announcements")}>
          <Text style={styles.text}>Create Announcement</Text>
        </TouchableOpacity>
      )}
  
      <Text style={styles.text}>Members</Text>
      {members?.map((member: any) => (
        <View key={member.user.id}>
          <Text style={styles.text}>{member.user.first_name} {member.user.last_name}</Text>
          <Text style={styles.text}>{member.user.username}</Text>
        </View>
      ))}
    </View>
  );
}