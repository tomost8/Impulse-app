import { router } from 'expo-router';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SettingsScreen() {
  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() => router.push('account/settings/profile')}>
            <Text style={styles.text}>
                Profile
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push('account/settings/notifications')}>
            <Text style={styles.text}>
                Reminders and Notifications (TODO after backend implemented)
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push('account/settings/feedback')}>
            <Text style={styles.text}>
                Give Feedback
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push('account/settings/password')}>
            <Text style={styles.text}>
                Reset Password
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push('account/settings/deletion')}>
            <Text style={styles.text}>
                Support and Account Deletion
            </Text>
        </TouchableOpacity> 
        <TouchableOpacity 
            style={styles.button} 
            onPress={async () => {
                await AsyncStorage.clear();
                router.push('login');
            }}
        >
            <Text style={styles.text}>
                Logout
            </Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white'
  },
  button: {
    backgroundColor: '#007BFF', 
    padding: 10, // Button padding
    borderRadius: 5, // Rounded corners
    marginVertical: 10, // Space between buttons
  },
  todoText: {
    color: 'yellow', 
    fontStyle: 'italic', 
  },
});
