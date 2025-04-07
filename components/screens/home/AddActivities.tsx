import { View, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import Header from "@/components/ui/DailyGoalsViewAll/AddDailyGoals/Header";
import AddActivityCard from "@/components/ui/common/activityCards/AddActivityCard";
import AddGoalButton from "@/components/ui/DailyGoalsViewAll/AddDailyGoals/AddGoalButton";
import { goals } from "@/utils/goals";

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
  return (
    <View style={styles.container}>
      <Header/>
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
      <AddGoalButton onPress={onAddGoals} />
    </View>
  );
};
  


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
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