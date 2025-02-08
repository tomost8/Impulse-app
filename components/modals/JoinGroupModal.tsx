import { View, Text, TextInput } from 'react-native';
import { Modal, Portal, Button } from 'react-native-paper';
import styles from '@/constants/testStyles';
import { useState } from 'react';

interface JoinGroupModalProps {
  visible: boolean;
  hideModal: () => void;
  chat: any;
  handleJoinGroup: (chat: any) => void;
}

export default function JoinGroupModal({ visible, hideModal, chat, handleJoinGroup }: JoinGroupModalProps) {
  const [password, setPassword] = useState('');

  const handlePasswordSubmit = () => {
    if (password === chat.password) {
      handleJoinGroup(chat);
      console.log("Correct password, need to join group and then switch view");
    } else {
      console.log("Incorrect password, display error text");
    }
    hideModal();
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={hideModal}>
        <View style={styles.modal}>
          {chat === null ? (
            <>
              <Text style={styles.text}>No chat available, something went wrong.</Text>
            </>
          ) : chat.password ? (
            <>
              <Text style={styles.text}>Enter Password:</Text>
              <TextInput
                style={[styles.input, { borderWidth: 1, borderColor: 'black', borderRadius: 5 }]}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              <Button style={styles.button} onPress={handlePasswordSubmit}>Join Group</Button>
            </>
          ) : (
            <>
              {handleJoinGroup(chat)}
              <Text style={styles.text}>Success Image</Text>
              <Text style={styles.text}>Successfully Joined Group</Text>
              <Button style={styles.button} onPress={hideModal}>Okay</Button>
            </>
          )}
        </View>
      </Modal>
    </Portal>
  );
} 