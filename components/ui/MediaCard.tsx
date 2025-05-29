import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Layout } from '../../constants/layout';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';
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
    <Pressable onPress={handlePress} style={[styles.container, { width: dimensions.width }]}>
      <View style={[styles.imageContainer, { height: dimensions.height }]}>
        <Image
          source={{ uri: item.coverImage }}
          style={styles.image}
          resizeMode="cover"
        />
        
        {showProgress && progress > 0 && (
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${progress}%` }]} />
          </View>
        )}
      </View>
      
      {showTitle && (
        <Text
          style={styles.title}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.title}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: Spacing.md,
    marginBottom: Spacing.md,
  },
  imageContainer: {
    borderRadius: Layout.radius.md,
    overflow: 'hidden',
    backgroundColor: Colors.background.light,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    marginTop: Spacing.xs,
    color: Colors.text.primary,
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.sm,
  },
  progressContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: Colors.background.light,
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
});

export default MediaCard;