import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Colors } from '../../constants/colors';
import { ChevronRight } from 'lucide-react-native';

interface SettingsItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  showChevron?: boolean;
}

const SettingsItem: React.FC<SettingsItemProps> = ({
  icon,
  title,
  subtitle,
  onPress,
  showChevron = true,
}) => {
  return (
    <Pressable 
      className="flex-row items-center py-md px-md border-b border-b-divider"
      onPress={onPress}
      disabled={!onPress}
    >
      <View className="mr-md w-[24px] items-center justify-center">
        {icon}
      </View>
      <View className="flex-1 justify-center">
        <Text className="text-md font-medium text-text-primary">{title}</Text>
        {subtitle && <Text className="text-sm font-regular text-text-tertiary mt-[2px]">{subtitle}</Text>}
      </View>
      {showChevron && (
        <ChevronRight size={20} color={Colors.text.tertiary} />
      )}
    </Pressable>
  );
};

export default SettingsItem;