import React from 'react';
import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles, TextStyles, ButtonStyles } from '@/styles';
import { Colors } from '@/constants/colors';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: '404 Error', headerShown: false }} />
      <View style={GlobalStyles.errorPageContainer}>
        <Ionicons name="library-outline" size={100} color={Colors.primary} />
        <Text style={TextStyles.errorTitle}>Oops!</Text>
        <Text style={TextStyles.errorDescription}>We couldn&apos;t find the page you&apos;re looking for.</Text>
        <Link href="/" style={{ marginTop: 30 }}>
          <View style={ButtonStyles.homeButton}>
            <Ionicons name="arrow-back-outline" size={24} color={Colors.background.dark} />
            <Text style={ButtonStyles.homeButtonText}>Back to Home</Text>
          </View>
        </Link>
      </View>
    </>
  );
}
