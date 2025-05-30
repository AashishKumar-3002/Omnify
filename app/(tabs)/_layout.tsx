import React from 'react';
import { Tabs } from 'expo-router';
import { Colors } from '@/constants/colors';
import { LayoutStyles, TextStyles } from '@/styles';
import { Home, LibraryBig, Download, User } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: LayoutStyles.tabBar,
        tabBarActiveTintColor: Colors.iconActive,
        tabBarInactiveTintColor: Colors.icon,
        tabBarLabelStyle: TextStyles.tabLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Home color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: 'Library',
          tabBarIcon: ({ color, size }) => (
            <LibraryBig color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="downloads"
        options={{
          title: 'Downloads',
          tabBarIcon: ({ color, size }) => (
            <Download color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <User color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}