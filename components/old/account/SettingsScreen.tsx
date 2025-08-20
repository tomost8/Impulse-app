import styles from '@/utils/testStyles';
import { View, Text, TouchableOpacity } from 'react-native';
import { useUserAuth } from '@/services/AuthContext';
import { router } from 'expo-router';

export default function SettingsScreen() {
    const { logout } = useUserAuth();
    return (
      <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={() => router.push('/account/settings/profile')}>
              <Text style={styles.text}>
                  Profile
              </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => router.push('/account/settings/notifications')}>
              <Text style={styles.text}>
                  Reminders and Notifications (TODO: Integration)
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