import React, { useEffect, useRef, useState } from 'react';
import { useGetUser } from '@/hooks/graphql/users/queries';
import { useUserInfo } from '@/services/UserContext';
import { useUserPreferences } from '@/services/UserPreferencesContext';
import { useUpdateUser } from '@/hooks/graphql/users/mutations';
import { useGetActivitiesByDate } from '@/hooks/graphql/activities/queries';
import { DEFAULT_PROFILE_PICTURE } from '@/constants/userOptions';

export const InitialDataLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { userId, authToken } = useUserInfo();
  const { setTimezone, setCameraClickable } = useUserPreferences();
  
  const shouldFetch = !!(userId && authToken);
  const { user, fetched: hasNewUserData } = useGetUser(userId as number, shouldFetch);
  const currentDate = useRef(new Date().toISOString().split('T')[0]).current;
  const { activities, fetched: hasNewActivitiesData } = useGetActivitiesByDate(userId as number, currentDate, authToken as string, shouldFetch);

  const { updateUser } = useUpdateUser();
  const [isUpdating, setIsUpdating] = useState(false);

  // Handle data loading whenever userId or authToken changes
  useEffect(() => {
    if (hasNewUserData && user) {
      console.log("Loading data:", user)
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
    if (hasNewActivitiesData && activities) {
      setCameraClickable(activities.length > 0);
    }
  }, [hasNewUserData, userId, authToken, hasNewActivitiesData, activities]);

  // Could add loading states here if needed
  return <>{children}</>;
}; 