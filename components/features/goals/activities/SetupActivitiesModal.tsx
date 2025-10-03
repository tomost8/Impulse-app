import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Modal,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import AddActivityCard from '@/components/features/goals/activities/cards/AddActivityCard';
import { goals } from '@/utils/goals'; // Import goals from the same source

interface SetupActivitiesModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: (selectedGoals: any[], goalFormData: any) => Promise<void>;
  userName?: string;
}

interface GoalFormData {
  startTime: string;
  duration: { hours: number; minutes: number };
  description: string;
}

const SetupActivitiesModal: React.FC<SetupActivitiesModalProps> = ({
  isVisible,
  onClose,
  onConfirm,
  userName,
}) => {
  const [selectedGoals, setSelectedGoals] = useState<number[]>([]);
  const [expandedGoal, setExpandedGoal] = useState<number | null>(null);
  const [goalFormData, setGoalFormData] = useState<Record<number, GoalFormData>>({});

  const handleSelectGoal = (goalId: number) => {
    if (!selectedGoals.includes(goalId)) {
      setSelectedGoals((prev) => [...prev, goalId]);
      if (!goalFormData[goalId]) {
        setGoalFormData(prev => ({
          ...prev,
          [goalId]: {
            startTime: '',
            duration: { hours: 0, minutes: 0 },
            description: ''
          }
        }));
      }
    }
    if (expandedGoal === goalId) {
      setExpandedGoal(null);
    } else {
      setExpandedGoal(goalId);
    }
  };

  const handleCheckIconPress = (goalId: number) => {
    if (expandedGoal === goalId) {
      setExpandedGoal(null);
    }
    setSelectedGoals(prev => prev.filter(id => id !== goalId));
    setGoalFormData(prev => {
      const newData = { ...prev };
      delete newData[goalId];
      return newData;
    });
  };

  const handleFormDataChange = (goalId: number, field: keyof GoalFormData, value: string) => {
    setGoalFormData(prev => ({
      ...prev,
      [goalId]: {
        ...prev[goalId],
        [field]: value
      }
    }));
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      //animationType="fade"
    >
      <SafeAreaView style={[styles.modalContainer, { pointerEvents: 'box-none' }]}>
        <View style={[styles.popup, { pointerEvents: 'auto' }]}>
          <View style={styles.header}>
            <Text style={styles.title}>Select Goals for the Day</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.dismissText}>Dismiss</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollContent}>
            <View style={styles.activitiesContainer}>
              {goals.map((goal) => (
                <AddActivityCard
                  key={goal.id}
                  category={goal.category}
                  isSelected={selectedGoals.includes(goal.id)}
                  onSelect={() => handleSelectGoal(goal.id)}
                  isExpanded={expandedGoal === goal.id}
                  onCheckIconPress={() => handleCheckIconPress(goal.id)}
                  formData={goalFormData[goal.id]}
                  onFormDataChange={(field, value) => 
                    handleFormDataChange(goal.id, field as keyof GoalFormData, value as string)
                  }
                />
              ))}
            </View>
          </ScrollView>

          <TouchableOpacity 
            style={[
              styles.addButton,
              selectedGoals.length === 0 && styles.addButtonDisabled
            ]}
            onPress={() => onConfirm(selectedGoals, goalFormData)}
            disabled={selectedGoals.length === 0}
          >
            <Text style={styles.addButtonText}>Add to Schedule</Text>
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
    width: '90%',
    maxHeight: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    marginVertical: 20,
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
  dismissText: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    color: '#979797',
  },
  scrollContent: {
    flexGrow: 0,
  },
  activitiesContainer: {
    padding: 12,
    gap: 2,
  },
  addButton: {
    backgroundColor: '#DE728D',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
    borderRadius: 100,
  },
  addButtonDisabled: {
    backgroundColor: 'rgba(222, 114, 141, 0.5)',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontWeight: '600',
  },
});

export default SetupActivitiesModal;
