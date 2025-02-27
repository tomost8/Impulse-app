import styles from '@/utils/testStyles';
import { TouchableOpacity, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams, Stack } from 'expo-router';

import React, {  useState, useEffect, useRef, createContext } from 'react';
// GraphQL Hooks
import { useGetFriends } from "@/hooks/graphql/friends/queries";
import { useGetUserChats } from "@/hooks/graphql/chats/queries";
import { useGetUserCommunities } from "@/hooks/graphql/communities/queries";
import { useUserInfo } from '@/services/UserContext';
// Debug
import { debugRenders } from '@/utils/debug';

export const CameraHeaderContext = createContext<{
  id: number;
  setId: (id: number) => void;
  category: string;
  setCategory: (category: string) => void;
  pictureTaken: boolean;
  setPictureTaken: (pictureTaken: boolean) => void;
  flash: boolean;
  setFlash: (flash: boolean) => void;
}>({
  id: 0,
  setId: () => {},
  category: '',
  setCategory: () => {},
  pictureTaken: false,
  setPictureTaken: () => {},
  flash: false,
  setFlash: () => {},
});

export const SocialDataContext = createContext<{
  userId: number;
  authToken: string;
  friends: any[] | null;
  groups: any[] | null;
  communities: any[] | null;
} | null>(null);

function CameraHeader() {
  const header = React.useContext(CameraHeaderContext);

  if (!header) return null;

  return (
    <View style={styles.header}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => {
        router.back();
        header.setId(0);
        header.setCategory('');
        if (header.pictureTaken) {
          router.back();
          header.setPictureTaken(false);
        }
      }}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      {/* Display Category Text for Selected Activity*/}
      <Text style={styles.text}>{header.category}</Text>
      {/* Retake Button or Flash Button*/}
      {header.pictureTaken ? (
        <TouchableOpacity onPress={() => {
          router.back();
          header.setId(0);
          header.setCategory('');
          header.setPictureTaken(false);
        }}>
          <Text style={styles.text}>Retake</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => header.setFlash(!header.flash)}>
          {header.flash ? (
            <Ionicons name="flash" size={24} color="white" />
          ) : (
            <Ionicons name="flash-off" size={24} color="white" />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}

export default function CameraLayout() {
  const { id: activityId, category: activityCategory } = useLocalSearchParams();
  const [id, setId] = useState(Number(activityId));
  const [category, setCategory] = useState(activityCategory as string);
  const [pictureTaken, setPictureTaken] = useState(false);
  const [flash, setFlash] = useState(false);

  const { userId, authToken } = useUserInfo();

  const [renderCounter, setRenderCounter] = useState(0);
  const friendsRef = useRef<any[] | null>(null);
  const hasFetchedFriends = useRef(false);
  const { friends, fetched: hasNewFriendsData } = useGetFriends(userId as number, !hasFetchedFriends.current);

  const groupsRef = useRef<any[] | null>(null);
  const hasFetchedGroups = useRef(false);
  const { chatMembers, fetched: hasNewGroupsData } = useGetUserChats(userId as number, !hasFetchedGroups.current);

  const communitiesRef = useRef<any[] | null>(null);
  const hasFetchedCommunities = useRef(false);
  const { communityMembers, fetched: hasNewCommunitiesData } = useGetUserCommunities(userId as number, !hasFetchedCommunities.current);

  useEffect(() => {
      if (!hasNewFriendsData && !hasNewGroupsData && !hasNewCommunitiesData) {
        return;
      }
      if (hasNewFriendsData) {
        friendsRef.current = friends;
        hasFetchedFriends.current = true;
      }
      if (hasNewGroupsData) {
        groupsRef.current = chatMembers?.filter((chatMember: any) => chatMember.chat.type === "group");
        hasFetchedGroups.current = true;
      }
      if (hasNewCommunitiesData) {
        communitiesRef.current = communityMembers;
        hasFetchedCommunities.current = true;
      }
      if (hasFetchedFriends.current && hasFetchedGroups.current && hasFetchedCommunities.current) {
        setRenderCounter(prev => prev + 1);
      }
  }, [hasNewFriendsData, hasNewGroupsData, hasNewCommunitiesData]);

  const loading = !hasFetchedFriends.current || !hasFetchedGroups.current || !hasFetchedCommunities.current; 
  if (debugRenders && !loading) {
    console.log("Rendering CameraLayout\n",
      "Friends:", friendsRef.current, "\n",
      "Groups:", groupsRef.current, "\n",
      "Communities:", communitiesRef.current, "\n",
      "Render Counter:", renderCounter, "\n",
    );
  }

  return (
    <SocialDataContext.Provider value={{
      userId: userId as number,
      authToken: authToken as string,
      friends: friendsRef.current,
      groups: groupsRef.current,
      communities: communitiesRef.current
    }}>
      <CameraHeaderContext.Provider value={{
        id, setId,
        category, setCategory,
        pictureTaken, setPictureTaken,
        flash, setFlash,
      }}>
        <Stack>
          <Stack.Screen 
            name="index" 
            options={{
              header: () => <CameraHeader />,
            }}
          />
          <Stack.Screen 
            name="displayPicture" 
            options={{
              header: () => <CameraHeader />,
            }}
          />
        </Stack>
      </CameraHeaderContext.Provider>
    </SocialDataContext.Provider>
  );
}

