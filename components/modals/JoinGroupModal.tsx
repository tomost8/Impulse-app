import { View, Text } from 'react-native';
import { Modal, Portal, Button } from 'react-native-paper';
import styles from '@/constants/testStyles';
import { useMutation } from '@apollo/client';
import { router } from 'expo-router';
import { INVITE_USER_TO_CHAT } from '@/hooks/graphql/chats/mutations';

interface JoinGroupModalProps {
  visible: boolean;
  hideModal: () => void;
  chat: any;
  userId: number;
}

export default function JoinGroupModal({ visible, hideModal, chat, userId }: JoinGroupModalProps) {
  const [joinGroup] = useMutation(INVITE_USER_TO_CHAT); // TODO: add status to ACCEPTED

  const handleJoinGroup = async () => {
    if (chat.password) {
      console.log('There is a password', chat);
    } else {
      console.log('There is no password', chat);
    }/*
    try {
      const { data } = await joinGroup({ variables: { chat_id: chat.id, user_id: userId } });
      if (data.joinGroup.success) {
        console.log("Friendship (+ chat) deleted successfully");
        hideModal();
        router.push(`/chats`);
      } else {
        console.error("Error deleting friendship:", data.deleteFriendship.errors);
      }
    } catch (error) {
      console.error("Error deleting friendship:", error);
    }*/
    hideModal();
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={hideModal}>
        <View style={styles.modal}>
          <Text style={styles.text}>Image</Text>
          <Text style={styles.text}>Successfully Joined Group</Text>
          <Button style={styles.button} onPress={hideModal}>Okay</Button>
        </View>
      </Modal>
    </Portal>
  );
} 