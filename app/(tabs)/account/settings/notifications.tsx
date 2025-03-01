import { View, Text } from 'react-native';
import styles from '@/utils/testStyles';
import { pageDisplay } from '@/utils/debug';
import ReminderNotifications from '@/components/screens/profile/setting/ReminderNotifications';

export default function NotificationsScreen() {
  if (pageDisplay) {
    return (
      <ReminderNotifications />
  );
  } else {
    return (
        <View style={styles.container}>
        <Text style={styles.todoText}>
            Reminders and Notifications (TODO after backend implemented)
        </Text>
        <Text style={styles.text}>
            Morning Scheduling Reminder
        </Text>
        <Text style={styles.text}>
            Afternoon Motivation
        </Text>
        <Text style={styles.text}>
            Activities Reminder
        </Text>
        <Text style={styles.text}>
            Nudge Message
        </Text>
    </View>
    );
  }
}

