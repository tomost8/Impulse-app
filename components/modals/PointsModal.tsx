import { View, Text } from 'react-native';
import { Modal, Portal, Button } from 'react-native-paper';
import styles from '@/constants/testStyles';

interface PointsModalProps {
  visible: boolean;
  hideModal: () => void;
}


export default function PointsModal({ visible, hideModal }: PointsModalProps) {
  return (
    <Portal>
      <Modal visible={visible} onDismiss={hideModal}>
        <View style={styles.modal}>
          <Text style={styles.text}>Point Earning Guide</Text>
          <Text style={styles.text}>Earn points for posting accountability pictures
            and redeem them for rewards! Set your primary and secondary goals in profile.
          </Text>
          <Text style={styles.text}>
            Primary goal: 100 points
          </Text>
          <Text style={styles.text}>
            Secondary goal: 75 points
          </Text>
          <Text style={styles.text}>
            Additional Goals: 45 Points Each
          </Text>
          <Text style={styles.text}>
            Any picture you post that is not your primary or secondary goal is classified
            as additional goals.
          </Text>
          <Text style={styles.text}>
            Note: You can only earn points for the first picture in each goal. For example,
            if workout is your primary goal and you post 2 workout pictures in the same day,
            you only earn 100 points for the day.
          </Text>
          <Button style={styles.button} onPress={hideModal}>Got It</Button>
        </View>
      </Modal>
    </Portal>
  );
} 