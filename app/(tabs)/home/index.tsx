import { useState, useEffect, useRef } from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useGetFriendsLeaderboard } from '@/hooks/graphql/friends/queries';
import { useCreateActivity } from '@/hooks/graphql/activities/mutations';
import { useRouter } from 'expo-router';
// Components
import HomeScreen from '@/components/screens/tabs/HomeScreen';
// Debug
import { debugRenders } from '@/utils/debug';
// Services
import { useUserInfo } from '@/services/UserContext';
import { useUserData } from '@/services/UserPreferencesContext';
import { convertLocalToUtc } from '@/utils/timezoneProcessing';
import { getCategoryById } from '@/utils/goals';

const HomePage = () => {
  const { userId, authToken } = useUserInfo();
  const { fetching, user, activities, timezone, setActivities } = useUserData();
  const [renderCounter, setRenderCounter] = useState(0);
  const [isCreatingActivity, setIsCreatingActivity] = useState(false);
  const router = useRouter();
  const { createActivity } = useCreateActivity();

  /* friends leaderboard */
  const leaderboardRef = useRef<any | null>(null);
  const hasFetchedFriends = useRef(false);
  const { friends, fetched: hasNewLeaderboardData } = useGetFriendsLeaderboard(userId as number, 'POINTS_WEEKLY', !hasFetchedFriends.current && !fetching); 

  const loading = !hasFetchedFriends.current || fetching || isCreatingActivity;

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
      router.replace("/home");
    } catch (error) {
      console.error('Error adding activities:', error);
    } finally {
      setIsCreatingActivity(false);
    }
  };

  if (debugRenders && !loading) {
    console.log("Rendering HomePage. Counter: ", renderCounter,
      "\nActivities:", activities,
      "\nLeaderboard:", leaderboardRef.current,
      "\nTimezone:", timezone,
    );
  }

  return (
    <HomeScreen  
      loading={loading}
      name={user?.first_name}
      activities={activities}
      timezone={timezone}
      friendsLeaderboard={leaderboardRef.current}
      handleAddGoals={handleAddGoals}
    />
  );
};

export default AuthWrapper(HomePage);