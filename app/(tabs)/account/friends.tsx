import { useGetFriends } from '../../../hooks/api/useFriends';
import { router } from 'expo-router';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import styles from '@/constants/testStyles';
import useUserInfo from '@/hooks/useUserInfo';

export default function FriendsScreen() {
  const { userId } = useUserInfo();
  const { friends, isLoading, error } = useGetFriends(userId as number);
  console.log('Friends data:', friends);
  
  const handleFriendPress = (id: string | number) => {
    router.push(`/user/${id}`);
  };
  
  return (
    <ScrollView>

      <View style={styles.section}>
        <Text style={styles.text}>Friends</Text>
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : error ? (
          <Text style={styles.error}>{error}</Text>
        ) : (
          friends.map((friend: any) => (
            <TouchableOpacity style={styles.button}
              key={friend.friend.id}
              onPress={() => handleFriendPress(friend.friend.id)}
            >
              <Text style={styles.text}>
                {friend.friend.first_name} {friend.friend.last_name}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </View>
    </ScrollView>
  );
}