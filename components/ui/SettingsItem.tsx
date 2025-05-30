import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Colors } from '../../constants/colors';
import { ComponentStyles } from '../../styles';
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
      style={ComponentStyles.settingsItem}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={ComponentStyles.settingsIconContainer}>
        {icon}
      </View>
      <View style={ComponentStyles.settingsContentContainer}>
        <Text style={ComponentStyles.settingsTitle}>{title}</Text>
        {subtitle && <Text style={ComponentStyles.settingsSubtitle}>{subtitle}</Text>}
      </View>
      {showChevron && (
        <ChevronRight size={20} color={Colors.text.tertiary} />
      )}
    </Pressable>
  );
};

export default SettingsItem;