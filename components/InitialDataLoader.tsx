import React, { useEffect, useRef, useState } from 'react';
import { useGetUser } from '@/hooks/graphql/users/queries';
import { useUserInfo } from '@/services/UserContext';
import { useUserPreferences } from '@/services/UserPreferencesContext';
import { useUpdateUser } from '@/hooks/graphql/users/mutations';
import { useGetActivitiesByDate } from '@/hooks/graphql/activities/queries';
import { DEFAULT_PROFILE_PICTURE } from '@/utils/userOptions';

export const InitialDataLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { userId, authToken } = useUserInfo();
  const { setTimezone, setCameraClickable } = useUserPreferences();

  const [hasValidAuth, setHasValidAuth] = useState(false);
  const lastFetchedUserId = useRef<number | null>(null);
  const lastFetchedAuthToken = useRef<string | null>(null);

  // Fetching Data
  const userRef = useRef<any | null>(null);
  const hasFetchedUser = useRef(false);
  const { user, fetched: hasNewUserData } = useGetUser(userId as number, !hasFetchedUser.current && hasValidAuth);

  const activitiesRef = useRef<any[] | null>(null);
  const hasFetchedActivities = useRef(false);
  const currentDate = useRef(new Date().toISOString().split('T')[0]).current;
  const { activities, fetched: hasNewActivitiesData } = useGetActivitiesByDate(userId as number, currentDate, authToken as string, !hasFetchedActivities.current && hasValidAuth);

  // Mutations
  const { updateUser } = useUpdateUser();
  const [isUpdating, setIsUpdating] = useState(false);

  // Handle auth data
  useEffect(() => {
    if (userId && authToken) {
        setHasValidAuth(true);
    } else {
        setHasValidAuth(false);
        userRef.current = null;
        activitiesRef.current = null;
        hasFetchedUser.current = false;
        hasFetchedActivities.current = false;
    }
    const oldAuthToken = lastFetchedAuthToken.current ? lastFetchedAuthToken.current.substring(0, 20) + '...' : null;
    const newAuthToken = authToken ? authToken.substring(0, 20) + '...' : null;
    console.log("hasValidAuth set to", hasValidAuth,
        "\nset userId from", lastFetchedUserId.current, "to", userId,
        "\nset authToken from", oldAuthToken, "to", newAuthToken);
    lastFetchedUserId.current = userId as number;
    lastFetchedAuthToken.current = authToken as string;
  }, [userId, authToken]);

  // Handle user and activities data after fetch
  useEffect(() => {
    if (!hasValidAuth) {
        return;
    }
    
    if (!hasNewUserData && !hasNewActivitiesData) {
      return;
    }

    if (hasNewUserData) {
      userRef.current = user;
      hasFetchedUser.current = true;
      console.log("setting user");

      if (user) {
        // Set timezone
        setTimezone(user.timezone);
        
        // Set default profile picture if it doesn't exist
        if (!user.profile_picture && !isUpdating) {
          setIsUpdating(true);
          const input = {
            profile_picture: DEFAULT_PROFILE_PICTURE
          };
          updateUser(input, authToken as string)
            .then(response => {
              if (response.success) {
                console.log("Profile picture set to default");
              } else {
                throw new Error("updateUser response.success is false:", response.errors);
              }
            })
            .catch(error => {
              console.error("Error setting default profile picture:", error);
            })
            .finally(() => {
              setIsUpdating(false);
            });
        }
      }
    }

    if (hasNewActivitiesData) {
      activitiesRef.current = activities;
      hasFetchedActivities.current = true;
      console.log("setting activities");
      
      if (activities) {
        setCameraClickable(activities.length > 0);
      }
    }

    if (hasFetchedUser.current && hasFetchedActivities.current) {
      console.log("render count +1: data fetched", 
        "\nuser ref values", hasFetchedUser.current, userRef.current,
        "\nactivities ref values", hasFetchedActivities.current, activitiesRef.current
        );
    }
  }, [hasValidAuth, hasNewUserData, hasNewActivitiesData]);

  // Could add loading states here if needed
  return <>{children}</>;
}; 