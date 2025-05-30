import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ComponentStyles, TextStyles, LayoutStyles } from '../../styles';
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
    <Pressable onPress={handlePress} style={[ComponentStyles.mediaCard, { width: dimensions.width }]}>
      <View style={[LayoutStyles.imageContainer, { height: dimensions.height }]}>
        <Image
          source={{ uri: item.coverImage }}
          style={LayoutStyles.image}
          resizeMode="cover"
        />
        
        {showProgress && progress > 0 && (
          <View style={ComponentStyles.mediaCardProgress}>
            <View style={[LayoutStyles.progressBar, { width: `${progress}%` }]} />
          </View>
        )}
      </View>
      
      {showTitle && (
        <Text
          style={TextStyles.cardTitle}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.title}
        </Text>
      )}
    </Pressable>
  );
};

export default MediaCard;