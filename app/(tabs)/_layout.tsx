import { router, Tabs, usePathname } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Platform, Image, View, Text, Button, TouchableOpacity } from 'react-native';

import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import NotchedTabBarBackground from '@/components/ui/NotchedTabBarBackground';

import CameraPopup from '@/components/screens/home/camerapopup';
import { useAuth } from '@/contexts/AuthContext';
import { debugRouting } from '@/debug/utils';
import { useDataProvider } from '@/contexts/DataProviderContext';
import LoadingScreen from '@/components/ui/common/loading';
import { Redirect } from 'expo-router';

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
          tabBarBackground: NotchedTabBarBackground,
          tabBarActiveTintColor: '#DE728D', // Custom active color (you can change this)
          tabBarInactiveTintColor: '#8E8E93', // Custom inactive color (you can change this)
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
            tabBarLabel: ({ focused, color }) => focused ? <Text style={{ fontSize: 12, color }}>Home</Text> : null,
            tabBarIcon: ({ color }) => (
              <Image 
                source={require('@/assets/icons/navBar/navHome.png')} 
                style={{ width: 28, height: 28, tintColor: color }}
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
            tabBarLabel: ({ focused, color }) => focused ? <Text style={{ fontSize: 12, color }}>Chat</Text> : null,
            tabBarIcon: ({ color }) => (
              <Image 
                source={require('@/assets/icons/navBar/navChat.png')} 
                style={{ width: 28, height: 28, tintColor: color }}
              />
            ),
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
            title: '',
            tabBarIcon: () => null, // No icon - this creates space for floating button
            tabBarButton: () => null, // Completely hide the tab button
          }}
        />
        <Tabs.Screen
          name="social"
          options={{
            title: 'Social',
            tabBarLabel: ({ focused, color }) => focused ? <Text style={{ fontSize: 12, color }}>Social</Text> : null,
            tabBarIcon: ({ color }) => (
              <Image 
                source={require('@/assets/icons/navBar/navCommunities.png')} 
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
            tabBarLabel: ({ focused, color }) => focused ? <Text style={{ fontSize: 12, color }}>Account</Text> : null,
            tabBarIcon: ({ color }) => (
              <Image 
                source={require('@/assets/icons/navBar/navProfile.png')} 
                style={{ width: 28, height: 28, tintColor: color }}
              />
            ),
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              router.push('/account');
            },
          }}
        />
      </Tabs>

      {/* Floating Camera Button */}
      {shouldShowTabBar && (
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: Platform.OS === 'ios' ? 42 : 32, // Position in the notch
            left: '50%',
            marginLeft: -30, // Half of button width to center it
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: '#DE728D', // Match your active tint color
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 8,
            zIndex: 1000,
          }}
          onPress={() => {
            if (!cameraClickable) {
              console.log("no activities, pop up modal");
              setModalVisible(true);
            } else {
              router.push('/camera');
            }
          }}
        >
          <Image 
            source={require('@/assets/icons/navBar/navCamera.png')} 
            style={{ width: 32, height: 32 }}
          />
        </TouchableOpacity>
      )}

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

export default TabLayout;
