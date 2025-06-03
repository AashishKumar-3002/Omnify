import React from 'react';
import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles, TextStyles, ButtonStyles } from '@/styles';


export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: '404 Error', headerShown: false }} />
      <View className={GlobalStyles.errorPageContainer}>
        <Ionicons name="library-outline" size={100} className="text-primary" />
        <Text className={TextStyles.errorTitle}>Oops!</Text>
        <Text className={TextStyles.errorDescription}>We couldn&apos;t find the page you&apos;re looking for.</Text>
        <Link href="/" className="mt-[30px]">
          <View className={ButtonStyles.homeButton}>
            <Ionicons name="arrow-back-outline" size={24} className="text-background-dark" />
            <Text className={ButtonStyles.homeButtonText}>Back to Home</Text>
          </View>
        </Link>
      </View>
    </>
  );
}
