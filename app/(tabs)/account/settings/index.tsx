import { router } from 'expo-router';
import styles from '@/constants/testStyles';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserInfo } from '@/services/UserContext';

export default function SettingsScreen() {
  const { logout } = useUserInfo();
  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/account/settings/profile')}>
            <Text style={styles.text}>
                Profile
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/account/settings/notifications')}>
            <Text style={styles.text}>
                Reminders and Notifications (TODO after backend implemented)
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/account/settings/feedback')}>
            <Text style={styles.text}>
                Give Feedback
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/account/settings/password')}>
            <Text style={styles.text}>
                Reset Password
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/account/settings/deletion')}>
            <Text style={styles.text}>
                Support and Account Deletion
            </Text>
        </TouchableOpacity> 
        <TouchableOpacity 
            style={styles.button} 
            onPress={async () => {
                await logout();
                router.push('/login');
            }}
        >
            <Text style={styles.text}>
                Logout
            </Text>
        </TouchableOpacity>
    </View>
  );
}