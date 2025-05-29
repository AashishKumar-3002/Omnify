import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, ScrollView, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Spacing } from '@/constants/spacing';
import { Layout } from '@/constants/layout';
import SettingsItem from '@/components/ui/SettingsItem';
import { 
  User, 
  CreditCard, 
  Play, 
  Bell, 
  Globe, 
  BarChart, 
  HelpCircle, 
  MessageCircle,
  FileText,
  LogOut
} from 'lucide-react-native';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.headerTitle}>Settings</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <SettingsItem 
            icon={<User color={Colors.text.primary} size={20} />}
            title="Profile"
            subtitle="View your profile"
            onPress={() => {}}
          />
          
          <SettingsItem 
            icon={<CreditCard color={Colors.text.primary} size={20} />}
            title="Subscription"
            subtitle="Manage your subscription"
            onPress={() => {}}
          />
          
          <SettingsItem 
            icon={<CreditCard color={Colors.text.primary} size={20} />}
            title="Payment Methods"
            subtitle="Manage your payment methods"
            onPress={() => {}}
          />
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          
          <SettingsItem 
            icon={<Play color={Colors.text.primary} size={20} />}
            title="Playback"
            subtitle="Customize your viewing experience"
            onPress={() => {}}
          />
          
          <SettingsItem 
            icon={<Bell color={Colors.text.primary} size={20} />}
            title="Notifications"
            subtitle="Manage your notifications"
            onPress={() => {}}
          />
          
          <SettingsItem 
            icon={<Globe color={Colors.text.primary} size={20} />}
            title="Language"
            subtitle="Adjust app language"
            onPress={() => {}}
          />
          
          <SettingsItem 
            icon={<BarChart color={Colors.text.primary} size={20} />}
            title="Data Usage"
            subtitle="Manage your data usage"
            onPress={() => {}}
          />
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          <SettingsItem 
            icon={<HelpCircle color={Colors.text.primary} size={20} />}
            title="Help Center"
            subtitle="Get help with common issues"
            onPress={() => {}}
          />
          
          <SettingsItem 
            icon={<MessageCircle color={Colors.text.primary} size={20} />}
            title="Contact Us"
            subtitle="Contact us for support"
            onPress={() => {}}
          />
          
          <SettingsItem 
            icon={<FileText color={Colors.text.primary} size={20} />}
            title="Legal & Policies"
            subtitle="Learn about our terms and policies"
            onPress={() => {}}
          />
        </View>
        
        <Pressable style={styles.logoutButton}>
          <LogOut color={Colors.error} size={20} style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Log Out</Text>
        </Pressable>
        
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background.dark,
  },
  container: {
    flex: 1,
  },
  headerTitle: {
    fontSize: Typography.fontSize['2xl'],
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.primary,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.secondary,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.xs,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.xl,
    marginHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.background.medium,
    borderRadius: Layout.radius.md,
  },
  logoutIcon: {
    marginRight: Spacing.sm,
  },
  logoutText: {
    color: Colors.error,
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.medium,
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: Spacing.lg,
    marginBottom: Spacing['2xl'],
  },
  versionText: {
    color: Colors.text.tertiary,
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
  },
});