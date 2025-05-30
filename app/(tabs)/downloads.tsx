import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { GlobalStyles, TextStyles } from '@/styles';
import { Download } from 'lucide-react-native';
import { Colors } from '@/constants/colors';

export default function DownloadsScreen() {
  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <StatusBar style="light" />
      <View style={GlobalStyles.container}>
        <Text style={TextStyles.headerTitle}>Downloads</Text>
        
        <View style={GlobalStyles.emptyContainer}>
          <View style={GlobalStyles.emptyIconContainer}>
            <Download size={48} color={Colors.text.secondary} />
          </View>
          <Text style={GlobalStyles.emptyTitle}>No Downloads</Text>
          <Text style={GlobalStyles.emptyText}>
            Download your favorite content to watch offline
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}