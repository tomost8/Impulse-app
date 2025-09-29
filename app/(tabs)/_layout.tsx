import React, { useEffect, useRef, useState } from 'react';
import { Platform, Image } from 'react-native';
import { router, Tabs, usePathname, Redirect } from 'expo-router';

// Contexts
import { useAuth } from '@/contexts/AuthContext';
import { useDataProvider } from '@/contexts/DataProviderContext';

// Components
import LoadingScreen from '@/components/ui/common/loading';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { RequireActivitiesModal } from '@/components/features/goals';

// Utils
import { debugRouting } from '@/debug/utils';

function TabLayout() {
  const [modalVisible, setModalVisible] = useState(false);
  const { userId, authToken, loading } = useAuth();
  const {cameraClickable} = useDataProvider();

  const pathname = usePathname();

  // Handle authentication
  if (loading) {
    return <LoadingScreen />;
  }
  
  if (!authToken || !userId || typeof userId !== 'number') {
    return <Redirect href="/(auth)/getStarted" />;
  }

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
    '/social',
    '/account',
    '/home/index',
    '/chats/index',
    '/social/index',
    '/account/index',
  ];

  const shouldShowTabBar = showForRoutes.includes(pathname);

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarBackground: TabBarBackground,
          tabBarActiveTintColor: '#DE728D', // Custom active color (you can change this)
          tabBarInactiveTintColor: '#8E8E93', // Custom inactive color (you can change this)
          tabBarLabelStyle: {
            display: 'none', // Hide all labels by default
          },
          tabBarStyle: {
            display: shouldShowTabBar ? 'flex' : 'none',
            height: shouldShowTabBar ? undefined : 0,
            paddingHorizontal: 20, // Add horizontal padding
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
            tabBarIcon: ({ color }) => (
              <Image 
                source={require('@/assets/icons/navBar/navHome.png')} 
                style={{ width: 25, height: 25, tintColor: color, marginTop: 12 }}
              />
            ),
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              router.replace('/home');
            },
          }}
        />
        <Tabs.Screen
          name="chats"
          options={{
            title: 'Chat',
            tabBarIcon: ({ color }) => (
              <Image 
                source={require('@/assets/icons/navBar/navChat.png')} 
                style={{ width: 25, height: 25, tintColor: color, marginTop: 12 }}
              />
            ),
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              router.replace('/chats');
            },
          }}
        />
        <Tabs.Screen
          name="camera"
          options={{
            title: 'Camera',
            tabBarLabel: '', // No label for camera
            tabBarIcon: ({ color }) => (
              <Image 
                source={require('@/assets/icons/CameraAndBackground.png')} 
                style={{ width: 70, height: 70 }}
              />
            ),
          }}
          listeners={{
            tabPress: (e) => {
              if (!cameraClickable) {
                e.preventDefault();
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
                source={require('@/assets/icons/navBar/navCommunities.png')} 
                style={{ width: 25, height: 25, tintColor: color, marginTop: 12}}
              />
            ),
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              router.replace('/social');
            },
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            title: 'Account',
            tabBarIcon: ({ color }) => (
              <Image 
                source={require('@/assets/icons/navBar/navProfile.png')} 
                style={{ width: 25, height: 25, tintColor: color, marginTop: 12 }}
              />
            ),
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              router.replace('/account');
            },
          }}
        />
      </Tabs>

      <RequireActivitiesModal
        isVisible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          router.push('/home/addActivity');
        }}
      />
    </>
  );
}

export default TabLayout;
