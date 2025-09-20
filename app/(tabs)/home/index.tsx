import { useState, useEffect, useRef } from 'react';
import AuthWrapper from '@/contexts/AuthWrapper';
// GraphQL hooks
import { useGetFriendsLeaderboard } from '@/hooks/graphql/friends/queries';
import { useCreateActivity } from '@/hooks/graphql/activities/mutations';
import { useRouter } from 'expo-router';
// Components
import HomeScreen from '@/components/screens/home/HomeScreen';
// Debug
import { debugHomePage } from '@/debug/utils';
// Services
import { useDataProvider } from '@/contexts/DataProviderContext';
import { convertLocalToUtc } from '@/utils/timezoneProcessing';
import { getCategoryById } from '@/utils/goals';

const HomePage = () => {
  const { fetching, user, activities, timezone, challenges, setActivities, setCameraClickable } = useDataProvider();
  const [renderCounter, setRenderCounter] = useState(0);
  const [isCreatingActivity, setIsCreatingActivity] = useState(false);
  const router = useRouter();
  const { createActivity } = useCreateActivity();

  /* friends leaderboard */
  const leaderboardRef = useRef<any | null>(null);
  const hasFetchedFriends = useRef(false);
  const { friends, fetched: hasNewLeaderboardData } = useGetFriendsLeaderboard(
    user?.id || 0, 
    'POINTS_WEEKLY', 
    !hasFetchedFriends.current && !fetching && !!user?.id
  ); 

  // Check if activities data is available
  const hasActivitiesData = activities !== null && activities !== undefined;
  const hasChallengesData = challenges !== null && challenges !== undefined;
  
  const loading = !hasFetchedFriends.current || fetching || isCreatingActivity || !hasActivitiesData || !hasChallengesData;

  useEffect(() => {
    if (!hasNewLeaderboardData) {
      return;
    }
    if (hasNewLeaderboardData) {
      // Combined leaderboard with friends and user
      const combinedLeaderboard = friends.map((item: any) => ({
        id: item.friend.id,
        username: item.friend.username,
        profile_picture: item.friend.profile_picture,
        point: item.friend.point
      }));
      if (user) {
        combinedLeaderboard.push({
          id: user.id,
          username: user.username,
          profile_picture: user.profile_picture,
          point: user.point
        });
      }
      // Sort by weekly points in descending order
      combinedLeaderboard.sort((a: any, b: any) => b.point.weekly_points - a.point.weekly_points);
      leaderboardRef.current = combinedLeaderboard;
      hasFetchedFriends.current = true;
    } 
    if (hasFetchedFriends.current) {
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewLeaderboardData]);

  const handleAddGoals = async (selectedGoals: any[], goalFormData: any) => {
    if (fetching || !user?.id) {
      console.warn('Cannot add goals: User data is not yet available');
      return;
    }
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

  if (debugHomePage) {
    console.log(`HomePage Loading States - hasFetchedFriends: ${hasFetchedFriends.current}, fetching: ${fetching}, isCreatingActivity: ${isCreatingActivity}, hasActivitiesData: ${hasActivitiesData}, hasChallengesData: ${hasChallengesData}, loading: ${loading}`);
    if (!loading) {
      const leaderboardDetails = leaderboardRef.current?.map((item: any) => ({
        id: item.id,
        username: item.username,
        weekly_points: item.point?.weekly_points || 0
      })) || [];
      console.log(`Rendering HomePage - Activities: ${activities.length} | Challenges: ${challenges?.activeChallenges?.length || 0} active, ${challenges?.completedChallenges?.length || 0} completed | Leaderboard:`, leaderboardDetails);
    }
  }

  return (
    <HomeScreen  
      loading={loading}
      name={user?.first_name}
      activities={activities}
      timezone={timezone}
      challenges={challenges}
      friendsLeaderboard={leaderboardRef.current}
      handleAddGoals={handleAddGoals}
    />
  );
};

export default AuthWrapper(HomePage);