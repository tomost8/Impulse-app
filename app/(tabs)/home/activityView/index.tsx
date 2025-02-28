import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useGetActivitiesByDate } from '@/hooks/graphql/activities/queries';
// Components
import DailyGoalsScreen from '@/components/screens/home/EditActivities';
import ViewActivityScreenOld from '@/components/old/home/ViewActivityScreen';
// Debug
import { pageDisplay, debugRenders } from '@/utils/debug';

const ViewActivityPage = (props: any) => {
  const { userId, authToken } = props;
  const [renderCounter, setRenderCounter] = useState(0);

  // Queries for Loading State
  const activitiesRef = useRef<any[] | null>(null);
  const hasFetchedActivities = useRef(false);
  const currentDate = useRef(new Date().toISOString().split('T')[0]).current;
  const { activities, fetched: hasNewActivitiesData } = useGetActivitiesByDate(userId as number, currentDate, authToken as string, !hasFetchedActivities.current);

  useEffect(() => {
    if (!hasNewActivitiesData) {
      return;
    }
    if (hasNewActivitiesData) {
      activitiesRef.current = activities;
      hasFetchedActivities.current = true;
    }
    if (hasFetchedActivities.current) {
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewActivitiesData]);

  // Debug
  const loading = !hasFetchedActivities.current;
  if (debugRenders && !loading) {
    console.log('Rendering ViewActivityPage\n',
      'Activities:', activitiesRef.current, '\n',
      'Render Counter:', renderCounter, '\n',
    );
  }

  if (pageDisplay) {
    return <DailyGoalsScreen 
      activities={activitiesRef.current || []}
      isActivitiesLoading={!hasFetchedActivities.current}
      authToken={authToken as string}
    />;
  } else {
    return <ViewActivityScreenOld
      activities={activitiesRef.current || []}
      isActivitiesLoading={!hasFetchedActivities.current}
    />;
  }
}

export default AuthWrapper(ViewActivityPage);