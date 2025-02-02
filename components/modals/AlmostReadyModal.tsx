import { View, Text } from 'react-native';
import { Modal, Portal, Button } from 'react-native-paper';
import styles from '@/constants/testStyles';

interface AlmostReadyModalProps {
  visible: boolean;
  hideModal: () => void;
}


export default function AlmostReadyModal({ visible, hideModal }: AlmostReadyModalProps) {
  return (
    <Portal>
      <Modal visible={visible} onDismiss={hideModal}>
        <View style={styles.modal}>
          <Text style={styles.text}>Almost Ready!</Text>
          <Text style={styles.text}>Photos are tied to specific daily goals. Let's set one
            now, it only takes a second!
          </Text>
          <Button style={styles.button} onPress={hideModal}>Add daily goals</Button>
        </View>
      </Modal>
    </Portal>
  );
} 