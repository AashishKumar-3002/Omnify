import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { GlobalStyles } from '@/styles';
import '../global.css';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <GestureHandlerRootView className={GlobalStyles.safeArea}>
      <StatusBar style="light" />
      <Stack 
        screenOptions={{ 
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="media/[id]" options={{ presentation: 'card' }} />
        <Stack.Screen name="media/player" options={{ presentation: 'fullScreenModal' }} />
        <Stack.Screen name="reader/[id]" options={{ presentation: 'card' }} />
      </Stack>
    </GestureHandlerRootView>
  );
}