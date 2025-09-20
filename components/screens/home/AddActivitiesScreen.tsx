import { View, StyleSheet, ScrollView, Platform, StatusBar } from "react-native";
import { useRouter } from "expo-router";
import { goals } from "@/utils/goals";

import Header from "@/components/ui/common/headers/Header";
import { AddActivityCard, ConfirmGoalButton } from "@/components/features/goals";

interface GoalFormData {
  startTime: string;
  duration: { hours: number; minutes: number };
  description: string;
}

interface AddDailyGoalsScreenProps {
  loading: boolean;
  selectedGoals: number[];
  expandedGoal: number | null;
  goalFormData: Record<number, GoalFormData>;
  onSelectGoal: (goalId: number) => void;
  onCheckIconPress: (goalId: number) => void;
  onFormDataChange: (goalId: number, field: keyof GoalFormData, value: string) => void;
  onAddGoals: () => void;
}

const AddDailyGoalsScreen = ({
  loading,
  selectedGoals,
  expandedGoal,
  goalFormData,
  onSelectGoal,
  onCheckIconPress,
  onFormDataChange,
  onAddGoals
}: AddDailyGoalsScreenProps) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Header 
        title="Add Daily Goals"
        onBackPress={() => router.back()}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {goals.map((goal) => (
          <AddActivityCard
            key={goal.id}
            category={goal.category}
            isSelected={selectedGoals.includes(goal.id)}
            onSelect={() => onSelectGoal(goal.id)}
            isExpanded={expandedGoal === goal.id}
            onCheckIconPress={() => onCheckIconPress(goal.id)}
            formData={goalFormData[goal.id]}
            onFormDataChange={(field, value) => 
              onFormDataChange(goal.id, field as keyof GoalFormData, value as string)
            }
          />
        ))}
      </ScrollView>
      <ConfirmGoalButton onPress={onAddGoals} />
    </View>
  );
};
  


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 10,
  },
  goalContainer: {
      backgroundColor: "#FFF",
      borderRadius: 20,
      borderWidth: 1,
      borderColor: "#E1E1E1",
      padding: 10,
      marginBottom: 20, // Adds more spacing between each goal
      marginTop: 20, // Adds extra space above the first goal
    },

});
  
export default AddDailyGoalsScreen;