import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import SelectUsers from './selectUsers';

interface ActivityCardProps {
  title: string;
  timeRange: string;
  description?: string;
  icon: any;
  isSelected: boolean;
  onSelect: () => void;
}

const ActivityCard = ({ title, timeRange, description, icon, isSelected, onSelect }: ActivityCardProps) => (
  <TouchableOpacity 
    style={[styles.activityCard, isSelected && styles.selectedCard]}
    onPress={onSelect}
  >
    <View style={styles.cardContent}>
      <Image source={icon} style={styles.activityIcon} />
      <View style={styles.textContainer}>
        <Text style={styles.activityTitle}>{title}</Text>
        <Text style={styles.timeRange}>{timeRange}</Text>
        {description && (
          <Text style={styles.description}>{description}</Text>
        )}
      </View>
    </View>
    <Image 
      source={isSelected ? 
        require("@/assets/icons/greencheck.png") : 
        require("@/assets/icons/circleunfilled.png")
      } 
      style={styles.checkIcon}
    />
  </TouchableOpacity>
);

interface SelectGoalProps {
  isVisible: boolean;
  onClose: () => void;
}

const SelectGoal = ({ isVisible, onClose }: SelectGoalProps) => {
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [showSelectUsers, setShowSelectUsers] = useState(false);

  const handleNext = () => {
    if (selectedActivity) {
      setShowSelectUsers(true);
      onClose();
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity 
          style={styles.dismissArea}
          activeOpacity={1}
          onPress={onClose}
        />
        <View style={styles.container}>
          <Text style={styles.title}>Select Daily Goal</Text>

          <ScrollView 
            style={styles.scrollContainer}
            contentContainerStyle={styles.scrollContentContainer}
          >
            <View style={styles.content}>
              <ActivityCard
                title="Studying / Working"
                timeRange="02:00 Pm to 04:00 Pm"
                icon={require("@/assets/icons/studyingworking.png")}
                isSelected={selectedActivity === 'studying'}
                onSelect={() => setSelectedActivity('studying')}
              />
              
              <ActivityCard
                title="Rise and Shine"
                timeRange="08:00 Am to 09:00 Am"
                description="Waking up early today and eating a healthy breakfast"
                icon={require("@/assets/icons/riseshine.png")}
                isSelected={selectedActivity === 'rise'}
                onSelect={() => setSelectedActivity('rise')}
              />
            </View>
          </ScrollView>

          <TouchableOpacity 
            style={[
              styles.nextButton,
              !selectedActivity && styles.nextButtonDisabled
            ]}
            onPress={handleNext}
            disabled={!selectedActivity}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>

          <SelectUsers
            isVisible={showSelectUsers}
            onClose={() => setShowSelectUsers(false)}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  dismissArea: {
    flex: 1,
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '80%',
    paddingTop: 20,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#242020',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContentContainer: {
    flexGrow: 1,
  },
  content: {
    gap: 18,
    paddingBottom: 20,
  },
  activityCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 18,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E1E1E1',
  },
  selectedCard: {
    borderColor: '#DE728D',
    borderWidth: 1,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  activityIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
    gap: 4,
  },
  activityTitle: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontWeight: '600',
    color: '#242020',
  },
  timeRange: {
    fontSize: 12,
    fontFamily: 'Open Sans',
    color: '#979797',
  },
  description: {
    fontSize: 12,
    fontFamily: 'Open Sans',
    color: '#242020',
    marginTop: 2,
  },
  checkIcon: {
    width: 24,
    height: 24,
  },
  nextButton: {
    backgroundColor: '#DE728D',
    paddingVertical: 14,
    borderRadius: 100,
    alignItems: 'center',
    marginTop: 8,
    marginHorizontal: 20,
    marginBottom: 34,
  },
  nextButtonDisabled: {
    backgroundColor: 'rgba(222, 114, 141, 0.5)',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontWeight: '600',
  },
});

export default SelectGoal;
