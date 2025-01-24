import { router } from 'expo-router';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';


export default function SettingsScreen() {
  return (
    <View style={styles.titleContainer}>
        <Text style={styles.text}>
            settings_inside
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => router.push('account/settings/deletion')}>
            <Text style={styles.text}>
                Deletion
            </Text>
        </TouchableOpacity> 
        <TouchableOpacity style={styles.button} onPress={() => router.push('account/settings/password')}>
            <Text style={styles.text}>
                Password
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push('account/settings/profile')}>
            <Text style={styles.text}>
                Profile
            </Text>
        </TouchableOpacity> 
        <TouchableOpacity style={styles.button} onPress={() => router.push('account/settings/notifications')}>
            <Text style={styles.text}>
                Notifications
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push('account/settings/feedback')}>
            <Text style={styles.text}>
                Feedback
            </Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white'
  },
  button: {
    marginVertical: 10,
  },
});
