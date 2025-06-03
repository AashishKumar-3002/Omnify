import React from 'react';
import { View, Text, SafeAreaView, ScrollView, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import SettingsItem from '@/components/ui/SettingsItem';
import { User, CreditCard, Play, Bell, Globe, BarChart, HelpCircle, MessageCircle, FileText, LogOut } from 'lucide-react-native';

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background-dark">
      <StatusBar style="light" />
      <ScrollView className="flex-1 px-md" showsVerticalScrollIndicator={false}>
        <Text className="text-2xl font-bold text-primary mt-xl mb-md">Settings</Text>

        <View className="mb-xl">
          <Text className="text-lg font-bold text-secondary mb-sm">Account</Text>
          <SettingsItem 
            icon={<User size={20} color="#ffffff" />} 
            title="Profile" 
            subtitle="View your profile" 
            onPress={() => {}} 
          />
          <SettingsItem 
            icon={<CreditCard size={20} color="#ffffff" />} 
            title="Subscription" 
            subtitle="Manage your subscription" 
            onPress={() => {}} 
          />
          <SettingsItem 
            icon={<CreditCard size={20} color="#ffffff" />} 
            title="Payment Methods" 
            subtitle="Manage your payment methods" 
            onPress={() => {}} 
          />
        </View>

        <View className="mb-xl">
          <Text className="text-lg font-bold text-secondary mb-sm">App Settings</Text>
          <SettingsItem 
            icon={<Play size={20} color="#ffffff" />} 
            title="Playback" 
            subtitle="Customize your viewing experience" 
            onPress={() => {}} 
          />
          <SettingsItem 
            icon={<Bell size={20} color="#ffffff" />} 
            title="Notifications" 
            subtitle="Manage your notifications" 
            onPress={() => {}} 
          />
          <SettingsItem 
            icon={<Globe size={20} color="#ffffff" />} 
            title="Language" 
            subtitle="Adjust app language" 
            onPress={() => {}} 
          />
          <SettingsItem 
            icon={<BarChart size={20} color="#ffffff" />} 
            title="Data Usage" 
            subtitle="Manage your data usage" 
            onPress={() => {}} 
          />
        </View>

        <View className="mb-xl">
          <Text className="text-lg font-bold text-secondary mb-sm">Support</Text>
          <SettingsItem 
            icon={<HelpCircle size={20} color="#ffffff" />} 
            title="Help Center" 
            subtitle="Get help with common issues" 
            onPress={() => {}} 
          />
          <SettingsItem 
            icon={<MessageCircle size={20} color="#ffffff" />} 
            title="Contact Us" 
            subtitle="Contact us for support" 
            onPress={() => {}} 
          />
          <SettingsItem 
            icon={<FileText size={20} color="#ffffff" />} 
            title="Legal & Policies" 
            subtitle="Learn about our terms and policies" 
            onPress={() => {}} 
          />
        </View>

        <Pressable className="flex-row items-center bg-[rgba(239,68,68,0.1)] border border-error py-sm px-lg rounded-md mt-lg">
          <LogOut size={20} color="#F44336" style={{ marginRight: 8 }} />
          <Text className="text-error text-base font-medium">Log Out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}