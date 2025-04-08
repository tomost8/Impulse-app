import { router, Tabs, usePathname } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Platform, Image, View, Text, Button } from 'react-native';

import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';

import CameraPopup from '@/components/screens/home/camerapopup';
import AuthWrapper from '@/components/auth/AuthWrapper';
import { debugRouting } from '@/utils/debug';
import { useUserData } from '@/services/UserPreferencesContext';

function TabLayout({ userId, authToken }: { userId: number, authToken: string }) {
  const [modalVisible, setModalVisible] = useState(false);
  const pathname = usePathname();

  const {cameraClickable} = useUserData();

  // Add debug logging
  if (debugRouting) {
    useEffect(() => {
      console.log('Current pathname:', pathname, 'Should show tab bar:', showForRoutes.includes(pathname));
    }, [pathname]);
  }

  // Specific routes where the tab bar should be shown
  const showForRoutes = [
    '/',
    '/home',
    '/chats',
    '/camera',
    '/social',
    '/account',
    '/home/index',
    '/chats/index',
    '/camera/index',
    '/social/index',
    '/account/index',
    /*
    '/(tabs)',
    '/(tabs)/home',
    '/(tabs)/home/index',
    '/(tabs)/chats',
    '/(tabs)/chats/index',
    '/(tabs)/camera',
    '/(tabs)/camera/index',
    '/(tabs)/social',
    '/(tabs)/social/index',
    '/(tabs)/account',
    '/(tabs)/account/index'
    */
  ];

  const shouldShowTabBar = showForRoutes.includes(pathname);

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarBackground: TabBarBackground,
          tabBarStyle: {
            display: shouldShowTabBar ? 'flex' : 'none',
            height: shouldShowTabBar ? undefined : 0,
            ...Platform.select({
              ios: {
                position: 'absolute',
                height: 49+35, // Standard iOS tab bar height (without safe area)
                // for iphoneX and later, safearea adds another 34px
                paddingBottom: 0, // Remove if you don't need extra padding
              },
              android: {
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                elevation: 8,
              },
              default: {},
            }),
          },
        }}>
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              router.push('/home');
            },
          }}
        />
        <Tabs.Screen
          name="chats"
          options={{
            title: 'Chat',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              router.push('/chats');
            },
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
              if (!cameraClickable) {
                e.preventDefault();
                console.log("no activities, pop up modal");
                setModalVisible(true);
              } else {
                router.push('/camera');
              }
            },
          }}
        />
        <Tabs.Screen
          name="social"
          options={{
            title: 'Social',
            tabBarIcon: ({ color }) => (
              <Image 
                source={require('@/assets/icons/people-icon.png')} 
                style={{ width: 28, height: 28, tintColor: color }}
              />
            ),
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              router.push('/social');
            },
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            title: 'Account',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              router.push('/account');
            },
          }}
        />
      </Tabs>

      <CameraPopup
        isVisible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          router.push('/home/addActivity');
        }}
      />
    </>
  );
}

export default AuthWrapper(TabLayout);
