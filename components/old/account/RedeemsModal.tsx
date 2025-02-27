import { View, Text } from 'react-native';
import { Modal, Portal, Button } from 'react-native-paper';
import styles from '@/utils/testStyles';

interface RedeemsModalProps {
  visible: boolean;
  hideModal: () => void;
}


export default function RedeemsModal({ visible, hideModal }: RedeemsModalProps) {
  return (
    <Portal>
      <Modal visible={visible} onDismiss={hideModal}>
        <View style={styles.modal}>
          <Text style={styles.text}>Rewards Points Guide</Text>
          <Text style={styles.text}>Earn rewards points by posting daily accountability pictures
            and referring friends to the app!
          </Text>
          <Text style={styles.text}>Accountability Posts</Text>
          <Text style={styles.text}>Primary Goal: 100 points</Text>
          <Text style={styles.text}>Secondary Goal: 75 points</Text>
          <Text style={styles.text}>Additional Goals: 45 points each</Text>

          <Text style={styles.text}>User Referrals</Text>
          <Text style={styles.text}>1500 rewards points per referral (first 5)</Text>
          <Text style={styles.text}>500 rewards points per referral after</Text>

          <Button style={styles.button} onPress={hideModal}>Got It</Button>
        </View>
      </Modal>
    </Portal>
  );
} 