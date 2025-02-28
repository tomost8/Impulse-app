import React, { useState } from "react";
import { View, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import Header from "@/components/ui/DailyGoalsViewAll/AddDailyGoals/Header";
import AddActivityCard from "@/components/ui/common/AddActivityCard";
import AddGoalButton from "@/components/ui/DailyGoalsViewAll/AddDailyGoals/AddGoalButton";
import { goals, getCategoryById } from "@/utils/goals";
import { useCreateActivity } from "@/hooks/graphql/activities/mutations";
import { useUserPreferences } from "@/services/UserPreferencesContext";
import { convertLocalToUtc } from "@/utils/timezoneProcessing";

interface GoalFormData {
  startTime: string;
  duration: { hours: number; minutes: number };
  description: string;
}

interface AddDailyGoalsScreenProps {
  authToken: string;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

const AddDailyGoalsScreen = ({ authToken, onSuccess, onError }: AddDailyGoalsScreenProps) => {
  const {timezone, loading: timezoneLoading} = useUserPreferences();
  
  const { createActivity } = useCreateActivity();
  const [selectedGoals, setSelectedGoals] = useState<number[]>([]);
  const [expandedGoal, setExpandedGoal] = useState<number | null>(null);
  const [goalFormData, setGoalFormData] = useState<Record<number, GoalFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSelectGoal = (goalId: number) => {
    // Only add goalId if it's not already in the array
    if (!selectedGoals.includes(goalId)) {
      setSelectedGoals((prev) => [...prev, goalId]);
      // Initialize form data if it doesn't exist
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
    // Remove goal from selectedGoals and formData
    setSelectedGoals(prev => prev.filter(id => id !== goalId));
    setGoalFormData(prev => {
      const newData = { ...prev };
      delete newData[goalId];
      return newData;
    });
  }

  const handleFormDataChange = (goalId: number, field: keyof GoalFormData, value: string) => {
    setGoalFormData(prev => ({
      ...prev,
      [goalId]: {
        ...prev[goalId],
        [field]: value
      }
    }));
  };

  const handleAddGoals = async () => {
    setIsSubmitting(true);
    try {
      if (timezoneLoading) {
        throw new Error('Timezone is still loading');
      }
      for (const goalId of selectedGoals) {
        const formData = goalFormData[goalId];
        if (formData) {
          // Get Mutation Input
          const utcTime = formData.startTime 
            ? convertLocalToUtc(formData.startTime, timezone)
            : new Date(Date.now());
          const totalMinutes = (formData.duration.hours * 60) + formData.duration.minutes;
          const input = {
            category: getCategoryById(goalId),
            scheduledDatetime: utcTime,
            ...(totalMinutes > 0 && { duration: totalMinutes }),
            ...(formData.description && { description: formData.description }),
          };
          // Create Activities
          console.log("input", input);
          const response = await createActivity(input, authToken);
          if (!response.success) {
            throw new Error(`Failed to create activity: ${goalId}`);
          }
          console.log("response", response);
        }
      }
      onSuccess?.();
    } catch (error) {
      console.error('Error adding goals:', error);
      onError?.(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <Header/>
  
      {/* Goals List */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
      </ScrollView>
  
      {/* Add Goal Button */}
      <AddGoalButton onPress={handleAddGoals} />
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