import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet 
} from 'react-native';
import ActivityCard from '@/components/ui/common/activityCards/ActivityCard';

interface DailyGoal {
  id: number;
  category: string;
  scheduledDatetime: string;
  duration: number;
  status: string;
  description: string;
}

interface DailyGoalsProps {
  goals: DailyGoal[];
  timezone: string; // User's timezone
  isOwnProfile?: boolean;
}

const DailyGoals: React.FC<DailyGoalsProps> = ({ goals, timezone, isOwnProfile }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Goals</Text>
      <View style={styles.goalsContainer}>
        {goals.map((goal, index) => (
          <ActivityCard
            key={index}
            id={goal.id}
            category={goal.category}
            scheduledDatetime={goal.scheduledDatetime}
            duration={goal.duration}
            status={goal.status}
            description={goal.description}
            timezone={timezone}
            isOwnProfile={isOwnProfile}
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
