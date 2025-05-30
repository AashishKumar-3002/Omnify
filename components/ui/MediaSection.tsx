import React from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { ComponentStyles, ButtonStyles, TextStyles, LayoutStyles } from '../../styles';
import { Media } from '../../types/media';
import MediaCard from './MediaCard';

interface MediaSectionProps {
  title: string;
  data: Media[];
  showViewAll?: boolean;
  viewAllRoute?: string;
  horizontal?: boolean;
  cardSize?: 'small' | 'medium' | 'large';
  showProgress?: boolean;
  progressData?: Record<string, number>;
}

const MediaSection: React.FC<MediaSectionProps> = ({
  title,
  data,
  showViewAll = true,
  viewAllRoute,
  horizontal = true,
  cardSize = 'medium',
  showProgress = false,
  progressData = {},
}) => {
  const router = useRouter();

  if (data.length === 0) {
    return null;
  }

  return (
    <View style={ComponentStyles.mediaSectionContainer}>
      <View style={ComponentStyles.mediaSectionHeader}>
        <Text style={TextStyles.subtitle}>{title}</Text>
        {showViewAll && viewAllRoute && (
          <Pressable 
            style={ButtonStyles.viewAllButton}
            onPress={() => router.push(viewAllRoute as any)}
          >
            <Text style={ButtonStyles.viewAllText}>View All</Text>
            <ArrowRight size={16} color={Colors.primary} style={{ marginLeft: Spacing.xs }} />
          </Pressable>
        )}
      </View>
      
      {horizontal ? (
        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={LayoutStyles.listContainer}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MediaCard 
              item={item}
              size={cardSize}
              showProgress={showProgress}
              progress={progressData[item.id] || 0}
            />
          )}
        />
      ) : (
        <FlatList
          data={data}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={LayoutStyles.gridContainer}
          columnWrapperStyle={LayoutStyles.columnWrapper}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MediaCard 
              item={item}
              size={cardSize}
              showProgress={showProgress}
              progress={progressData[item.id] || 0}
            />
          )}
        />
      )}
    </View>
  );
};

export default MediaSection;