import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Modal,
  ScrollView
} from 'react-native';
import AddActivityCard from '@/components/ui/common/AddActivityCard';

interface DailyAddPopupProps {
  isVisible: boolean;
  onClose: () => void;
}

const DailyAddPopup: React.FC<DailyAddPopupProps> = ({
  isVisible,
  onClose,
}) => {
  const activities = [
    'Workout',
    'Food',
    'Studying/Working',
    'Rise and Shine',
    'My Passion/Hobby',
    'Wellness',
    'Mindfulness'
  ];

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.overlay}>
        <View style={styles.popup}>
          {/* Static Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Select Goals for the Day</Text>
            <TouchableOpacity 
              style={styles.dismissButton}
              onPress={onClose}
            >
              <Text style={styles.dismissText}>Dismiss</Text>
            </TouchableOpacity>
          </View>

          {/* Scrollable Content */}
          <ScrollView style={styles.content}>
            {activities.map((activity, index) => (
              <AddActivityCard
                key={index}
                category={activity}
                isSelected={false}
                onSelect={() => {}}
                isExpanded={false}
                onCheckIconPress={() => {}}
                formData={{
                  startTime: '',
                  duration: { hours: 0, minutes: 0 },
                  description: ''
                }}
                onFormDataChange={() => {}}
              />
            ))}
          </ScrollView>

          {/* Static Footer */}
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Add to Schedule</Text>
          </TouchableOpacity>
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
    width: '90%',
    height: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#242020',
  },
  dismissButton: {
    padding: 8,
  },
  dismissText: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    color: '#979797',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  addButton: {
    backgroundColor: '#DE728D',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
    borderRadius: 100,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontWeight: '600',
  },
});

export default DailyAddPopup;
