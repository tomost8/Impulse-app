import styles from '@/constants/testStyles';

import { Stack } from 'expo-router';
import { createContext, useState, useEffect, useRef } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

import { useGetFriends } from "@/hooks/graphql/friends/queries";
import { useGetUserChats } from "@/hooks/graphql/chats/queries";
import { useGetUserCommunities } from "@/hooks/graphql/communities/queries";
import { useUserInfo } from '../../../services/UserContext';
import { debugRenders } from '@/constants/debug';
// Create the context with type definition and default values
export const HeaderContext = createContext<{
  category: string;
  setCategory: (category: string) => void;
  pictureTaken: boolean;
  setPictureTaken: (pictureTaken: boolean) => void;
  flash: boolean;
  setFlash: (flash: boolean) => void;
}>({
  category: 'Camera',
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
  const context = React.useContext(HeaderContext);

  if (!context) return null;

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => {
        router.back();
        context.setCategory('');
        if (context.pictureTaken) {
          router.back();
          context.setPictureTaken(false);
        }
      }}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      
      <Text style={styles.text}>{context.category}</Text>
      
      {context.pictureTaken ? (
        <TouchableOpacity onPress={() => {
          router.back();
          context.setCategory('');
          context.setPictureTaken(false);
        }}>
          <Text style={styles.text}>Retake</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => context.setFlash(!context.flash)}>
          {context.flash ? (
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
  const [category, setCategory] = useState('Camera');
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
    <HeaderContext.Provider value={{
      category, setCategory,
      pictureTaken, setPictureTaken,
      flash, setFlash,
    }}>
      <SocialDataContext.Provider value={{
        userId: userId as number,
        authToken: authToken as string,
        friends: friendsRef.current,
        groups: groupsRef.current,
        communities: communitiesRef.current
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
      </SocialDataContext.Provider>
    </HeaderContext.Provider>
  );
}

