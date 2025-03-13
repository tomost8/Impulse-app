import { View, Text } from 'react-native';
import { Modal, Portal, Button } from 'react-native-paper';
import styles from '@/utils/testStyles';
import { router } from 'expo-router';

interface SocialModalProps {
  visible: boolean;
  hideModal: () => void;
}


export default function SocialModal({ visible, hideModal }: SocialModalProps) {
    const handleNavigate = (path: string) => {
      hideModal(); // First, hide the modal
      router.push(path as any); // Then, navigate to the specified path
    };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={hideModal}>
        <View style={styles.modal}>
          <Button style={styles.button} onPress={hideModal}>x</Button>
          <Text style={styles.text}>Connect with others</Text>
          <Text style={styles.text}>Partner</Text>
          <Button style={styles.button} onPress={() => handleNavigate('/chats/addFriends')}>
            Find a friend
          </Button>
          <Text style={styles.text}>Groups</Text>
          <Button style={styles.button} onPress={() => handleNavigate('/chats/groupCreate')}>
            Starting my own group
          </Button>
          <Button style={styles.button} onPress={() => handleNavigate('/chats/groupJoin')}>
            Joining a group
          </Button>
        </View>
      </Modal>
    </Portal>
  );
} 