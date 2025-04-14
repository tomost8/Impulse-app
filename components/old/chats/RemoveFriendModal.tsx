import { View, Text } from 'react-native';
import { Modal, Portal, Button } from 'react-native-paper';
import styles from '@/utils/testStyles';
import { router } from 'expo-router';

interface RemoveFriendModalProps {
  visible: boolean;
  hideModal: () => void;
  userId: number;
  friendId: number;
  handleDeleteFriendship: (friendId: number) => Promise<void>;
  isDeletingFriendship: boolean;
}

export default function RemoveFriendModal({ visible, hideModal, userId, friendId, handleDeleteFriendship, isDeletingFriendship }: RemoveFriendModalProps) {
  return (
    <Portal>
      <Modal visible={visible} onDismiss={hideModal}>
        <View style={styles.modal}>
          <Text style={styles.text}>:(</Text>
          <Text style={styles.text}>Are you sure you want to unmatch?</Text>
          <Button style={styles.button} onPress={hideModal}>Back</Button>
          <Button style={styles.button} onPress={
            () => {
              handleDeleteFriendship(friendId);
              hideModal();
              router.back();
            }
          }>Yes</Button>
        </View>
      </Modal>
    </Portal>
  );
} 