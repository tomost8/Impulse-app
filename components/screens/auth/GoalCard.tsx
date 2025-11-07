import React from 'react';
import { View, Text, TouchableOpacity, Image, ImageSourcePropType, StyleSheet } from 'react-native';
import { s } from 'react-native-size-matters';

// Define the shape of a single goal item for strong typing
interface GoalItem {
  id: number;
  label: string;
  icon: ImageSourcePropType;
}

interface GoalCardProps {
  goal: GoalItem;
  isSelected: boolean;
  onSelect: (goalId: number) => void;
}

// Use React.memo for performance optimization
const GoalCard: React.FC<GoalCardProps> = React.memo(({ goal, isSelected, onSelect }) => {
  return (
    <TouchableOpacity
      key={goal.id}
      style={[
        styles.goalCard,
        isSelected && styles.goalCardSelected,
      ]}
      onPress={() => onSelect(goal.id)}
    >
      <View style={styles.iconContainer}>
        <Image
          source={goal.icon}
          style={[
            styles.goalIcon,
            isSelected && styles.goalIconSelected,
          ]}
        />
      </View>
      <Text style={[
        styles.goalText,
        isSelected && styles.goalTextSelected,
      ]}>
        {goal.label}
      </Text>
      {isSelected && (
        <Image
          // NOTE: Assuming this path is correct relative to the component location
          source={require('@/assets/icons/checkGreen.png')}
          style={styles.checkIcon}
        />
      )}
    </TouchableOpacity>
  );
});

// Styles specific to the GoalCard component
const styles = StyleSheet.create({
  goalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: s(8),
    marginBottom: s(16),
  },
  goalCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: s(16),
    padding: s(16),
    borderWidth: 1,
    borderColor: '#E1E1E1',
    alignItems: 'center',
    marginBottom: s(10),
  },
  goalCardSelected: {
    borderColor: '#DE728D',
    borderWidth: 2,
  },
  iconContainer: {
    width: s(55),
    height: s(55),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: s(8),
  },
  goalIcon: {
    width: s(55),
    height: s(55),
    tintColor: '#DE728D',
  },
  goalIconSelected: {
    tintColor: '#DE728D',
  },
  goalText: {
    fontSize: s(12),
    fontFamily: 'Open Sans',
    fontWeight: '600',
    color: '#242020',
    textAlign: 'center',
  },
  goalTextSelected: {
  },
  checkIcon: {
    width: s(30),
    height: s(30),
    position: 'absolute',
    top: s(8),
    right: s(8),
  },
});

export default GoalCard;