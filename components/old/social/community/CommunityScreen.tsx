import { View, Text, TouchableOpacity, Image } from 'react-native';
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
      <TouchableOpacity style={styles.button} onPress={() => router.push("/community/[id]/leaderboard")}>
          <Text style={styles.text}>Leaderboard</Text>
        </TouchableOpacity>
      <Text style={styles.text}>About</Text>
      <Text style={styles.text}>{community?.description}</Text>
  
      <View style={styles.checkbox}>
        <Text style={styles.text}>Founder</Text>
        <Image source={{ uri: community?.influencer?.profile_picture }} style={styles.smallImage} />
        <Text style={styles.text}>{community?.influencer?.first_name} {community?.influencer?.last_name}</Text>
      </View>
  
      <Text style={styles.text}>Recent Announcement (TODO: figure out how to get announcement from backend)</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push("/community/[id]/announcements")}>
        <Text style={styles.text}>View Announcements</Text>
      </TouchableOpacity>
      {isAdmin && (
        <TouchableOpacity style={styles.button} onPress={() => console.log("Make an Announcement Button Pressed")}>
          <Text style={styles.text}>Make an Announcement</Text>
        </TouchableOpacity>
      )}
  
      <Text style={styles.text}>Members</Text>
      {members?.map((member: any) => (
        <View key={member.user.id} style={styles.checkbox}>
          <Image source={{ uri: member.user.profile_picture }} style={styles.smallImage} />
          <Text style={styles.text}>{member.user.first_name} {member.user.last_name}</Text>
          <Text style={styles.text}>{member.user.username}</Text>
          <TouchableOpacity style={styles.button} onPress={() => router.push(`/user/${member.user.id}`)}>
            <Text style={styles.text}>View Profile (takes to user profile that is same as from friends rn)</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}