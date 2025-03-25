import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet 
} from 'react-native';
import DailyGoalCard from '@/components/ui/common/ActivityCard';

interface DailyGoal {
  category: string;
  scheduledDatetime: string;
  duration: number;
  status: string;
  description: string;
}

interface DailyGoalsProps {
  goals: DailyGoal[];
  cardStyle?: any;
}

const DailyGoals: React.FC<DailyGoalsProps> = ({ goals, cardStyle }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Goals</Text>
      <View style={styles.goalsContainer}>
        {goals.map((goal, index) => (
          <DailyGoalCard
            key={index}
            category={goal.category}
            scheduledDatetime={goal.scheduledDatetime}
            duration={goal.duration}
            status={goal.status}
            description={goal.description}
            style={cardStyle}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins',
    fontWeight: '700',
    color: '#000000',
    marginBottom: 16,
    marginLeft: 6,
  },
  goalsContainer: {
    gap: 10,
  },
});

export default DailyGoals;
