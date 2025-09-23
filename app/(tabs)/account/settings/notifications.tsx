
import ReminderNotifications from '@/components/features/account/settings/ReminderNotifications';
import { useSendBroadcastNotification } from '@/hooks/graphql/notifications/mutations';
import { useCreateReminder } from '@/hooks/graphql/notifications/mutations';


import { useAuth } from '@/contexts/AuthContext';

export default function NotificationsScreen() {
    const { authToken } = useAuth();
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

