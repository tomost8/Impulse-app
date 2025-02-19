import HomeDesign from '@/components/screens/HomeDesign';
import HomeScreen from '@/components/screens/notneeded';

import { useState, useEffect, useRef } from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useGetFriendsLeaderboard } from '@/hooks/graphql/friends/queries';
import { useGetActivitiesByDate } from '@/hooks/graphql/activities/queries';
// Hooks for Profile Picture update testing
import { useGetUser } from '@/hooks/graphql/users/queries';
import { useUpdateUser } from '@/hooks/graphql/users/mutations';
import { DEFAULT_PROFILE_PICTURE } from '@/constants/userOptions';
// Components

// Debug
import { debugRenders } from '@/constants/debug';


const HomePage = (props: any) => {

  const { userId, authToken, userData } = props;
  const [renderCounter, setRenderCounter] = useState(0);

  const friendsRef = useRef<any | null>(null);
  const hasFetchedFriends = useRef(false);
  const { friends, fetched: hasNewFriendsData } = useGetFriendsLeaderboard(userId, 'POINTS_WEEKLY', !hasFetchedFriends.current); // backend needs to be only accepted friends
  
  const activitiesRef = useRef<any[] | null>(null);
  const hasFetchedActivities = useRef(false);
  const currentDate = useRef(new Date().toISOString().split('T')[0]).current;
  const { activities, fetched: hasNewActivitiesData } = useGetActivitiesByDate(userId, currentDate, authToken, !hasFetchedActivities.current);
  //console.log("activities", activities);

  const userRef = useRef<any | null>(null);
  const hasFetchedUserData = useRef(false);
  const { user, fetched: hasNewUserData } = useGetUser(userId, !hasFetchedUserData.current);

  useEffect(() => {
    if (!hasNewFriendsData && !hasNewActivitiesData && !hasNewUserData) {
      return;
    }
    if (hasNewFriendsData) {
      friendsRef.current = friends;
      hasFetchedFriends.current = true;
    }
    if (hasNewActivitiesData) {
      activitiesRef.current = activities;
      hasFetchedActivities.current = true;
    }
    if (hasNewUserData) {
      userRef.current = user;
      hasFetchedUserData.current = true;
    }
    if (hasFetchedFriends.current && hasFetchedActivities.current && hasFetchedUserData.current) {
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewFriendsData, hasNewActivitiesData, hasNewUserData]); 

  // Mutations: Set Default PFP on Render if no PFP is set
  const { updateUser } = useUpdateUser();
  const [isUpdating, setIsUpdating] = useState(false);
  useEffect(() => {
    const updateProfilePicture = async () => {
      if (hasFetchedUserData.current && !userRef.current.profile_picture && !isUpdating) {
        try {
          setIsUpdating(true);
          const input = {
            profile_picture: DEFAULT_PROFILE_PICTURE
          };
          const response = await updateUser(input, authToken);
          if (response.success) {
            console.log("User profile picture not found: set to default", response.user);
          } else {
            throw new Error("updateUser response.success is false", response.errors);
          }
        } catch (error) {
          console.error("Error updating user profile picture:", error);
        } finally {
          setIsUpdating(false);
        }
      }
    };

    updateProfilePicture();
  }, [hasFetchedUserData.current, userRef.current?.profile_picture, authToken]);
  
  const loading = !hasFetchedFriends.current || !hasFetchedActivities.current || !hasFetchedUserData.current;
  if (debugRenders && !loading) {
    console.log("Rendering HomePage.\n",
      "Friends:", friendsRef.current, "\n",
      "Activities:", activitiesRef.current, "\n",
      "Render Counter:", renderCounter
    );
  }
  
  return <HomeScreen
    friends={friendsRef.current || []} 
    isFriendsLoading={!hasFetchedFriends.current}
    activities={activitiesRef.current || []}
    isActivitiesLoading={!hasFetchedActivities.current}
  />;
};

export default AuthWrapper(HomePage);