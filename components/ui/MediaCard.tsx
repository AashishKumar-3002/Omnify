import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Media } from '../../types/media';

interface MediaCardProps {
  item: Media;
  size?: 'small' | 'medium' | 'large';
  showTitle?: boolean;
  showProgress?: boolean;
  progress?: number;
  onPress?: (item: Media) => void;
}

const MediaCard: React.FC<MediaCardProps> = ({
  item,
  size = 'medium',
  showTitle = true,
  showProgress = false,
  progress = 0,
  onPress,
}) => {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress(item);
    } else {
      // Default navigation based on media type
      if (item.type === 'movie' || item.type === 'series' || item.type === 'anime') {
        router.push(`/media/${item.id}`);
      } else if (item.type === 'manga' || item.type === 'novel') {
        router.push(`/reader/${item.id}`);
      }
    }
  };

  const getCardDimensions = () => {
    switch (size) {
      case 'small':
        return { width: 120, height: 180 };
      case 'large':
        return { width: 180, height: 270 };
      case 'medium':
      default:
        return { width: 150, height: 225 };
    }
  };

  const dimensions = getCardDimensions();

  return (
    <Pressable
      className="rounded-lg overflow-hidden bg-background-light shadow-md"
      style={{ width: dimensions.width, height: dimensions.height }}
      onPress={handlePress}
    >
      <Image
        source={{ uri: item.coverImage || 'https://via.placeholder.com/150' }}
        className="w-full h-3/4"
        resizeMode="cover"
      />
      {showTitle && (
        <View className="p-sm">
          <Text className="text-sm font-medium text-text-primary" numberOfLines={1}>{item.title}</Text>
        </View>
      )}
      {showProgress && (
        <View className="h-1 bg-background-medium">
          <View
            className="h-full bg-primary"
            style={{ width: `${progress}%` }}
          />
        </View>
      )}
    </Pressable>
  );
};

export default MediaCard;