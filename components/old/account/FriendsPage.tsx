import { router } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '@/utils/testStyles';

export default function FriendScreenOld({ 
    friends, 
    isFriendsLoading 
  }: { 
    friends: any[]; 
    isFriendsLoading: boolean 
  }) {
    if (isFriendsLoading) {
      return <Text>Loading...</Text>;
    }
    
    return (
      <View style={styles.section}>
        <Text style={styles.text}>Friends</Text>
        {friends.filter((friend: any) => friend.status === 'ACCEPTED').map((friend: any) => (
          <TouchableOpacity style={styles.button}
            key={friend.friend.id}
            onPress={() => router.push(`/user/${friend.friend.id}`)}
          >
            <Text style={styles.text}>
              {friend.friend.first_name} {friend.friend.last_name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }