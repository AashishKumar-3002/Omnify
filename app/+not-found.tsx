import React from 'react';
import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: '404 Error', headerShown: false }} />
      <View style={styles.container}>
        <Ionicons name="library-outline" size={100} color={Colors.primary} />
        <Text style={styles.title}>Oops!</Text>
        <Text style={styles.text}>We couldn't find the page you're looking for.</Text>
        <Link href="/" style={styles.link}>
          <View style={styles.buttonContainer}>
            <Ionicons name="arrow-back-outline" size={24} color={Colors.background.dark} />
            <Text style={styles.buttonText}>Back to Home</Text>
          </View>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: Colors.background.dark,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 20,
    color: Colors.text.primary,
  },
  text: {
    fontSize: 16,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginTop: 10,
  },
  link: {
    marginTop: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.background.dark,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
