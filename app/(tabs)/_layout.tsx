import { router, Tabs } from 'expo-router';
import React, { useState } from 'react';
import { Platform, Image, View, Text, Button } from 'react-native';

import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';

import AlmostReadyModal from '@/components/modals/AlmostReadyModal';
import useUserInfo from '@/hooks/useUserInfo';
import { useGetActivities } from '@/hooks/api/useActivites';

export default function TabLayout() {
  const [modalVisible, setModalVisible] = useState(false);
  const { userId, authToken } = useUserInfo();
  const { activities } = useGetActivities(userId as number, authToken as string);
  const hasActivities = activities.some((activity: any) => activity.status !== 'expired');

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: 'absolute',
            },
            default: {},
          }),
        }}>
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="chats"
          options={{
            title: 'Chat',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="camera"
          options={{
            title: 'Camera',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="camera.fill" color={color} />,
          }}
          listeners={{
            tabPress: (e) => {
              if (!hasActivities) {
                e.preventDefault();
                console.log("no activities, pop up modal");
                setModalVisible(true);
              }
            },
          }}
        />
        <Tabs.Screen
          name="communities"
          options={{
            title: 'Communities',
            tabBarIcon: ({ color }) => (
              <Image 
                source={require('@/assets/icons/people-icon.png')} 
                style={{ width: 28, height: 28, tintColor: color }}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            title: 'Account',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
          }}
        />
      </Tabs>

      <AlmostReadyModal
        visible={modalVisible}
        hideModal={() => {
          setModalVisible(false);
          router.push('home/activityAdd');
        }}
      />
    </>
  );
}
