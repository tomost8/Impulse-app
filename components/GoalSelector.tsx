import React from 'react';
import { View, Text } from 'react-native';
import { RadioButton } from 'react-native-paper';
import styles from '@/utils/testStyles';
import { goals } from '@/utils/goals';


interface GoalSelectorProps {
  primaryGoal?: number | null; 
  selectedGoal: number | null;
  setSelectedGoal: (goalId: number) => void;
}


const GoalSelector: React.FC<GoalSelectorProps> = ({ primaryGoal, selectedGoal, setSelectedGoal }) => {

  const filteredGoals = primaryGoal ? goals.filter(goal => goal.id !== primaryGoal) : goals;

  return (
    <View>
      {filteredGoals.map(goal => (
        <View key={goal.id} style={styles.checkbox}>
          <Text style={styles.text}>{goal.label}</Text>
          <RadioButton
            value={goal.id.toString()}
            status={selectedGoal === goal.id ? 'checked' : 'unchecked'}
            onPress={() => setSelectedGoal(goal.id)}
          />
        </View>
      ))}
    </View>
  );
};

export default GoalSelector;