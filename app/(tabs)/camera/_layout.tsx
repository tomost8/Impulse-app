import { Stack } from 'expo-router';
import React, { createContext, useState, useEffect, useRef, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
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
    <View style={headerStyles.header}>
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
      <Text style={headerStyles.text}>{header.category}</Text>
      {/* Retake Button or Flash Button*/}
      {header.pictureTaken ? (
        <TouchableOpacity onPress={() => {
          router.back();
          header.setId(0);
          header.setCategory('');
          header.setPictureTaken(false);
        }}>
          <Text style={headerStyles.text}>Retake</Text>
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

  useEffect(() => {
    // 使用 Expo Router 的方式隐藏底部导航栏
    if (router.canGoBack()) {
      router.setParams({ hideTabBar: 'true' });
    }
    
    return () => {
      // 组件卸载时恢复底部导航栏
      if (router.canGoBack()) {
        router.setParams({ hideTabBar: 'false' });
      }
    };
  }, []);

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
        <Stack
          screenOptions={{
            headerShown: true,
            header: () => <CameraHeader />,
          }}
        >
          <Stack.Screen 
            name="index" 
            options={{
              // 可以在这里设置特定于索引页面的选项
            }}
          />
          <Stack.Screen 
            name="displayPicture" 
            options={{
              // 可以在这里设置特定于显示图片页面的选项
            }}
          />
        </Stack>
      </CameraHeaderContext.Provider>
    </SocialDataContext.Provider>
  );
}

// 将样式名称改为 headerStyles 以避免冲突
const headerStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: '#000',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});

