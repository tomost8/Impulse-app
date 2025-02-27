import { useState, useEffect, useRef } from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useCreateActivity } from '@/hooks/graphql/activities/mutations';
// Components
import AddDailyGoalsScreen from '@/components/screens/AddDailyGoals';
import AddActivityScreenOld from '@/components/screens/old/home/AddActivityScreen';
// Debug
import { pageDisplay, debugRenders } from '@/constants/debug';
import { router } from 'expo-router';


const AddActivityPage = (props: any) => {
  const { userId, authToken } = props;

  // Mutations
  const { createActivity } = useCreateActivity();
  const [isCreatingActivity, setIsCreatingActivity] = useState(false);
  const handleCreateActivity = async (activity: string, date?: string) => {
    setIsCreatingActivity(true);
    try {
      const activityDate = date || new Date(Date.now());
      const input = {
        category: activity,
        scheduledDatetime: activityDate, // Need to handle time zone, server is UTC
        //Description, duration, datetime are form inputs
      };
      const response = await createActivity(input, authToken);
      if (response.success) {
        router.back();
        console.log("Activity created successfully", response);
        console.log("Scheduled datetime:", activityDate);
      } else {
        console.error("Error creating activity:", response);
      }
    } catch (error) {
      console.error("Error creating activity:", error);
    } finally {
      setIsCreatingActivity(false);
    }
  }

  // Form data
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

  const handleSelectActivity = (activity: string) => {
    setSelectedActivities(prev => 
      prev.includes(activity) ? prev.filter(a => a !== activity) : [...prev, activity]
    );
  };

  // Debug
  const loading = isCreatingActivity;
  if (debugRenders && !loading) {
    console.log("Rendering AddActivityPage");
  }

  if (pageDisplay) {
    return <AddDailyGoalsScreen
      selectedActivities={selectedActivities}
      handleSelectActivity={handleSelectActivity}
      handleCreateActivity={handleCreateActivity}
      isSubmitting={isCreatingActivity}
    />;
  } else {
    return <AddActivityScreenOld 
      selectedActivities={selectedActivities}
      handleSelectActivity={handleSelectActivity}
      handleCreateActivity={handleCreateActivity}
      isSubmitting={isCreatingActivity}
    />;
  }
}

export default AuthWrapper(AddActivityPage);