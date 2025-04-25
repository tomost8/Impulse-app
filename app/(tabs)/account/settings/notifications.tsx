
import ReminderNotifications from '@/components/screens/profile/setting/ReminderNotifications';
import { useSendBroadcastNotification } from '@/hooks/graphql/notifications/mutations';
import { useCreateReminder } from '@/hooks/graphql/notifications/mutations';


import { useUserAuth } from '@/services/AuthContext';

export default function NotificationsScreen() {
    const { authToken } = useUserAuth();
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

