import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';

interface FriendRequestsProps {
  isLoading: boolean;
  error: any;
  friendRequests: any[];
  onAccept: (friendId: number) => void;
}

export const FriendRequests = ({ isLoading, error, friendRequests, onAccept }: FriendRequestsProps) => {
  if (isLoading) return <ActivityIndicator color="white" />;
  if (error) return <Text style={styles.errorText}>{error}</Text>;

  return (
    <View style={styles.section}>
      <Text style={styles.text}>Requests</Text>
      {friendRequests.map((friendRequest: any) => (
        <View key={`request-${friendRequest.friend.id}`} style={{ marginBottom: 10 }}>
          <Text style={styles.text}>
            {friendRequest.friend.first_name} {friendRequest.friend.last_name}
          </Text>
          <TouchableOpacity onPress={() => onAccept(friendRequest.friend.id)} style={styles.button}>
            <Text style={styles.buttonText}>Accept Friend Request</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    padding: 20,
    marginVertical: 10,
    backgroundColor: '#333',
    borderRadius: 8,
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#ff6b6b',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
}); 