import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useUpdateActivity } from '@/hooks/graphql/activities/mutations';
// Components
import ViewGoalsScreen from '@/components/screens/home/ViewActivities';
// Debug
import { debugRenders } from '@/utils/debug';
// Services
import { useUserAuth } from '@/services/AuthContext';
import { useDataProvider } from '@/contexts/DataProviderContext';
import { convertLocalToUtc, convertUtcToLocal } from "@/utils/timezoneProcessing";

const ViewActivityPage = () => {
  const { authToken } = useUserAuth();
  const { fetching, user, activities, setActivities } = useDataProvider();

  // Mutations
  const { updateActivity } = useUpdateActivity();
  const [isUpdatingActivity, setIsUpdatingActivity] = useState(false);
  const handleUpdateActivity = async () => {
    setIsUpdatingActivity(true);
    try {
      const utcTime = formData.startTime 
        ? convertLocalToUtc(formData.startTime, user.timezone)
        : new Date(Date.now());
      const totalMinutes = (formData.duration.hours * 60) + formData.duration.minutes;
      const input = {
        scheduledDatetime: utcTime,
        ...(totalMinutes > 0 && { duration: totalMinutes }),
        ...(formData.description && { description: formData.description }),
      };
      const response = await updateActivity(input, selectedActivity as number, authToken as string);
      if (response.success) {
        setActivities(activities.map(activity => 
          activity.id === response.activity.id ? response.activity : activity
        ));
        setSelectedActivity(null);
        resetFormData();
      } else {
        throw new Error("Response.success from createChatMember was false:" + response.errors);
      }
    } catch (error) { 
      console.error("Error updating activity:", error);
    } finally {
      setIsUpdatingActivity(false);
    }
  };

  // Form Data
  const [selectedActivity, setSelectedActivity] = useState<number | null>(null);
  const [formData, setFormData] = useState<any>({
    startTime: '',
    duration: { hours: 0, minutes: 0 },
    description: ''
  });

  const handleFormDataChange = (field: string, value: any) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const resetFormData = () => {
    setFormData({
      startTime: '',
      duration: { hours: 0, minutes: 0 },
      description: ''
    });
  };

  const handleSelectGoal = (goalId: number) => {
    if (selectedActivity === goalId) {
      // Collapse expanded goal and reset form data
      setSelectedActivity(null);
      resetFormData();
    } else {
      // Expand goal and set form data to corresponding activity data
      setSelectedActivity(goalId);
      const selectedActivity = activities.find((activity: any) => activity.id === goalId);
      const activityData = {
        startTime: convertUtcToLocal(selectedActivity?.scheduledDatetime, user.timezone),
        duration: {
          hours: Math.floor(selectedActivity?.duration / 60),
          minutes: selectedActivity?.duration % 60
        },
        description: selectedActivity?.description || ''
      }
      if (selectedActivity) {
        console.log("Activity Selected:", selectedActivity, "\nForm Data:", activityData);
        setFormData(activityData);
      }
    }
  };

  // Debug
  const loading = fetching || isUpdatingActivity;
  /*
  if (debugRenders && !loading) {
    console.log('Rendering ViewActivityPage\n',
      'Activities:', activities, '\n',
      'Timezone:', user.timezone, '\n',
      'Form Data:', formData, '\n',
    );
  }
  */

  return <ViewGoalsScreen 
    loading={loading}
    activities={activities}
    timezone={user.timezone}
    authToken={authToken as string}
    // Activity Selection + Form Data
    selectedActivity={selectedActivity}
    handleSelectGoal={handleSelectGoal}
    formData={formData}
    handleFormDataChange={handleFormDataChange}
    onSave={handleUpdateActivity}
  />;
}

export default AuthWrapper(ViewActivityPage);