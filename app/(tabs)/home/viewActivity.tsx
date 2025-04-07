import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useUpdateActivity } from '@/hooks/graphql/activities/mutations';
// Components
import ViewGoalsScreen from '@/components/screens/home/ViewActivities';
// Debug
import { pageDisplay, debugRenders } from '@/utils/debug';
// Services
import { useUserInfo } from '@/services/UserContext';
import { useUserData } from '@/services/UserPreferencesContext';

const ViewActivityPage = () => {
  const { userId, authToken } = useUserInfo();
  const { fetching, user, activities, setActivities } = useUserData();

  // Mutations
  const { updateActivity } = useUpdateActivity();
  const [isUpdatingActivity, setIsUpdatingActivity] = useState(false);
  const handleUpdateActivity = async (input: any) => {
    setIsUpdatingActivity(true);
    try {
      const response = await updateActivity(input, selectedActivity as number, authToken as string);
      if (response.success) {
        setActivities(activities.map(activity => 
          activity.id === response.activity.id ? response.activity : activity
        ));
      } else {
        throw new Error("Response.success from createChatMember was false:" + response.errors);
      }
    } catch (error) { 
      console.error("Error updating activity:", error);
    } finally {
      setIsUpdatingActivity(false);
    }
  }

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

  if (pageDisplay) {
    return <ViewGoalsScreen 
      loading={loading}
      activities={activities}
      timezone={user.timezone}
      authToken={authToken as string}
      // Activity Selection + Form Data
      selectedActivity={selectedActivity}
      setSelectedActivity={setSelectedActivity}
      formData={formData}
      handleFormDataChange={handleFormDataChange}
      setFormData={setFormData}
      handleUpdateActivity={handleUpdateActivity}
    />;
  }
}

export default AuthWrapper(ViewActivityPage);