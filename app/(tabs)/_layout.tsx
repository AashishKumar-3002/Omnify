import React from 'react';
import { Tabs } from 'expo-router';
import { Home, LibraryBig, Download, User } from 'lucide-react-native';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#121212', // background-dark
    borderTopColor: '#333333', // divider
    borderTopWidth: 1,
    height: 60,
    paddingBottom: 6,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#b3b3b3', // text-secondary
  },
});

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#f4c427', // primary
        tabBarInactiveTintColor: '#b3b3b3', // secondary
        tabBarLabelStyle: styles.tabBarLabel,
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