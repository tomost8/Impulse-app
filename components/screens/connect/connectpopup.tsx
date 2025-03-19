import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  StyleSheet, 
  Modal 
} from 'react-native';
import { router } from 'expo-router';

interface ConnectPopupProps {
  isVisible: boolean;
  onClose: () => void;
}

const ConnectPopup: React.FC<ConnectPopupProps> = ({
  isVisible,
  onClose,
}) => {
  const handleFindFriend = () => {
    router.push('/chats/addFriends');
    onClose();
  };

  const handleStartGroup = () => {
    router.push('/chats/groupCreate');
    onClose();
  };

  const handleJoinGroup = () => {
    router.push('/chats/groupJoin');
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.popup}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Connect with others</Text>
            <TouchableOpacity 
              onPress={onClose}
              style={styles.closeButton}
            >
              <Image 
                source={require("@/assets/icons/cancel.png")}
                style={styles.closeIcon}
              />
            </TouchableOpacity>
          </View>

          {/* Partner Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Partner</Text>
            <TouchableOpacity 
              style={styles.optionButton}
              onPress={handleFindFriend}
            >
              <Image 
                source={require("@/assets/icons/findfriend.png")}
                style={styles.optionIcon}
              />
              <Text style={styles.optionText}>Find a friend</Text>
            </TouchableOpacity>
          </View>

          {/* Groups Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Groups</Text>
            <TouchableOpacity 
              style={styles.optionButton}
              onPress={handleStartGroup}
            >
              <Image 
                source={require("@/assets/icons/startgroup.png")}
                style={styles.optionIcon}
              />
              <Text style={styles.optionText}>Starting my own group</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.optionButton}
              onPress={handleJoinGroup}
            >
              <Image 
                source={require("@/assets/icons/joinGroup.png")}
                style={styles.optionIcon}
              />
              <Text style={styles.optionText}>Joining a group</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
    paddingBottom: 16,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#000000',
  },
  closeButton: {
    padding: 4,
  },
  closeIcon: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
    tintColor: '#979797',
  },
  section: {
    marginBottom: 24,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#000000',
    marginBottom: 12,
  },
  optionButton: {
    width: '100%',
    height: 68,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#E0EDFD',
    borderRadius: 12,
    marginBottom: 8,
  },
  optionIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 12,
  },
  optionText: {
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#000000',
  },
});

export default ConnectPopup;
