import React, { useState, useEffect, useRef } from 'react';
import AuthWrapper from '@/contexts/AuthWrapper';
// Services + Utils
import { router } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { useDataProvider } from '@/contexts/DataProviderContext';
import { useDataRefetch } from '@/contexts/DataFetcher';
import { convertLocalToUtc } from '@/utils/timezoneProcessing';
import { getCategoryById } from '@/utils/goals';
// GraphQL hooks
import { useGetFriendsLeaderboard } from '@/hooks/graphql/friends/queries';
import { useCreateActivity } from '@/hooks/graphql/activities/mutations';
// Components
import HomeScreen from '@/components/screens/home/HomeScreen';
// Debug
const DEBUG_HOME_PAGE = false;

const HomePage = () => {
  const [renderCounter, setRenderCounter] = useState(0);
  const { fetching, user, timezone, 
    activities, 
    challenges, 
    setActivities, setCameraClickable 
  } = useDataProvider();
  const { refetchData, isRefetching } = useDataRefetch();

  // Fetch data when navigating to this page
  useFocusEffect(
    React.useCallback(() => {
      console.log("🔄 Fetching data - HomePage navigated to");
      // Small delay to prevent GraphQL race conditions
      setTimeout(() => {
        refetchData({ activities: true, challenges: true });
      }, 100);
    }, [])
  );

  const [isCreatingActivity, setIsCreatingActivity] = useState(false);
  const { createActivity } = useCreateActivity();

  /* friends leaderboard */
  const leaderboardRef = useRef<any | null>(null);
  const hasFetchedFriends = useRef(false);
  const { friends, fetched: hasNewLeaderboardData } = useGetFriendsLeaderboard(
    user?.id || 0, 
    'POINTS_WEEKLY', 
    !hasFetchedFriends.current && !fetching && !!user?.id
  ); 

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

  const loading = !hasFetchedFriends.current || fetching || isRefetching || isCreatingActivity;
  if (DEBUG_HOME_PAGE && !loading) {
    const leaderboardDetails = leaderboardRef.current?.map((item: any) => ({
      id: item.id,
      username: item.username,
      weekly_points: item.point?.weekly_points || 0
    })) || [];
    console.log(`Rendering HomePage - Activities: ${activities.length} | Challenges: ${challenges?.activeChallenges?.length || 0} active, ${challenges?.completedChallenges?.length || 0} completed | Leaderboard:`, leaderboardDetails);
  }

  return (
    <>
      <HomeScreen  
        loading={loading}
        name={user?.first_name}
        activities={activities}
        timezone={timezone}
        challenges={challenges}
        friendsLeaderboard={leaderboardRef.current}
        handleAddGoals={handleAddGoals}
      />
    </>
  );
};

export default AuthWrapper(HomePage);