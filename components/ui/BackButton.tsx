import React from 'react';
import { Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { Colors } from '../../constants/colors';

interface BackButtonProps {
  color?: string;
  size?: number;
  onPress?: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ 
  color = Colors.text.primary, 
  size = 28,
  onPress
}) => {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.back();
    }
  };

  return (
    <Pressable
      className="p-xs"
      onPress={handlePress}
      hitSlop={{ top: 15, right: 15, bottom: 15, left: 15 }}
    >
      <ChevronLeft color={color} size={size} />
    </Pressable>
  );
};

export default BackButton;