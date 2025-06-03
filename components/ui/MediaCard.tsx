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
        return { width: 110, height: 165 };
      case 'large':
        return { width: 170, height: 255 };
      case 'medium':
      default:
        return { width: 130, height: 195 };
    }
  };

  const dimensions = getCardDimensions();
  const imageUri = item.coverImage && item.coverImage.length > 0 ? item.coverImage : 'https://placehold.co/300x450/222/fff?text=No+Image';

  return (
    <Pressable
      className="rounded-lg overflow-hidden bg-background-light"
      style={{ width: dimensions.width, height: dimensions.height }}
      onPress={handlePress}
    >
      <Image
        source={{ uri: imageUri }}
        className="w-full"
        style={{ height: dimensions.height * 0.75, backgroundColor: '#222' }}
        resizeMode="cover"
      />
      {showTitle && (
        <View className="px-2 py-1">
          <Text className="text-xs font-semibold text-text-primary" numberOfLines={1}>{item.title}</Text>
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