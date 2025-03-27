import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  SafeAreaView, 
  TouchableOpacity,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface CameraPopupProps {
  isVisible: boolean;
  onClose: () => void;
}

const CameraPopup: React.FC<CameraPopupProps> = ({ isVisible, onClose }) => {
  const navigation = useNavigation();

  const handleAddDailyGoals = () => {
    onClose(); // Close the popup
    navigation.navigate('AddActivities'); // Navigate to Add Activities screen
  };

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent={true}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.popup}>
          <Image 
            source={require('@/assets/icons/error.png')}
            style={styles.errorIcon}
          />
          
          <Text style={styles.title}>Almost Ready!</Text>
          
          <Text style={styles.description}>
            Photos are tied to specific daily goals. Let's set one now, it only takes a second!
          </Text>

          <TouchableOpacity 
            style={styles.addButton}
            onPress={handleAddDailyGoals}
          >
            <Text style={styles.addButtonText}>Add daily goals</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
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
    alignItems: 'center',
  },
  errorIcon: {
    width: 60,
    height: 60,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#242020',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 20,
    fontFamily: 'Lato',
    color: '#A4ACBC',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 28,
  },
  addButton: {
    backgroundColor: '#DE728D',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 100,
    width: '100%',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Open Sans',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default CameraPopup;
