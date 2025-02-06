import { View, Text } from 'react-native';
import { Modal, Portal, Button } from 'react-native-paper';
import styles from '@/constants/testStyles';
import { useMutation } from '@apollo/client';
import { DELETE_FRIENDSHIP } from '@/hooks/graphql/friends/friends';
import { router } from 'expo-router';

interface RemoveFriendModalProps {
  visible: boolean;
  hideModal: () => void;
  userId: number;
  friendId: number;
}

export default function RemoveFriendModal({ visible, hideModal, userId, friendId }: RemoveFriendModalProps) {
  const [deleteFriendship] = useMutation(DELETE_FRIENDSHIP);

  const handleDeleteFriendship = async () => {
    try {
      const { data } = await deleteFriendship({ variables: { userId, friendId } });
      if (data.deleteFriendship.success) {
        console.log("Friendship (+ chat) deleted successfully");
        hideModal();
        router.push(`/chats`);
      } else {
        console.error("Error deleting friendship:", data.deleteFriendship.errors);
      }
    } catch (error) {
      console.error("Error deleting friendship:", error);
    }
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={hideModal}>
        <View style={styles.modal}>
          <Text style={styles.text}>:(</Text>
          <Text style={styles.text}>Are you sure you want to unmatch?</Text>
          <Button style={styles.button} onPress={hideModal}>Back</Button>
          <Button style={styles.button} onPress={handleDeleteFriendship}>Yes</Button>
        </View>
      </Modal>
    </Portal>
  );
} 