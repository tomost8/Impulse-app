
import NotificationsScreen from '@/components/screens/account/settings/NotificationsScreen';
import { useSendBroadcastNotification } from '@/hooks/graphql/notifications/mutations';
import { useCreateReminder } from '@/hooks/graphql/notifications/mutations';


import { useAuth } from '@/contexts/AuthContext';

export default function NotificationsPage() {
    const { authToken } = useAuth();
    // Mutations
    //const { sendBroadcastNotification } = useSendBroadcastNotification();
    const { createReminder } = useCreateReminder();
    const handleCreateReminder = async (input: any) => {
        const response = await createReminder(input, authToken as string);
        console.log(response);
    }

    return (
        <NotificationsScreen 
            onSave={handleCreateReminder} 
        />
  );
}

