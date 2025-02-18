import { router, Tabs, usePathname } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Platform, Image, View, Text, Button } from 'react-native';

import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';

import AlmostReadyModal from '@/components/modals/AlmostReadyModal';
import { useGetActivitiesByDate } from '@/hooks/graphql/activities/queries';
import AuthWrapper from '@/components/auth/AuthWrapper';

function TabLayout({ userId, authToken }: { userId: number, authToken: string }) {
  const [modalVisible, setModalVisible] = useState(false);
  const pathname = usePathname();

  const activitiesRef = useRef<any[] | null>(null);
  const hasFetchedActivities = useRef(false);
  const currentDate = useRef(new Date().toISOString().split('T')[0]).current;
  const { activities, fetched: hasNewActivitiesData } = useGetActivitiesByDate(
    userId as number,
    currentDate,
    authToken as string,
    !hasFetchedActivities.current
  );

  useEffect(() => {
    if (!hasNewActivitiesData) {
      return;
    }
    if (hasNewActivitiesData) {
      activitiesRef.current = activities;
      hasFetchedActivities.current = true;
    }
  }, [hasNewActivitiesData]);

  const hasActivities = activities ? activities.some((activity: any) => activity.status !== 'expired') : false;

  // Add debug logging
  useEffect(() => {
    console.log('Current pathname:', pathname, 'Should show tab bar:', showForRoutes.includes(pathname));
  }, [pathname]);

  // Force tab bar to be visible on initial mount
  useEffect(() => {
    if (pathname.includes('/(tabs)') || pathname === '/') {
      console.log('Forcing tab bar visibility for path:', pathname);
      router.setParams({});
    }
  }, [pathname]);

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
              if (!hasActivities) {
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

      <AlmostReadyModal
        visible={modalVisible}
        hideModal={() => {
          setModalVisible(false);
          router.push('/home/activityAdd');
        }}
      />
    </>
  );
}

export default AuthWrapper(TabLayout);
