import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { GlobalStyles, TextStyles } from '@/styles';
import { Download } from 'lucide-react-native';
import { Colors } from '@/constants/colors';

export default function DownloadsScreen() {
  return (
    <SafeAreaView className={GlobalStyles.safeArea}>
      <StatusBar style="light" />
      <View className={GlobalStyles.container}>
        <Text className={TextStyles.headerTitle}>Downloads</Text>
        
        <View className={GlobalStyles.emptyContainer}>
          <View className={GlobalStyles.emptyIconContainer}>
            <Download size={48} color={Colors.text.secondary} />
          </View>
          <Text className={GlobalStyles.emptyTitle}>No Downloads</Text>
          <Text className={GlobalStyles.emptyText}>
            Download your favorite content to watch offline
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}