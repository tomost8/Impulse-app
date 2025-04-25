
import ReminderNotifications from '@/components/screens/profile/setting/ReminderNotifications';
import { useSendBroadcastNotification } from '@/hooks/graphql/notifications/mutations';
import { useCreateReminder } from '@/hooks/graphql/notifications/mutations';


import { useUserInfo } from '@/services/UserContext';

export default function NotificationsScreen() {
    const { authToken } = useUserInfo();
    // Mutations
    //const { sendBroadcastNotification } = useSendBroadcastNotification();
    const { createReminder } = useCreateReminder();
    const handleCreateReminder = async (input: any) => {
        const response = await createReminder(input, authToken as string);
        console.log(response);
    }

    return (
        <ReminderNotifications 
            onSave={handleCreateReminder} 
        />
  );
}

