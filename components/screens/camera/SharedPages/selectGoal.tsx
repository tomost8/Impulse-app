import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';

interface ActivityCardProps {
  title: string;
  timeRange: string;
  icon: any;
  isSelected: boolean;
  onSelect: () => void;
}

const ActivityCard = ({ title, timeRange, icon, isSelected, onSelect }: ActivityCardProps) => (
  <TouchableOpacity 
    style={[styles.activityCard, isSelected && styles.selectedCard]}
    onPress={onSelect}
  >
    <View style={styles.cardContent}>
      <Image source={icon} style={styles.activityIcon} />
      <View style={styles.textContainer}>
        <Text style={styles.activityTitle}>{title}</Text>
        <Text style={styles.timeRange}>{timeRange}</Text>
      </View>
    </View>
    <Image 
      source={isSelected ? 
        require("@/assets/icons/checkGreen.png") : 
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

  const handleNext = () => {
    if (selectedActivity) {
      onClose();
      router.push('/camera/addCaption');
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.container}>
          <TouchableOpacity 
            activeOpacity={1}
            style={styles.content}
          >
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
              icon={require("@/assets/icons/riseshine.png")}
              isSelected={selectedActivity === 'rise'}
              onSelect={() => setSelectedActivity('rise')}
            />

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
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 34,
  },
  content: {
    gap: 16,
  },
  activityCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  activityIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  textContainer: {
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
