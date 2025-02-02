import { View, Text } from 'react-native';
import { Modal, Portal, Button } from 'react-native-paper';
import styles from '@/constants/testStyles';

interface ActivitiesModalProps {
  visible: boolean;
  hideModal: () => void;
}


export default function ActivitiesModal({ visible, hideModal }: ActivitiesModalProps) {
  return (
    <Portal>
      <Modal visible={visible} onDismiss={hideModal}>
        <View style={styles.modal}>
          <Text style={styles.text}>Important: Please Read</Text>
          <Text style={styles.text}>Adding Activities: After you add an activity to your
            schedule, you CANNOT remove it for the rest of the day. However, your schedule
            will reset the next day.
          </Text>
          <Text style={styles.text}>Completing Activities: In order to complete an activity,
            you must take a picture or upload a screenshot (some sort of proof), and send it
            to a partner, group, or community.
          </Text>
          <Text style={styles.text}>Note: If you don't have any partners or groups yet, you
            can send your pictures to the admin account or post them to the "Welcome to Impulse"
            community.
          </Text>
          <Button style={styles.button} onPress={hideModal}>Got It</Button>
        </View>
      </Modal>
    </Portal>
  );
} 