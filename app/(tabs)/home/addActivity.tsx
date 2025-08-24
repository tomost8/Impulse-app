import { useState, useEffect, useRef } from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useCreateActivity } from '@/hooks/graphql/activities/mutations';
// Components
import AddDailyGoalsScreen from '@/components/screens/home/AddActivities';
// Debug
import { debugRenders } from '@/debug/utils';
import { router } from 'expo-router';
// Services
import { useDataProvider } from '@/contexts/DataProviderContext';
import { getCategoryById } from "@/utils/goals";
import { convertLocalToUtc } from "@/utils/timezoneProcessing";

interface GoalFormData {
  startTime: string;
  duration: { hours: number; minutes: number };
  description: string;
}

const AddActivityPage = () => {
  const { fetching, timezone, activities, setActivities, setCameraClickable } = useDataProvider();

  // Mutations
  const { createActivity } = useCreateActivity();
  const [isCreatingActivity, setIsCreatingActivity] = useState(false);
  const handleAddGoals = async () => {
    setIsCreatingActivity(true);
    try {
      const newActivities: any[] = [];
      for (const goalId of selectedGoals) {
        const formData = goalFormData[goalId];
        if (formData) {
          const utcTime = formData.startTime 
            ? convertLocalToUtc(formData.startTime, timezone)
            : new Date(Date.now()).toISOString();
          const totalMinutes = (formData.duration.hours * 60) + formData.duration.minutes;
          const input = {
            category: getCategoryById(goalId),
            scheduledDatetime: utcTime,
            ...(totalMinutes > 0 && { duration: totalMinutes }),
            ...(formData.description && { description: formData.description }),
          };
          const response = await createActivity(input);
          if (response.success) {
            newActivities.push(response.activity);
          } else {
            throw new Error(`Response.success from createActivity was false for goalId: ${goalId}`);
          }
        }
      }
      setActivities([...activities, ...newActivities]);
      setCameraClickable(true);
      router.replace("/home");
    } catch (error) {
      console.error('Error adding activities:', error);
    } finally {
      setIsCreatingActivity(false);
    }
  };

  // Form state management
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

  const loading = fetching || isCreatingActivity;

  return <AddDailyGoalsScreen
    loading={loading}
    selectedGoals={selectedGoals}
    expandedGoal={expandedGoal}
    goalFormData={goalFormData}
    onSelectGoal={handleSelectGoal}
    onCheckIconPress={handleCheckIconPress}
    onFormDataChange={handleFormDataChange}
    onAddGoals={handleAddGoals}
  />;
}

export default AuthWrapper(AddActivityPage);