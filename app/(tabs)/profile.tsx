import React from 'react';
import { View, Text, SafeAreaView, ScrollView, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { GlobalStyles, TextStyles, ButtonStyles, LayoutStyles } from '@/styles';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/spacing';
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
    <SafeAreaView style={GlobalStyles.safeArea}>
      <StatusBar style="light" />
      <ScrollView 
        style={GlobalStyles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={TextStyles.headerTitle}>Settings</Text>
        
        <View style={LayoutStyles.section}>
          <Text style={TextStyles.sectionTitleSecondary}>Account</Text>
          
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
        
        <View style={LayoutStyles.section}>
          <Text style={TextStyles.sectionTitleSecondary}>App Settings</Text>
          
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
        
        <View style={LayoutStyles.section}>
          <Text style={TextStyles.sectionTitleSecondary}>Support</Text>
          
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
        
        <Pressable style={ButtonStyles.logoutButton}>
          <LogOut color={Colors.error} size={20} style={{ marginRight: Spacing.sm }} />
          <Text style={ButtonStyles.logoutText}>Log Out</Text>
        </Pressable>
        
        <View style={LayoutStyles.versionContainer}>
          <Text style={TextStyles.versionText}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Remove the entire StyleSheet.create() block as we're now using global styles