import React from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
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
    <View className="mb-6">
      <View className="flex-row justify-between items-center mb-3 px-2">
        <Text className="text-lg font-bold text-primary">{title}</Text>
        {showViewAll && viewAllRoute && (
          <Pressable 
            className="flex-row items-center"
            onPress={() => router.push(viewAllRoute as any)}
          >
            <Text className="text-sm font-semibold text-primary">View All</Text>
            <ArrowRight size={16} color="#f4c427" className="ml-1" />
          </Pressable>
        )}
      </View>
      <FlatList
        data={data}
        horizontal={horizontal}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 16, paddingHorizontal: 8 }}
        renderItem={({ item }) => (
          <MediaCard 
            item={item}
            size={cardSize}
            showProgress={showProgress}
            progress={progressData[item.id] || 0}
          />
        )}
      />
    </View>
  );
};

export default MediaSection;